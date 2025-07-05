"use server";

import { prisma } from "@/lib/prisma";

export async function incrementShareCount(id: string) {
  try {
    await prisma.confession.update({
      where: { id },
      data: {
        shares: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("❌ Error updating share count:", error);
    throw new Error("Failed to update share count");
  }
}
