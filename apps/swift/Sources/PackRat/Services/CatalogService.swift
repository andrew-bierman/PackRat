import Foundation

/// The catalog reads the pack-first browse sheet depends on. Exists so that
/// sheet's view model can be driven by a stub in tests instead of reaching
/// `CatalogService.shared` and issuing real requests.
protocol CatalogBrowsing: Sendable {
    func categories(limit: Int) async throws -> [String]
    func browse(query: String?, category: String?, sort: CatalogSort?, page: Int, limit: Int) async throws -> [CatalogItem]
    /// The meaning-based search behind the standalone Gear Catalog screen. On the
    /// protocol so `CatalogViewModel`'s paging can be tested without the
    /// network, the same reason `browse` is here.
    func search(query: String, page: Int, limit: Int) async throws -> [CatalogItem]
}

extension CatalogBrowsing {
    /// Browse in the server's default order (popularity, or relevance for a query).
    func browse(query: String?, category: String?, page: Int, limit: Int) async throws -> [CatalogItem] {
        try await browse(query: query, category: category, sort: nil, page: page, limit: limit)
    }
}

/// Orderings the catalog list route accepts in its `sort` param.
enum CatalogSort: Sendable {
    case newest

    /// The route parses `sort` as a JSON object (`SortSchema`), not a flat field.
    var queryValue: String {
        switch self {
        case .newest: #"{"field":"createdAt","order":"desc"}"#
        }
    }
}

final class CatalogService: CatalogBrowsing, Sendable {
    static let shared = CatalogService()
    private let api: APIClient

    init(api: APIClient = .shared) { self.api = api }

    /// Paged embedding search for the Gear Catalog, matching Android, so
    /// "warm sleeping bag" finds related gear rather than only exact words.
    func search(query: String, page: Int = 1, limit: Int = 20) async throws -> [CatalogItem] {
        let endpoint = Endpoint(.get, "/api/catalog/vector-search", query: [
            "q": query,
            "limit": "\(limit)",
            "offset": "\((page - 1) * limit)",
        ])
        let data = try await api.sendData(endpoint)
        return try decodeCatalogItems(from: data)
    }

    /// Embedding-backed search. The route is `/api/catalog/vector-search` —
    /// there is no `/api/catalog/search` on the backend
    /// (packages/api/src/routes/catalog/index.ts), which is what this used to
    /// call, so every semantic search 404'd.
    func semanticSearch(query: String, limit: Int = 10) async throws -> [CatalogItem] {
        let endpoint = Endpoint(.get, "/api/catalog/vector-search", query: ["q": query, "limit": "\(limit)"])
        let data = try await api.sendData(endpoint)
        return try decodeCatalogItems(from: data)
    }

    /// Category facets for the browse sheet's filter chips. The route returns a
    /// bare JSON array of strings (`CatalogCategoriesResponseSchema`), ordered
    /// by item count descending.
    func categories(limit: Int = 20) async throws -> [String] {
        let endpoint = Endpoint(.get, "/api/catalog/categories", query: ["limit": "\(limit)"])
        return try await api.send(endpoint, as: [String].self)
    }

    /// Paged browse/search. `category` is sent only when set so the unfiltered
    /// browse case doesn't narrow to an empty facet.
    func browse(
        query: String?,
        category: String?,
        sort: CatalogSort?,
        page: Int = 1,
        limit: Int = 20
    ) async throws -> [CatalogItem] {
        var params = ["page": "\(page)", "limit": "\(limit)"]
        if let query, !query.isEmpty { params["q"] = query }
        if let category, !category.isEmpty { params["category"] = category }
        if let sort { params["sort"] = sort.queryValue }
        let endpoint = Endpoint(.get, "/api/catalog", query: params)
        let data = try await api.sendData(endpoint)
        return try decodeCatalogItems(from: data)
    }

    private func decodeCatalogItems(from data: Data) throws -> [CatalogItem] {
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        if let wrapped = try? decoder.decode(CatalogSearchResponse.self, from: data) {
            return wrapped.items
        }
        return try decoder.decode([CatalogItem].self, from: data)
    }
}
