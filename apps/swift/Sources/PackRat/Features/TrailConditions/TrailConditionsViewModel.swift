import Foundation
import Observation

@Observable
@MainActor
final class TrailConditionsViewModel {
    var reports: [TrailConditionReport] = []
    var isLoading = false
    var error: String?
    var searchText = ""

    private let service: TrailConditionsService

    init(service: TrailConditionsService = .shared) {
        self.service = service
    }

    var filteredReports: [TrailConditionReport] {
        guard !searchText.isEmpty else { return reports }
        return reports.filter {
            $0.trailName.localizedCaseInsensitiveContains(searchText)
            || ($0.trailRegion?.localizedCaseInsensitiveContains(searchText) ?? false)
            || ($0.notes?.localizedCaseInsensitiveContains(searchText) ?? false)
        }
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
            reports = try await service.listReports()
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
        notes: String?
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
                notes: notes
            )
        } catch {
            report = makeLocalReport(
                place: place,
                coordinate: coordinate,
                surface: surface,
                overallCondition: overallCondition,
                hazards: hazards,
                notes: notes
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
        notes: String?
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
            photos: [],
            userId: nil,
            tripId: nil,
            deleted: false,
            createdAt: now,
            updatedAt: now
        )
    }
}
