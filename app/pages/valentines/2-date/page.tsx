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

    const submitResponse = async (response: string) => {
        try {
            await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = () => {
        if (selectedDate) {
            // Format the selected date as "Month Day, Year"
            const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            // Create the response string
            const response = `I will be free on ${formattedDate}`;

            // Submit the response
            submitResponse(response);
            router.push('/pages/valentines/3-food');
        } else {
            alert("You didn't select a date! (Or try refreshing the page)");
        }
    };

    const handleBack = () => {
        router.back();
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
            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    className="back-button"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="valentines-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
}