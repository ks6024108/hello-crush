// CommentModal.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import ReactDOM from "react-dom";
import { commentOnConfession } from "@/app/actions/commentOnConfession";

export default function CommentModal({
  confessionId,
  onClose,
}: {
  confessionId: string;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let existing = localStorage.getItem("sessionId");
    if (!existing) {
      existing = crypto.randomUUID();
      localStorage.setItem("sessionId", existing);
    }
    setSessionId(existing);

    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!text.trim()) {
      setError("Comment cannot be empty 💬");
      return;
    }

    startTransition(async () => {
      try {
        await commentOnConfession(confessionId, sessionId, text.trim());
        setSuccess(true);
        setText("");
      } catch (err) {
        setError((err as Error).message);
      }
    });
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[#1e0f1f] border border-pink-400/30 text-white rounded-2xl w-full max-w-md mx-auto p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-pink-400">💬 Comment</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-pink-300 text-xl"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something sweet or supportive 💖"
            rows={3}
            className="w-full p-3 rounded-lg bg-black/30 border border-pink-500/20 focus:ring-2 focus:ring-pink-400 text-white placeholder:text-pink-300"
            disabled={isPending || success}
          />
          <button
            type="submit"
            disabled={isPending || success}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            {isPending
              ? "Sending..."
              : success
              ? "Commented 💘"
              : "Send Comment 💬"}
          </button>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;

  const portalDiv =
    document.getElementById("modal-root") ||
    (() => {
      const el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
      return el;
    })();

  return ReactDOM.createPortal(modalContent, portalDiv);
}
