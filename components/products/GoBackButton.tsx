"use client";

import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-lime-400 cursor-pointer"
    >
      <span aria-hidden="true">←</span>
      Go back
    </button>
  );
};
