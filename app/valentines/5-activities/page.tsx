'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../valentines.css';

export default function ActivitiesSelection() {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const router = useRouter();

    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedActivities((prev) =>
            e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const submitResponse = async (response: string) => {
        try {
            await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ response }),
            });
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    const handleSubmit = async () => {
        if (selectedActivities.length === 0) {
            alert("baby you didn’t pick one!\n\n(Select up to 5)");
            return;
        } else if (selectedActivities.length > 5) {
            alert("damnnnn we're not doing anything?\n\n(Select up to 5)");
            return;
        }

        const formattedResponse =
            selectedActivities.length === 1
                ? `I want to do ${selectedActivities[0]}`
                : `I want to do ${selectedActivities.join(' and ')}`;

        try {
            await submitResponse(formattedResponse);
            router.push('/valentines/6-thank-you');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    const activities = [
        { src: '/Valentines/5-activities/arcade.jpg', alt: 'Arcade', value: 'Arcade', label: 'ARCADE (GRANVILLE REC ROOM)' },
        { src: '/Valentines/5-activities/museum.jpg', alt: 'Museum', value: 'Museum Date', label: 'MUSEUM DATE' },
        { src: '/Valentines/5-activities/sunset.jpg', alt: 'Sunset', value: 'Sunset Watching', label: 'WATCH THE SUNSET' },
        { src: '/Valentines/5-activities/music-store.jpg', alt: 'Music Store', value: 'Music Store', label: 'MUSIC STORE' },
        { src: '/Valentines/5-activities/photobooth.jpg', alt: 'Vintage Photo Booth', value: 'Vintage Photo Booth', label: 'PHOTO BOOTH (VINTAGE)' },
        { src: '/Valentines/5-activities/cafe.jpg', alt: 'Cafe', value: 'Cafe Date', label: 'CAFE DATE' },
        { src: '/Valentines/5-activities/build-a-bear.jpg', alt: 'Build-A-Bear', value: 'Build-A-Bear', label: 'BUILD-A-BEAR' },
        { src: '/Valentines/5-activities/aquarium.jpg', alt: 'Aquarium', value: 'Aquarium', label: 'AQUARIUM' },
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