'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css'; 

export default function DateSelection() {
    const [selectedDate, setSelectedDate] = useState('');
    const router = useRouter();

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedDate) {
            // Store or send the selected date
            router.push('/pages/valentines/food');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Pick a date night theme!</h1>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border-2 border-gray-300 p-2 rounded-md"
            />
            <button
                onClick={handleSubmit}
                className="mt-4 bg-purple-500 text-white p-4 rounded-full w-40 hover:bg-purple-600"
            >
                Next
            </button>
        </div>
    );
}
