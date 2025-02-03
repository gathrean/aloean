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
        <div className="valentines-page">
            <h1 className="text-4xl font-bold mb-4">Which dessert/snacks are we eating, my love?</h1>
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
                    <label className="checkbox-option">
                        <img src="/Valentines/idk.gif" alt="Arcade" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="arcade"
                            />
                            i can't decide!!!!! (Surprise Me!!!!)
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="valentines-button mt-8"
                >
                    Next
                </button>
            </form>
        </div>
    );
}