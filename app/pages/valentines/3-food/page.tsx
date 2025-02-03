'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/sushi.jpg" alt="Sushi" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Sushi"
                                onChange={handleFoodChange}
                            />
                            Sushi
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/tacos.jpg" alt="Tacos" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Tacos"
                                onChange={handleFoodChange}
                            />
                            Tacos
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/kbbq.jpg" alt="KBBQ" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="KBBQ"
                                onChange={handleFoodChange}
                            />
                            KBBQ
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/bigway.jpg" alt="Big Way Hotpot" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Big Way Hotpot"
                                onChange={handleFoodChange}
                            />
                            Big Way Hotpot
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/poke-bowl.jpg" alt="Poke Bowls" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Poke Bowls"
                                onChange={handleFoodChange}
                            />
                            Poke Bowls
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/Chipotle.jpg" alt="Chipotle" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Chipotle"
                                onChange={handleFoodChange}
                            />
                            Chipotle
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/pizza.jpg" alt="Pizza" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Pizza"
                                onChange={handleFoodChange}
                            />
                            Pizza
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/donair.jpg" alt="Donair" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Donair"
                                onChange={handleFoodChange}
                            />
                            Donair
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/sandwich.jpg" alt="Sandwich" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Sandwich"
                                onChange={handleFoodChange}
                            />
                            Sandwich
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/chungchun.jpeg" alt="Chung Chun" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Chung Chun Rice Dogs"
                                onChange={handleFoodChange}
                            />
                            Chung Chun Rice Dog
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/fishnchips.jpg" alt="Fish & Chips" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Fish and Chips"
                                onChange={handleFoodChange}
                            />
                            Fish & Chips
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/pasta.jpg" alt="Pasta" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="Pasta"
                                onChange={handleFoodChange}
                            />
                            Pasta
                        </span>
                    </label>

                    <label className="checkbox-option">
                        <img src="/Valentines/idk.gif" alt="I can't decide" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="(I can't decide on the foods, surprise me)"
                                onChange={handleFoodChange}
                            />
                            i can't decide!!!!! (Surprise Me!!!!)
                        </span>
                    </label>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleBack}
                        className="back-button"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="valentines-button"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}