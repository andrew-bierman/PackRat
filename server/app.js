// const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { MONGODB_URI } from './config.js';
// import { MONGODB_URI } from './config';
// const {MONGODB_URI} = require('./config');


const uri = MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


async function createCollections() {
    try {
        // Connect to the MongoDB database
        await client.connect();
        console.log('Connected to MongoDB!');

        // Define the database and collections
        const db = client.db('packratdb');
        const usersCollection = db.collection('users');
        const packsCollection = db.collection('packs');
        const itemsCollection = db.collection('items');
        const tripsCollection = db.collection('trips');

        // Drop the collections if they exist
        const collections = await db.listCollections().toArray();
        for (let collection of collections) {
            if (collection.name === 'users') {
                await usersCollection.drop();
            } else if (collection.name === 'packs') {
                await packsCollection.drop();
            } else if (collection.name === 'items') {
                await itemsCollection.drop();
            } else if (collection.name === 'trips') {
                await tripsCollection.drop();
            }
        }


        // Define the schema for the users collection
        const userSchema = {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                packs: { type: 'array', items: { bsonType: 'objectId' } },
                trips: { type: 'array', items: { bsonType: 'objectId' } },
                is_certified_guide: { type: 'boolean' },
                favorites: { type: 'array', items: { bsonType: 'objectId' } }
            },
            additionalProperties: false,
            required: ['name', 'email', 'password']
        };

        // Define the schema for the packs collection
        const packSchema = {
            type: 'object',
            properties: {
                name: { type: 'string' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            item_id: { bsonType: 'objectId' },
                            quantity: { bsonType: 'int' }
                        },
                        required: ['item_id', 'quantity']
                    }
                },
                total_weight: { bsonType: 'double' },
                owner_id: { bsonType: 'objectId' },
                is_public: { type: 'boolean' },
                favorited_by: { type: 'array', items: { bsonType: 'objectId' } },
                favorites_count: { bsonType: 'int' }
            },
            additionalProperties: false,
            required: ['name', 'items', 'owner_id']
        };

        // Define the schema for the items collection
        const itemSchema = {
            type: 'object',
            properties: {
                name: { type: 'string' },
                weight: { bsonType: 'double' }
            },
            additionalProperties: false,
            required: ['name', 'weight']
        };

        // Define the schema for the trips collection
        const tripSchema = {
            type: 'object',
            properties: {
                name: { type: 'string' },
                duration: { bsonType: 'int' },
                weather: { type: 'string' },
                start_date: { bsonType: 'date' },
                end_date: { bsonType: 'date' },
                destination: { type: 'string' },
                owner_id: { bsonType: 'objectId' },
                packs: { type: 'array', items: { bsonType: 'objectId' } },
                is_public: { type: 'boolean' }
            },
            additionalProperties: false,
            required: ['name', 'duration', 'weather', 'start_date', 'end_date', 'destination', 'owner_id']
        };


        // Create the collections
        await db.createCollection('users', { validator: { $jsonSchema: userSchema } });
        await db.createCollection('packs', { validator: { $jsonSchema: packSchema } });
        await db.createCollection('items', { validator: { $jsonSchema: itemSchema } });
        await db.createCollection('trips', {
            validator: {
                $jsonSchema: tripSchema
            }
        });


        // Create the indexes for the collections
        await usersCollection.createIndex({ email: 1 }, { unique: true });
        await packsCollection.createIndex({ name: 1 });
        await tripsCollection.createIndex({ name: 1 });

    } catch (err) {
        console.log(err);
    } finally {
        // Close the database connection
        await client.close();
        console.log('Disconnected from MongoDB!');
    }
}

createCollections();

