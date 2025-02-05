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
            alert("baby you didn’t pick one! (Select up to 3)");
            return;
        } else if (selectedDesserts.length > 3) {
            alert("damnnnn we big backing??? (Select up to 3)");
            return;
        }

        const formattedResponse =
            selectedDesserts.length === 1
                ? `I choose ${selectedDesserts[0]}`
                : `I choose ${selectedDesserts.join(' and ')}`;

        try {
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
            <h1 className="text-xl font-bold mb-2">( LEVEL 4 )</h1>
            <h1 className="text-4xl font-bold mb-4">WHICH DESSERTS / SNACKS ARE WE EATING, MY LOVE?</h1>
            <p className="text-lg font-bold mt-1 mb-4">
                SELECT 1 - 3
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="checkbox-container">
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
                            className={`checkbox-option ${selectedDesserts.includes(value) ? 'selected' : ''}`}
                            key={value}
                        >
                            <span className="checkbox-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={handleDessertChange}
                                />
                                {alt}
                            </span>
                            <div className="image-container">
                                <Image src={src} alt={alt} width={120} height={120} className="checkbox-image" />
                            </div>
                            <span className="checkbox-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={handleDessertChange}
                                />
                                {alt}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="mt-8">
                    <button onClick={handleBack} className="back-button font-bold">GO BACK</button>
                    <button onClick={handleSubmit} className="valentines-button font-bold">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}