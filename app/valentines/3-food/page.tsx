'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../valentines.css';

export default function FoodSelection() {
    const [selectedFood, setSelectedFood] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Retrieve previous selections
        const storedValentineResponse = JSON.parse(localStorage.getItem('valentineResponse') || '{}');
        const storedFoodData = JSON.parse(sessionStorage.getItem('selectedFoods') || '[]');

        console.log("Stored Valentine Response:", storedValentineResponse);
        console.log("🍽️ Selected Food Data:", storedFoodData);
        // Set the previous foods from storage
        setSelectedFood(storedFoodData);
    }, []);

    const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let updatedSelection;

        if (e.target.checked) {
            updatedSelection = [...selectedFood, value];
        } else {
            updatedSelection = selectedFood.filter((item) => item !== value);
        }

        setSelectedFood(updatedSelection);

        // Retrieve previous responses and update only the food
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        const updatedData = { ...storedData, selectedFood: updatedSelection };

        localStorage.setItem("valentineResponse", JSON.stringify(updatedData));
    };


    const handleSubmit = async () => {
        if (selectedFood.length === 0) {
            alert("my love you didnt pick one!\n\n(Select up to 2)");
            return;
        } else if (selectedFood.length > 2) {
            alert("damnnnn are we big backing???\n\n(Select up to 2)");
            return;
        }

        // Retrieve previous responses
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");

        // Overwrite desserts while keeping existing data
        const updatedData = {
            ...storedData,
            responseFood1: selectedFood[0] || null,
            responseFood2: selectedFood[1] || null, // Optional second dessert
        };

        localStorage.setItem("valentineResponse", JSON.stringify(updatedData));

        try {
            await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            router.push('/valentines/4-dessert');
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
            <h1 className="text-xl font-bold mb-2">( LEVEL 3 )</h1>
            <h1 className="text-3xl font-bold mb-4">WHAT FOOD WOULD YOU LIKE TO EAT, MY LOVE?</h1>
            <p className="text-lg font-bold mt-1 mb-8">
                SELECT 1 - 2
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="card-grid">
                    {[
                        { src: "/Valentines/3-food/sushi.jpg", alt: "SUSHI", value: "SUSHI" },
                        { src: "/Valentines/3-food/tacos.jpg", alt: "TACOS", value: "TACOS" },
                        { src: "/Valentines/3-food/k-bbq.jpg", alt: "KBBQ", value: "KBBQ" },
                        { src: "/Valentines/3-food/bigway.jpg", alt: "BIG WAY HOTPOT", value: "BIG WAY HOTPOT" },
                        { src: "/Valentines/3-food/poke-bowl.jpg", alt: "POKE BOWLS", value: "POKE BOWLS" },
                        { src: "/Valentines/3-food/chipotle.jpg", alt: "CHIPOTLE", value: "CHIPOTLE" },
                        { src: "/Valentines/3-food/pizza.jpg", alt: "PIZZA", value: "PIZZA" },
                        { src: "/Valentines/3-food/donair.jpg", alt: "DONAIR", value: "DONAIR" },
                        { src: "/Valentines/3-food/sandwich.jpg", alt: "SANDWICH", value: "SANDWICH" },
                        { src: "/Valentines/3-food/fishnchips.jpg", alt: "FISH & CHIPS", value: "FISH & CHIPS" },
                        { src: "/Valentines/3-food/pasta.jpg", alt: "PASTA", value: "PASTA" },
                        { src: "/Valentines/shrug.png", alt: "CAN'T DECIDE (SURPRISE ME)", value: "CAN'T DECIDE (SURPRISE ME)" }
                    ].map(({ src, alt, value }) => (
                        <label
                            className={`card-selection ${selectedFood.includes(value) ? 'selected' : ''}`}
                            key={value}
                        >
                            <span className="card-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    checked={selectedFood.includes(value)}
                                    onChange={handleFoodChange}
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
                    <button onClick={handleBack} className="font-bold back-button aloean-button">GO BACK</button>
                    <button className="font-bold next-button aloean-button">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}