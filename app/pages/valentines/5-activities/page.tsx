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

    const submitResponse = async (response: string) => {
        try {
            const res = await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }),
            });

            if (!res.ok) {
                throw new Error('Failed to submit response');
            }
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
            // Send multiple responses (one per activity)
            for (const activity of selectedActivities) {
                await submitResponse(activity);
            }

            // Navigate to the next page after all responses are submitted
            router.push('/pages/valentines/6-thank-you');
        } catch (error) {
            console.error("Failed to submit responses:", error);
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
                                value="Arcade"
                                onChange={handleActivityChange}
                            />
                            Arcade (Granville Rec Room)
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/museum.jpg" alt="Museum" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Museum Date"
                                onChange={handleActivityChange}
                            />
                            Museum Date
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/sunset.jpg" alt="Sunset" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Sunset Watching"
                                onChange={handleActivityChange}
                            />
                            Watch the sunset
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/music-store.jpg" alt="Music Store" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Music Store"
                                onChange={handleActivityChange}
                            />
                            Music Store
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/photobooth.jpg" alt="Vintage Photo Booth" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Vintage Photo Booth"
                                onChange={handleActivityChange}
                            />
                            Vintage photo booth 👀
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/cafe.jpg" alt="Cafe" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Cafe Date"
                                onChange={handleActivityChange}
                            />
                            Cafe date
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/build-a-bear.jpg" alt="Build-A-Bear" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Build-A-Bear"
                                onChange={handleActivityChange}
                            />
                            Build-A-Bear
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/5-activities/aquarium.jpg" alt="Aquarium" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Aquarium"
                                onChange={handleActivityChange}
                            />
                            Aquarium
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/idk.gif" alt="Surprise Me" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="(I can't decide on activities, surprise me)"
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