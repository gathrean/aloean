'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // ✅ Import Image from Next.js
import '../valentines.css';

export default function ThankYou() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-xl font-bold mb-2">( LEVEL 1 )</h1>
            <h1 className="text-3xl font-bold">LET&apos;S GOOOOOOOOOO</h1>

            <div className="gif-container mt-4">
                <Image
                    src="/Valentines/1/bee.gif"
                    alt="bee gif"
                    width={200}
                    height={200}
                    className="object-cover"
                />
            </div>

            <p className="font-bold text-5xl mt-4">✋🏽</p>
            <p className="font-bold">WAIT!</p>
            <p className="font-bold">HOLD ON MY LOVE THERE&apos;S MORE</p>

            <br></br>
            <button
                onClick={() => router.push('/valentines/2-date')}
                className="font-bold next-button aloean-button"
            >
                NEXT LEVEL
            </button>
        </div>
    );
}