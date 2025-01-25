import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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

        <h1 className="text-4xl font-bold text-gray-800">AloEan</h1>

        <p className="mt-4 text-md text-gray-600">
          Choose a game below.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link href="/html-and-js">
            <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest">
              🐈‍⬛ Jumping Milo
            </button>
          </Link>

          <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest">
            📍 Big Back Map
          </button>

          <button className="bg-forest_light text-white p-4 rounded-full w-full hover:bg-forest">
            🌹 Will I See You Again?
          </button>
        </div>
      </main>
    </div>
  );
}