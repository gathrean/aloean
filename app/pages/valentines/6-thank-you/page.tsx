'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component
import '../valentines.css';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">MY LOVE, BABY, حبيبتي, THANK YOU FOR BEING MY VALENTINE AND MY GIRLFRIEND :)</h1>
            <Image
                src="/Valentines/red-roses.gif"
                alt="Thank you flowers gif"
                width={256}
                height={256}
                className="mt-4"
            />
            <p className="mt-4 mb-1 font-bold text-xl">YOU ARE AMAZING AND I AM SO LUCKY TO HAVE YOU IN MY LIFE &lt;333</p>
            <p className="mt-1 mb-1 font-bold text-xl">SEE YOU SOON !!!</p>
            <p className="mt-1 mb-4 font-bold text-xl">-BUBS</p>

            <button onClick={() => router.push('/')} className="valentines-button font-bold mt-8">PRINT RESULTS</button>

            <div className="mt-4">
                <button onClick={() => router.push('/pages/valentines')} className="back-button font-bold mt-8">RESTART</button>
                <button onClick={() => router.push('/')} className="back-button font-bold mt-8">GO HOME</button>
            </div>
        </div>
    );
}