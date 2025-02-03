'use client';
import { useRouter } from 'next/navigation';

import '../valentines.css'; 

export default function Nope() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gray-800">I know you're kidding baby but that hurt a little bit :(</h1>
            <img src="/Valentines/sad-cat.gif" alt="Sad cat gif" className="mt-4" />
            <button
                onClick={() => router.push('/pages/valentines')}
                className="mt-4 bg-yellow-500 text-white p-4 rounded-full w-40 hover:bg-yellow-600"
            >
                I changed my mind!
            </button>
        </div>
    );
}