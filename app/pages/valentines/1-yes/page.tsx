'use client';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function ThankYou() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">LET'S GOOOOOOOOOO</h1>
            <img src="/Valentines/bee.gif" alt="bee gif" className="mt-4" />
            <p className="mt-4">Hold on my love, there's more</p>
            <button
                onClick={() => router.push('/pages/valentines/2-date')}
                className="valentines-button mt-8"
            >
                click me!!!
            </button>
        </div>
    );
}