import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        // Ensure the content type is JSON
        if (!request.headers.get('content-type')?.includes('application/json')) {
            console.error('Invalid content type');
            return NextResponse.json({ message: 'Invalid content type. Expected application/json' }, { status: 400 });
        }

        // Parse incoming JSON request body
        const { response } = await request.json();

        // Validate that response exists and is a string (or whatever format you expect)
        if (!response || typeof response !== 'string') {
            console.error('Invalid or missing response:', response);
            return NextResponse.json({ message: 'Invalid response data' }, { status: 400 });
        }

        // Proceed with DB connection and insertion
        const db = await connectToDatabase();
        const collection = db.collection('responses');

        const now = new Date();

        const formattedTimestamp = now.toLocaleString('en-GB', {
            hour12: true,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(',', '');

        const result = await collection.insertOne({
            response,
            timestamp: formattedTimestamp,
        });

        console.log('Inserted document:', result);

        return NextResponse.json({ message: 'Response saved successfully!' });
    } catch (err) {
        console.error('Error saving response:', err);
        return NextResponse.json({ message: 'Error saving response' }, { status: 500 });
    }
}