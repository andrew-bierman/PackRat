import Foundation

// MARK: - TrailConditionReport extensions (struct defined in Generated.swift)

extension TrailConditionReport {
    var conditionColor: String {
        switch overallCondition {
        case "excellent": return "green"
        case "good":      return "blue"
        case "fair":      return "orange"
        case "poor":      return "red"
        default:          return "secondary"
        }
    }

    var conditionSymbol: String {
        switch overallCondition {
        case "excellent": return "checkmark.circle.fill"
        case "good":      return "checkmark.circle"
        case "fair":      return "exclamationmark.circle"
        case "poor":      return "xmark.circle.fill"
        default:          return "questionmark.circle"
        }
    }

    var timeAgo: String { createdAt?.timeAgo ?? "" }

    /// A report on a dropped pin rather than a picked trail.
    var isPinned: Bool { trailId == nil && latitude != nil }

    /// Builds a report with no trail reference or place, the shape reports had
    /// before #1817. Keeps local placeholders and fixtures short.
    init(
        id: String,
        trailName: String,
        trailRegion: String?,
        surface: String,
        overallCondition: String,
        hazards: [String],
        waterCrossings: Int,
        waterCrossingDifficulty: String?,
        notes: String?,
        photos: [String],
        userId: String?,
        tripId: String?,
        deleted: Bool,
        createdAt: String?,
        updatedAt: String?
    ) {
        self.init(
            id: id, trailId: nil, trailName: trailName, trailRegion: trailRegion,
            latitude: nil, longitude: nil, surface: surface,
            overallCondition: overallCondition, hazards: hazards,
            waterCrossings: waterCrossings, waterCrossingDifficulty: waterCrossingDifficulty,
            notes: notes, photos: photos, userId: userId, tripId: tripId,
            deleted: deleted, createdAt: createdAt, updatedAt: updatedAt
        )
    }
}

// MARK: - Trails

/// A trail from PackRat's trail table, as the picker lists it.
struct TrailSummary: Codable, Identifiable, Hashable, Sendable {
    struct Center: Codable, Hashable, Sendable {
        let latitude: Double
        let longitude: Double
    }

    let id: String
    let name: String
    let lengthM: Int
    let center: Center
    /// Distance from the point the search was made around, when there was one.
    let distanceM: Int?

    var lengthText: String {
        Measurement(value: Double(lengthM), unit: UnitLength.meters)
            .formatted(.measurement(width: .abbreviated, usage: .road))
    }

    var distanceText: String? {
        distanceM.map {
            Measurement(value: Double($0), unit: UnitLength.meters)
                .formatted(.measurement(width: .abbreviated, usage: .road))
        }
    }
}

struct TrailSearchResponse: Decodable, Sendable {
    let trails: [TrailSummary]
}

/// What a report is about: a trail picked from PackRat's trails, or a pin the
/// hiker dropped where no trail is mapped.
enum ReportPlace: Hashable, Sendable {
    case trail(TrailSummary)
    case pin(label: String, latitude: Double, longitude: Double)

    var displayName: String {
        switch self {
        case .trail(let trail): trail.name
        case .pin(let label, _, _): label
        }
    }

    var trailId: String? {
        if case .trail(let trail) = self { return trail.id }
        return nil
    }
}

// MARK: - UI Enums (display logic, not API-facing)

enum TrailSurface: String, CaseIterable {
    case paved, gravel, dirt, rocky, snow, mud
    var label: String { rawValue.capitalized }
    var symbol: String {
        switch self {
        case .paved:  "road.lanes"
        case .gravel: "road.lanes.curved.right"
        case .dirt:   "leaf"
        case .rocky:  "mountain.2"
        case .snow:   "snowflake"
        case .mud:    "drop"
        }
    }
}

enum TrailConditionLevel: String, CaseIterable {
    case excellent, good, fair, poor
    var label: String { rawValue.capitalized }
}

// MARK: - Request Body

struct CreateTrailConditionRequest: Encodable {
    let id: String
    let trailId: String?
    let trailName: String
    let trailRegion: String?
    let latitude: Double?
    let longitude: Double?
    let surface: String?
    let overallCondition: String
    let hazards: [String]?
    let notes: String?
    let localCreatedAt: String
    let localUpdatedAt: String
}
