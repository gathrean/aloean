'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function DateSelection() {
    const [responseDate, setResponseDate] = useState('');
    const [responseLocation, setResponseLocation] = useState('');
    const [responseTime, setResponseTime] = useState('');
    const router = useRouter();

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResponseDate(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setResponseLocation(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setResponseTime(e.target.value);
    };

    const handleSubmit = () => {
        if (!responseDate || !responseLocation || !responseTime) {
            alert("my love you gotta pick all the options! (or try refreshing the page if it's trippin)");
            return;
        }

        const localDate = new Date(responseDate + "T00:00");
        const formattedDate = localDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).toUpperCase();

        // Store in local storage for future steps
        localStorage.setItem("valentineResponse", JSON.stringify({
            responseDate: formattedDate, // Store the formatted date
            responseLocation,
            responseTime,
        }));

        router.push('/valentines/3-food');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 2 )</h1>
            <h1 className="text-3xl font-bold mb-4">WILL I SEE YOU AGAIN? 🫣</h1>

            <label className="block font-bold text-lg mb-2">WE MEET ON _____</label>
            <input
                type="date"
                value={responseDate}
                onChange={handleDateChange}
                className="w-64 p-2 rounded-md date-page-input-box"
            />

            <br></br>
            <label className="block font-bold text-lg mb-2">MEET UP AT _____</label>
            <select
                value={responseLocation}
                onChange={handleLocationChange}
                className="w-64 p-2 rounded-md date-page-input-box"
            >
                <option value="" disabled>📍</option>
                <option value="COLUMBIA STATION">COLUMBIA STATION</option>
                <option value="NEW WEST STATION">NEW WEST STATION</option>
                <option value="BRAID STATION">BRAID STATION</option>
            </select>

            <br></br>
            <label className="block font-bold text-lg mb-2">@ __ : __</label>
            <select
                value={responseTime}
                onChange={handleTimeChange}
                className="w-64 p-2 rounded-md mb-6 date-page-input-box"
            >
                <option value="">🕰️</option>
                {Array.from({ length: 7 }, (_, i) => {
                    const hour = 11 + Math.floor(i / 2);
                    const minutes = i % 2 === 0 ? "00" : "30";
                    return (
                        <option key={i} value={`${hour}:${minutes}`}>{`${hour}:${minutes}`}</option>
                    );
                })}
            </select>

            <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="font-bold aloean-button back-button">GO BACK</button>
                <button onClick={handleSubmit} className="font-bold aloean-button next-button">NEXT LEVEL</button>
            </div>
        </div>
    );
}