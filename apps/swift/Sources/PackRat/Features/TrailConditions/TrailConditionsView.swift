import Sentry
import SwiftUI

// MARK: - List Column

struct TrailConditionsListView: View {
    @Bindable var viewModel: TrailConditionsViewModel
    @Binding var selectedId: String?
    var showsGuestLimitInList = true
    @Environment(AuthManager.self) private var authManager
    @State private var showingSubmitSheet = false
    /// Ranks trail search results nearest first, when location is already allowed.
    @State private var searchLocation = TrailReportLocationProvider()
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
            } else if isSearching {
                // Searching finds trails and places to open, not report text.
                TrailSearchResultsView(query: viewModel.searchText, location: searchLocation)
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
        .searchable(text: $viewModel.searchText, prompt: "Search trails and places")
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
                    TrailConditionDetailView(report: report, authorName: viewModel.authorNames[report.id])
                } label: {
                    TrailReportRow(report: report, authorName: viewModel.authorNames[report.id])
                }
            } else {
                TrailReportRow(report: report, authorName: viewModel.authorNames[report.id])
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

    private var isSearching: Bool {
        !viewModel.searchText.trimmingCharacters(in: .whitespaces).isEmpty
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
            ForEach(viewModel.reports) { report in
                reportRow(report)
            }
        }
    }

    #if os(iOS)
    /// Watch captures sit above the reports, waiting for a trail.
    @ViewBuilder
    private var watchDraftsSection: some View {
        if draftStore.hasDrafts {
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
    let authorName: String?

    var body: some View {
        // Photos go under the words, as review lists do: a thumbnail on only
        // some rows would leave the text starting at different widths.
        VStack(alignment: .leading, spacing: 8) {
            details
            if !report.photos.isEmpty {
                ReportPhotoPreviewRow(photos: report.photos)
            }
        }
        .padding(.vertical, 2)
    }

    private var details: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(alignment: .firstTextBaseline) {
                Text(report.trailName).font(.headline)
                    .fixedSize(horizontal: false, vertical: true)
                    .accessibilityIdentifier("trail_report_title_\(report.trailName)")
                Spacer()
                conditionBadge
            }
            HStack(spacing: 4) {
                // A pinned report has no trail page to open; say so up front.
                if report.isPinned {
                    Image(systemName: "mappin")
                        .accessibilityLabel("Dropped pin")
                }
                Text(byline)
            }
            .font(.caption)
            .foregroundStyle(.secondary)
            if let notes = report.notes, !notes.isEmpty {
                Text(notes)
                    .font(.callout)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }
        }
    }

    private var byline: String {
        [authorName, report.timeAgo].compactMap { $0 }.filter { !$0.isEmpty }.joined(separator: " · ")
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
    var authorName: String? = nil
    /// Off on the trail page itself, where a link back to it would loop.
    var showsTrailLink = true

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // The trail's name in full: a navigation title truncates long
                // names ("Use trail to Mirror Lake…") with no way to read the rest.
                Text(report.trailName)
                    .font(.title.bold())
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.horizontal)
                    .accessibilityAddTraits(.isHeader)

                // Condition header
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        if let region = report.trailRegion {
                            Label(region, systemImage: "mappin")
                                .font(.callout).foregroundStyle(.secondary)
                        }
                        Text([authorName, report.timeAgo].compactMap { $0 }.joined(separator: " · "))
                            .font(.caption).foregroundStyle(.secondary)
                    }
                    Spacer()
                    conditionCard
                }
                .padding(.horizontal)

                if showsTrailLink, let trailId = report.trailId {
                    NavigationLink {
                        TrailPageView(trail: TrailSummary(id: trailId, name: report.trailName))
                    } label: {
                        HStack {
                            Label("All Reports for This Trail", systemImage: "figure.hiking")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption.weight(.semibold))
                                .foregroundStyle(.tertiary)
                        }
                        .padding(14)
                        .background(.background.secondary, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal)
                    .accessibilityIdentifier("trail_report_view_trail")
                }

                if !report.photos.isEmpty {
                    ReportPhotoStrip(photos: report.photos, size: 140)
                        .contentMargins(.horizontal, 16, for: .scrollContent)
                        .accessibilityIdentifier("trail_report_photos")
                }

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
        // The trail name is the heading above; repeating it here doubled it.
        .navigationTitle("Report")
        #if os(iOS)
        .navigationBarTitleDisplayMode(.inline)
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
    @Environment(AuthManager.self) private var authManager

    @State private var place: ReportPlace?
    @State private var location = TrailReportLocationProvider()
    @State private var surface = TrailSurface.dirt.rawValue
    @State private var condition: String
    @State private var selectedHazards: Set<String> = []
    @State private var notes: String
    @State private var photos: [DraftPhoto] = []
    /// "Uploading photo 2 of 3" while photos go up; nil otherwise.
    @State private var uploadProgress: (completed: Int, total: Int)?
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

    /// Opens the form with its trail filled in: from a trip (the report is then
    /// linked to it) or from a trail page.
    init(viewModel: TrailConditionsViewModel, tripId: String? = nil, trail: TrailSummary?, onSubmitted: @escaping () -> Void) {
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
                ReportPhotoPickerSection(photos: $photos, isLocked: isSubmitting)
                if let uploadProgress {
                    Section {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Uploading photo \(min(uploadProgress.completed + 1, uploadProgress.total)) of \(uploadProgress.total)…")
                                .font(.callout)
                            ProgressView(value: Double(uploadProgress.completed), total: Double(max(uploadProgress.total, 1)))
                        }
                        .padding(.vertical, 4)
                        .accessibilityIdentifier("trail_report_upload_progress")
                    }
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
            defer {
                isSubmitting = false
                uploadProgress = nil
            }
            let photoKeys: [String]
            do {
                photoKeys = try await uploadPhotos()
            } catch {
                SentrySDK.capture(error: error) { scope in
                    scope.setTag(value: "trailConditions", key: "feature")
                    scope.setTag(value: "uploadReportPhotos", key: "action")
                    scope.setExtra(value: photos.count, key: "photoCount")
                }
                // Photos that made it keep their key, so trying again only
                // sends the rest.
                self.error = "Your photos didn't upload. Check your connection and try again. Nothing you entered was lost."
                return
            }
            do {
                try await viewModel.submitReport(
                    place: place,
                    writtenAt: location.coordinate.map { ($0.latitude, $0.longitude) },
                    surface: surface,
                    overallCondition: condition,
                    hazards: Array(selectedHazards),
                    notes: notes.isEmpty ? nil : notes,
                    photos: photoKeys,
                    tripId: tripId
                )
                // Only now — a draft cleared on a failed submit would lose the
                // capture with nothing to show for it.
                onSubmitted?()
                dismiss()
            } catch { self.error = error.localizedDescription }
        }
    }

    /// Uploads the photos not yet uploaded and returns every photo's key, in
    /// the order the hiker added them.
    private func uploadPhotos() async throws -> [String] {
        let pending = photos.filter { $0.uploadedKey == nil }
        guard !pending.isEmpty else { return photos.compactMap(\.uploadedKey) }
        guard let userId = authManager.currentUser?.id else { throw PackRatError.unauthorized }
        var completed = photos.count - pending.count
        uploadProgress = (completed, photos.count)
        try await withThrowingTaskGroup(of: (UUID, String).self) { group in
            for photo in pending {
                let id = photo.id
                let jpeg = photo.jpeg
                group.addTask {
                    // The presign route requires keys to start with `{userId}-`.
                    let key = try await UploadService.shared.upload(
                        data: jpeg,
                        fileName: "\(userId)-\(UUID().uuidString).jpg",
                        mimeType: "image/jpeg"
                    )
                    return (id, key)
                }
            }
            for try await (id, key) in group {
                if let index = photos.firstIndex(where: { $0.id == id }) {
                    photos[index].uploadedKey = key
                }
                completed += 1
                uploadProgress = (completed, photos.count)
            }
        }
        return photos.compactMap(\.uploadedKey)
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

/// Lays chips out left to right, wrapping onto new lines, each at its own
/// width. (A LazyVGrid with adaptive columns centred every chip in a fixed
/// cell, so a short chip like "Ice" sat indented from the section edge.)
struct FlowLayout<Data: RandomAccessCollection, Content: View>: View where Data.Element: Hashable {
    let data: Data
    let content: (Data.Element) -> Content

    init(_ data: Data, @ViewBuilder content: @escaping (Data.Element) -> Content) {
        self.data = data
        self.content = content
    }

    var body: some View {
        WrappingStack(spacing: 6) {
            ForEach(Array(data), id: \.self) { item in
                content(item)
            }
        }
    }
}

private struct WrappingStack: Layout {
    var spacing: CGFloat

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let rows = arrange(subviews, width: proposal.width ?? .infinity)
        let width = rows.map(\.width).max() ?? 0
        let height = rows.map(\.height).reduce(0, +) + spacing * CGFloat(max(rows.count - 1, 0))
        return CGSize(width: width, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var y = bounds.minY
        for row in arrange(subviews, width: bounds.width) {
            var x = bounds.minX
            for index in row.indices {
                let size = subviews[index].sizeThatFits(.unspecified)
                subviews[index].place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(size))
                x += size.width + spacing
            }
            y += row.height + spacing
        }
    }

    private struct Row {
        var indices: [Int] = []
        var width: CGFloat = 0
        var height: CGFloat = 0
    }

    private func arrange(_ subviews: Subviews, width maxWidth: CGFloat) -> [Row] {
        var rows: [Row] = []
        var row = Row()
        for index in subviews.indices {
            let size = subviews[index].sizeThatFits(.unspecified)
            let needed = row.indices.isEmpty ? size.width : row.width + spacing + size.width
            if needed > maxWidth, !row.indices.isEmpty {
                rows.append(row)
                row = Row()
            }
            row.width = row.indices.isEmpty ? size.width : row.width + spacing + size.width
            row.height = max(row.height, size.height)
            row.indices.append(index)
        }
        if !row.indices.isEmpty { rows.append(row) }
        return rows
    }
}
