'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css'; 

export default function FoodSelection() {
    const [selectedFood, setSelectedFood] = useState('');
    const router = useRouter();

    const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFood(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedFood) {
            // Store or send the selected food choice
            router.push('/pages/valentines/dessert');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">What food would you like to eat?</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="food"
                            value="sushi"
                            checked={selectedFood === 'sushi'}
                            onChange={handleFoodChange}
                        />
                        Sushi
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="food"
                            value="tacos"
                            checked={selectedFood === 'tacos'}
                            onChange={handleFoodChange}
                        />
                        Tacos
                    </label>
                </div>
                {/* Add more food options here */}
                <div>
                    <label>
                        <input
                            type="radio"
                            name="food"
                            value="surprise"
                            checked={selectedFood === 'surprise'}
                            onChange={handleFoodChange}
                        />
                        I can't decide!!! (Surprise me)
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white p-4 rounded-full w-40 hover:bg-green-600"
                >
                    Next
                </button>
            </form>
        </div>
    );
}