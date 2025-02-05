'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../valentines.css';

export default function Nope() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black text-gray-200">
            <h1 className="text-4xl font-bold text-gray-300">
                i see...
            </h1>
            <div className="image-container mt-4">
                <Image
                    src="/Valentines/1/spiderman.jpeg"
                    alt="Sad cat gif"
                    width={400}
                    height={300}
                    className="mt-4"
                />
            </div>

            <br></br>

            <button
                onClick={() => router.push('/pages/valentines')}
                className="font-bold back-button"
            >
                WAIT! GO BACK!
            </button>
        </div>
    );
}