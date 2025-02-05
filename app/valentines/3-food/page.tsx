'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import '../valentines.css';

export default function FoodSelection() {
    const [selectedFood, setSelectedFood] = useState<string[]>([]);
    const router = useRouter();

    const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedFood((prev) =>
            e.target.checked
                ? [...prev, value]
                : prev.filter((item) => item !== value)
        );
    };

    const submitResponse = async (response: string) => {
        try {
            await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async () => {
        if (selectedFood.length === 0) {
            alert("Baby you didn’t pick one! (Select up to 2)");
            return;
        } else if (selectedFood.length > 2) {
            alert("Damnnnn we big backing??? (Select up to 2)");
            return;
        }

        // Format response
        const formattedResponse =
            selectedFood.length === 1
                ? `I choose ${selectedFood[0]}`
                : `I choose ${selectedFood[0]} and ${selectedFood[1]}`;

        try {
            // Ensure submission before navigating
            await submitResponse(formattedResponse);
            router.push('/valentines/4-dessert');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 3 )</h1>
            <h1 className="text-4xl font-bold mb-4">WHAT FOOD WOULD YOU LIKE TO EAT, MY LOVE?</h1>
            <p className="text-lg font-bold mt-1 mb-4">
                SELECT 1 - 2
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="card-grid">
                    {[
                        { src: "/Valentines/3-food/sushi.jpg", alt: "SUSHI", value: "Sushi" },
                        { src: "/Valentines/3-food/tacos.jpg", alt: "TACOS", value: "Tacos" },
                        { src: "/Valentines/3-food/kbbq.jpg", alt: "KBBQ", value: "KBBQ" },
                        { src: "/Valentines/3-food/bigway.jpg", alt: "BIG WAY HOTPOT", value: "Big Way Hotpot" },
                        { src: "/Valentines/3-food/poke-bowl.jpg", alt: "POKE BOWLS", value: "Poke Bowls" },
                        { src: "/Valentines/3-food/chipotle.jpg", alt: "CHIPOTLE", value: "Chipotle" },
                        { src: "/Valentines/3-food/pizza.jpg", alt: "PIZZA", value: "Pizza" },
                        { src: "/Valentines/3-food/donair.jpg", alt: "DONAIR", value: "Donair" },
                        { src: "/Valentines/3-food/sandwich.jpg", alt: "SANDWICH", value: "Sandwich" },
                        { src: "/Valentines/3-food/chungchun.jpeg", alt: "CHUNG CHUN RICE DOG", value: "Chung Chun Rice Dogs" },
                        { src: "/Valentines/3-food/fishnchips.jpg", alt: "FISH & CHIPS", value: "Fish and Chips" },
                        { src: "/Valentines/3-food/pasta.jpg", alt: "PASTA", value: "Pasta" },
                        { src: "/Valentines/shrug.png", alt: "CAN'T DECIDE (SURPRISE ME)", value: "CAN&apos;T DECIDE (SURPRISE ME)" }
                    ].map(({ src, alt, value }) => (
                        <label
                            className={`card-selection ${selectedFood.includes(value) ? 'selected' : ''}`}
                            key={value}
                        >
                            <span className="card-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={handleFoodChange}
                                />
                                {alt}
                            </span>
                            <div className="card-image-container">
                                <Image src={src} alt={alt} width={120} height={120} className="card-image" />
                            </div>
                            <span className="card-text">
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={handleFoodChange}
                                />
                                {alt}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="mt-8">
                    <button onClick={handleBack} className="font-bold back-button valentines-page-button">GO BACK</button>
                    <button onClick={handleSubmit} className="font-bold next-button valentines-page-button">NEXT LEVEL</button>
                </div>
            </form>
        </div>
    );
}