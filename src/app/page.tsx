// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function HomePage() {
//   const [tagline, setTagline] = useState("");
//   const [luckyConfession, setLuckyConfession] = useState<string | null>(null);
//   const phrases = [
//     "Maybe this time, they'll know it's you...",
//     "Your secret could be someone's universe ✫",
//     "Confess what your heart never could say 💌",
//   ];

//   const sampleConfessions = [
//     "I see you every day, and my heart still skips a beat 💓",
//     "We sat beside each other in silence... but I screamed inside.",
//     "Your laughter is still my favorite sound.",
//     "You left, but my feelings stayed.",
//     "Even after all this time, it's still you.",
//     "I wonder if you ever felt the same.",
//   ];

//   useEffect(() => {
//     let currentPhrase = 0;
//     let charIndex = 0;
//     let timeout: NodeJS.Timeout;

//     const type = () => {
//       const currentText = phrases[currentPhrase];
//       if (charIndex <= currentText.length) {
//         setTagline(currentText.slice(0, charIndex));
//         charIndex++;
//         timeout = setTimeout(type, 80);
//       } else {
//         setTimeout(() => {
//           charIndex = 0;
//           currentPhrase = (currentPhrase + 1) % phrases.length;
//           type();
//         }, 2000);
//       }
//     };

//     type();
//     return () => clearTimeout(timeout);
//   }, []);

//   const handleFeelingLucky = () => {
//     const random =
//       sampleConfessions[Math.floor(Math.random() * sampleConfessions.length)];
//     setLuckyConfession(random);
//     setTimeout(() => setLuckyConfession(null), 6000);
//   };

//   return (
//     <main className="relative min-h-screen w-full bg-gradient-to-br from-[#130f40] via-[#2b2e4a] to-[#1e1f26] text-white px-6 py-12 overflow-hidden flex flex-col gap-16">
//       {/* Floating Glow Blobs */}
//       <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
//         <div className="absolute w-[800px] h-[800px] bg-pink-400/10 blur-3xl rounded-full top-1/4 left-1/4 animate-pulse" />
//         <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-20 right-20 animate-ping" />
//       </div>

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center gap-6 text-center mt-20 animate-fade-in">
//         <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-xl">
//           Welcome to <span className="text-pink-400">CrushVerse 💖</span>
//         </h1>
//         <p className="text-lg sm:text-xl text-pink-200 font-light min-h-[40px]">
//           {tagline}
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 mt-6">
//           <Link href="/confess">
//             <button className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg shadow-md transition-all duration-300 hover:scale-105">
//               💌 Create Confession
//             </button>
//           </Link>
//           <Link href="/confessions">
//             <button className="px-8 py-3 rounded-full border border-pink-300 text-pink-200 hover:text-white hover:border-white font-medium text-lg bg-black/20 hover:bg-pink-100/10 shadow-md transition-all duration-300 hover:scale-105">
//               🌸 See All Confessions
//             </button>
//           </Link>
//           <button
//             onClick={handleFeelingLucky}
//             className="px-8 py-3 rounded-full border border-yellow-300 text-yellow-200 hover:text-white hover:border-white font-medium text-lg bg-yellow-200/10 hover:bg-yellow-100/10 shadow-md transition-all duration-300 hover:scale-105"
//           >
//             🌟 Feeling Lucky?
//           </button>
//         </div>
//       </section>

//       {/* Live Confession Teaser */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//         {sampleConfessions.map((confession, i) => (
//           <div
//             key={i}
//             className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm shadow-inner text-sm text-pink-100 hover:scale-[1.02] transition-all"
//           >
//             <p className="italic">&quot;{confession}&quot;</p>
//           </div>
//         ))}
//       </section>

//       {/* Feeling Lucky Modal */}
//       {luckyConfession && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//           <div className="max-w-md mx-auto p-6 bg-white/10 text-pink-100 rounded-xl shadow-xl border border-pink-300 animate-fade-in">
//             <p className="text-lg italic text-center">
//               &quot;{luckyConfession}&quot;
//             </p>
//             <p className="text-sm text-center text-pink-300 mt-4">
//               (auto closes in 6s)
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="text-center text-sm text-pink-300 mt-20 pb-6">
//         <p className="italic">
//           100% Anonymous. No login. No judgment. Just feelings. 💌
//         </p>
//         <p className="mt-2">Made with love by CrushVerse &copy; 2025</p>
//       </footer>
//     </main>
//   );
// }

//new code
"use client";

import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [tagline, setTagline] = useState("");
  const [luckyConfession, setLuckyConfession] = useState<string | null>(null);
  const router = useRouter();
  const [loadingPath, setLoadingPath] = useState<string>("");

  const handleClick = (path: string) => {
    setLoadingPath(path);
    router.push(path);
  };

  // const phrases = [
  //   "Maybe this time, they'll know it's you...",
  //   "Your secret could be someone's universe ✫",
  //   "Confess what your heart never could say 💌",
  // ];

  const sampleConfessions = [
    "I see you every day, and my heart still skips a beat 💓",
    "We sat beside each other in silence... but I screamed inside.",
    "Your laughter is still my favorite sound.",
    "You left, but my feelings stayed.",
    "Even after all this time, it's still you.",
    "I wonder if you ever felt the same.",
  ];

  useEffect(() => {
    const phrases = [
      "Maybe this time, they'll know it's you...",
      "Your secret could be someone's universe ✫",
      "Confess what your heart never could say 💌",
    ];
    let currentPhrase = 0;
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentText = phrases[currentPhrase];
      if (charIndex <= currentText.length) {
        setTagline(currentText.slice(0, charIndex));
        charIndex++;
        timeout = setTimeout(type, 80);
      } else {
        setTimeout(() => {
          charIndex = 0;
          currentPhrase = (currentPhrase + 1) % phrases.length;
          type();
        }, 2000);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  const handleFeelingLucky = () => {
    const random =
      sampleConfessions[Math.floor(Math.random() * sampleConfessions.length)];
    setLuckyConfession(random);
    setTimeout(() => setLuckyConfession(null), 6000);
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-[#130f40] via-[#2b2e4a] to-[#1e1f26] text-white px-6 py-12 overflow-hidden flex flex-col gap-16">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-pink-400/10 blur-3xl rounded-full top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-20 right-20 animate-ping" />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 text-center mt-20 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-xl">
          Welcome to <span className="text-pink-400">Loveria 💖</span>
        </h1>
        <p className="text-lg sm:text-xl text-pink-200 font-light min-h-[40px]">
          {tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => handleClick("/confess")}
            disabled={loadingPath === "/confess"}
            className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            {loadingPath === "/confess"
              ? "Redirecting"
              : "💌 Create Confession"}
          </button>

          <button
            onClick={() => handleClick("/confessions")}
            disabled={loadingPath === "/confessions"}
            className="px-8 py-3 rounded-full border border-pink-300 text-pink-200 hover:text-white hover:border-white font-medium text-lg bg-black/20 hover:bg-pink-100/10 shadow-md transition-all duration-300 hover:scale-105"
          >
            {loadingPath === "/confessions"
              ? "Redirecting"
              : "🌸 See All Confessions"}
          </button>

          <button
            onClick={handleFeelingLucky}
            className="px-8 py-3 rounded-full border border-yellow-300 text-yellow-200 hover:text-white hover:border-white font-medium text-lg bg-yellow-200/10 hover:bg-yellow-100/10 shadow-md transition-all duration-300 hover:scale-105"
          >
            🌟 Feeling Lucky?
          </button>
        </div>
      </section>

      {/* Sample Confession Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {sampleConfessions.map((confession, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm shadow-inner text-sm text-pink-100 hover:scale-[1.02] transition-all"
          >
            <p className="italic">&quot;{confession}&quot;</p>
          </div>
        ))}
      </section>

      {/* Lucky Confession Modal */}
      {luckyConfession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="max-w-md mx-auto p-6 bg-white/10 text-pink-100 rounded-xl shadow-xl border border-pink-300 animate-fade-in">
            <p className="text-lg italic text-center">
              &quot;{luckyConfession}&quot;
            </p>
            <p className="text-sm text-center text-pink-300 mt-4">
              (auto closes in 6s)
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-pink-300 mt-20 pb-6">
        <p className="italic">
          100% Anonymous. No login. No judgment. Just feelings. 💌
        </p>
        <p className="mt-2">Made with love by Banna G &copy; 2025</p>
      </footer>
    </main>
  );
}
