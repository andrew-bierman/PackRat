const { ObjectId } = require('mongodb');

const filterNullAndParseToString = (arr) => arr.filter((id) => id != null).map(String)
const mapStringIdsToObjectIds = (arr) => arr.map((id) => new ObjectId(id))

module.exports = {
    async up (db, client) {
        const itemsCollection = db.collection('items');
    
        // Step 1: Get all items from the "items" collection
        const allItems = await itemsCollection.find({}).toArray();
        
        // Step 2: Loop through each item and update the "owners" and  "packs" fields
        for (const item of allItems) {
            // Remove duplicate ObjectIDs in the "owners" array
            const uniqueOwners = item.owners ? [...new Set(filterNullAndParseToString(item.owners))] : [];
            
            // Remove duplicate ObjectIDs in the "packs" array
            const uniquePacks = item.packs ? [...new Set(filterNullAndParseToString(item.packs))] : [];
    
            // Update the item with the unique values
            await itemsCollection.updateOne(
                { _id: item._id },
                { $set: { 
                    owners: mapStringIdsToObjectIds(uniqueOwners),
                    packs: mapStringIdsToObjectIds(uniquePacks),
                } }
            );
        }
    },
    async down(db, client)  {}
}

