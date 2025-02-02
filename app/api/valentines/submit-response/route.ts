import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
    const { response } = await request.json();

    try {
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

        return NextResponse.json({ message: 'Response saved successfully!' });
    } catch (err) {
        console.error('Error saving response:', err);
        return NextResponse.json({ message: 'Error saving response' }, { status: 500 });
    }
}