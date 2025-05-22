import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-3xl text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-tight">Level Up Gaming Lounge</h1>
        <p className="text-lg font-medium text-gray-300">
          The ultimate destination for gamers. Experience immersive gameplay, top-tier setups, and an unbeatable atmosphere.
        </p>
        <p className="italic text-gray-400">"Level Up Your Play, Elevate Your Experience."</p>

        <div className="mt-6 flex gap-6">
          <button className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 font-semibold transition">
            Book Your Spot
          </button>
          <button className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold transition">
            Explore Games
          </button>
        </div>
      </main>
      <footer className="row-start-3 text-gray-500 text-sm">
        © 2025 Level Up Gaming Lounge. All rights reserved.
      </footer>
    </div>
  );
}
