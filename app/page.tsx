'use client'; // Ensure this is added

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check localStorage for saved mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    } else {
      // Default mode logic, set to false for light mode initially
      setIsDarkMode(false);
    }
  }, []);

  // Apply dark mode or light mode based on the button toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

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

        <p className="mt-4 text-md text-gray-600 dark:text-gray-400">
          Choose a game below.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link href="/html-and-js">
            <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
              🐈‍⬛ Jumping Milo
            </button>
          </Link>

          <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
            📍 Big Back Map
          </button>

          <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest dark:bg-forest_light dark:hover:bg-forest">
            🌹 Will I See You Again?
          </button>
        </div>
      </main>
      
    </div>
  );
}