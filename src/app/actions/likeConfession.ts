"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function likeConfession(confessionId: string, sessionId: string) {
  if (!confessionId || !sessionId) throw new Error("Missing required fields");

  try {
    await prisma.like.create({
      data: {
        confessionId,
        sessionId,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      // throw new Error("You already liked this confession.");
      return;
    } else {
      console.error("Like Error:", err);
      throw new Error("Something went wrong while liking.");
    }
  }
}

