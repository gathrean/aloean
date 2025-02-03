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
            router.push('/pages/valentines/3-food');
        }
    };

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold mb-4">Pick a date night theme!</h1>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border-2 border-gray-300 p-2 rounded-md"
            />
            <button
                onClick={handleSubmit}
                className="valentines-button mt-8"
            >
                Next
            </button>
        </div>
    );
}
