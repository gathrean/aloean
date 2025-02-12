import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    console.log('API route hit');
    try {
        // Ensure the content type is JSON
        if (!request.headers.get('content-type')?.includes('application/json')) {
            console.error('Invalid content type');
            return NextResponse.json({ message: 'Invalid content type. Expected application/json' }, { status: 400 });
        }

        // Parse incoming JSON request body
        const {
            responseDate,
            responseLocation,
            responseTime,
            responseFood1,
            responseFood2,
            responseDessert1,
            responseDessert2 = null,
            responseActivity1,
            responseActivity2 = null,
            responseActivity3 = null,
            responseActivity4 = null,
            responseActivity5 = null,
        } = await request.json();

        // Validate required fields
        if (
            !responseDate ||
            !responseLocation ||
            !responseTime ||
            !responseFood1 ||
            !responseDessert1 ||
            !responseActivity1
        ) {
            console.error('Missing required response fields');
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Get the current timestamp
        const timestamp = new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        // Proceed with DB connection and insertion
        const db = await connectToDatabase();
        const collection = db.collection('responses');

        const result = await collection.insertOne({
            responseDate,
            responseLocation,
            responseTime,
            responseFood1,
            responseFood2,
            responseDessert1,
            responseDessert2,
            responseActivity1,
            responseActivity2,
            responseActivity3,
            responseActivity4,
            responseActivity5,
            timestamp
        });

        console.log('Inserted document:', result);

        return NextResponse.json({ message: 'Response saved successfully!' });
    } catch (err) {
        console.error('Error saving response:', err);
        return NextResponse.json({ message: 'Error saving response' }, { status: 500 });
    }
}