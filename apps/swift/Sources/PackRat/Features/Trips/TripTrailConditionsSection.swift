import SwiftUI

/// What hikers are finding on the trip's trail, or on trails near its
/// destination when the trip names none. Part of the trip, never an alert.
/// Shows nothing for a trip with no destination: there's no place to have
/// conditions about.
struct TripTrailConditionsSection: View {
    let trip: Trip

    @Environment(AppState.self) private var appState
    @Environment(AuthManager.self) private var authManager
    @State private var response: TripConditionsResponse?
    @State private var loadFailed = false
    @State private var showingSubmit = false

    private let service = TrailConditionsService.shared

    /// Reports past this age are still shown, dated, and marked as older.
    static let recentWindow: TimeInterval = 14 * 86_400

    private var hasPlace: Bool {
        trip.trailId != nil || trip.location.map { $0.latitude != 0 || $0.longitude != 0 } == true
    }

    /// Reloads when the trip's trail or destination changes.
    private var loadKey: String {
        "\(trip.id)|\(trip.trailId ?? "-")|\(trip.location?.latitude ?? 0),\(trip.location?.longitude ?? 0)"
    }

    var body: some View {
        if NavItem.trailConditions.isFeatureEnabled, authManager.isAuthenticated, hasPlace {
            VStack(alignment: .leading, spacing: 8) {
                header
                content
            }
            .padding(.horizontal)
            .task(id: loadKey) { await load() }
            .sheet(isPresented: $showingSubmit) {
                SubmitTrailConditionView(
                    viewModel: appState.trailConditionsVM,
                    tripId: trip.id,
                    trail: trip.trailId.map { TrailSummary(id: $0, name: trip.trailName ?? "Trail") },
                    onSubmitted: { Task { await load() } }
                )
            }
        }
    }

    private var header: some View {
        HStack(alignment: .firstTextBaseline) {
            VStack(alignment: .leading, spacing: 2) {
                Text("TRAIL CONDITIONS")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                if let subtitle {
                    Text(subtitle)
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                }
            }
            Spacer()
            if response?.reports.isEmpty == false {
                Button("Report", systemImage: "plus") { showingSubmit = true }
                    .font(.caption.weight(.semibold))
                    .buttonStyle(.borderless)
                    .accessibilityIdentifier("trip_trail_conditions_report")
            }
        }
    }

    private var subtitle: String? {
        if let name = trip.trailName, trip.trailId != nil { return name }
        if let place = trip.location?.name, !place.isEmpty { return "Trails near \(place)" }
        return nil
    }

    @ViewBuilder
    private var content: some View {
        if let response {
            if response.reports.isEmpty {
                emptyCard
            } else {
                VStack(spacing: 0) {
                    ForEach(Array(response.reports.enumerated()), id: \.element.id) { index, item in
                        if index > 0 { Divider().padding(.leading, 44) }
                        NavigationLink {
                            TrailConditionDetailView(report: item.report)
                        } label: {
                            TripConditionRow(item: item, showsTrail: response.scope == .nearby)
                        }
                        .buttonStyle(.plain)
                        .accessibilityIdentifier("trip_trail_condition_\(item.id)")
                    }
                }
                .padding(.vertical, 4)
                .background(.background.secondary, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
        } else if loadFailed {
            HStack {
                Text("Couldn't load trail conditions.")
                    .font(.callout)
                    .foregroundStyle(.secondary)
                Spacer()
                Button("Try Again") { Task { await load() } }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
            }
            .padding(14)
            .background(.background.secondary, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        } else {
            HStack(spacing: 10) {
                ProgressView()
                Text("Checking recent reports…").font(.callout).foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(14)
            .background(.background.secondary, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
    }

    private var emptyCard: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "figure.hiking")
                .font(.title3)
                .foregroundStyle(.tint)
                .frame(width: 32, height: 32)
                .background(.tint.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 6) {
                Text("No reports yet")
                    .font(.callout.weight(.semibold))
                Text(trip.trailId != nil
                     ? "Nobody has reported on this trail. Be the first once you're out there."
                     : "No reports from trails near here. Be the first once you're out there.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Button("Write a Report") { showingSubmit = true }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                    .padding(.top, 2)
                    .accessibilityIdentifier("trip_trail_conditions_first_report")
            }
            Spacer(minLength: 0)
        }
        .padding(14)
        .background(.background.secondary, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private func load() async {
        do {
            let fresh = try await service.tripConditions(tripId: trip.id)
            guard !Task.isCancelled else { return }
            response = fresh
            loadFailed = false
        } catch is CancellationError {
            return
        } catch {
            guard !Task.isCancelled else { return }
            // Keep what's on screen; only an empty section turns into an error.
            if response == nil { loadFailed = true }
        }
    }
}

private struct TripConditionRow: View {
    let item: TripConditionReport
    /// Nearby reports name their trail so the hiker can tell theirs from its neighbours.
    let showsTrail: Bool

    private var report: TrailConditionReport { item.report }

    private var isOlder: Bool {
        guard let created = report.createdAt?.toDate() else { return false }
        return Date().timeIntervalSince(created) > TripTrailConditionsSection.recentWindow
    }

    private var color: Color {
        switch report.overallCondition {
        case "excellent": .green
        case "good": .blue
        case "fair": .orange
        case "poor": .red
        default: .secondary
        }
    }

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: report.conditionSymbol)
                .font(.body.weight(.semibold))
                .foregroundStyle(color)
                .frame(width: 32, height: 32)
                .background(color.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 6) {
                    Text(report.overallCondition.capitalized)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(color)
                    if showsTrail {
                        Text(report.trailName)
                            .font(.callout)
                            .foregroundStyle(.primary)
                            .lineLimit(1)
                    }
                    if isOlder {
                        Text("Older")
                            .font(.caption2.weight(.semibold))
                            .foregroundStyle(.secondary)
                            .padding(.horizontal, 6).padding(.vertical, 2)
                            .background(.fill.tertiary, in: Capsule())
                    }
                }
                Text(byline)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                if let notes = report.notes, !notes.isEmpty {
                    Text(notes)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
            }
            Spacer(minLength: 0)
            Image(systemName: "chevron.right")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.tertiary)
                .padding(.top, 8)
                .accessibilityHidden(true)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .contentShape(Rectangle())
    }

    private var byline: String {
        var parts: [String] = []
        if let author = item.authorName { parts.append(author) }
        parts.append(report.timeAgo)
        if showsTrail, let d = item.distanceM {
            let away = Measurement(value: Double(d), unit: UnitLength.meters)
                .formatted(.measurement(width: .abbreviated, usage: .road))
            parts.append("\(away) away")
        }
        return parts.joined(separator: " · ")
    }
}
