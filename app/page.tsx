'use client';

import Image from "next/image";
import Link from "next/link";

import './home.css';

export default function Home() {
  return (
    <div className="home-page flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <Image
          src="/AloEan.png"
          alt="AloEan Logo"
          width={300}
          height={300}
          priority
          unoptimized={true}
        />

        <br />

        <div className="mt-8 flex flex-col gap-4">

          <Link href="mayibeyours">
            <button className="aloean-button homepage-button font-bold">
              MAY I BE YOURS? (1/28/2025)
            </button>
          </Link>

          <Link href="/valentines">
            <button className="aloean-button homepage-button font-bold">
              VALENTINE&apos;S (2/14/2025) 
            </button>
          </Link>

        </div>

      </main>
    </div>
  );
}