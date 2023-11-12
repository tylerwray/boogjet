import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "~/app/_components/Button";
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
    <div className="h-full bg-gray-900">
      <h2 className="px-4 py-4 text-xl">{budget.name}</h2>
      <div className="grid">
        {categoryGroups.map((cg) => (
          <div key={cg.publicId}>
            <h3 className="border-b border-gray-700 bg-gray-800 px-4 py-2">
              {cg.name}
            </h3>
            <Categories
              categories={cg.categories}
              categoryGroupPublicId={cg.publicId}
            />
          </div>
        ))}
        <Button variant="ghost" color="gray" size="sm" leftIcon={<PlusIcon />}>
          New category group
        </Button>
      </div>
    </div>
  );
}
