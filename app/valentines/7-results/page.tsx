'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
    const router = useRouter();
    const [valentineData, setValentineData] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {
        // Retrieve stored data from localStorage
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        console.log("📜 Loaded Valentine Response:", storedData);
        setValentineData(storedData);
    }, []);

    return (
        <div className="valentines-page">
            <h1 className="text-3xl font-bold">💖 Your Valentine's Date Plan 💖</h1>

            {valentineData ? (
                <div className="mt-6 p-4 border border-red-400 rounded-lg bg-white shadow-lg">
                    <p><strong>📅 Date:</strong> {valentineData.responseDate || "Not selected"}</p>
                    <p><strong>📍 Location:</strong> {valentineData.responseLocation || "Not selected"}</p>
                    <p><strong>⏰ Time:</strong> {valentineData.responseTime || "Not selected"}</p>

                    <h3 className="text-xl font-bold mt-4">🍽️ FOOD SELECTION:</h3>
                    <ul>
                        <li>{valentineData.responseDessert1 || "No selection"}</li>
                        <li>{valentineData.responseDessert2 || "No selection"}</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-4">🍰 DESSERT SELECTION:</h3>
                    <ul>
                        {valentineData.selectedDesserts?.length > 0 ? (
                            valentineData.selectedDesserts.map((dessert: string, index: number) => (
                                <li key={index}>{dessert}</li>
                            ))
                        ) : (
                            <li>No desserts selected</li>
                        )}
                    </ul>

                    <h3 className="text-xl font-bold mt-4">🎭 ACTIVITY SELECTION:</h3>
                    <ul>
                        {[
                            valentineData.responseActivity1,
                            valentineData.responseActivity2,
                            valentineData.responseActivity3,
                            valentineData.responseActivity4,
                            valentineData.responseActivity5
                        ].filter(Boolean).map((activity: string, index: number) => (
                            <li key={index}>{activity}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mt-4 text-red-500">No data available. Please complete the Valentine’s form.</p>
            )}

            <button onClick={() => router.push('/')} className="font-bold valentines-page-button back-button mt-8">
                GO HOME
            </button>
        </div>
    );
}