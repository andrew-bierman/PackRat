import Foundation

/// Gear in the user's packs that hasn't come along on a finished trip in the
/// last twelve months: what's sitting in the closet. Pure, like `TripStats`.
///
/// PackRat keeps no history of what was in a pack on a given day, so "on a
/// trip" means "in the pack linked to that trip, as the pack is now". With
/// that caveat, an item counts as idle when it has been around for a year —
/// added more than twelve months ago, or on a trip before the window — and
/// no trip inside the window carried it. Consumables (food, fuel) aren't gear
/// and are left out. Nothing is judged until at least one finished trip has
/// a pack linked, since without one there's no record of what comes along.
struct IdleGear: Sendable {

    struct Item: Identifiable, Equatable, Sendable {
        /// Same key as `TripStats.topGear`: catalog id, else the trimmed name.
        let id: String
        let name: String
        let category: String?
        /// Weight of one, in grams.
        let grams: Double
        /// Every pack holding it, by name.
        let packNames: [String]
        /// The pack to open from the list.
        let packId: String
        /// The most recent finished trip that carried it; nil if none ever did.
        let lastTrip: LastTrip?
    }

    struct LastTrip: Equatable, Sendable {
        let id: String
        let name: String
        let date: Date
    }

    /// Never-taken first, then the longest idle.
    let items: [Item]
    /// False when no finished trip has a pack linked: nothing to judge by.
    let isJudgeable: Bool
    /// The start of the twelve-month window.
    let since: Date

    var isEmpty: Bool { items.isEmpty }
    var neverTaken: [Item] { items.filter { $0.lastTrip == nil } }
    var takenBefore: [Item] { items.filter { $0.lastTrip != nil } }
    var totalGrams: Double { items.reduce(0) { $0 + $1.grams } }

    init(finished: [TripStats.FinishedTrip], packs: [Pack], now: Date = .now, calendar: Calendar = .current) {
        let today = calendar.startOfDay(for: now)
        let since = calendar.date(byAdding: .month, value: -12, to: today) ?? today
        self.since = since

        let active = packs.activePacks
        let packsById = Dictionary(active.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })

        // The latest finished trip each item went on, and whether any did inside the window.
        var lastTrip: [String: LastTrip] = [:]
        var linkedTrips = 0
        for trip in finished {
            guard let packId = trip.trip.packId, let pack = packsById[packId] else { continue }
            linkedTrips += 1
            // A trip "carries" its pack until it ends, so a trip ending inside the window counts.
            let carried = LastTrip(id: trip.id, name: trip.trip.name, date: trip.end)
            for item in pack.activeItems where !item.consumable {
                let key = TripStats.gearKey(item)
                if (lastTrip[key]?.date ?? .distantPast) < carried.date { lastTrip[key] = carried }
            }
        }
        isJudgeable = linkedTrips > 0
        guard isJudgeable else {
            items = []
            return
        }

        var inventory: [String: (item: PackItem, packId: String, packNames: [String])] = [:]
        for pack in active {
            for item in pack.activeItems where !item.consumable {
                let key = TripStats.gearKey(item)
                if var known = inventory[key] {
                    if !known.packNames.contains(pack.name) { known.packNames.append(pack.name) }
                    inventory[key] = known
                } else {
                    inventory[key] = (item, pack.id, [pack.name])
                }
            }
        }

        items = inventory.compactMap { key, entry -> Item? in
            let last = lastTrip[key]
            if let last, last.date >= since { return nil }
            // Hasn't had a year to come along yet: added inside the window and never on a trip.
            if last == nil, let added = entry.item.createdAt?.toDate(), added > since { return nil }
            return Item(
                id: key,
                name: entry.item.name,
                category: entry.item.category,
                grams: entry.item.weightInGrams,
                packNames: entry.packNames,
                packId: entry.packId,
                lastTrip: last
            )
        }
        .sorted { a, b in
            switch (a.lastTrip, b.lastTrip) {
            case (nil, nil): return a.name.localizedCaseInsensitiveCompare(b.name) == .orderedAscending
            case (nil, _): return true
            case (_, nil): return false
            case let (x?, y?): return (x.date, a.name) < (y.date, b.name)
            }
        }
    }
}
