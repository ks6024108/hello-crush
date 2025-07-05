import ConfessionForm from "@/components/ConfessionForm";

export default function ConfessPage() {
  return (
    // Add this to confess/page.tsx wrapper <main>
    <main className="min-h-screen bg-gradient-to-b from-[#120414] via-[#1a0e1c] to-[#0e0610] flex items-center justify-center px-4">
      <ConfessionForm />
    </main>
  );
}
