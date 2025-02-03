'use client';
import { useRouter } from 'next/navigation';
import '../valentines.css';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">Thank you for being my girlfriend :)</h1>
            <img
                src="/Valentines/flowers.gif"
                alt="Thank you flowers gif"
                className="mt-4 w-64 h-64"
            />
            <p className="mt-4 text-xl">You are amazing and im so lucky to have you in my life &lt;333</p>
            <button
                onClick={() => router.push('/')}
                className="valentines-button mt-8"
            >
                Finish
            </button>
        </div>
    );
}
