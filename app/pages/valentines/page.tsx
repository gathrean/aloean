// app/pages/valentines/page.tsx

'use client';

import { useState } from 'react';

export default function Valentines() {
    const [response, setResponse] = useState<string | null>(null);

    const submitResponse = async (response: string) => {
        try {
            const res = await fetch('/api/valentines/submit-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data.message);
            } else {
                console.error('Error submitting response');
            }
        } catch (error) {
            console.error('Error:', error); 
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Will you be my valentine's?
                </h1>

                <br />

                {response === null ? (
                    <img src="/Valentines/cat-begging.gif" alt="Begging cat" />
                ) : response === 'yes' ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800">Thank you :)))</h2>
                        <img src="/Valentines/thank-you-gif.gif" alt="Thank you gif" />
                    </>
                ) : (
                    <img src="/Valentines/sad-cat.gif" alt="Sad cat" />
                )}

                <br />

                {response === null && (
                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={() => {
                                setResponse('yes'); // Update the state when "Yes" is clicked
                                submitResponse('Yes, I will be your Valentine :)'); // Send the response to the backend
                            }}
                            className="bg-forest_light text-white p-4 rounded-full w-32 hover:bg-forest"
                        >
                            Yes
                        </button>

                        <button
                            onClick={() => {
                                setResponse('no'); // Update the state when "No" is clicked
                                submitResponse('No, I won\'t be your Valentine :('); // Send the response to the backend
                            }}
                            className="bg-forest_light text-white p-4 rounded-full w-32 hover:bg-forest"
                        >
                            No
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}