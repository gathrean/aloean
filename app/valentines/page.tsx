'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './/valentines.css';

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
        <div className="valentines-page">
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <h1 className="text-5xl font-bold">WILL YOU BE MY VALENTINE?</h1>
                <br></br>
                <p className="text-3xl font-bold mt-2">🐢❤️🐻‍❄️</p>
                <p className="font-bold">( V-ALOE-NT-EAN-E )</p>
                <br />
                <Image
                    src="/Valentines/cat-begging.gif"
                    alt="Valentine's Day Image"
                    width={300}
                    height={300}
                    className="mt-4"
                />
                <br />
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => {
                            submitResponse('No, I won\'t be your Valentine :(');
                            router.push('/valentines/1-no');
                        }}
                        className="back-button font-bold"
                    >
                        No.
                    </button>
                    <button
                        onClick={() => {
                            submitResponse('Yes, I will be your Valentine!');
                            router.push('/valentines/1-yes');
                        }}
                        className="valentines-button font-bold"
                    >
                        YESSS!!!!!!!!!
                    </button>
                </div>
            </main>
        </div>
    );
}