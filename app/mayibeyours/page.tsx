'use client';

import Link from "next/link";
import Image from "next/image";
import "./miby.css";

export default function MayIBeYours() {
    return (
        <div className="miby-page flex flex-col items-center justify-center min-h-screen">
            {/* Display the image */}
            <Image
                src="/mayibeyours/mayibeyours.jpg"
                alt="May I Be Yours?"
                width={1200}
                height={800}
                className="miby-image"
                priority
                unoptimized
            />

            <div className="button-grid mt-8 flex gap-4">
                <a href="/mayibeyours/mayibeyours.pdf" download>
                    <button className="aloean-button mt-4">Download PDF</button>
                </a>
            </div>
            <div className="button-grid mt-8 flex gap-4">
                <Link href="/">
                    <button className="aloean-button back-button mt-4">Go Home</button>
                </Link>
            </div>
        </div>
    );
}