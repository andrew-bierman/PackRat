import Foundation
import Observation
import SwiftUI

enum TrailReportFlagReason: String, CaseIterable, Identifiable, Codable, Sendable {
    case inaccurate
    case offensive
    case spam

    var id: String { rawValue }

    var label: String {
        switch self {
        case .inaccurate: "Wrong or Misleading"
        case .offensive: "Offensive"
        case .spam: "Spam"
        }
    }

    var systemImage: String {
        switch self {
        case .inaccurate: "exclamationmark.triangle"
        case .offensive: "hand.raised"
        case .spam: "xmark.bin"
        }
    }
}

/// Reports the hiker flagged and hikers they blocked this session. The server
/// stops sending both on the next load; this hides them everywhere straight
/// away, without waiting for a refetch.
@Observable
@MainActor
final class TrailReportModeration {
    static let shared = TrailReportModeration()

    private(set) var flaggedReportIds: Set<String> = []
    private(set) var blockedAuthorIds: Set<String> = []

    private let service: TrailConditionsService

    init(service: TrailConditionsService = .shared) {
        self.service = service
    }

    func hides(_ report: TrailConditionReport) -> Bool {
        flaggedReportIds.contains(report.id) || report.userId.map(blockedAuthorIds.contains) == true
    }

    func flag(_ report: TrailConditionReport, reason: TrailReportFlagReason) async throws {
        try await service.flagReport(report.id, reason: reason)
        flaggedReportIds.insert(report.id)
    }

    func block(authorOf report: TrailConditionReport) async throws {
        guard let userId = report.userId else { return }
        try await service.blockAuthor(userId: userId)
        blockedAuthorIds.insert(userId)
    }
}

private struct TrailReportAlert: Identifiable {
    let id = UUID()
    let title: String
    let message: String
}

/// A report's overflow menu: delete for your own, flag or block for anyone
/// else's. `onHidden` runs once a flag or block hides the report, so the
/// screen showing it can close.
struct TrailReportActionsMenu: View {
    let report: TrailConditionReport
    let authorName: String?
    var onDelete: (() -> Void)?
    var onHidden: (() -> Void)?

    @Environment(AuthManager.self) private var authManager
    @State private var moderation = TrailReportModeration.shared
    @State private var confirmingBlock = false
    @State private var confirmingDelete = false
    @State private var alert: TrailReportAlert?

    private var isMine: Bool {
        report.id.hasPrefix("local-") || report.userId == authManager.currentUser?.id
    }

    private var hikerName: String { authorName ?? "This Hiker" }

    var body: some View {
        Menu {
            if isMine {
                if onDelete != nil {
                    Button("Delete Report", systemImage: "trash", role: .destructive) { confirmingDelete = true }
                        .accessibilityIdentifier("trail_report_delete")
                }
            } else {
                Menu {
                    ForEach(TrailReportFlagReason.allCases) { reason in
                        Button(reason.label, systemImage: reason.systemImage) {
                            Task { await flag(reason) }
                        }
                        .accessibilityIdentifier("trail_report_flag_reason_\(reason.rawValue)")
                    }
                } label: {
                    Label("Flag Report", systemImage: "flag")
                }
                .accessibilityIdentifier("trail_report_flag")
                if report.userId != nil {
                    Button("Block \(authorName ?? "Hiker")", systemImage: "hand.raised", role: .destructive) {
                        confirmingBlock = true
                    }
                    .accessibilityIdentifier("trail_report_block")
                }
            }
        } label: {
            Label("More", systemImage: "ellipsis.circle")
        }
        .accessibilityIdentifier("trail_report_more")
        .confirmationDialog("Block \(hikerName)?", isPresented: $confirmingBlock, titleVisibility: .visible) {
            Button("Block", role: .destructive) { Task { await block() } }
                .accessibilityIdentifier("trail_report_confirm_block")
        } message: {
            Text("You won't see each other's trail reports, posts or comments.")
        }
        .confirmationDialog("Delete this report?", isPresented: $confirmingDelete, titleVisibility: .visible) {
            Button("Delete Report", role: .destructive) { onDelete?() }
                .accessibilityIdentifier("trail_report_confirm_delete")
        } message: {
            Text("Other hikers will no longer see it. This can't be undone.")
        }
        .alert(item: $alert) { alert in
            Alert(title: Text(alert.title), message: Text(alert.message), dismissButton: .default(Text("OK")) {
                if moderation.hides(report) { onHidden?() }
            })
        }
    }

    private func flag(_ reason: TrailReportFlagReason) async {
        do {
            try await moderation.flag(report, reason: reason)
            alert = TrailReportAlert(
                title: "Thanks for Letting Us Know",
                message: "This report is hidden for you now, and the PackRat team will review it."
            )
        } catch {
            alert = TrailReportAlert(title: "Couldn't Flag Report", message: error.localizedDescription)
        }
    }

    private func block() async {
        do {
            try await moderation.block(authorOf: report)
            alert = TrailReportAlert(
                title: "\(hikerName) Is Blocked",
                message: FeatureFlagStore.shared.isEnabled("enableFeed")
                    ? "You won't see their trail reports anymore. You can unblock them in Settings, under Feed & Sharing."
                    : "You won't see their trail reports anymore."
            )
        } catch {
            alert = TrailReportAlert(title: "Couldn't Block \(hikerName)", message: error.localizedDescription)
        }
    }
}
