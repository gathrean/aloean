'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

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
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        console.log("📜 Loaded Valentine Response:", storedData);
        setValentineData(storedData);
    }, []);

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    };

    return (
        <>
            <Head>
                <title>AloEan - Valentine's Plans</title>
                <meta name="description" content="Check out our Valentine's plans for 2025!" />
            </Head>

            <div className="valentines-page">
                <h1 className="text-5xl font-bold">HONEY, WE GOT PLACES TO BE</h1>

                {valentineData ? (
                    <div className="mt-6 p-4">
                        <p><strong>WE ARE NOW EACH OTHER&apos;S VALENTINES THIS 2025</strong></p>
                        <p><strong>WE WILL SEE EACH OTHER ON </strong> {valentineData.responseDate || "Not selected"}</p>
                    </div>
                ) : (
                    <p className="mt-4 text-red-500">No data available. Please complete the Valentine’s form.</p>
                )}

                <div className="mt-8">
                    <button onClick={handleBack} className="font-bold valentines-page-button back-button">GO BACK</button>
                </div>
            </div>
        </>
    );
}