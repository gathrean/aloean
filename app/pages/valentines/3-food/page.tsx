'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // ✅ Import Image from Next.js

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
            router.push('/pages/valentines/4-dessert');
        } catch (error) {
            console.error("Failed to submit response:", error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold mb-4">What food would you like to eat?</h1>
            <p className="text-lg mt-2 mb-4 font-medium">
                Pls select up to 2
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="checkbox-container">
                    {[
                        { src: "/Valentines/3-food/sushi.jpg", alt: "Sushi", value: "Sushi" },
                        { src: "/Valentines/3-food/tacos.jpg", alt: "Tacos", value: "Tacos" },
                        { src: "/Valentines/3-food/kbbq.jpg", alt: "KBBQ", value: "KBBQ" },
                        { src: "/Valentines/3-food/bigway.jpg", alt: "Big Way Hotpot", value: "Big Way Hotpot" },
                        { src: "/Valentines/3-food/poke-bowl.jpg", alt: "Poke Bowls", value: "Poke Bowls" },
                        { src: "/Valentines/3-food/Chipotle.jpg", alt: "Chipotle", value: "Chipotle" },
                        { src: "/Valentines/3-food/pizza.jpg", alt: "Pizza", value: "Pizza" },
                        { src: "/Valentines/3-food/donair.jpg", alt: "Donair", value: "Donair" },
                        { src: "/Valentines/3-food/sandwich.jpg", alt: "Sandwich", value: "Sandwich" },
                        { src: "/Valentines/3-food/chungchun.jpeg", alt: "Chung Chun", value: "Chung Chun Rice Dogs" },
                        { src: "/Valentines/3-food/fishnchips.jpg", alt: "Fish & Chips", value: "Fish and Chips" },
                        { src: "/Valentines/3-food/pasta.jpg", alt: "Pasta", value: "Pasta" },
                        { src: "/Valentines/idk.gif", alt: "I can't decide", value: "(I can&apos;t decide on the foods, surprise me)" }
                    ].map(({ src, alt, value }) => (
                        <label className="checkbox-option" key={value}>
                            <Image src={src} alt={alt} width={120} height={120} className="checkbox-image" />
                            <span>
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
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                    <button onClick={handleSubmit} className="valentines-button">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}