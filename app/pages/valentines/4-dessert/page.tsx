'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image for optimization

import '../valentines.css';

export default function DessertSelection() {
    const [selectedDesserts, setSelectedDesserts] = useState<string[]>([]);
    const router = useRouter();

    const handleDessertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedDesserts((prev) =>
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
        if (selectedDesserts.length === 0) {
            alert("Baby you didn’t pick one! (Select up to 3)");
            return;
        } else if (selectedDesserts.length > 3) {
            alert("Damnnnn we big backing??? (Select up to 3)");
            return;
        }

        // Format response
        const formattedResponse =
            selectedDesserts.length === 1
                ? `I choose ${selectedDesserts[0]}`
                : `I choose ${selectedDesserts.join(' and ')}`;

        try {
            // Ensure submission before navigating
            await submitResponse(formattedResponse);
            router.push('/pages/valentines/5-activities');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold mb-4">Which dessert/snacks are we eating, my love?</h1>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <p className="text-lg mt-2 mb-4 font-medium">
                    Pls select up to 3
                </p>

                <div className="checkbox-container">
                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/icecream.jpg" alt="Ice Cream" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Ice Cream"
                                onChange={handleDessertChange}
                            />
                            Ice Cream (Rocky Point)
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/bubble-tea.jpg" alt="Bubble Tea" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Bubble Tea"
                                onChange={handleDessertChange}
                            />
                            Bubble Tea
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/mochi.jpg" alt="Mochi" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Mochi"
                                onChange={handleDessertChange}
                            />
                            Mochi
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/matcha.jpg" alt="Matcha" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Matcha"
                                onChange={handleDessertChange}
                            />
                            Matcha
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/chocolate.jpg" alt="Chocolate" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Chocolate"
                                onChange={handleDessertChange}
                            />
                            Chocolate
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/frozen-yogurt.jpg" alt="Frozen Yogurt" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Frozen Yogurt"
                                onChange={handleDessertChange}
                            />
                            Frozen Yogurt
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/indian-desserts.jpg" alt="Indian Desserts" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Indian Desserts"
                                onChange={handleDessertChange}
                            />
                            Indian Desserts
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/4-dessert/filipino-desserts.jpg" alt="Filipino Desserts" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="Filipino Desserts"
                                onChange={handleDessertChange}
                            />
                            Filipino Desserts
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <Image src="/Valentines/idk.gif" alt="I can't decide" className="checkbox-image" width={300} height={300} />
                        <span>
                            <input
                                type="checkbox"
                                value="(I can&apos;t decide on desserts, surprise me)"
                                onChange={handleDessertChange}
                            />
                            i can&apos;t decide!!!!! (Surprise Me!!!!)
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