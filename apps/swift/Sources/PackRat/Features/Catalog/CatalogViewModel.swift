import Foundation
import Observation

@Observable
final class CatalogViewModel {
    var items: [CatalogItem] = []
    var searchText = ""
    var isLoading = false
    /// Paging state, kept separate from `isLoading` so the footer spinner can be
    /// shown for a page fetch without the whole list being replaced by the
    /// full-screen "Searching gear…" state.
    var isLoadingMore = false
    var error: String?
    var hasSearched = false
    var currentPage = 1
    /// False once a page comes back short, so scrolling to the bottom stops
    /// asking for pages the server has already run out of.
    var hasMore = true
    /// Category facets for the filter strip, most-stocked first.
    var categories: [String] = []
    var selectedCategory: String?

    /// One page as requested from `CatalogService.search`. Anything shorter than
    /// this means the server has no more rows to give.
    private static let pageSize = 20

    private let service: any CatalogBrowsing
    private var searchTask: Task<Void, Never>?
    /// The pending search or category reload, so tests can await it.
    var searchTaskForTesting: Task<Void, Never>? { searchTask }

    init(service: any CatalogBrowsing = CatalogService.shared) {
        self.service = service
    }

    /// Fills the screen with the browse list the first time it opens, so the
    /// catalog shows gear before anything is typed, as Android does.
    func loadIfNeeded() async {
        guard !hasSearched, !isLoading, items.isEmpty else { return }
        async let cats: Void = loadCategories()
        async let list: Void = search(reset: true)
        _ = await (cats, list)
    }

    func selectCategory(_ category: String?) {
        // Take over `searchTask` so a pending search can't land after the
        // category change and overwrite its results.
        searchTask?.cancel()
        selectedCategory = category
        searchTask = Task { await search(reset: true) }
    }

    private func loadCategories() async {
        guard categories.isEmpty, !VisualSampleData.isScreenshotCapture else { return }
        categories = (try? await service.categories(limit: 20)) ?? []
    }

    func onSearchTextChanged() {
        searchTask?.cancel()
        guard searchText.count >= 2 else {
            // Clearing the field goes back to the browse list.
            if searchText.isEmpty {
                searchTask = Task { await search(reset: true) }
            }
            return
        }
        searchTask = Task {
            try? await Task.sleep(for: .milliseconds(500))
            guard !Task.isCancelled else { return }
            await search(reset: true)
        }
    }

    func search(reset: Bool = false) async {
        if VisualSampleData.isEnabled || VisualSampleData.isUITestFixturesEnabled {
            if reset { currentPage = 1; hasMore = false }
            isLoading = false
            error = nil
            items = VisualSampleData.catalogItems(matching: searchText)
            hasSearched = true
            return
        }
        if VisualSampleData.isScreenshotCapture && !VisualSampleData.isEnabled {
            if reset { currentPage = 1; hasMore = false }
            isLoading = false
            error = nil
            items = []
            hasSearched = !searchText.isEmpty
            return
        }

        if reset {
            currentPage = 1
            hasMore = true
        }
        // A page fetch shows the list footer; a fresh search replaces the list.
        // Sharing one flag made the second page blank the results.
        if reset { isLoading = true } else { isLoadingMore = true }
        error = nil
        defer {
            isLoading = false
            isLoadingMore = false
        }
        do {
            // An empty query browses newest-first, as Android does; a query
            // keeps the server's relevance order.
            let results: [CatalogItem]
            if searchText.isEmpty {
                results = try await service.browse(
                    query: nil, category: selectedCategory, sort: .newest,
                    page: currentPage, limit: Self.pageSize
                )
            } else if selectedCategory != nil {
                results = try await service.browse(
                    query: searchText, category: selectedCategory, sort: nil,
                    page: currentPage, limit: Self.pageSize
                )
            } else {
                results = try await service.search(query: searchText, page: currentPage, limit: Self.pageSize)
            }
            // A superseded search or category change must not commit.
            guard !Task.isCancelled else { return }
            if reset {
                items = results
            } else {
                items.append(contentsOf: results)
            }
            // A short page is the last page. Without this the footer spinner
            // stays visible forever and every bounce at the bottom refetches.
            hasMore = results.count >= Self.pageSize
            hasSearched = true
        } catch {
            self.error = error.localizedDescription
            // Don't strand the user mid-list: a failed page can be retried by
            // scrolling again, but a failed first page owns the error state.
            if !reset { currentPage -= 1 }
        }
    }

    func loadMore() async {
        guard !VisualSampleData.isScreenshotCapture else { return }
        guard !isLoading, !isLoadingMore, hasMore else { return }
        currentPage += 1
        await search(reset: false)
    }
}
