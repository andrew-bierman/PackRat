import SwiftUI

// MARK: - List Column

struct TrailConditionsListView: View {
    @Bindable var viewModel: TrailConditionsViewModel
    @Binding var selectedId: String?
    var showsGuestLimitInList = true
    @Environment(AuthManager.self) private var authManager
    @State private var showingSubmitSheet = false
    #if os(iOS)
    /// Drafts captured on the paired watch, waiting for a trail name (#2721).
    @State private var draftStore = WatchTrailDraftStore.shared
    @State private var draftBeingCompleted: WatchTrailDraft?
    #endif
    #if os(iOS)
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    private var isCompact: Bool {
        horizontalSizeClass == .compact && UIDevice.current.userInterfaceIdiom == .phone
    }
    #else
    private var isCompact: Bool { false }
    #endif

    var body: some View {
        Group {
            if !authManager.isAuthenticated {
                if showsGuestLimitInList {
                    GuestLimitedView(
                        "Sign In for Trail Reports",
                        subtitle: "Read what other hikers found on the trail recently, and add your own. Your packs and trips stay on this device and keep working without an account.",
                        systemImage: "figure.hiking"
                    )
                } else {
                    Color.clear
                }
            } else if viewModel.isLoading && viewModel.reports.isEmpty {
                ProgressView("Loading reports…").frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if let error = viewModel.error, viewModel.reports.isEmpty {
                ErrorView(error, retry: { await viewModel.load() })
            } else if viewModel.reports.isEmpty && !hasWatchDrafts {
                EmptyStateView(
                    "No Trail Reports Yet",
                    subtitle: "Be the first to report conditions on a trail",
                    systemImage: "figure.hiking",
                    actionLabel: "Submit Report",
                    action: { showingSubmitSheet = true }
                )
            } else {
                reportList
            }
        }
        .navigationTitle("Trail Conditions")
        .searchable(text: $viewModel.searchText, prompt: "Search trails")
        .toolbar {
            if authManager.isAuthenticated {
                ToolbarItem(placement: .primaryAction) {
                    Button("Submit Report", systemImage: "plus") { showingSubmitSheet = true }
                        .accessibilityIdentifier("trail_conditions_submit_report_button")
                }
            }
        }
        .task { if authManager.isAuthenticated && viewModel.reports.isEmpty { await viewModel.load() } }
        .refreshable { if authManager.isAuthenticated { await viewModel.load() } }
        .sheet(isPresented: $showingSubmitSheet) {
            SubmitTrailConditionView(viewModel: viewModel)
        }
        #if os(iOS)
        // Opened by tapping a watch draft, never presented on arrival — a draft
        // syncing in must not hijack whatever the phone is already showing.
        .sheet(item: $draftBeingCompleted) { draft in
            SubmitTrailConditionView(
                viewModel: viewModel,
                draft: draft,
                onSubmitted: { draftStore.remove(draft.id) }
            )
        }
        #endif
    }

    @ViewBuilder
    private func reportRow(_ report: TrailConditionReport) -> some View {
        Group {
            if isCompact {
                NavigationLink {
                    TrailConditionDetailView(report: report)
                } label: {
                    TrailReportRow(report: report)
                }
            } else {
                TrailReportRow(report: report)
            }
        }
        .tag(report.id)
        .accessibilityIdentifier("trail_report_row_\(report.trailName)")
        .accessibilityLabel(report.trailName)
        .contextMenu {
            Button("Delete", systemImage: "trash", role: .destructive) {
                Task { try? await viewModel.deleteReport(report.id) }
            }
        }
    }

    /// Whether the paired watch has captures waiting. Always false off iOS,
    /// where there is no paired watch.
    private var hasWatchDrafts: Bool {
        #if os(iOS)
        draftStore.hasDrafts
        #else
        false
        #endif
    }

    private var reportList: some View {
        List(selection: $selectedId) {
            #if os(iOS)
            watchDraftsSection
            #endif
            ForEach(viewModel.filteredReports) { report in
                reportRow(report)
            }
        }
    }

    #if os(iOS)
    /// Watch captures sit above the reports, and outside the search filter —
    /// they carry no trail name to match on yet, so filtering them would make
    /// them vanish the moment someone typed in the search field.
    @ViewBuilder
    private var watchDraftsSection: some View {
        if draftStore.hasDrafts && viewModel.searchText.isEmpty {
            Section("From Apple Watch") {
                ForEach(draftStore.drafts) { draft in
                    Button {
                        draftBeingCompleted = draft
                    } label: {
                        WatchTrailDraftRow(draft: draft)
                    }
                    .buttonStyle(.plain)
                    .accessibilityIdentifier("watch_trail_draft_row_\(draft.id)")
                    .accessibilityHint("Choose the trail to finish this report")
                    .swipeActions(edge: .trailing) {
                        Button("Discard", systemImage: "trash", role: .destructive) {
                            draftStore.remove(draft.id)
                        }
                    }
                }
            }
        }
    }
    #endif
}

#if os(iOS)
/// A watch capture awaiting a trail name, shown above the submitted reports.
private struct WatchTrailDraftRow: View {
    let draft: WatchTrailDraft

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "applewatch")
                .font(.title3)
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                Text(TrailConditionLevel(rawValue: draft.condition)?.label ?? draft.condition.capitalized)
                    .font(.body.weight(.medium))
                if !draft.note.isEmpty {
                    Text(draft.note)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
                Text("Needs a trail")
                    .font(.caption2)
                    .foregroundStyle(.orange)
            }
            Spacer(minLength: 0)
            Text(draft.createdAt, format: .relative(presentation: .numeric))
                .font(.caption2)
                .foregroundStyle(.tertiary)
        }
        .contentShape(Rectangle())
    }
}
#endif

private struct TrailReportRow: View {
    let report: TrailConditionReport

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(report.trailName).font(.headline)
                    .accessibilityIdentifier("trail_report_title_\(report.trailName)")
                Spacer()
                conditionBadge
            }
            HStack(spacing: 8) {
                if let region = report.trailRegion {
                    HStack(spacing: 2) {
                        Image(systemName: "mappin")
                        Text(region)
                    }
                    .accessibilityElement(children: .combine)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                }
                Text(report.timeAgo).font(.caption).foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 2)
    }

    // An HStack, not a Label: inside a List row a Label takes the row's
    // icon-column spacing, which left a wide gap between icon and word.
    private var conditionBadge: some View {
        HStack(spacing: 4) {
            Image(systemName: report.conditionSymbol)
            Text(report.overallCondition.capitalized)
        }
        .accessibilityElement(children: .combine)
        .font(.caption.bold())
        .foregroundStyle(conditionColor)
        .padding(.horizontal, 8).padding(.vertical, 3)
        .background(conditionColor.opacity(0.12), in: Capsule())
    }

    private var conditionColor: Color {
        switch report.overallCondition {
        case "excellent": return .green
        case "good":      return .blue
        case "fair":      return .orange
        case "poor":      return .red
        default:          return .secondary
        }
    }
}

// MARK: - Detail View

struct TrailConditionDetailView: View {
    let report: TrailConditionReport

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Condition header
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        if let region = report.trailRegion {
                            Label(region, systemImage: "mappin")
                                .font(.callout).foregroundStyle(.secondary)
                        }
                        Text(report.timeAgo).font(.caption).foregroundStyle(.secondary)
                    }
                    Spacer()
                    conditionCard
                }
                .padding(.horizontal)

                if !report.surface.isEmpty {
                    labeledSection("Surface") {
                        Label(report.surface.capitalized, systemImage: TrailSurface(rawValue: report.surface)?.symbol ?? "road.lanes")
                            .font(.callout)
                    }
                }

                if report.waterCrossings > 0 {
                    labeledSection("Water Crossings") {
                        HStack {
                            Text("\(report.waterCrossings) crossing\(report.waterCrossings == 1 ? "" : "s")")
                            if let diff = report.waterCrossingDifficulty {
                                Text("· \(diff.capitalized)").foregroundStyle(.secondary)
                            }
                        }
                        .font(.callout)
                    }
                }

                if !report.hazards.isEmpty {
                    labeledSection("Hazards") {
                        FlowLayout(report.hazards) { hazard in
                            Text(hazard.capitalized)
                                .font(.caption)
                                .padding(.horizontal, 10).padding(.vertical, 4)
                                .background(.orange.opacity(0.12), in: Capsule())
                                .foregroundStyle(.orange)
                        }
                    }
                }

                if let notes = report.notes, !notes.isEmpty {
                    labeledSection("Notes") {
                        Text(notes)
                            .font(.body)
                            .padding(14)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(.fill.secondary, in: RoundedRectangle(cornerRadius: 10))
                    }
                }
            }
            .padding(.bottom)
        }
        .navigationTitle(report.trailName)
        #if os(iOS)
        .navigationBarTitleDisplayMode(.large)
        #endif
    }

    private var conditionCard: some View {
        let color: Color = switch report.overallCondition {
        case "excellent": .green
        case "good": .blue
        case "fair": .orange
        default: .red
        }
        return VStack(spacing: 4) {
            Image(systemName: report.conditionSymbol)
                .font(.title2)
                .foregroundStyle(color)
            Text(report.overallCondition.capitalized)
                .font(.caption.bold())
                .foregroundStyle(color)
        }
        .padding(14)
        .background(color.opacity(0.1), in: RoundedRectangle(cornerRadius: 12))
    }

    private func labeledSection(_ title: String, @ViewBuilder content: () -> some View) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(.caption.uppercaseSmallCaps()).foregroundStyle(.secondary)
            content()
        }
        .padding(.horizontal)
    }
}

// MARK: - Submit Form

struct SubmitTrailConditionView: View {
    let viewModel: TrailConditionsViewModel
    /// Called after a successful submit. Used to clear the originating watch
    /// draft only once the report actually exists (#2721).
    private let onSubmitted: (() -> Void)?
    @Environment(\.dismiss) private var dismiss

    @State private var place: ReportPlace?
    @State private var location = TrailReportLocationProvider()
    @State private var surface = TrailSurface.dirt.rawValue
    @State private var condition: String
    @State private var selectedHazards: Set<String> = []
    @State private var notes: String
    @State private var isSubmitting = false
    @State private var error: String?
    @FocusState private var isInputFocused: Bool
    @State private var showingTrailPicker = false
    /// True when the form opened from a watch capture, so the trail picker can
    /// open immediately — the trail is the one thing the draft cannot carry.
    private let isCompletingWatchDraft: Bool

    /// Reports written from a trip are linked to it.
    private let tripId: String?

    init(viewModel: TrailConditionsViewModel) {
        self.viewModel = viewModel
        self.onSubmitted = nil
        self.isCompletingWatchDraft = false
        self.tripId = nil
        _condition = State(initialValue: "good")
        _notes = State(initialValue: "")
    }

    /// Opens the form from a trip: its trail filled in when it has one, and the
    /// report linked to the trip.
    init(viewModel: TrailConditionsViewModel, tripId: String, trail: TrailSummary?, onSubmitted: @escaping () -> Void) {
        self.viewModel = viewModel
        self.onSubmitted = onSubmitted
        self.isCompletingWatchDraft = false
        self.tripId = tripId
        _place = State(initialValue: trail.map { .trail($0) })
        _condition = State(initialValue: "good")
        _notes = State(initialValue: "")
    }

    #if os(iOS)
    /// Opens the form pre-filled from a watch capture. The watch supplies the
    /// condition and the note; the trail name is what the user still has to add.
    init(
        viewModel: TrailConditionsViewModel,
        draft: WatchTrailDraft,
        onSubmitted: @escaping () -> Void
    ) {
        self.viewModel = viewModel
        self.onSubmitted = onSubmitted
        self.isCompletingWatchDraft = true
        self.tripId = nil
        _condition = State(
            initialValue: TrailConditionLevel(rawValue: draft.condition)?.rawValue ?? "good"
        )
        _notes = State(initialValue: draft.note)
    }
    #endif

    private let hazardOptions = ["Downed trees", "Muddy sections", "Ice", "High water", "Rock slides", "Wildlife", "Washed out trail"]
    private var isValid: Bool { place != nil }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Button {
                        showingTrailPicker = true
                    } label: {
                        ReportPlaceRow(place: place)
                    }
                    .buttonStyle(.plain)
                    .accessibilityIdentifier("trail_report_choose_trail")
                } header: {
                    Text("Trail")
                } footer: {
                    if isCompletingWatchDraft {
                        Text("Condition and notes came from your Apple Watch. Choose the trail to submit.")
                    }
                }
                Section("Conditions") {
                    Picker("Overall", selection: $condition) {
                        ForEach(TrailConditionLevel.allCases, id: \.rawValue) { lvl in
                            Text(lvl.label).tag(lvl.rawValue)
                        }
                    }
                    Picker("Surface", selection: $surface) {
                        ForEach(TrailSurface.allCases, id: \.rawValue) { s in
                            Label(s.label, systemImage: s.symbol).tag(s.rawValue)
                        }
                    }
                }
                Section("Hazards") {
                    ForEach(hazardOptions, id: \.self) { hazard in
                        Toggle(hazard, isOn: Binding(
                            get: { selectedHazards.contains(hazard) },
                            set: { on in if on { selectedHazards.insert(hazard) } else { selectedHazards.remove(hazard) } }
                        ))
                        .accessibilityIdentifier("trail_hazard_\(hazard.accessibilitySlug)")
                        .accessibilityLabel(hazard)
                    }
                }
                Section("Notes") {
                    TextField("Describe conditions in detail…", text: $notes, axis: .vertical)
                        .lineLimit(4, reservesSpace: true)
                        .focused($isInputFocused)
                        .accessibilityIdentifier("trail_report_notes")
                }
                if let error { Section { InlineErrorView(message: error) } }
            }
            .packRatFormStyle()
            .dismissesKeyboardOnScroll()
            // One keyboard toolbar only — a second `keyboardDoneButton` renders a
            // duplicate "Done". Clears whichever of the two focus flags is set.
            .keyboardDoneButton { isInputFocused = false }
            .navigationTitle(isCompletingWatchDraft ? "Finish Watch Report" : "Submit Report")
            #if os(iOS)
            .navigationBarTitleDisplayMode(.inline)
            #endif
            .navigationDestination(isPresented: $showingTrailPicker) {
                TrailPickerView(selectedTrailId: place?.trailId, location: location) { picked in
                    place = picked
                    showingTrailPicker = false
                }
            }
            // Fixes early so the picker opens on the nearest trails, and the
            // report records where it was written.
            .task { location.start() }
            // The trail is the only thing a watch capture cannot fill, so go
            // straight to choosing it rather than making the user hunt for it.
            .task { if isCompletingWatchDraft { showingTrailPicker = true } }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Cancel") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Submit") { submit() }
                        .accessibilityIdentifier("trail_report_submit")
                        .disabled(!isValid || isSubmitting)
                }
            }
        }
        .formSheetSize(minWidth: 560, minHeight: 680)
    }

    private func submit() {
        guard let place, !isSubmitting else { return }
        isSubmitting = true
        error = nil
        Task {
            defer { isSubmitting = false }
            do {
                try await viewModel.submitReport(
                    place: place,
                    writtenAt: location.coordinate.map { ($0.latitude, $0.longitude) },
                    surface: surface,
                    overallCondition: condition,
                    hazards: Array(selectedHazards),
                    notes: notes.isEmpty ? nil : notes,
                    tripId: tripId
                )
                // Only now — a draft cleared on a failed submit would lose the
                // capture with nothing to show for it.
                onSubmitted?()
                dismiss()
            } catch { self.error = error.localizedDescription }
        }
    }
}

/// The form's trail row: what the report is about, or a prompt to choose.
private struct ReportPlaceRow: View {
    let place: ReportPlace?

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: symbol)
                .foregroundStyle(place == nil ? Color.secondary : Color.accentColor)
                .frame(width: 24)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                Text(place?.displayName ?? "Choose Trail")
                    .foregroundStyle(place == nil ? Color.accentColor : Color.primary)
                if let detail {
                    Text(detail).font(.caption).foregroundStyle(.secondary)
                }
            }
            Spacer(minLength: 0)
            Image(systemName: "chevron.right")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.tertiary)
                .accessibilityHidden(true)
        }
        .contentShape(Rectangle())
    }

    private var symbol: String {
        switch place {
        case .pin: "mappin.and.ellipse"
        case .trail: "figure.hiking"
        case nil: "magnifyingglass"
        }
    }

    private var detail: String? {
        switch place {
        case .trail(let trail): trail.lengthM > 0 ? trail.lengthText : nil
        case .pin: "Pinned location"
        case nil: nil
        }
    }
}

private extension String {
    var accessibilitySlug: String {
        lowercased()
            .replacingOccurrences(of: " ", with: "_")
            .filter { $0.isLetter || $0.isNumber || $0 == "_" }
    }
}

// MARK: - Flow Layout helper

struct FlowLayout<Data: RandomAccessCollection, Content: View>: View where Data.Element: Hashable {
    let data: Data
    let content: (Data.Element) -> Content

    init(_ data: Data, @ViewBuilder content: @escaping (Data.Element) -> Content) {
        self.data = data
        self.content = content
    }

    var body: some View {
        // Simple wrapping HStack approximation
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 100), spacing: 6)], spacing: 6) {
            ForEach(Array(data), id: \.self) { item in
                content(item)
            }
        }
    }
}
