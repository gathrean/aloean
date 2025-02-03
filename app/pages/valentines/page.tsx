'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Valentines() {
    const router = useRouter();

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

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-center">
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold text-gray-800">Will you be my Valentine?</h1>
                <p className="text-2xl mt-2">🐢❤️🐻‍❄️</p>
                <br />
                <img src="/Valentines/cat-begging.gif" alt="Begging cat" className="w-64 h-64" />
                <br />
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => {
                            submitResponse('Yes, I will be your Valentine!');
                            router.push('/pages/valentines/1-yes');
                        }}
                        className="bg-red-500 text-white p-4 rounded-full w-48 hover:bg-red-600"
                    >
                        YESSS!!!!!!!!!
                    </button>
                    <button
                        onClick={() => {
                            submitResponse('No, I won\'t be your Valentine :(');
                            router.push('/pages/valentines/1-no');
                        }}
                        className="bg-gray-500 text-white p-4 rounded-full w-32 hover:bg-gray-600"
                    >
                        nope
                    </button>
                </div>
            </main>
        </div>
    );
}