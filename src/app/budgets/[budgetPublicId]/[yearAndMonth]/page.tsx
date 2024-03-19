import { getBudget } from "~/data/budgets";
import { listCategoryGroups } from "~/data/categoryGroups";
import { Categories } from "./Categories";
import { Button } from "~/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";

dayjs.extend(customParseFormat);

export default async function BudgetPage({
  params,
}: {
  params: { budgetPublicId: string; yearAndMonth: string };
}) {
  const date = dayjs(params.yearAndMonth, "YYYYMM");

  const [budget, categoryGroups] = await Promise.all([
    getBudget(params.budgetPublicId),
    listCategoryGroups({
      budgetPublicId: params.budgetPublicId,
      month: parseInt(date.format("MM")),
      year: date.year(),
    }),
  ]);

  const previousYearAndMonth = date.subtract(1, "month").format("YYYYMM");
  const nextYearAndMonth = date.add(1, "month").format("YYYYMM");

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <h2 className="px-4 py-4 text-2xl font-medium">{budget.name}</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={previousYearAndMonth} prefetch>
              <ChevronLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div className="text-lg font-medium">{date.format("MMM YYYY")}</div>
          <Button variant="outline" size="icon" asChild>
            <Link href={nextYearAndMonth} prefetch>
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> New category group
        </Button>
      </div>
      <div className="grid gap-4">
        {categoryGroups.map((cg) => (
          <div key={cg.publicId} className="rounded-lg border">
            <Categories
              groupName={cg.name}
              categories={cg.categories}
              categoryGroupPublicId={cg.publicId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
