import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-forest flex items-center justify-center h-[120px]">
        <Image
          src="/AloEan.png"
          alt="AloEan Logo"
          width={130} 
          height={130} 
          priority 
          unoptimized= {true}
        />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-gray-800">Hello, World!</h1>
        <p className="mt-4 text-lg text-gray-600">
          This is a homepage built with Next.js (app directory) and Tailwind CSS.
        </p>
      </main>
    </div>
  );
}