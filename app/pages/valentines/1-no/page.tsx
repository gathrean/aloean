'use client';
import { useRouter } from 'next/navigation';

import '../valentines.css';

export default function Nope() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black text-gray-200">
            <h1 className="text-4xl font-bold text-gray-300">
                i see...
            </h1>
            <img src="/Valentines/1/spiderman.jpeg" alt="Sad cat gif" className="mt-4" />
            <button
                onClick={() => router.push('/pages/valentines')}
                className="mt-4 bg-gray-800 text-white p-4 rounded-full w-60 hover:bg-gray-900"
            >
                WAIT! TAKE ME BACK!
            </button>
        </div>
    );
}