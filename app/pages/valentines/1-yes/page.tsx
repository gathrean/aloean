'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // ✅ Import Image from Next.js
import '../valentines.css';

export default function ThankYou() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">LET&apos;S GOOOOOOOOOO</h1>

            <Image
                src="/Valentines/1/bee.gif"
                alt="bee gif"
                width={300}
                height={300}
                className="mt-4 object-cover"
            />

            <p className="font-bold mt-4">✋🏽</p>
            <p className="font-bold">WAIT!</p>
            <p className="font-bold">HOLD ON MY LOVE THERE&apos;S MORE</p>

            <br></br>
            <button
                onClick={() => router.push('/pages/valentines/2-date')}
                className="valentines-button font-bold"
            >
                CLICK ME
            </button>
        </div>
    );
}