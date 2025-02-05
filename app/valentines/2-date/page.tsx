'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function DateSelection() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const router = useRouter();

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(e.target.value);
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
        if (!selectedDate || !selectedLocation || !selectedTime) {
            alert("Baby you didn't pick all the options!!!! 😅 (Or try refreshing the page if it's trippin)");
            return;
        }

        const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        const response = `I will be free on ${formattedDate}, let's meet at ${selectedLocation} at ${selectedTime}.`;

        submitResponse(response);
        router.push('/valentines/3-food');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 2 )</h1>
            <h1 className="text-4xl font-bold mb-4">WILL I SEE YOU AGAIN? 🫣</h1>

            <label className="block font-bold text-lg mb-2">WE WILL SEE EACH OTHER ON _____</label>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-64 p-2 rounded-md valentines-input-box"
            />

            <br></br>
            <label className="block font-bold text-lg mb-2">AT THIS PLACE _____</label>
            <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-64 p-2 rounded-md valentines-input-box"
            >
                <option value="" disabled>📍 📍 📍</option>
                <option value="Columbia Station">Columbia Station</option>
                <option value="New West Station">New West Station</option>
                <option value="Park outside your place">Park outside your place</option>
            </select>


            <br></br>
            <label className="block font-bold text-lg mb-2">@ _____</label>
            <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-64 p-2 rounded-md mb-6 valentines-input-box"
            >
                <option value="">🕰️ 🕰️ 🕰️</option>
                {Array.from({ length: 7 }, (_, i) => {
                    const hour = 11 + Math.floor(i / 2);
                    const minutes = i % 2 === 0 ? "00" : "30";
                    return (
                        <option key={i} value={`${hour}:${minutes}`}>{`${hour}:${minutes}`}</option>
                    );
                })}
            </select>

            <div className="flex justify-between mt-8">
                <button onClick={handleBack}className="font-bold back-button">GO BACK</button>
                <button onClick={handleSubmit} className="font-bold valentines-button">NEXT LEVEL</button>
            </div>
        </div>
    );
}