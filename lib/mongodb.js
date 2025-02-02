import { MongoClient } from 'mongodb';

// MongoDB client instance
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToDatabase(databaseName = 'valentines') {
    try {
        // Always try to connect (no need to check isConnected)
        await client.connect();

        // Use the specified database (default to 'valentines' if none provided)
        return client.db(databaseName);  // Connect to the specified database
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw new Error('Failed to connect to MongoDB');
    }
}