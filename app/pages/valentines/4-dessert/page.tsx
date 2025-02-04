'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../valentines.css';

const desserts = [
    { name: 'Ice Cream', src: '/Valentines/4-dessert/icecream.jpg', label: 'ICE CREAM' },
    { name: 'Bubble Tea', src: '/Valentines/4-dessert/bubble-tea.jpg', label: 'BUBBLE TEA' },
    { name: 'Mochi', src: '/Valentines/4-dessert/mochi.jpg', label: 'MOCHI' },
    { name: 'Matcha', src: '/Valentines/4-dessert/matcha.jpg', label: 'MATCHA' },
    { name: 'Chocolate', src: '/Valentines/4-dessert/chocolate.jpg', label: 'CHOCOLATES' },
    { name: 'Frozen Yogurt', src: '/Valentines/4-dessert/frozen-yogurt.jpg', label: 'FROZEN YOGURT' },
    { name: 'Indian Desserts', src: '/Valentines/4-dessert/indian-desserts.jpg', label: 'INDIAN DESSERTS' },
    { name: 'Filipino Desserts', src: '/Valentines/4-dessert/filipino-desserts.jpg', label: 'FILIPINO DESSERTS' },
    { name: 'No Desserts', src: '/Valentines/4-dessert/no-desserts.jpg', label: 'NO DESSERTS' },
    { name: "(I can't decide on desserts, surprise me)", src: '/Valentines/idk.gif', label: "CAN'T DECIDE (SURPRISE ME)" }
];

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
            const res = await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ response }),
            });
            if (!res.ok) throw new Error('Failed to submit response');
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

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 4 )</h1>
            <h1 className="text-4xl font-bold mb-4">WHICH DESSERTS / SNACKS ARE WE EATING, MY LOVE?</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <p className="text-lg mt-2 mb-4 font-medium">SELECT 1 - 3</p>
                <div className="checkbox-container">
                    {desserts.map((dessert) => (
                        <label key={dessert.name} className="checkbox-option">
                            <Image src={dessert.src} alt={dessert.name} className="checkbox-image" width={300} height={300} />
                            <span>
                                <input type="checkbox" value={dessert.name} onChange={handleDessertChange} />
                                {dessert.label}
                            </span>
                        </label>
                    ))}
                </div>
                <div className="mt-8">
                    <button onClick={() => router.back()} className="back-button font-bold">GO BACK</button>
                    <button onClick={handleSubmit} className="valentines-button font-bold">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}