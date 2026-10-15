import Foundation

/// Countries, and states and provinces, a user's finished trips reached.
/// Pure, like `TripStats`.
///
/// A trip counts in every country and region its location or route passes
/// through, once each however long it stayed. Visits come from the trips in
/// scope (so the year and activity filters narrow them); the first-visit date
/// comes from the whole record, so "new" means new to the user, not new to
/// the filter.
struct TripPlaces: Sendable {

    struct Visit: Identifiable, Sendable {
        let tripId: String
        let tripName: String
        let date: Date

        var id: String { tripId }
    }

    struct RegionStatus: Identifiable, Sendable {
        let code: String
        let name: String
        /// Newest first.
        let visits: [Visit]
        /// Over the whole record, not just the scope.
        let firstVisit: Date

        var id: String { code }
        var trips: Int { visits.count }
    }

    struct CountryStatus: Identifiable, Sendable {
        let code: String
        let name: String
        let flag: String?
        /// Newest first.
        let visits: [Visit]
        /// Over the whole record, not just the scope.
        let firstVisit: Date
        /// Busiest first. Empty for a country without states in the dataset.
        let regions: [RegionStatus]

        var id: String { code }
        var trips: Int { visits.count }
    }

    /// Busiest first, then the earliest visited.
    let countries: [CountryStatus]

    var isEmpty: Bool { countries.isEmpty }
    var regionCount: Int { countries.reduce(0) { $0 + $1.regions.count } }

    /// "States", "Provinces & Territories", or "States & Provinces" when the
    /// visited regions span more than one country.
    var regionLabel: String {
        let withRegions = countries.filter { !$0.regions.isEmpty }.map(\.code)
        if withRegions.count == 1, let only = withRegions.first { return Places.regionNoun(country: only) }
        return "States & Provinces"
    }

    /// Countries whose first visit falls inside the window, both days counted.
    func newCountries(from start: Date, to end: Date) -> [CountryStatus] {
        countries.filter { $0.firstVisit >= start && $0.firstVisit <= end }
    }

    /// Regions whose first visit falls inside the window, both days counted.
    func newRegions(from start: Date, to end: Date) -> [RegionStatus] {
        countries.flatMap(\.regions).filter { $0.firstVisit >= start && $0.firstVisit <= end }
    }

    /// - Parameters:
    ///   - finished: the trips in scope.
    ///   - lifetime: every finished trip, for first-visit dates. Defaults to `finished`.
    ///   - cache: answers kept per trip; tests pass nil to use their own atlas cleanly.
    init(
        finished: [TripStats.FinishedTrip],
        lifetime: [TripStats.FinishedTrip]? = nil,
        atlas: PlaceAtlas = Places.atlas,
        cache: PlacesCache? = .shared
    ) {
        func hits(_ trip: TripStats.FinishedTrip) -> Set<PlaceHit> {
            cache?.places(visitedBy: trip.trip, atlas: atlas) ?? atlas.places(visitedBy: trip.trip)
        }

        var firstCountry: [String: Date] = [:]
        var firstRegion: [String: Date] = [:]
        for trip in lifetime ?? finished {
            for hit in hits(trip) {
                firstCountry[hit.country] = min(firstCountry[hit.country] ?? trip.start, trip.start)
                if let region = hit.region {
                    firstRegion[region] = min(firstRegion[region] ?? trip.start, trip.start)
                }
            }
        }

        var countryVisits: [String: [Visit]] = [:]
        var regionVisits: [String: [String: [Visit]]] = [:]
        for trip in finished {
            let visit = Visit(tripId: trip.id, tripName: trip.trip.name, date: trip.start)
            let tripHits = hits(trip)
            for country in Set(tripHits.map(\.country)) {
                countryVisits[country, default: []].append(visit)
            }
            for hit in tripHits {
                guard let region = hit.region else { continue }
                regionVisits[hit.country, default: [:]][region, default: []].append(visit)
            }
        }

        func newestFirst(_ visits: [Visit]) -> [Visit] {
            visits.sorted { ($0.date, $0.tripId) > ($1.date, $1.tripId) }
        }

        countries = countryVisits.map { code, visits in
            let regions = (regionVisits[code] ?? [:]).map { regionCode, visits in
                RegionStatus(
                    code: regionCode,
                    name: atlas.region(regionCode)?.name ?? regionCode,
                    visits: newestFirst(visits),
                    firstVisit: firstRegion[regionCode] ?? visits.map(\.date).min() ?? .distantPast
                )
            }
            .sorted { ($1.trips, $0.firstVisit, $0.name) < ($0.trips, $1.firstVisit, $1.name) }
            return CountryStatus(
                code: code,
                name: Places.countryName(code, atlas: atlas),
                flag: Places.flag(code),
                visits: newestFirst(visits),
                firstVisit: firstCountry[code] ?? visits.map(\.date).min() ?? .distantPast,
                regions: regions
            )
        }
        .sorted { ($1.trips, $0.firstVisit, $0.name) < ($0.trips, $1.firstVisit, $1.name) }
    }
}
