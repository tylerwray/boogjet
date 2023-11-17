import { getBudget } from "~/data/budgets";
import { listCategoryGroups } from "~/data/categoryGroups";
import { Categories } from "./Categories";

export default async function BudgetPage({
  params,
}: {
  params: { budgetPublicId: string };
}) {
  const categoryGroups = await listCategoryGroups(params.budgetPublicId);
  const budget = await getBudget(params.budgetPublicId);

  return (
    <div className="h-full">
      <h2 className="px-4 py-4 text-xl">{budget.name}</h2>
      <div className="grid">
        {categoryGroups.map((cg) => (
          <div key={cg.publicId}>
            <h3 className="border-b border-zinc-800 px-4 py-2">{cg.name}</h3>
            <Categories
              categories={cg.categories}
              categoryGroupPublicId={cg.publicId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
