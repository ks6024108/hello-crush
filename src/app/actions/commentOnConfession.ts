"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function commentOnConfession(
  confessionId: string,
  sessionId: string,
  text: string
) {
  if (!confessionId || !sessionId || !text) {
    throw new Error("Missing required fields");
  }

  try {
    await prisma.comment.create({
      data: {
        confessionId,
        sessionId,
        text,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      throw new Error("You already commented.");
    } else {
      console.error("Comment Error:", err);
      throw new Error("Something went wrong while commenting.");
    }
  }
}
