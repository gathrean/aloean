'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import '../valentines.css';
import './falling-roses.css';

// Define the type for the falling rose
type FallingRose = {
    id: number;
    left: number;
    duration: number;
    delay: number;
};

export default function ThankYouPage() {
    const router = useRouter();
    const [fallingRoses, setFallingRoses] = useState<FallingRose[]>([]);
    const [valentineData, setValentineData] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {
        const createFallingRoses = () => {
            const roses: FallingRose[] = [];
            for (let i = 0; i < 25; i++) {
                roses.push({
                    id: i,
                    left: Math.random() * 100,
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2
                });
            }
            setFallingRoses(roses);
        };

        createFallingRoses();

        // Retrieve and parse data from localStorage
        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        console.log("💌 Stored Valentine Response:", storedData);

        // Set the data in state
        setValentineData(storedData);
    }, []);

    return (
        <div className="valentines-page">
            {fallingRoses.map((rose) => (
                <Image
                    key={rose.id}
                    src="/Valentines/red-roses.gif"
                    alt="Falling rose"
                    width={10}
                    height={10}
                    className="falling-rose"
                    style={{
                        left: `${rose.left}%`,
                        animationDuration: `${rose.duration}s`,
                        animationDelay: `${rose.delay}s`
                    }}
                />
            ))}

            <h1 className="text-4xl font-bold">@ MY BABY, حبيبتي, MY LOVE,</h1>
            <h1 className="text-4xl font-bold">THANK YOU FOR BEING MY VALENTINE AND MY GIRLFRIEND :)</h1>
            <Image
                src="/Valentines/red-roses.gif"
                alt="Thank you flowers gif"
                width={256}
                height={256}
                className="mt-4"
            />
            <p className="mt-4 mb-1 font-bold text-xl">
                YOU ARE AMAZING AND I AM SO LUCKY TO HAVE YOU IN MY LIFE &lt;333
            </p>
            <p className="mt-1 mb-1 font-bold text-xl">SEE YOU SOON !!!</p>
            <p className="mt-1 mb-4 font-bold text-xl">-BUBS</p>

            <button onClick={() => router.push('/valentines/7-results')} className="font-bold valentines-page-button next-button mt-8">
                VIEW RESULTS
            </button>

            <div className="mt-4">
                <button
                    onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        router.push('/valentines'); // Redirects to the restart page
                    }}
                    className="font-bold valentines-page-button back-button mt-8"
                >
                    RESTART
                </button>
                <button onClick={() => router.push('/')} className="font-bold valentines-page-button back-button mt-8">
                    GO HOME
                </button>
            </div>
        </div>
    );
}