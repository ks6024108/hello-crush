"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center py-10 text-red-600">
      Oops! An error occurred: {error.message}
    </div>
  );
}
