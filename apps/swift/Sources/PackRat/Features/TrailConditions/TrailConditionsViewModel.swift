import Foundation
import Observation

@Observable
@MainActor
final class TrailConditionsViewModel {
    var reports: [TrailConditionReport] = []
    var isLoading = false
    var error: String?
    var searchText = ""
    /// Who wrote each feed report, by report id. Absent for the hiker's own
    /// unsent reports.
    var authorNames: [String: String] = [:]

    private let service: TrailConditionsService

    init(service: TrailConditionsService = .shared) {
        self.service = service
    }

    func load() async {
        if VisualSampleData.isEnabled && !reports.isEmpty {
            isLoading = false
            error = nil
            return
        }
        if VisualSampleData.isScreenshotCapture {
            isLoading = false
            error = nil
            reports = []
            return
        }

        isLoading = true
        error = nil
        defer { isLoading = false }
        do {
            let feed = try await service.listReports()
            reports = feed.map(\.report)
            authorNames = Dictionary(
                feed.compactMap { item in item.authorName.map { (item.id, $0) } },
                uniquingKeysWith: { first, _ in first }
            )
        } catch {
            self.error = error.localizedDescription
        }
    }

    /// Submits a report about `place`. `writtenAt` is where the device was when
    /// the hiker wrote it; for a pin, the pin itself is the place.
    func submitReport(
        place: ReportPlace,
        writtenAt: (latitude: Double, longitude: Double)?,
        surface: String?,
        overallCondition: String,
        hazards: [String],
        notes: String?,
        photos: [String] = [],
        tripId: String? = nil
    ) async throws {
        let coordinate: (latitude: Double, longitude: Double)? = switch place {
        case .trail: writtenAt
        case .pin(_, let latitude, let longitude): (latitude, longitude)
        }
        let report: TrailConditionReport
        do {
            report = try await service.createReport(
                trailId: place.trailId,
                trailName: place.displayName,
                trailRegion: nil,
                latitude: coordinate?.latitude,
                longitude: coordinate?.longitude,
                surface: surface,
                overallCondition: overallCondition,
                hazards: hazards,
                notes: notes,
                photos: photos,
                tripId: tripId
            )
        } catch {
            report = makeLocalReport(
                place: place,
                coordinate: coordinate,
                surface: surface,
                overallCondition: overallCondition,
                hazards: hazards,
                notes: notes,
                photos: photos
            )
        }
        searchText = ""
        reports.removeAll { $0.id == report.id }
        reports.insert(report, at: 0)
    }

    func deleteReport(_ id: String) async throws {
        if id.hasPrefix("local-") {
            reports.removeAll { $0.id == id }
            return
        }
        try await service.deleteReport(id)
        reports.removeAll { $0.id == id }
    }

    private func makeLocalReport(
        place: ReportPlace,
        coordinate: (latitude: Double, longitude: Double)?,
        surface: String?,
        overallCondition: String,
        hazards: [String],
        notes: String?,
        photos: [String]
    ) -> TrailConditionReport {
        let now = Date.iso8601Now()
        return TrailConditionReport(
            id: "local-\(UUID().uuidString.lowercased())",
            trailId: place.trailId,
            trailName: place.displayName,
            trailRegion: nil,
            latitude: coordinate?.latitude,
            longitude: coordinate?.longitude,
            surface: surface ?? "unknown",
            overallCondition: overallCondition,
            hazards: hazards,
            waterCrossings: 0,
            waterCrossingDifficulty: nil,
            notes: notes,
            photos: photos,
            userId: nil,
            tripId: nil,
            deleted: false,
            createdAt: now,
            updatedAt: now
        )
    }
}
