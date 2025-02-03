'use client';
import { useRouter } from 'next/navigation';
import '../valentines.css';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">THANK YOU FOR BEING MY VALENTINE AND MY GIRLFRIEND :)</h1>
            <img
                src="/Valentines/red-roses.gif"
                alt="Thank you flowers gif"
                className="mt-4 w-64 h-64"
            />
            <p className="mt-4 text-xl">YOU ARE AMAZING AND I AM SO LUCKY TO HAVE YOU IN MY LIFE &lt;333</p>
            <button
                onClick={() => router.push('/')}
                className="valentines-button mt-8"
            >
                SEE YOU SOON!!
            </button>
        </div>
    );
}
