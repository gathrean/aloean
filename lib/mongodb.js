import { MongoClient } from 'mongodb';

// MongoDB client instance
const client = new MongoClient(process.env.MONGODB_URI);

// Cache the database connection globally to avoid reconnecting
let cachedDb = null;

export async function connectToDatabase(databaseName = 'valentines') {
    if (cachedDb) {
        console.log('Using cached MongoDB connection');
        return cachedDb;
    }
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        cachedDb = client.db(databaseName);
        console.log('MongoDB connected');
        return cachedDb;
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw new Error('Failed to connect to MongoDB');
    }
}