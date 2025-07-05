import { prisma } from "@/lib/prisma";

export async function getConfessionById(id: string) {
  return await prisma.confession.findUnique({
    where: { id },
  });
}
