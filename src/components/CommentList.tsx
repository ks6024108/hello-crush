// "use client";

// import { useEffect, useRef, useState } from "react";
// import { formatDistanceToNow } from "date-fns";

// type Comment = {
//   id: string;
//   text: string;
//   createdAt: string;
// };

// type Props = {
//   confessionId: string;
// };

// export default function CommentList({ confessionId }: Props) {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [cursor, setCursor] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const observerRef = useRef<HTMLDivElement | null>(null);

//   const loadComments = async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);

//     const res = await fetch(
//       `/api/comments?confessionId=${confessionId}&cursor=${cursor ?? ""}`
//     );
//     const data = await res.json();

//     setComments((prev) => [...prev, ...data.comments]);
//     setCursor(data.nextCursor);
//     setHasMore(Boolean(data.nextCursor));
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadComments();
//   }, []);

//   useEffect(() => {
//     if (!observerRef.current || !hasMore) return;

//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) loadComments();
//     });

//     observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [observerRef.current, hasMore]);

//   return (
//     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-pink-500/20">
//       {comments.length === 0 && !loading && (
//         <p className="text-sm text-pink-300 italic text-center mt-4">
//           Nobody has commented yet... Say something lovely 💭
//         </p>
//       )}

//       {comments.map((comment) => (
//         <div
//           key={comment.id}
//           className="bg-black/20 border border-pink-400/10 rounded-xl p-4 backdrop-blur-md hover:scale-[1.01] transition-transform shadow-sm"
//         >
//           <p className="text-sm leading-relaxed text-white">{comment.text}</p>
//           <p className="text-xs text-pink-400 mt-2">
//             ⏱ {formatDistanceToNow(new Date(comment.createdAt))} ago
//           </p>
//         </div>
//       ))}

//       {loading && (
//         <p className="text-center text-pink-300 text-sm animate-pulse">
//           💬 Loading more comments...
//         </p>
//       )}

//       <div ref={observerRef} />
//     </div>
//   );
// }

//new code
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";

type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

type Props = {
  confessionId: string;
};

export default function CommentList({ confessionId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // const loadComments = useCallback(async () => {
  //   if (loading || !hasMore) return;
  //   setLoading(true);

  //   try {
  //     const res = await fetch(
  //       `/api/comments?confessionId=${confessionId}&cursor=${cursor ?? ""}`
  //     );
  //     const data = await res.json();

  //     setComments((prev) => [...prev, ...data.comments]);
  //     setCursor(data.nextCursor);
  //     setHasMore(Boolean(data.nextCursor));
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [confessionId, cursor, hasMore, loading]);

  const loadComments = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(
        `/api/comments?confessionId=${confessionId}&cursor=${cursor ?? ""}`
      );
      const data = await res.json();

      setComments((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const uniqueNew = data.comments.filter(
          (c: Comment) => !existingIds.has(c.id)
        );
        return [...prev, ...uniqueNew];
      });

      setCursor(data.nextCursor);
      setHasMore(Boolean(data.nextCursor));
    } finally {
      setLoading(false);
    }
  }, [confessionId, cursor, hasMore, loading]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadComments();
    });

    const target = observerRef.current;
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [observerRef, loadComments, hasMore]);

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-pink-500/20">
      {comments.length === 0 && !loading && (
        <p className="text-sm text-pink-300 italic text-center mt-4">
          Nobody has commented yet... Say something lovely 💭
        </p>
      )}

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-black/20 border border-pink-400/10 rounded-xl p-4 backdrop-blur-md hover:scale-[1.01] transition-transform shadow-sm"
        >
          <p className="text-sm leading-relaxed text-white">{comment.text}</p>
          <p className="text-xs text-pink-400 mt-2">
            ⏱ {formatDistanceToNow(new Date(comment.createdAt))} ago
          </p>
        </div>
      ))}

      {loading && (
        <p className="text-center text-pink-300 text-sm animate-pulse">
          💬 Loading more comments...
        </p>
      )}

      <div ref={observerRef} />
    </div>
  );
}
