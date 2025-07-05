"use server";

import { prisma } from "@/lib/prisma";

export async function getConfessions(cursor?: string, limit = 10) {
  const confessions = await prisma.confession.findMany({
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    select: {
      id: true,
      text: true,
      nickname: true,
      createdAt: true,
      shares: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  const hasNextPage = confessions.length > limit;
  const results = hasNextPage ? confessions.slice(0, -1) : confessions;

  return {
    confessions: results.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(), // ✅ FIX HERE
    })),
    nextCursor: hasNextPage ? results[results.length - 1].id : null,
  };
}
