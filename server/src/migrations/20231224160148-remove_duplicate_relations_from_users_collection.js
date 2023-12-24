const { ObjectId } = require('mongodb');

const filterNullAndParseToString = (arr) => arr.filter((id) => id != null).map(String)
const mapStringIdsToObjectIds = (arr) => arr.map((id) => new ObjectId(id))

module.exports = {
    async up (db, client) {
        const usersCollection = db.collection('users');
    
        // Step 1: Get all users from the "users" collection
        const allUsers = await usersCollection.find({}).toArray();
        
        // Step 2: Loop through each user and update the "favorites" and  "packs" fields
        for (const user of allUsers) {
            // Remove duplicate ObjectIDs in the "favorites" array
            const uniqueFavorites = user.favorites ? [...new Set(filterNullAndParseToString(user.favorites))] : [];
            
            // Remove duplicate ObjectIDs in the "packs" array
            const uniquePacks = user.packs ? [...new Set(filterNullAndParseToString(user.packs))] : [];
    
            // Update the user with the unique values
            await usersCollection.updateOne(
                { _id: user._id },
                { $set: { 
                    favorites: mapStringIdsToObjectIds(uniqueFavorites),
                    packs: mapStringIdsToObjectIds(uniquePacks),
                } }
            );
        }
    },
    async down(db, client)  {}
}

