'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

    const handleSubmit = () => {
        if (selectedDesserts.length > 0) {
            // Store or send the selected desserts
            router.push('/pages/valentines/activities');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Which dessert/snacks are we eating, my love?</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="ice cream"
                            onChange={handleDessertChange}
                        />
                        Ice Cream
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="bubble tea"
                            onChange={handleDessertChange}
                        />
                        Bubble Tea
                    </label>
                </div>
                {/* Add more dessert options here */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="surprise"
                            onChange={handleDessertChange}
                        />
                        I can't decide!!! (Surprise me)
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-orange-500 text-white p-4 rounded-full w-40 hover:bg-orange-600"
                >
                    Next
                </button>
            </form>
        </div>
    );
}