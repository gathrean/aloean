'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import '@/app/styles/valentines.css';
import '@/app/styles/falling-roses.css';

type FallingRose = {
    id: number;
    left: number;
    duration: number;
    delay: number;
};

export default function ThankYouPage() {
    const router = useRouter();
    const [fallingRoses, setFallingRoses] = useState<FallingRose[]>([]);

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

        const storedData = JSON.parse(localStorage.getItem("valentineResponse") || "{}");
        console.log("💌 Stored Valentine Response:", storedData);
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
                        left: `${rose.left / 1.20}%`,
                        animationDuration: `${rose.duration}s`,
                        animationDelay: `${rose.delay}s`
                    }}
                />
            ))}

            <h1 className="text-3xl font-bold">MY BABY, حبيبتي, MY LOVE,</h1>
            <h1 className="text-3xl font-bold">THANK YOU FOR BECOMING MY VALENTINE & MY GIRLFRIEND :)</h1>
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

            <button onClick={() => router.push('/valentines/7-results')} className="font-bold aloean-button next-button mt-8">
                VIEW RESULTS
            </button>

            <div className="mt-4">
                <button
                    onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        router.push('/valentines'); // Redirects to the restart page
                    }}
                    className="font-bold aloean-button back-button mt-8"
                >
                    RESTART
                </button>
            </div>
            <div className="mt-4 mb-8">
                <button onClick={() => router.push('/')} className="font-bold aloean-button back-button mt-8">
                    GO HOME
                </button>
            </div>
        </div>
    );
}