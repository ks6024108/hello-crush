"use client";

import CommentList from "./CommentList";

export default function CommentSectionWrapper({
  confessionId,
}: {
  confessionId: string;
}) {
  return <CommentList confessionId={confessionId} />;
}
