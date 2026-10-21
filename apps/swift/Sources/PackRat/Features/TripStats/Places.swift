import CoreLocation
import Foundation

/// A country, or a state or province, and its boundary, from the bundled
/// `Places.json` (built by `apps/swift/scripts/generate-places.ts` from
/// Natural Earth's 1:10m boundaries). Simplified to about 500 m: enough to
/// say which country and state a trip was in, not a survey line.
struct PlaceBoundary: Identifiable, Sendable {
    /// ISO 3166-1 alpha-2 for a country ("US"), ISO 3166-2 for a region ("US-WA").
    let code: String
    let name: String
    /// The country a region belongs to; nil for a country.
    let countryCode: String?
    /// Outer boundaries and holes alike; the even-odd rule sorts them out.
    /// Empty for a country that is the union of its regions (US, Canada, Australia).
    let rings: [[CLLocationCoordinate2D]]
    let minLatitude: Double
    let maxLatitude: Double
    let minLongitude: Double
    let maxLongitude: Double

    var id: String { code }

    init(code: String, name: String, countryCode: String? = nil, rings: [[CLLocationCoordinate2D]]) {
        self.code = code
        self.name = name
        self.countryCode = countryCode
        self.rings = rings
        var minLat = 90.0, maxLat = -90.0, minLon = 180.0, maxLon = -180.0
        for ring in rings {
            for point in ring {
                minLat = min(minLat, point.latitude)
                maxLat = max(maxLat, point.latitude)
                minLon = min(minLon, point.longitude)
                maxLon = max(maxLon, point.longitude)
            }
        }
        minLatitude = minLat
        maxLatitude = maxLat
        minLongitude = minLon
        maxLongitude = maxLon
    }

    func boxContains(_ point: CLLocationCoordinate2D, margin: Double = 0) -> Bool {
        point.latitude >= minLatitude - margin && point.latitude <= maxLatitude + margin
            && point.longitude >= minLongitude - margin && point.longitude <= maxLongitude + margin
    }

    /// Even-odd ray casting over every ring, after a bounding-box check.
    func contains(_ point: CLLocationCoordinate2D) -> Bool {
        guard boxContains(point) else { return false }
        var inside = false
        for ring in rings where ring.count >= 3 {
            var j = ring.count - 1
            for i in 0..<ring.count {
                let a = ring[i], b = ring[j]
                if (a.latitude > point.latitude) != (b.latitude > point.latitude) {
                    let crossing = (b.longitude - a.longitude) * (point.latitude - a.latitude)
                        / (b.latitude - a.latitude) + a.longitude
                    if point.longitude < crossing { inside.toggle() }
                }
                j = i
            }
        }
        return inside
    }

    /// Kilometres from the point to the nearest edge, on a local flat
    /// projection. Only used for points that fall just off a simplified coast.
    func distanceKilometres(to point: CLLocationCoordinate2D) -> Double {
        let kmPerDegree = 111.32
        let scale = cos(point.latitude * .pi / 180)
        func xy(_ c: CLLocationCoordinate2D) -> (Double, Double) {
            ((c.longitude - point.longitude) * scale * kmPerDegree, (c.latitude - point.latitude) * kmPerDegree)
        }
        var best = Double.infinity
        for ring in rings where ring.count >= 2 {
            var previous = xy(ring[0])
            for index in 1..<ring.count {
                let next = xy(ring[index])
                let dx = next.0 - previous.0, dy = next.1 - previous.1
                let length = dx * dx + dy * dy
                let t = length == 0 ? 0 : max(0, min(1, -(previous.0 * dx + previous.1 * dy) / length))
                best = min(best, hypot(previous.0 + t * dx, previous.1 + t * dy))
                previous = next
            }
        }
        return best
    }
}

/// Where a point is: always a country, and a state or province where the
/// dataset holds them.
struct PlaceHit: Hashable, Sendable {
    let country: String
    let region: String?
}

/// The bundled countries and regions, and the lookup from a point to them.
struct PlaceAtlas: Sendable {
    let countries: [PlaceBoundary]
    let regions: [PlaceBoundary]
    private let countriesByCode: [String: PlaceBoundary]
    private let regionsByCode: [String: PlaceBoundary]

    /// A point this close to a coast (or a simplified border) still counts:
    /// a beach camp or a lakeshore trailhead shouldn't land in the sea.
    static let coastalSlackKilometres = 5.0

    init(countries: [PlaceBoundary], regions: [PlaceBoundary]) {
        self.countries = countries
        self.regions = regions
        countriesByCode = Dictionary(countries.map { ($0.code, $0) }, uniquingKeysWith: { first, _ in first })
        regionsByCode = Dictionary(regions.map { ($0.code, $0) }, uniquingKeysWith: { first, _ in first })
    }

    func country(_ code: String) -> PlaceBoundary? { countriesByCode[code] }
    func region(_ code: String) -> PlaceBoundary? { regionsByCode[code] }
    func regions(in country: String) -> [PlaceBoundary] { regions.filter { $0.countryCode == country } }

    /// The country (and region) holding the point, or the nearest within
    /// `coastalSlackKilometres`; nil out at sea.
    func locate(_ point: CLLocationCoordinate2D, hint: PlaceHit? = nil) -> PlaceHit? {
        // Consecutive route points almost always share a place; try it first.
        if let hint {
            if let code = hint.region, regionsByCode[code]?.contains(point) == true { return hint }
            if hint.region == nil, countriesByCode[hint.country]?.contains(point) == true { return hint }
        }
        if let region = regions.first(where: { $0.contains(point) }), let country = region.countryCode {
            return PlaceHit(country: country, region: region.code)
        }
        if let country = countries.first(where: { !$0.rings.isEmpty && $0.contains(point) }) {
            return PlaceHit(country: country.code, region: nil)
        }
        // Off a simplified coast: the nearest boundary, if it's close.
        let margin = Self.coastalSlackKilometres / 111.32 / max(cos(point.latitude * .pi / 180), 0.1)
        let candidates = (regions + countries.filter { !$0.rings.isEmpty }).filter { $0.boxContains(point, margin: margin) }
        guard let nearest = candidates
            .map({ ($0, $0.distanceKilometres(to: point)) })
            .min(by: { $0.1 < $1.1 }),
            nearest.1 <= Self.coastalSlackKilometres
        else { return nil }
        if let country = nearest.0.countryCode { return PlaceHit(country: country, region: nearest.0.code) }
        return PlaceHit(country: nearest.0.code, region: nil)
    }

    /// Every place a trip's location or route touches. Routes are sampled to
    /// ~300 points, which is plenty against boundaries simplified to 500 m.
    func places(visitedBy trip: Trip) -> Set<PlaceHit> {
        var points: [CLLocationCoordinate2D] = []
        if let location = trip.location {
            points.append(CLLocationCoordinate2D(latitude: location.latitude, longitude: location.longitude))
        }
        if let encoded = trip.log?.route, !encoded.isEmpty {
            let route = Polyline.decode(encoded)
            let step = max(route.count / 300, 1)
            points += stride(from: 0, to: route.count, by: step).map { route[$0] }
            if let last = route.last { points.append(last) }
        }
        var hits = Set<PlaceHit>()
        var hint: PlaceHit?
        for point in points {
            guard let hit = locate(point, hint: hint) else { continue }
            hits.insert(hit)
            hint = hit
        }
        return hits
    }
}

enum Places {
    /// Every country and region. Empty only if the bundled file is missing.
    static let atlas: PlaceAtlas = load(from: .main)

    static func load(from bundle: Bundle) -> PlaceAtlas {
        guard let url = bundle.url(forResource: "Places", withExtension: "json"),
              let data = try? Data(contentsOf: url)
        else { return PlaceAtlas(countries: [], regions: []) }
        return decode(data)
    }

    static func decode(_ data: Data) -> PlaceAtlas {
        struct Row: Decodable {
            let code: String
            let name: String
            let country: String?
            /// Encoded polylines, precision 5, one per ring.
            let rings: [String]
        }
        struct File: Decodable {
            let countries: [Row]
            let regions: [Row]
        }
        guard let file = try? JSONDecoder().decode(File.self, from: data) else {
            return PlaceAtlas(countries: [], regions: [])
        }
        func boundary(_ row: Row) -> PlaceBoundary {
            PlaceBoundary(code: row.code, name: row.name, countryCode: row.country, rings: row.rings.map(Polyline.decode))
        }
        return PlaceAtlas(countries: file.countries.map(boundary), regions: file.regions.map(boundary))
    }

    /// The country's name in the user's language, falling back to the dataset's English.
    static func countryName(_ code: String, atlas: PlaceAtlas = Places.atlas) -> String {
        if code.count == 2, let name = Locale.current.localizedString(forRegionCode: code) { return name }
        return atlas.country(code)?.name ?? code
    }

    /// The flag emoji for an ISO alpha-2 code; nil for the few units without one.
    static func flag(_ code: String) -> String? {
        guard code.count == 2, code.allSatisfy({ $0.isASCII && $0.isLetter }) else { return nil }
        let scalars = code.uppercased().unicodeScalars.compactMap { UnicodeScalar(127_397 + $0.value) }
        return String(String.UnicodeScalarView(scalars))
    }

    /// What a country's regions are called: "States", "Provinces & Territories".
    static func regionNoun(country: String) -> String {
        switch country {
        case "US": return "States"
        case "CA": return "Provinces & Territories"
        default: return "States & Territories"
        }
    }
}

/// Matching a trip against every boundary is the slow part, and a trip's
/// place rarely changes, so each answer is kept per trip, location and route.
final class PlacesCache: @unchecked Sendable {
    static let shared = PlacesCache()

    private let lock = NSLock()
    private var answers: [String: Set<PlaceHit>] = [:]

    func places(visitedBy trip: Trip, atlas: PlaceAtlas) -> Set<PlaceHit> {
        let location = trip.location.map { "\($0.latitude),\($0.longitude)" } ?? "-"
        let key = "\(trip.id)|\(location)|\((trip.log?.route ?? "").hashValue)"
        lock.lock()
        let known = answers[key]
        lock.unlock()
        if let known { return known }
        let hits = atlas.places(visitedBy: trip)
        lock.lock()
        answers[key] = hits
        lock.unlock()
        return hits
    }
}
