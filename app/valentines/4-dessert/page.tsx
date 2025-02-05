'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../valentines.css';

export default function DessertSelection() {
    const [selectedDesserts, setSelectedDesserts] = useState<string[]>([]);
    const router = useRouter();

    const handleDessertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedDesserts((prev) =>
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
        if (selectedDesserts.length === 0) {
            alert("baby you didn’t pick one!\n\n(Select up to 3)");
            return;
        } else if (selectedDesserts.length > 3) {
            alert("damnnnn we big backing???\n\n(Select up to 3)");
            return;
        }

        const formattedResponse =
            selectedDesserts.length === 1
                ? `I choose ${selectedDesserts[0]}`
                : `I choose ${selectedDesserts.join(' and ')}`;

        try {
            await submitResponse(formattedResponse);
            router.push('/valentines/5-activities');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 4 )</h1>
            <h1 className="text-4xl font-bold mb-4">WHICH DESSERTS / SNACKS ARE WE EATING, MY LOVE?</h1>
            <p className="text-lg font-bold mt-1 mb-4">
                SELECT 1 - 3
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="card-grid">
                    {[
                        { src: "/Valentines/4-dessert/icecream.jpg", alt: "ICE CREAM", value: "ICE CREAM" },
                        { src: "/Valentines/4-dessert/bubble-tea.jpg", alt: "BUBBLE TEA", value: "BBUBBLE TEA" },
                        { src: "/Valentines/4-dessert/mochi.jpg", alt: "MOCHI", value: "MOCHI" },
                        { src: "/Valentines/4-dessert/matcha.jpg", alt: "MATCHA", value: "MATCHA" },
                        { src: "/Valentines/4-dessert/chocolate.jpg", alt: "CHOCOLATES", value: "CHOCOLATES" },
                        { src: "/Valentines/4-dessert/frozen-yogurt.jpg", alt: "FROZEN YOGURT", value: "FROZEN YOGURT" },
                        { src: "/Valentines/4-dessert/indian-desserts.jpg", alt: "INDIAN DESSERTS", value: "INDIAN DESSERTS" },
                        { src: "/Valentines/4-dessert/filipino-desserts.jpg", alt: "FILIPINO DESSERTS", value: "FILIPINO DESSERTS" },
                        { src: "/Valentines/4-dessert/no-desserts.jpg", alt: "NO DESSERTS", value: "NO DESSERTS" },
                        { src: "/Valentines/shrug.png", alt: "CAN'T DECIDE; SURPRISE ME", value: "CAN'T DECIDE; SURPRISE ME" }
                    ].map(({ src, alt, value }) => (
                        <label
                            className={`card-selection ${selectedDesserts.includes(value) ? 'selected' : ''}`}
                            key={value}
                        >
                            <span className="card-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={handleDessertChange}
                                />
                                {alt}
                            </span>
                            <div className="card-image-container">
                                <Image src={src} alt={alt} width={120} height={120} className="card-image" />
                            </div>
                            <span className="card-text">{alt}</span>
                        </label>
                    ))}
                </div>

                <div className="mt-8">
                    <button onClick={handleBack} className="font-bold valentines-page-button back-button">GO BACK</button>
                    <button onClick={handleSubmit} className="font-bold valentines-page-button next-button">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}