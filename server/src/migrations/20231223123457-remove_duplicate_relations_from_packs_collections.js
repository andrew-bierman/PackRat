const { ObjectId } = require('mongodb');

const filterNullAndParseToString = (arr) => arr.filter((id) => id != null).map(String)
const mapStringIdsToObjectIds = (arr) => arr.map((id) => new ObjectId(id))

module.exports = {
    async up (db, client) {
        const packsCollection = db.collection('packs');
    
        // Step 1: Get all packs from the "packs" collection
        const allPacks = await packsCollection.find({}).toArray();
        console.log({allPacks})
        // Step 2: Loop through each pack and update the "owners", "trips", "items" and  "favorited_by" field
        for (const pack of allPacks) {
            // Remove duplicate ObjectIDs in the "owners" array
            const uniqueOwners = pack.owners ? [...new Set(filterNullAndParseToString(pack.owners))] : [];
            
            // Remove duplicate ObjectIDs in the "trips" array
            const uniqueTrips = pack.trips ? [...new Set(filterNullAndParseToString(pack.trips))] : [];
    
             // Remove duplicate ObjectIDs in the "items" array
             const uniqueItems = pack.items ? [...new Set(filterNullAndParseToString(pack.items))] : [];
    
              // Remove duplicate ObjectIDs in the "favorited_by" array
            const uniqueFavoritees = pack.favorited_by ? [...new Set(filterNullAndParseToString(pack.favorited_by))] : [];

            // Update the pack with the unique values
            await packsCollection.updateOne(
                { _id: pack._id },
                { $set: { 
                    owners: mapStringIdsToObjectIds(uniqueOwners),
                    trips: mapStringIdsToObjectIds(uniqueTrips),
                    items: mapStringIdsToObjectIds(uniqueItems),
                    favorited_by: mapStringIdsToObjectIds(uniqueFavoritees)
                } }
            );
        }
    },
    async down(db, client)  {}
}

