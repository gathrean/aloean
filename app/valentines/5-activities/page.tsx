'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../valentines.css';

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
            alert("baby you didn’t pick one!\n\n(Select up to 2)");
            return;
        } else if (selectedActivities.length > 5) {
            alert("damn hol up we can only do so much in one day???\n\n(Select up to 5)");
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
        { src: '/Valentines/5-activities/arcade.jpg', alt: 'REC ROOM', value: 'GOING TO THE REC ROOM IN GRANVILLE', label: 'REC ROOM' },
        { src: '/Valentines/5-activities/museum.jpg', alt: 'MUSEUM DATE', value: 'VISITING A MUSEUM', label: 'MUSEUM DATE' },
        { src: '/Valentines/5-activities/sunset.jpg', alt: 'WATCH THE SUNSET', value: 'WATCHING THE SUNSET', label: 'WATCH THE SUNSET' },
        { src: '/Valentines/5-activities/music-store.jpg', alt: 'MUSIC STORE', value: 'CHECKING OUT A MUSIC STORE', label: 'MUSIC STORE' },
        { src: '/Valentines/5-activities/photobooth.jpg', alt: 'PHOTO BOOTH', value: 'VISITING A VINTAGE PHOTO BOOTH', label: 'PHOTO BOOTH' },
        { src: '/Valentines/5-activities/cafe.jpg', alt: 'CAFE DATE', value: 'CHILLING AT A CAFE', label: 'CAFE DATE' },
        { src: '/Valentines/5-activities/build-a-bear.jpg', alt: 'BUILD-A-BEAR', value: 'GOING TO A BUILD-A-BEAR', label: 'BUILD-A-BEAR' },
        { src: '/Valentines/5-activities/aquarium.jpg', alt: 'AQUARIUM', value: 'CHECKING OUT THE AQUARIUM', label: 'AQUARIUM' },
        { src: '/Valentines/shrug.png', alt: 'Surprise Me', value: "CAN'T DECIDE (SURPRISE ME)", label: "CAN'T DECIDE (SURPRISE ME)" }
    ];

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 5 )</h1>
            <h1 className="text-4xl font-bold mb-4">WHAT ACTIVITIES DO YOU WANT TO DO AFTER, MY LOVE?</h1>
            <p className="text-lg mt-2 mb-4 font-bold">SELECT 1 - 5</p>

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
                    <button onClick={handleBack} className="font-bold valentines-page-button back-button">GO BACK</button>
                    <button type="submit" className="font-bold valentines-page-button next-button">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}