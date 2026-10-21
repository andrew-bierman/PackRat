import Foundation
import Testing
@testable import PackRat

@Suite("Catalog add-to-pack category suggestions")
struct CatalogCategorySuggestionsTests {
    @Test("catalog categories come before the pack's own")
    func ordering() {
        let result = CatalogCategorySuggestions.make(
            catalogCategories: ["Shelter", "Tents"],
            packCategories: ["Cooking", "Sleep"]
        )
        #expect(result == ["Shelter", "Tents", "Cooking", "Sleep"])
    }

    @Test("duplicates collapse case-insensitively, keeping the first spelling")
    func deduplication() {
        let result = CatalogCategorySuggestions.make(
            catalogCategories: ["Shelter"],
            packCategories: ["shelter", " Shelter ", "Cooking", "cooking"]
        )
        #expect(result == ["Shelter", "Cooking"])
    }

    @Test("blank and missing categories are skipped")
    func blanks() {
        let result = CatalogCategorySuggestions.make(
            catalogCategories: ["", "  "],
            packCategories: [nil, "Water", ""]
        )
        #expect(result == ["Water"])
    }

    @Test("caps at eight suggestions")
    func cap() {
        let result = CatalogCategorySuggestions.make(
            catalogCategories: (1...6).map { "C\($0)" },
            packCategories: (1...6).map { "P\($0)" }
        )
        #expect(result == ["C1", "C2", "C3", "C4", "C5", "C6", "P1", "P2"])
    }

    @Test("the chip matching the typed value is selected regardless of case or padding")
    func matching() {
        #expect(CatalogCategorySuggestions.matches("Shelter", " shelter "))
        #expect(!CatalogCategorySuggestions.matches("Shelter", "Shelters"))
    }
}
