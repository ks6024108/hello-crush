"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { submitConfession } from "@/app/confess/actions";

export default function ConfessionForm() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    let existing = localStorage.getItem("sessionId");
    if (!existing) {
      existing = crypto.randomUUID();
      localStorage.setItem("sessionId", existing);
    }
    setSessionId(existing);
  }, []);

  return (
    <form
      action={submitConfession}
      className="max-w-xl mx-auto mt-10 p-6 md:p-8 rounded-2xl border border-pink-500/40 bg-gradient-to-b from-[#1a0e1c] to-[#0e0610] shadow-[0_0_25px_#ff80ab44] space-y-6 backdrop-blur text-white"
    >
      <div className="flex items-center gap-2">
        <Heart className="text-pink-400 animate-pulse" />
        <h2 className="text-xl font-semibold">Confess Your Feelings 💌</h2>
      </div>

      <div>
        <textarea
          name="text"
          required
          placeholder="Write something heartfelt or flirty…"
          rows={4}
          className="w-full p-3 rounded-lg bg-black/40 border border-pink-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-pink-300 text-white"
        />
      </div>

      <div>
        <input
          name="nickname"
          placeholder="Optional nickname (e.g., Secret Admirer)"
          className="w-full p-3 rounded-lg bg-black/40 border border-pink-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-pink-300 text-white"
        />
      </div>

      <input type="hidden" name="sessionId" value={sessionId} />

      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-lg bg-pink-600 hover:bg-pink-700 transition-all duration-200"
      >
        Send Confession 💘
      </button>
    </form>
  );
}
