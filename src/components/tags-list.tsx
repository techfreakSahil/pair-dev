"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

export function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags?.map((tag) => (
        <button
          className={cn(badgeVariants())}
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
