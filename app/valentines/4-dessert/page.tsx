'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../valentines.css';

export default function DessertSelection() {
    const [selectedDesserts, setSelectedDesserts] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedDesserts = JSON.parse(sessionStorage.getItem('selectedDesserts') || '[]');

        // Set the previous dessert from storage
        setSelectedDesserts(storedDesserts);
    }, []);

    const handleDessertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let updatedSelection;

        if (e.target.checked) {
            updatedSelection = [...selectedDesserts, value];
        } else {
            updatedSelection = selectedDesserts.filter((item) => item !== value);
        }

        setSelectedDesserts(updatedSelection);

        // Retrieve previous responses and update only the desserts
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        const updatedData = { ...storedData, selectedDesserts: updatedSelection };

        localStorage.setItem("valentineResponse", JSON.stringify(updatedData));
    };

    const handleSubmit = async () => {
        if (selectedDesserts.length === 0) {
            alert("My love, you should pick at least one! Or you can select the SURPRISE ME option at the end.\n\n(Select up to 2)");
            return;
        } else if (selectedDesserts.length > 2) {
            alert("DAMN. Are we big backing? In this economy?\n\n(Select up to 2)");
            return;
        }

        // Retrieve previous responses
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");

        // Overwrite desserts while keeping existing data
        const updatedData = {
            ...storedData,
            responseDessert1: selectedDesserts[0] || null,
            responseDessert2: selectedDesserts[1] || null, // Optional second dessert
        };

        localStorage.setItem("valentineResponse", JSON.stringify(updatedData));

        try {
            await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            router.push('/valentines/5-activities');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 4 )</h1>
            <h1 className="text-3xl font-bold mb-4">WHICH DESSERTS / SNACKS ARE WE EATING, MY LOVE?</h1>
            <p className="text-lg font-bold mt-1 mb-8">
                SELECT 1 - 2
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="card-grid">
                    {[
                        { src: "/Valentines/4-dessert/icecream.jpg", alt: "ICE CREAM", value: "ICE CREAM" },
                        { src: "/Valentines/4-dessert/bubble-tea.jpg", alt: "BUBBLE TEA", value: "BUBBLE TEA" },
                        { src: "/Valentines/4-dessert/mochi.jpg", alt: "MOCHI", value: "MOCHI" },
                        { src: "/Valentines/4-dessert/matcha.jpg", alt: "MATCHA", value: "MATCHA" },
                        { src: "/Valentines/4-dessert/chungchun.jpeg", alt: "CHUNG CHUN RICE DOG", value: "CHUNG CHUN RICE DOGS" },
                        { src: "/Valentines/4-dessert/chocolate.jpg", alt: "CHOCOLATES", value: "CHOCOLATES" },
                        { src: "/Valentines/4-dessert/frozen-yogurt.jpg", alt: "FROZEN YOGURT", value: "FROZEN YOGURT" },
                        { src: "/Valentines/4-dessert/indian-desserts.jpg", alt: "INDIAN DESSERTS", value: "INDIAN DESSERTS" },
                        { src: "/Valentines/4-dessert/filipino-desserts.jpg", alt: "FILIPINO DESSERTS", value: "FILIPINO DESSERTS" },
                        { src: "/Valentines/4-dessert/no-desserts.jpg", alt: "NO DESSERTS", value: "NO DESSERTS" },
                        { src: "/Valentines/shrug.png", alt: "CAN'T DECIDE; SURPRISE ME", value: "CAN'T DECIDE (SURPRISE ME)" }
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
                                    checked={selectedDesserts.includes(value)}
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
                    <button onClick={handleBack} className="font-bold aloean-button back-button">GO BACK</button>
                    <button className="font-bold aloean-button next-button">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}