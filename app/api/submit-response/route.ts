import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    const { response } = await request.json(); // Expecting a 'response' (yes/no) in the body of the request

    try {
        const db = await connectToDatabase();
        const collection = db.collection('responses'); // This will create a 'responses' collection if it doesn't exist

        const result = await collection.insertOne({
            response, // Insert the response into the collection
            timestamp: new Date(), // Optional: Store the timestamp when the response was received
        });

        return NextResponse.json({ message: 'Response saved successfully!' });
    } catch (err) {
        console.error('Error saving response:', err);
        return NextResponse.json({ message: 'Error saving response' }, { status: 500 });
    }
}