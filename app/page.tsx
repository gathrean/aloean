'use client';

import Image from "next/image";
import Link from "next/link";
import DarkMode from "./components/DarkMode";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-forest_night">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <Image
          src="/AloEan.png"
          alt="AloEan Logo"
          width={200}
          height={200}
          priority
          unoptimized={true}
        />

        <br />

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">AloEan</h1>

        <p className="mt-4 text-md text-gray-600 dark:text-gray-300">
          Choose a game below
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link href="/MiloJump/index.html">
            <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
              🐈‍⬛ Milo Jump
            </button>
          </Link>

          <Link href="/pages/valentines">
            <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
              💘 Valentine's 2025
            </button>
          </Link>

          <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
            📍 places to be
          </button>

          <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
            🌹 Will I See You Again?
          </button>
        </div>

      </main>
    </div>
  );
}