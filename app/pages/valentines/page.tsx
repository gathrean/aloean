// app/pages/valentines/page.tsx

'use client';

import { useState } from 'react';

export default function Valentines() {
    const [response, setResponse] = useState<string | null>(null); // Store the user's response (Yes or No)

    const submitResponse = async (response: string) => {
        try {
            const res = await fetch('/api/submit-response', { // The relative URL for the API route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }), // Send the response (Yes or No) in the request body
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data.message); // Log the success message
            } else {
                console.error('Error submitting response');
            }
        } catch (error) {
            console.error('Error:', error); // Handle any network errors
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-forest_night">
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Will you be my valentine's?
                </h1>

                <br />

                {response === null ? (
                    <img src="/Valentines/cat-begging.gif" alt="Begging cat" />
                ) : response === 'yes' ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Thank you :)))</h2>
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
                                submitResponse('yes'); // Send the response to the backend
                            }}
                            className="bg-forest_light text-white p-4 rounded-full w-32 hover:bg-forest dark:bg-forest_light dark:hover:bg-forest"
                        >
                            Yes
                        </button>

                        <button
                            onClick={() => {
                                setResponse('no'); // Update the state when "No" is clicked
                                submitResponse('no'); // Send the response to the backend
                            }}
                            className="bg-forest_light text-white p-4 rounded-full w-32 hover:bg-forest dark:bg-forest_light dark:hover:bg-forest"
                        >
                            No
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}