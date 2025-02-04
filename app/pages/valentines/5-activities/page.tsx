'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css';

const activities = [
    { src: '/Valentines/5-activities/arcade.jpg', alt: 'Arcade', value: 'Arcade', label: 'ARCADE (GRANVILLE REC ROOM)' },
    { src: '/Valentines/5-activities/museum.jpg', alt: 'Museum', value: 'Museum Date', label: 'MUSEUM DATE' },
    { src: '/Valentines/5-activities/sunset.jpg', alt: 'Sunset', value: 'Sunset Watching', label: 'WATCH THE SUNSET' },
    { src: '/Valentines/5-activities/music-store.jpg', alt: 'Music Store', value: 'Music Store', label: 'MUSIC STORE' },
    { src: '/Valentines/5-activities/photobooth.jpg', alt: 'Vintage Photo Booth', value: 'Vintage Photo Booth', label: 'PHOTO BOOTH (VINTAGE) 👀' },
    { src: '/Valentines/5-activities/cafe.jpg', alt: 'Cafe', value: 'Cafe Date', label: 'CAFE DATE' },
    { src: '/Valentines/5-activities/build-a-bear.jpg', alt: 'Build-A-Bear', value: 'Build-A-Bear', label: 'BUILD-A-BEAT' },
    { src: '/Valentines/5-activities/aquarium.jpg', alt: 'Aquarium', value: 'Aquarium', label: 'AQUARIUM' },
    { src: '/Valentines/idk.gif', alt: 'Surprise Me', value: "CAN'T DECIDE (SURPRISE ME)", label: "CAN'T DECIDE (SURPRISE ME)" }
];

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
            const res = await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ response })
            });
            if (!res.ok) throw new Error('Failed to submit response');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    const handleSubmit = async () => {
        if (selectedActivities.length === 0) {
            alert("Baby you didn’t pick one! (Select up to 5)");
            return;
        } else if (selectedActivities.length > 5) {
            alert("Damnnnn you don't want us to do anything? :((( (Select up to 5)");
            return;
        }
        try {
            await Promise.all(selectedActivities.map(activity => submitResponse(activity)));
            router.push('/pages/valentines/6-thank-you');
        } catch (error) {
            console.error("Failed to submit responses:", error);
        }
    };

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 5 )</h1>
            <h1 className="text-4xl font-bold mb-4">WHAT ACTIVITIES DO YOU WANT TO DO AFTER, MY LOVE?</h1>
            <p className="text-lg mt-2 mb-4 font-medium">SELECT 1 - 5</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="checkbox-container">
                    {activities.map(({ src, alt, value, label }) => (
                        <label key={value} className="checkbox-option">
                            <Image src={src} alt={alt} className="checkbox-image" width={500} height={300} />
                            <span>
                                <input type="checkbox" value={value} onChange={handleActivityChange} />
                                {label}
                            </span>
                        </label>
                    ))}
                </div>
                <div className="mt-8">
                    <button type="button" onClick={router.back} className="back-button font-bold">GO BACK</button>
                    <button type="submit" className="valentines-button font-bold">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}