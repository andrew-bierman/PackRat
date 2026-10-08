import Foundation

final class TrailConditionsService: Sendable {
    static let shared = TrailConditionsService()
    private let api: APIClient

    init(api: APIClient = .shared) { self.api = api }

    func listReports(page: Int = 1, limit: Int = 20) async throws -> [TrailConditionReport] {
        let endpoint = Endpoint(.get, "/api/trail-conditions", query: [
            "page": "\(page)",
            "limit": "\(limit)",
        ])
        return try await api.send(endpoint)
    }

    /// Trails for the picker: names matching `query`, nearest to `near` first
    /// when given. With no query, the trails around `near`.
    func searchTrails(query: String?, near: (latitude: Double, longitude: Double)?, limit: Int = 20) async throws -> [TrailSummary] {
        var params: [String: String?] = ["limit": "\(limit)"]
        if let query, !query.isEmpty { params["q"] = query }
        if let near {
            params["lat"] = "\(near.latitude)"
            params["lon"] = "\(near.longitude)"
        }
        let endpoint = Endpoint(.get, "/api/trail-conditions/trails", query: params)
        let response: TrailSearchResponse = try await api.send(endpoint)
        return response.trails
    }

    /// The conditions section of a trip: its trail's reports, or those of
    /// trails near its destination.
    func tripConditions(tripId: String) async throws -> TripConditionsResponse {
        try await api.send(Endpoint(.get, "/api/trail-conditions/trip/\(tripId)"))
    }

    func createReport(
        trailId: String?,
        trailName: String,
        trailRegion: String?,
        latitude: Double?,
        longitude: Double?,
        surface: String?,
        overallCondition: String,
        hazards: [String],
        notes: String?,
        tripId: String? = nil
    ) async throws -> TrailConditionReport {
        try await createReport(
            id: UUID().uuidString.lowercased(),
            trailId: trailId,
            trailName: trailName,
            trailRegion: trailRegion,
            latitude: latitude,
            longitude: longitude,
            surface: surface,
            overallCondition: overallCondition,
            hazards: hazards,
            notes: notes,
            tripId: tripId
        )
    }

    /// Creates a report under a caller-supplied id, for replaying a queued create whose
    /// id the device already recorded.
    func createReport(
        id: String,
        trailId: String?,
        trailName: String,
        trailRegion: String?,
        latitude: Double?,
        longitude: Double?,
        surface: String?,
        overallCondition: String,
        hazards: [String],
        notes: String?,
        tripId: String? = nil,
        writtenAt: Date? = nil
    ) async throws -> TrailConditionReport {
        let now = Date.iso8601Now()
        // A replayed report keeps the time it was written, not the time it sent.
        let written = writtenAt?.iso8601String() ?? now
        let body = CreateTrailConditionRequest(
            id: id,
            trailId: trailId,
            trailName: trailName,
            trailRegion: trailRegion,
            latitude: latitude,
            longitude: longitude,
            surface: surface,
            overallCondition: overallCondition,
            hazards: hazards.isEmpty ? nil : hazards,
            notes: notes,
            tripId: tripId,
            localCreatedAt: written,
            localUpdatedAt: written
        )
        let endpoint = Endpoint(.post, "/api/trail-conditions", body: body)
        return try await api.send(endpoint)
    }

    func deleteReport(_ id: String) async throws {
        let endpoint = Endpoint(.delete, "/api/trail-conditions/\(id)")
        try await api.sendDiscarding(endpoint)
    }
}
