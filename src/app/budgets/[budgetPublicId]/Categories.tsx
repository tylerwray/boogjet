"use client";

import { Category } from "~/data/schema";
import { NewCategoryButton } from "./NewCategoryButton";
import { useOptimistic } from "react";
import { cn } from "~/lib/utils";

type OptimisticCategory = {
  name: string;
  publicId: string;
};

export function Categories({
  categories,
  categoryGroupPublicId,
}: {
  categories: Category[];
  categoryGroupPublicId: string;
}) {
  const [optimisticCategories, addOptimisticCategory] = useOptimistic(
    categories,
    (state: OptimisticCategory[], newCategory: OptimisticCategory) => [
      ...state,
      newCategory,
    ],
  );

  return (
    <div>
      {optimisticCategories.map((c) => (
        <div
          key={c.publicId}
          className={cn(
            "flex h-10 cursor-pointer items-center gap-2 border-b border-zinc-800 px-8 py-2 hover:bg-zinc-700/20",
            c.publicId === "optimistic" ? "text-zinc-200/30" : "",
          )}
        >
          {c.name}
        </div>
      ))}
      <NewCategoryButton
        categoryGroupPublicId={categoryGroupPublicId}
        addOptimisticCategory={addOptimisticCategory}
      />
    </div>
  );
}
