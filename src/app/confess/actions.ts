"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function submitConfession(formData: FormData) {
  const text = formData.get("text")?.toString().trim();
  const nickname = formData.get("nickname")?.toString().trim();
  const sessionId = formData.get("sessionId")?.toString();

  if (!text || !sessionId) {
    throw new Error("Missing required fields.");
  }

  await prisma.confession.create({
    data: {
      text,
      nickname: nickname || null,
    },
  });

  redirect("/confessions");
}
