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

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    return (
        <div className="valentines-page">
            <h1 className="text-3xl font-bold">HONEY, WE GOT PLACES TO BE</h1>

            {valentineData ? (
                <div className="mt-6 p-4">
                    <p><strong>WE WILL SEE EACH OTHER ON </strong> {valentineData.responseDate || "Not selected"}</p>
                    <p><strong>MEET UP AT </strong> {valentineData.responseLocation || "Not selected"}</p>
                    <p><strong>@ </strong> {valentineData.responseTime || "Not selected"}</p>

                    <h3 className="text-xl font-bold mt-4">WE WILL BE EATING</h3>
                    <ul>
                        <li>{valentineData.responseFood1 || "N/A"}</li>
                        <li>{valentineData.responseFood2 || "N/A"}</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-4">AND THEN WE WILL BE MUNCHING ON</h3>
                    <ul>
                        <li>{valentineData.responseDessert1 || "N/A"}</li>
                        <li>{valentineData.responseDessert2 || "N/A"}</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-4">AND WE WILL BE DOING</h3>
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

            <div className="mt-8">
                <button onClick={handleBack} className="font-bold valentines-page-button back-button">GO BACK</button>
            </div>
        </div>
    );
}