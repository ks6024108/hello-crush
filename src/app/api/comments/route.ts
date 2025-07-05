// app/api/comments/route.ts
import { NextResponse } from "next/server";
import { getComments } from "@/app/actions/getComments";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const confessionId = searchParams.get("confessionId");
  const cursor = searchParams.get("cursor") || undefined;

  if (!confessionId) {
    return NextResponse.json({ comments: [], nextCursor: null });
  }

  const data = await getComments(confessionId, cursor);
  return NextResponse.json(data);
}
