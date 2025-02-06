'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function ResultsPage() {
    const router = useRouter();
    interface ValentineResponse {
        responseDate?: string;
        responseLocation?: string;
        responseTime?: string;
        responseFood1?: string;
        responseFood2?: string;
        responseDessert1?: string;
        responseDessert2?: string;
        responseActivity1?: string;
        responseActivity2?: string;
        responseActivity3?: string;
        responseActivity4?: string;
        responseActivity5?: string;
    }

    const [valentineData, setValentineData] = useState<ValentineResponse | null>(null);


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
            <h1 className="text-2xl font-bold">MY LOVE,</h1>
            <h1 className="text-2xl font-bold">WE GOT PLACES TO BE</h1>

            {valentineData ? (
                <div className="mt-4 p-4">
                    <p><strong>WE ARE NOW EACH OTHER&apos;S VALENTINES ON  {valentineData.responseDate || "Not selected"}</strong></p>

                    <h3 className="text-xl font-bold mt-4">MEET UP AT</h3>
                    <p>{valentineData.responseLocation || "Not selected"} <strong>@ </strong> {valentineData.responseTime || "Not selected"}</p>

                    <h3 className="text-xl font-bold mt-4">WE WILL BE EATING</h3>
                    <ul>
                        <li>{valentineData.responseFood1 || ""}</li>
                        <li>{valentineData.responseFood2 || ""}</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-4">WE WILL BE MUNCHING ON</h3>
                    <ul>
                        <li>{valentineData.responseDessert1 || ""}</li>
                        <li>{valentineData.responseDessert2 || ""}</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-4">AND WE WILL BE</h3>
                    <ul>
                        <li>{valentineData.responseActivity1 || ""}</li>
                        <li>{valentineData.responseActivity2 || ""}</li>
                        <li>{valentineData.responseActivity3 || ""}</li>
                        <li>{valentineData.responseActivity4 || ""}</li>
                        <li>{valentineData.responseActivity5 || ""}</li>
                    </ul>
                </div>
            ) : (
                <p className="mt-4 text-red-500">No data available. Please complete the Valentine’s form.</p>
            )}

            <br></br>
            <p className="text-3xl font-bold mt-2">🐢❤️🐻‍❄️</p>

            <div className="mt-8">
                <button onClick={handleBack} className="font-bold aloean-button back-button">GO BACK</button>
            </div>
        </div>
    );
}