import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    const { response } = await request.json(); // Expecting a 'response' (yes/no) in the body of the request

    try {
        // Pass 'valentines' as the database name
        const db = await connectToDatabase('valentines');  // Connect to the 'valentines' database
        const collection = db.collection('responses'); // Use the 'responses' collection

        // Insert the response into the collection
        const result = await collection.insertOne({
            response, // Insert the response (yes/no)
            timestamp: new Date(), // Store the timestamp when the response was received
        });

        return NextResponse.json({ message: 'Response saved successfully!' });
    } catch (err) {
        console.error('Error saving response:', err);
        return NextResponse.json({ message: 'Error saving response' }, { status: 500 });
    }
}