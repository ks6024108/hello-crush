import ConfessionList from "@/components/ConfessionList";

export default function ConfessionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0e1c] via-[#2b0c25] to-[#100112] text-white py-10 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-pink-400 drop-shadow-sm">
          💖 Anonymous Crush Confessions
        </h1>
        <p className="text-pink-200 text-sm">
          Real feelings. Hidden hearts. Let the love flow 💌
        </p>
      </div>

      <ConfessionList />
    </main>
  );
}
