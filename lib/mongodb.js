import { MongoClient } from 'mongodb';

// MongoClient instance
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToDatabase() {
    try {
        // Ensure the client is connected
        await client.connect();
        return client.db();  // This will automatically create the database if it doesn't exist
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        throw new Error('Failed to connect to MongoDB');
    }
}
