// "use server";

// import { prisma } from "@/lib/prisma";

// export async function getComments(confessionId: string) {
//   if (!confessionId) return [];

//   const comments = await prisma.comment.findMany({
//     where: { confessionId },
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       text: true,
//       createdAt: true,
//     },
//   });

//   return comments.map((c) => ({
//     ...c,
//     createdAt: c.createdAt.toISOString(),
//   }));
// }


//new code
"use server";

import { prisma } from "@/lib/prisma";

type CommentResponse = {
  comments: {
    id: string;
    text: string;
    createdAt: string;
  }[];
  nextCursor: string | null;
};

export async function getComments(
  confessionId: string,
  cursor?: string,
  limit: number = 10
): Promise<CommentResponse> {
  if (!confessionId) return { comments: [], nextCursor: null };

  const comments = await prisma.comment.findMany({
    where: { confessionId },
    take: limit + 1,
    ...(cursor && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      text: true,
      createdAt: true,
    },
  });

  const hasMore = comments.length > limit;
  const sliced = hasMore ? comments.slice(0, -1) : comments;

  return {
    comments: sliced.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
    })),
    nextCursor: hasMore ? comments[comments.length - 1].id : null,
  };
}
