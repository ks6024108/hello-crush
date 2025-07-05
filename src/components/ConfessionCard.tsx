// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { formatDistanceToNow } from "date-fns";
// import { likeConfession } from "@/app/actions/likeConfession";
// import { incrementShareCount } from "@/app/actions/incrementShareCount";
// import CommentModal from "./CommentModal";
// import Link from "next/link";

// type ConfessionCardProps = {
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

// export default function ConfessionCard({
//   id,
//   text,
//   nickname,
//   createdAt,
//   shares: initialShares,
//   _count,
// }: ConfessionCardProps) {
//   const [likes, setLikes] = useState(_count.likes);
//   const [liked, setLiked] = useState(false);
//   const [shares, setShares] = useState(initialShares);
//   const [sessionId, setSessionId] = useState("");
//   const [isPending, startTransition] = useTransition();
//   const [likeError, setLikeError] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     let existing = localStorage.getItem("sessionId");
//     if (!existing) {
//       existing = crypto.randomUUID();
//       localStorage.setItem("sessionId", existing);
//     }
//     setSessionId(existing ?? "");

//     const likedMap = JSON.parse(
//       localStorage.getItem("likedConfessions") || "{}"
//     );
//     if (existing && likedMap?.[existing]?.includes(id)) {
//       setLiked(true);
//     }
//   }, [id]);

//   const handleLike = () => {
//     if (liked || isPending || !sessionId) return;

//     startTransition(async () => {
//       try {
//         await likeConfession(id, sessionId);
//         setLiked(true);
//         setLikes((prev) => prev + 1);
//         setLikeError(null);

//         const likedMap = JSON.parse(
//           localStorage.getItem("likedConfessions") || "{}"
//         );
//         const updatedMap = {
//           ...likedMap,
//           [sessionId]: [...(likedMap?.[sessionId] || []), id],
//         };
//         localStorage.setItem("likedConfessions", JSON.stringify(updatedMap));
//       } catch (err) {
//         console.error("Like Error:", err);
//         setLikeError("💔 Oops! Something went wrong while sending your heart.");
//       }
//     });
//   };

//   const handleShare = async () => {
//     const url = `${process.env.NEXT_PUBLIC_APP_URL}/confession/${id}`;
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: "💌 Anonymous Confession",
//           text: "Check out this secret confession!",
//           url,
//         });
//       } else {
//         await navigator.clipboard.writeText(url);
//         alert("Link copied to clipboard!");
//       }

//       await incrementShareCount(id);
//       setShares((prev) => prev + 1);
//     } catch (error) {
//       console.error("❌ Share Error:", error);
//       alert("Something went wrong while sharing.");
//     }
//   };

//   return (
//     <div className="relative rounded-3xl p-5 border border-pink-400/20 bg-gradient-to-br from-pink-900/30 to-black/30 backdrop-blur-md shadow-lg hover:shadow-pink-500/40 transition duration-300 space-y-3">
//       {/* Share Button (top right) */}
//       <button
//         onClick={handleShare}
//         title="Share this confession"
//         className="absolute top-3 right-3 text-white text-sm bg-pink-600 hover:bg-pink-700 rounded-full px-3 py-1 transition"
//       >
//         🔁 Share
//       </button>

//       <p className="text-lg leading-relaxed text-white whitespace-pre-line">
//         {text}
//       </p>

//       <p className="text-sm text-pink-300 italic">
//         — {nickname || "🫶 Secret Admirer"}
//       </p>

//       <div className="flex justify-between items-center text-sm text-pink-400 pt-2">
//         <span>⏳ {formatDistanceToNow(new Date(createdAt))} ago</span>

//         <div className="flex flex-col items-end">
//           <div className="flex gap-4 items-center">
//             <button
//               onClick={handleLike}
//               disabled={liked || isPending}
//               className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${
//                 liked
//                   ? "text-pink-500 hover:text-red-500 cursor-not-allowed"
//                   : "text-pink-300 hover:text-pink-400"
//               }`}
//               title={liked ? "Already liked 💗" : "Send a heart 💘"}
//             >
//               💗 {likes}
//             </button>

//             <button
//               title="Comment"
//               onClick={() => setShowModal(true)}
//               className="text-pink-300 hover:text-pink-400 transition"
//             >
//               💬 {_count.comments}
//             </button>
//             {showModal && (
//               <CommentModal
//                 confessionId={id}
//                 onClose={() => setShowModal(false)}
//               />
//             )}

//             <span title="Shares">🔁 {shares}</span>
//             <span>
//               <Link
//                 href={`/confessions/${id}`}
//                 className="text-pink-400 hover:text-pink-300 text-sm underline"
//                 title="View full confession and comments"
//               >
//                 🔍 View Details
//               </Link>
//             </span>
//           </div>

//           {likeError && (
//             <span className="mt-2 text-xs text-red-400">{likeError}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//new code
"use client";

import { useEffect, useState, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { likeConfession } from "@/app/actions/likeConfession";
import { incrementShareCount } from "@/app/actions/incrementShareCount";
import CommentModal from "./CommentModal";
import Link from "next/link";

type ConfessionCardProps = {
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

export default function ConfessionCard({
  id,
  text,
  nickname,
  createdAt,
  shares: initialShares,
  _count,
}: ConfessionCardProps) {
  const [likes, setLikes] = useState(_count.likes);
  const [liked, setLiked] = useState(false);
  const [shares, setShares] = useState(initialShares);
  const [sessionId, setSessionId] = useState("");
  const [isPending, startTransition] = useTransition();
  const [likeError, setLikeError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let existing = localStorage.getItem("sessionId");
    if (!existing) {
      existing = crypto.randomUUID();
      localStorage.setItem("sessionId", existing);
    }
    setSessionId(existing ?? "");

    const likedMap = JSON.parse(
      localStorage.getItem("likedConfessions") || "{}"
    );
    if (existing && likedMap?.[existing]?.includes(id)) {
      setLiked(true);
    }
  }, [id]);

  const handleLike = () => {
    if (liked || isPending || !sessionId) return;

    startTransition(async () => {
      try {
        await likeConfession(id, sessionId);
        setLiked(true);
        setLikes((prev) => prev + 1);
        setLikeError(null);

        const likedMap = JSON.parse(
          localStorage.getItem("likedConfessions") || "{}"
        );
        const updatedMap = {
          ...likedMap,
          [sessionId]: [...(likedMap?.[sessionId] || []), id],
        };
        localStorage.setItem("likedConfessions", JSON.stringify(updatedMap));
      } catch (err) {
        console.error("Like Error:", err);
        setLikeError("💔 Oops! Something went wrong while sending your heart.");
      }
    });
  };

  const handleShare = async () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/confessions/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "💌 Anonymous Confession",
          text: "Check out this secret confession!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }

      await incrementShareCount(id);
      setShares((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Share Error:", error);
      alert("Something went wrong while sharing.");
    }
  };

  return (
    <div className="relative rounded-3xl p-5 border border-pink-400/20 bg-gradient-to-br from-pink-900/30 to-black/30 backdrop-blur-md shadow-lg hover:shadow-pink-500/40 transition duration-300 space-y-3">
      <p className="text-lg leading-relaxed text-white whitespace-pre-line">
        {text}
      </p>

      <p className="text-sm text-pink-300 italic">
        — {nickname || "🫶 Secret Admirer"}
      </p>

      <div className="flex justify-between items-end text-sm text-pink-400 pt-4 flex-wrap gap-2">
        <span>⏳ {formatDistanceToNow(new Date(createdAt))} ago</span>

        <div className="flex flex-wrap gap-4 items-center text-sm">
          <button
            onClick={handleLike}
            disabled={liked || isPending}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${
              liked
                ? "text-pink-500 hover:text-red-500 cursor-not-allowed"
                : "text-pink-300 hover:text-pink-400"
            }`}
            title={liked ? "Already liked 💗" : "Send a heart 💘"}
          >
            💗 {likes}
          </button>

          <button
            title="Comment"
            onClick={() => setShowModal(true)}
            className="text-pink-300 hover:text-pink-400 transition flex items-center gap-1"
          >
            💬 {_count.comments}
          </button>

          <button
            onClick={handleShare}
            title="Share this confession"
            className="text-pink-300 hover:text-pink-400 transition flex items-center gap-1"
          >
            🔁 {shares}
          </button>

          <Link
            href={`/confessions/${id}`}
            title="View full confession and comments"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-medium shadow-md transition"
          >
            🔍 View Details
          </Link>
        </div>
      </div>

      {likeError && (
        <span className="mt-2 text-xs text-red-400">{likeError}</span>
      )}

      {showModal && (
        <CommentModal confessionId={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
