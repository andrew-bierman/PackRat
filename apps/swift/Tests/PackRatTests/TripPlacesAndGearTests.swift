import CoreLocation
import Foundation
import Testing
@testable import PackRat

/// Covers #1859 slice "places + gear": countries and states visited (bundled
/// boundaries, point-in-polygon on trip location and route) and gear not
/// packed in a year.
@Suite("Trip places and idle gear")
struct TripPlacesAndGearTests {

    private var calendar: Calendar {
        var c = Calendar(identifier: .gregorian)
        c.timeZone = TimeZone(identifier: "UTC")!
        return c
    }

    private func day(_ y: Int, _ m: Int, _ d: Int) -> Date {
        calendar.date(from: DateComponents(year: y, month: m, day: d, hour: 12))!
    }

    private var now: Date { day(2026, 10, 5) }

    private func square(_ lat: Double, _ lon: Double, size: Double = 1) -> [CLLocationCoordinate2D] {
        [(lat, lon), (lat, lon + size), (lat + size, lon + size), (lat + size, lon), (lat, lon)]
            .map { CLLocationCoordinate2D(latitude: $0.0, longitude: $0.1) }
    }

    /// "AA" is listed by state (two side-by-side 1° squares, no outline of its
    /// own); "BB" is a plain country to the north.
    private var atlas: PlaceAtlas {
        PlaceAtlas(
            countries: [
                PlaceBoundary(code: "AA", name: "Alpha", rings: []),
                PlaceBoundary(code: "BB", name: "Bravo", rings: [square(12, 10)]),
            ],
            regions: [
                PlaceBoundary(code: "AA-W", name: "West", countryCode: "AA", rings: [square(10, 10)]),
                PlaceBoundary(code: "AA-E", name: "East", countryCode: "AA", rings: [square(10, 11)]),
            ]
        )
    }

    private func trip(
        _ id: String, _ start: Date, _ end: Date? = nil, at point: (Double, Double)? = nil,
        route: [(Double, Double)] = [], packId: String? = nil
    ) -> Trip {
        Trip(
            id: id, name: "Trip \(id)", description: nil, notes: nil,
            location: point.map { TripLocation(latitude: $0.0, longitude: $0.1, name: nil) },
            startDate: start.iso8601String(), endDate: (end ?? start).iso8601String(),
            userId: nil, packId: packId, deleted: false, createdAt: nil, updatedAt: nil,
            log: route.isEmpty ? nil : TripLog(
                activities: [.hiking], distanceMeters: nil, elevationGainMeters: nil,
                route: Polyline.encode(route.map { CLLocationCoordinate2D(latitude: $0.0, longitude: $0.1) }),
                source: .track
            )
        )
    }

    private func stats(_ trips: [Trip], packs: [Pack] = [], scope: TripStats.Scope = .all) -> TripStats {
        TripStats(trips: trips, packs: packs, scope: scope, now: now, calendar: calendar)
    }

    private func places(_ trips: [Trip], scope: TripStats.Scope = .all) -> TripPlaces {
        let s = stats(trips, scope: scope)
        return TripPlaces(finished: s.finished, lifetime: s.allFinished, atlas: atlas, cache: nil)
    }

    // MARK: - Lookup

    @Test("A point lands in its state and that state's country; a plain country has no state")
    func locate() {
        let atlas = atlas
        #expect(atlas.locate(CLLocationCoordinate2D(latitude: 10.5, longitude: 10.5)) == PlaceHit(country: "AA", region: "AA-W"))
        #expect(atlas.locate(CLLocationCoordinate2D(latitude: 10.5, longitude: 11.5)) == PlaceHit(country: "AA", region: "AA-E"))
        #expect(atlas.locate(CLLocationCoordinate2D(latitude: 12.5, longitude: 10.5)) == PlaceHit(country: "BB", region: nil))
    }

    @Test("Just off a coast still counts; open sea doesn't")
    func coastalSlack() {
        let atlas = atlas
        // ~2 km west of AA-W's edge.
        #expect(atlas.locate(CLLocationCoordinate2D(latitude: 10.5, longitude: 9.98)) == PlaceHit(country: "AA", region: "AA-W"))
        // ~55 km out.
        #expect(atlas.locate(CLLocationCoordinate2D(latitude: 10.5, longitude: 9.5)) == nil)
    }

    @Test("Decoding reads encoded rings and the country of each region")
    func decode() throws {
        let ring = Polyline.encode(square(0, 0))
        let json = #"{"countries":[{"code":"ZZ","name":"Zed","rings":["\#(ring)"]}],"regions":[{"code":"ZZ-1","country":"ZZ","name":"One","rings":["\#(ring)"]}]}"#
        let atlas = Places.decode(Data(json.utf8))
        let country = try #require(atlas.country("ZZ"))
        #expect(country.rings.first?.count == 5)
        #expect(atlas.region("ZZ-1")?.countryCode == "ZZ")
        #expect(Places.decode(Data("nope".utf8)).countries.isEmpty)
    }

    @Test("Flags come from ISO codes; units without one get none")
    func flags() {
        #expect(Places.flag("US") == "🇺🇸")
        #expect(Places.flag("CL") == "🇨🇱")
        #expect(Places.flag("SOL") == nil)
    }

    @Test("The bundled boundaries put real trips in the right country and state")
    func bundled() {
        let atlas = Places.atlas
        func at(_ lat: Double, _ lon: Double) -> PlaceHit? { atlas.locate(CLLocationCoordinate2D(latitude: lat, longitude: lon)) }
        #expect(atlas.countries.count > 230)
        #expect(atlas.regions(in: "US").count == 51)
        #expect(atlas.regions(in: "CA").count == 13)
        #expect(at(46.786, -121.735) == PlaceHit(country: "US", region: "US-WA"))   // Paradise, Rainier
        #expect(at(47.907, -124.636) == PlaceHit(country: "US", region: "US-WA"))   // La Push, on the beach
        #expect(at(51.178, -115.571) == PlaceHit(country: "CA", region: "CA-AB"))   // Banff
        #expect(at(-33.865, 151.209) == PlaceHit(country: "AU", region: "AU-NSW"))  // Sydney
        #expect(at(-50.942, -73.406) == PlaceHit(country: "CL", region: nil))       // Torres del Paine
        #expect(at(48.857, 2.352) == PlaceHit(country: "FR", region: nil))          // Paris
        #expect(at(40.0, -40.0) == nil)                                             // mid-Atlantic
        // Lake Tahoe's east shore is Nevada, the west shore California.
        #expect(at(39.10, -119.93)?.region == "US-NV")
        #expect(at(39.10, -120.15)?.region == "US-CA")
    }

    // MARK: - Aggregation

    @Test("A route crossing a border counts in both states, and in the country once")
    func routeCrossesBorder() throws {
        let result = places([
            trip("cross", day(2026, 5, 1), at: (10.5, 10.5), route: [(10.5, 10.5), (10.5, 11.5)]),
            trip("north", day(2026, 6, 1), at: (12.5, 10.5)),
            trip("nowhere", day(2026, 7, 1), at: (40, 40)),
        ])
        #expect(result.countries.map(\.code) == ["AA", "BB"])
        let alpha = try #require(result.countries.first)
        #expect(alpha.trips == 1)
        #expect(Set(alpha.regions.map(\.code)) == ["AA-W", "AA-E"])
        #expect(result.regionCount == 2)
        #expect(result.countries.last?.regions.isEmpty == true)
    }

    @Test("Busiest country first; ties go to the one visited first")
    func ordering() {
        let result = places([
            trip("b1", day(2025, 1, 1), at: (12.5, 10.5)),
            trip("a1", day(2025, 6, 1), at: (10.5, 10.5)),
            trip("a2", day(2026, 2, 1), at: (10.5, 10.5)),
            trip("b2", day(2026, 3, 1), at: (12.5, 10.5)),
        ])
        #expect(result.countries.map(\.code) == ["BB", "AA"])
        #expect(result.countries.first?.visits.map(\.tripId) == ["b2", "b1"])
    }

    @Test("A year filter narrows the visits; first visits and 'new' come from the whole record")
    func scopedFirstVisits() throws {
        let trips = [
            trip("old", day(2025, 4, 1), at: (10.5, 10.5)),
            trip("again", day(2026, 4, 1), at: (10.5, 10.5)),
            trip("fresh", day(2026, 5, 1), at: (12.5, 10.5)),
        ]
        let result = places(trips, scope: TripStats.Scope(year: 2026))
        let alpha = try #require(result.countries.first { $0.code == "AA" })
        #expect(alpha.trips == 1)
        #expect(alpha.firstVisit == calendar.startOfDay(for: day(2025, 4, 1)))
        let start = day(2026, 1, 1), end = day(2026, 12, 31)
        #expect(result.newCountries(from: start, to: end).map(\.code) == ["BB"])
        #expect(result.newRegions(from: start, to: end).isEmpty)
    }

    @Test("Excluded trips and trips without a place count nowhere")
    func excludedAndPlaceless() {
        var excluded = trip("excluded", day(2026, 4, 1), at: (10.5, 10.5))
        excluded.excludedFromStats = true
        let result = places([excluded, trip("placeless", day(2026, 4, 2))])
        #expect(result.isEmpty)
    }

    @Test("Region labels follow the countries visited")
    func regionLabel() {
        // One country listed by state names its own kind; AA isn't US or Canada.
        #expect(places([trip("a", day(2026, 4, 1), at: (10.5, 10.5))]).regionLabel == "States & Territories")
        #expect(Places.regionNoun(country: "US") == "States")
        #expect(Places.regionNoun(country: "CA") == "Provinces & Territories")
    }

    // MARK: - Idle gear

    private func item(
        _ name: String, grams: Double = 100, consumable: Bool = false, added: Date? = nil
    ) -> PackItem {
        PackItem(
            id: UUID().uuidString, packId: nil, name: name, description: nil, weight: grams, weightUnit: .g,
            quantity: 1, category: nil, consumable: consumable, worn: false, image: nil, notes: nil,
            catalogItemId: nil, userId: nil, deleted: false, isAIGenerated: nil,
            templateItemId: nil, createdAt: added?.iso8601String(), updatedAt: nil
        )
    }

    private func pack(_ id: String, _ items: [PackItem]) -> Pack {
        Pack(
            id: id, userId: nil, name: "Pack \(id)", description: nil, category: nil, isPublic: false,
            image: nil, tags: nil, templateId: nil, deleted: false, isAIGenerated: nil, items: items,
            totalWeight: nil, baseWeight: nil, wornWeight: nil, consumableWeight: nil,
            createdAt: nil, updatedAt: nil
        )
    }

    private func idle(_ trips: [Trip], _ packs: [Pack]) -> IdleGear {
        IdleGear(finished: stats(trips, packs: packs).allFinished, packs: packs, now: now, calendar: calendar)
    }

    @Test("No trip with a linked pack means nothing to judge")
    func notJudgeable() {
        let gear = idle([trip("t", day(2026, 9, 1))], [pack("p", [item("Tent", added: day(2020, 1, 1))])])
        #expect(!gear.isJudgeable)
        #expect(gear.isEmpty)
    }

    @Test("Gear on a recent trip is out; gear last out over a year ago is in, with that trip")
    func recentVersusOld() throws {
        let packs = [
            pack("summer", [item("Tent"), item("Stove")]),
            pack("winter", [item("Snowshoes", grams: 1_800), item("Stove")]),
        ]
        let gear = idle([
            trip("recent", day(2026, 8, 1), day(2026, 8, 3), packId: "summer"),
            trip("old", day(2025, 2, 1), day(2025, 2, 3), packId: "winter"),
        ], packs)
        #expect(gear.isJudgeable)
        #expect(gear.items.map(\.name) == ["Snowshoes"])
        let snowshoes = try #require(gear.items.first)
        #expect(snowshoes.lastTrip?.id == "old")
        #expect(snowshoes.packId == "winter")
        #expect(gear.totalGrams == 1_800)
    }

    @Test("A trip that ended inside the window still counts as recent")
    func endDateCounts() {
        let gear = idle(
            [trip("straddle", day(2025, 9, 28), day(2025, 10, 10), packId: "p")],
            [pack("p", [item("Quilt")])]
        )
        #expect(gear.isEmpty)
    }

    @Test("Never-taken gear shows once it's been around a year; newer gear and consumables don't")
    func neverTaken() {
        let packs = [
            pack("used", [item("Headlamp")]),
            pack("closet", [
                item("Packraft", added: day(2024, 5, 1)),
                item("Bivy", added: nil),
                item("New Poles", added: day(2026, 6, 1)),
                item("Dehydrated Chili", consumable: true, added: day(2024, 1, 1)),
            ]),
        ]
        let gear = idle([trip("t", day(2026, 9, 1), packId: "used")], packs)
        #expect(gear.neverTaken.map(\.name) == ["Bivy", "Packraft"])
        #expect(gear.takenBefore.isEmpty)
    }

    @Test("The same item in two packs is one row naming both; never-taken sorts before long-idle")
    func dedupeAndOrder() throws {
        let packs = [
            pack("a", [item("Ice Axe"), item("Crampons")]),
            pack("b", [item("ice axe "), item("Spare Tarp", added: day(2023, 1, 1))]),
        ]
        let gear = idle([
            trip("t1", day(2024, 3, 1), packId: "a"),
            trip("t2", day(2024, 12, 1), packId: "a"),
        ], packs)
        #expect(gear.items.map(\.name) == ["Spare Tarp", "Crampons", "Ice Axe"])
        let axe = try #require(gear.items.first { $0.name == "Ice Axe" })
        #expect(axe.packNames == ["Pack a", "Pack b"])
        #expect(axe.lastTrip?.id == "t2")
    }
}
