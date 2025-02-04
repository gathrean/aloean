'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component
import '../valentines.css';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="valentines-page">
            <h1 className="text-4xl font-bold">THANK YOU FOR BEING MY VALENTINE AND MY GIRLFRIEND :)</h1>
            <Image
                src="/Valentines/red-roses.gif"
                alt="Thank you flowers gif"
                width={256} // Specify width
                height={256} // Specify height
                className="mt-4"
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