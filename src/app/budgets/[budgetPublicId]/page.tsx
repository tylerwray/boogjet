import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "~/app/_components/Button";
import { listCategoryGroups } from "~/data/categoryGroups";

export default async function BudgetPage({
  params,
}: {
  params: { budgetPublicId: string };
}) {
  const categoryGroups = await listCategoryGroups(params.budgetPublicId);

  return (
    <div>
      {categoryGroups.map((cg) => (
        <div key={cg.publicId}>
          <h2>{cg.name}</h2>
          <div className="pl-8">
            {cg.categories.map((c) => (
              <div>{c.name}</div>
            ))}
            <Button
              variant="ghost"
              color="gray"
              size="sm"
              leftIcon={<PlusIcon />}
            >
              New category
            </Button>
          </div>
        </div>
      ))}
      <Button variant="ghost" color="gray" size="sm" leftIcon={<PlusIcon />}>
        New category group
      </Button>
    </div>
  );
}
