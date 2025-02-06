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
            <h1 className="text-3xl font-bold">WILL YOU BE MY VALENTINE?</h1>
            <p className="text-3xl font-bold mt-2">🐢❤️🐻‍❄️</p>
            <p className="text-xl font-bold mt-2">( V-ALOE-NT-EAN-E )</p>
            <br />
            <Image
                src="/Valentines/cat-begging.gif"
                alt="Valentine's Day Image"
                width={200}
                height={200}
                className="mt-2"
            />
            <br />
            <div className="button-grid mt-8 flex gap-4">
                <button
                    onClick={() => {
                        submitResponse('No, I won\'t be your Valentine :(');
                        router.push('/valentines/1-no');
                    }}
                    className="font-bold aloean-button back-button"
                >
                    No.
                </button>
                <button
                    onClick={() => {
                        submitResponse('Yes, I will be your Valentine!');
                        router.push('/valentines/1-yes');
                    }}
                    className="font-bold aloean-button next-button"
                >
                    YESSS!!!!!!!!!
                </button>
            </div>
        </div>
    );
}