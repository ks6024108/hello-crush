// //new code
// import { getComments } from "@/app/actions/getComments";
// import { getConfessionById } from "@/app/actions/getConfessionById";
// import { formatDistanceToNow } from "date-fns";
// import Link from "next/link";

// type Props = {
//   params: { id: string };
// };

// export default async function ConfessionDetailPage({ params }: Props) {
//   const confession = await getConfessionById(params.id);
//   const comments = await getComments(params.id);

//   if (!confession) {
//     return (
//       <div className="text-center text-pink-400 py-10 font-semibold text-lg">
//         💔 Confession not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0f1f] via-[#1e1b29] to-[#1a0f1f] text-pink-100 px-4 py-12">
//       <div className="max-w-3xl mx-auto space-y-10">
//         {/* Back Button */}
//         <Link
//           href="/confessions"
//           className="inline-block text-sm text-pink-400 hover:text-pink-300 font-medium underline transition"
//         >
//           ← Back to all confessions
//         </Link>

//         {/* Confession Card */}
//         <div className="bg-gradient-to-br from-[#2a1b2f]/60 to-[#1a0f1f]/60 border border-pink-300/20 rounded-3xl p-6 shadow-lg backdrop-blur-md space-y-5 relative overflow-hidden">
//           <div className="absolute -top-5 -left-5 text-[120px] opacity-10 select-none pointer-events-none">
//             💗
//           </div>

//           <p className="text-xl md:text-2xl font-medium leading-relaxed whitespace-pre-line tracking-wide text-white">
//             {confession.text}
//           </p>

//           <p className="italic text-pink-300 text-sm">
//             — {confession.nickname || "🫶 Secret Admirer"}
//           </p>

//           <p className="text-xs text-pink-400">
//             ⏳ {formatDistanceToNow(new Date(confession.createdAt))} ago
//           </p>
//         </div>

//         {/* Comments Section */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-bold text-pink-400 flex items-center gap-2">
//             💬 Comments from the Heart
//           </h3>

//           {comments.length === 0 ? (
//             <p className="text-sm text-pink-300 italic text-center mt-4">
//               Nobody has commented yet... Say something lovely 💭
//             </p>
//           ) : (
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-pink-500/20">
//               {comments.map((comment) => (
//                 <div
//                   key={comment.id}
//                   className="bg-black/20 border border-pink-400/10 rounded-xl p-4 backdrop-blur-md hover:scale-[1.01] transition-transform shadow-sm"
//                 >
//                   <p className="text-sm leading-relaxed text-white">
//                     {comment.text}
//                   </p>
//                   <p className="text-xs text-pink-400 mt-2">
//                     ⏱ {formatDistanceToNow(new Date(comment.createdAt))} ago
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//new code
import { getConfessionById } from "@/app/actions/getConfessionById";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
// import CommentList from "@/components/CommentList"; // ✅ normal import

// import dynamic from "next/dynamic";
import CommentSectionWrapper from "@/components/CommentSectionWrapper";

// const CommentList = dynamic(() => import("@/components/CommentList"), {
//   ssr: false,
// });

type PageProps = {
  params: { id: string };
};

export default async function ConfessionDetailPage({
  params,
}: PageProps) {
  const confession = await getConfessionById(params.id);

  if (!confession) {
    return (
      <div className="text-center text-pink-400 py-10 font-semibold text-lg">
        💔 Confession not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0f1f] via-[#1e1b29] to-[#1a0f1f] text-pink-100 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link
          href="/confessions"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-800/20 hover:bg-pink-800/40 text-pink-200 hover:text-white font-medium text-sm transition shadow-sm backdrop-blur"
        >
          ← Back to all confessions
        </Link>

        <div className="bg-gradient-to-br from-[#2a1b2f]/60 to-[#1a0f1f]/60 border border-pink-300/20 rounded-3xl p-6 shadow-lg backdrop-blur-md space-y-5 relative overflow-hidden">
          <div className="absolute -top-5 -left-5 text-[120px] opacity-10 select-none pointer-events-none">
            💗
          </div>

          <p className="text-xl md:text-2xl font-medium leading-relaxed whitespace-pre-line tracking-wide text-white">
            {confession.text}
          </p>

          <p className="italic text-pink-300 text-sm">
            — {confession.nickname || "🫶 Secret Admirer"}
          </p>

          <p className="text-xs text-pink-400">
            ⏳ {formatDistanceToNow(new Date(confession.createdAt))} ago
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-pink-400 flex items-center gap-2">
            💬 Comments from the Heart
          </h3>

          {/* ✅ CommentList is now a client component */}
          <CommentSectionWrapper confessionId={params.id} />
        </div>
      </div>
    </div>
  );
}
