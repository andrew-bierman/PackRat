export async function itemRecommendationAlgorithm() {
    try {
        // Query the items based on popularity, e.g., get top 5 favorited items
        const recommendedItems = await Item.find({})
            .sort({ favorites_count: -1 })
            .limit(5);

        return recommendedItems;
    } catch (error) {
        console.error("Error in item recommendation algorithm:", error);
        return [];
    }
}
