import SwiftUI

/// Horizontal "All" + category filter strip shared by the Gear Catalog and the
/// pack catalog browser. Tapping the selected category clears it.
struct CatalogCategoryChips: View {
    let categories: [String]
    let selected: String?
    let onSelect: (String?) -> Void

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                chip(label: "All", isSelected: selected == nil) {
                    onSelect(nil)
                }
                ForEach(categories, id: \.self) { category in
                    chip(label: category.catalogCategoryDisplayName, isSelected: selected == category) {
                        onSelect(selected == category ? nil : category)
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
        }
    }

    private func chip(label: String, isSelected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(label)
                .font(.caption.bold())
                .padding(.horizontal, 14)
                .padding(.vertical, 7)
                .background(
                    isSelected ? Color.accentColor : Color.accentColor.opacity(0.1),
                    in: Capsule()
                )
                .foregroundStyle(isSelected ? .white : Color.accentColor)
        }
        .buttonStyle(.plain)
    }
}
