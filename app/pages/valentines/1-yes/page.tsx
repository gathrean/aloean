'use client';
import { useRouter } from 'next/navigation';

import '../valentines.css'; 

export default function ThankYou() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gray-800">Thank you baby</h1>
            <img src="/Valentines/thank-you-gif.gif" alt="Thank you gif" className="mt-4" />
            <p className="mt-4">Hold on habibti, there's more</p>
            <button
                onClick={() => router.push('/pages/valentines/2-date')}
                className="mt-4 bg-blue-500 text-white p-4 rounded-full w-40 hover:bg-blue-600"
            >
                Continue
            </button>
        </div>
    );
}