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

    const handleSubmit = () => {
        if (selectedFood.length === 0) {
            alert("Baby you didn’t pick one!");
        } else if (selectedFood.length > 2) {
            alert("damnnnn we big backing??? (pls select 2)");
        } else {
            router.push('/pages/valentines/4-dessert');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold mb-4">What food would you like to eat?</h1>
            <p className="text-lg mt-2 mb-4 font-medium">
                Select up to 2
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="checkbox-container">
                    <label className="checkbox-option">
                        <img src="/Valentines/3-food/sushi.jpg" alt="Sushi" className="checkbox-image" />
                        <span>
                            <input
                                type="checkbox"
                                value="sushi"
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
                                value="tacos"
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
                                value="kbbq"
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
                                value="bigway"
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
                                value="pokebowls"
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
                                value="chipotle"
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
                                value="pizza"
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
                                value="donair"
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
                                value="sandwich"
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
                                value="chungchun"
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
                                value="fish and chips"
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
                                value="idk"
                                onChange={handleFoodChange}
                            />
                            I can't decide!!!!! (Surprise Me!!!!)
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