'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '@/app/styles/valentines.css';

export default function ActivitiesSelection() {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedActivities = JSON.parse(sessionStorage.getItem('selectedActivities') || '[]');

        // Set the previous foods from storage
        setSelectedActivities(storedActivities);
    }, []);

    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let updatedSelection;

        if (e.target.checked) {
            updatedSelection = [...selectedActivities, value];
        } else {
            updatedSelection = selectedActivities.filter((item) => item !== value);
        }

        setSelectedActivities(updatedSelection);

        // Retrieve previous responses and update only the desserts
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        const updatedData = { ...storedData, selectedDesserts: updatedSelection };

        localStorage.setItem("valentineResponse", JSON.stringify(updatedData));
    };

    const handleSubmit = async () => {
        if (selectedActivities.length === 0) {
            alert("My love, you should pick at least one! Or you can select the SURPRISE ME option at the end.\n\n(Select up to 2)");
            return;
        } else if (selectedActivities.length > 5) {
            alert("DAMN. I would love to do all of these with you in one day as well but we can do them during another day!\n\n(Select up to 5)");
            return;
        }

        // Retrieve previous responses
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");

        // Overwrite desserts while keeping existing data
        const updatedData = {
            ...storedData,
            responseActivity1: selectedActivities[0] || null,
            responseActivity2: selectedActivities[1] || null, // Optional additional activity
            responseActivity3: selectedActivities[2] || null, // Optional additional activity
            responseActivity4: selectedActivities[3] || null, // Optional additional activity
            responseActivity5: selectedActivities[4] || null, // Optional additional activity
        };

        localStorage.setItem("valentineResponse", JSON.stringify(updatedData));

        try {
            await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            router.push('/valentines/6-thank-you');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    const activities = [
        { src: '/Valentines/5-activities/build-a-bear.jpg', alt: 'BUILD-A-BEAR', value: 'GOING TO A BUILD-A-BEAR', label: 'BUILD-A-BEAR' },
        { src: '/Valentines/5-activities/funk-coffee.jpg', alt: 'CAFE + PHOTO BOOTH (FUNK COFFEE)', value: 'VISITING FUNK COFFEE, AND THEIR PHOTO BOOTH', label: 'CAFE + PHOTO BOOTH (FUNK COFFEE)' },
        { src: '/Valentines/5-activities/photobooth.jpg', alt: 'CAFE + VINTAGE BOOTH (SLICE OF LIFE)', value: 'VISITING SLICE OF LIFE CAFE, AND THEIR VINTAGE PHOTO BOOTH', label: 'CAFE + VINTAGE BOOTH (SLICE OF LIFE)' },
        { src: '/Valentines/5-activities/neptoon.jpg', alt: 'NEPTOON RECORDS', value: 'CHECKING OUT NEPTOON RECORDS, A MUSIC STORE', label: 'NEPTOON RECORDS' },
        { src: '/Valentines/5-activities/lighthouse.jpeg', alt: 'LIGHTHOUSE PARK', value: 'CHECK OUT LIGHTHOUSE PARK', label: 'LIGHT HOUSE PARK' },
        { src: '/Valentines/5-activities/coal-harbour.jpg', alt: 'COAL HARBOUR', value: 'WALK AROUND COAL HARBOUR', label: 'COAL HARBOUR' },
        { src: '/Valentines/5-activities/stanley-park.jpg', alt: 'STANLEY PARK', value: 'WALK AROUND STANLEY PARK', label: 'STANLEY PARK' },        
        { src: '/Valentines/5-activities/sunset.jpg', alt: 'WATCH THE SUNSET', value: 'WATCHING THE SUNSET', label: 'WATCH THE SUNSET' },
        { src: '/Valentines/5-activities/arcade.jpg', alt: 'REC ROOM', value: 'GOING TO THE REC ROOM IN GRANVILLE', label: 'REC ROOM' },
        { src: '/Valentines/5-activities/aquarium.jpg', alt: 'AQUARIUM', value: 'CHECKING OUT THE AQUARIUM', label: 'AQUARIUM' },
        { src: '/Valentines/5-activities/museum.jpg', alt: 'MUSEUM', value: 'VISITING A MUSEUM', label: 'MUSEUM' },
        { src: '/Valentines/5-activities/thrifting.jpg', alt: 'THRIFTING', value: 'THRIFTING', label: 'THRIFTING' },
        { src: '/Valentines/shrug.png', alt: 'CANT DECIDE (SURPRISE ME)', value: "CAN'T DECIDE (SURPRISE ME)", label: "CAN'T DECIDE (SURPRISE ME)" }
    ];

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 5 )</h1>
            <h1 className="text-3xl font-bold mb-4">WHAT ACTIVITIES DO YOU WANT TO DO AFTER, MY LOVE?</h1>
            <p className="text-lg mt-2 mb-8 font-bold">SELECT 1 - 5</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="card-grid">
                    {activities.map(({ src, alt, value, label }) => (
                        <label
                            key={value}
                            className={`card-selection ${selectedActivities.includes(value) ? 'selected' : ''}`}
                        >
                            <span className="card-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    checked={selectedActivities.includes(value)}
                                    onChange={handleActivityChange}
                                />
                                {label}
                            </span>
                            <div className="card-image-container">
                                <Image src={src} alt={alt} className="card-image" width={120} height={120} />
                            </div>
                            <span className="card-text">{alt}</span>
                        </label>
                    ))}
                </div>

                <div className="mt-8">
                    <button onClick={handleBack} className="font-bold aloean-button back-button">GO BACK</button>
                    <button onClick={handleSubmit} type="submit" className="font-bold aloean-button next-button">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}