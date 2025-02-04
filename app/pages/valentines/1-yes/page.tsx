'use client';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function ThankYou() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">LET'S GOOOOOOOOOO</h1>
            <img src="/Valentines/1/bee.gif" alt="bee gif" className="mt-4 w-[300px] h-[300px] object-cover" />
            <p className="mt-4">✋🏽 WAIT!</p>
            <p className="mt-4">Hold on my love, there's more</p>
            <button
                onClick={() => router.push('/pages/valentines/2-date')}
                className="valentines-button mt-2"
            >
                click me!!!
            </button>
        </div>
    );
}