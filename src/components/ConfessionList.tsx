// "use client";

// import { useEffect, useRef, useState } from "react";
// import ConfessionCard from "./ConfessionCard";
// import { getConfessions } from "@/app/confessions/actions";
// // import { getConfessions } from "@/lib/actions/getConfessions";

// type Confession = {
//   id: string;
//   text: string;
//   nickname: string | null;
//   createdAt: string;
//   shares: number;
//   _count: {
//     likes: number;
//     comments: number;
//   };
// };

// export default function ConfessionList() {
//   const [confessions, setConfessions] = useState<Confession[]>([]);
//   const [nextCursor, setNextCursor] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const loaderRef = useRef<HTMLDivElement | null>(null);

//   const loadConfessions = async () => {
//     try {
//       setLoading(true);
//       const res = await getConfessions(nextCursor ?? undefined);

//       // ✅ avoid duplicates
//       setConfessions((prev) => {
//         const existingIds = new Set(prev.map((c) => c.id));
//         const newOnes = res.confessions.filter((c) => !existingIds.has(c.id));
//         return [...prev, ...newOnes];
//       });

//       setNextCursor(res.nextCursor);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Failed to load confessions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadConfessions(); // Initial load
//   }, []);

//   // 👀 Intersection Observer setup
//   useEffect(() => {
//     if (!loaderRef.current || !nextCursor) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           loadConfessions();
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(loaderRef.current);

//     return () => observer.disconnect();
//   }, [nextCursor, loading]);

//   // max-w-3xl mx-auto px-4 py-10 space-y-6
//   return (
//     <div className=" max-w-3xl mx-auto px-4 py-10 space-y-6 relative z-10">
//       {confessions.map((conf) => (
//         <ConfessionCard key={conf.id} {...conf} />
//       ))}

//       {error && <p className="text-center text-red-300 text-sm">⚠️ {error}</p>}

//       {loading && (
//         <p className="text-center text-pink-300 text-sm animate-pulse">
//           💘 Loading more confessions...
//         </p>
//       )}

//       {/* 👇 This is the auto-load trigger */}
//       {nextCursor && <div ref={loaderRef} className="h-10" />}

//       {!nextCursor && !loading && confessions.length > 0 && (
//         <p className="text-center text-pink-300">
//           🎉 All confessions loaded. Love is in the air!
//         </p>
//       )}

//       {!loading && confessions.length === 0 && (
//         <p className="text-center text-pink-300">
//           😢 No confessions yet. Be the first to confess!
//         </p>
//       )}
//     </div>
//   );
// }

//new code
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ConfessionCard from "./ConfessionCard";
import { getConfessions } from "@/app/confessions/actions";

type Confession = {
  id: string;
  text: string;
  nickname: string | null;
  createdAt: string;
  shares: number;
  _count: {
    likes: number;
    comments: number;
  };
};

export default function ConfessionList() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadConfessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getConfessions(nextCursor ?? undefined);

      setConfessions((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newOnes = res.confessions.filter((c) => !existingIds.has(c.id));
        return [...prev, ...newOnes];
      });

      setNextCursor(res.nextCursor);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to load confessions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [nextCursor]);

  // Initial load
  useEffect(() => {
    loadConfessions();
  }, [loadConfessions]);

  // Infinite scroll trigger
  useEffect(() => {
    if (!loaderRef.current || !nextCursor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadConfessions();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [nextCursor, loading, loadConfessions]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 relative z-10">
      {confessions.map((conf) => (
        <ConfessionCard key={conf.id} {...conf} />
      ))}

      {error && <p className="text-center text-red-300 text-sm">⚠️ {error}</p>}

      {loading && (
        <p className="text-center text-pink-300 text-sm animate-pulse">
          💘 Loading more confessions...
        </p>
      )}

      {nextCursor && <div ref={loaderRef} className="h-10" />}

      {!nextCursor && !loading && confessions.length > 0 && (
        <p className="text-center text-pink-300">
          🎉 All confessions loaded. Love is in the air!
        </p>
      )}

      {!loading && confessions.length === 0 && (
        <p className="text-center text-pink-300">
          😢 No confessions yet. Be the first to confess!
        </p>
      )}
    </div>
  );
}
