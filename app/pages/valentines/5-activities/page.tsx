'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function ActivitiesSelection() {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const router = useRouter();

    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedActivities((prev) =>
            e.target.checked
                ? [...prev, value]
                : prev.filter((item) => item !== value)
        );
    };

    const handleSubmit = () => {
        if (selectedActivities.length > 0) {
            router.push('/pages/valentines/6-thank-you');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold mb-4">What activities do you want to do after, my love?</h1>

            <p className="text-lg mt-2 mb-4 font-medium">
                Select up to 5
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="checkbox-container">
                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/arcade.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Arcade (Granville Rec Room)
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/museum.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Museum Date
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/sunset.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Watch the sunset
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/music-store.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Music Store
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/photobooth.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Vintage photo booth
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/cafe.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Cafe date
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/build-a-bear.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Build-A-Bear
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/aquarium.jpg" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            Aquarium
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/idk.gif" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                                onChange={handleActivityChange}
                            />
                            i can't decide!!!!! (Surprise Me!!!!)
                        </span>
                    </label>
                </div>

                <div className="mt-8">
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
            </form>
        </div>
    );
}