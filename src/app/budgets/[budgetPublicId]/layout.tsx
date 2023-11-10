import { SideNav } from "./SideNav";
import { getBudgetWithAccounts } from "~/data/budgets";
import { currentUser } from "~/data/user";

export default async function BudgetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { budgetPublicId: string };
}) {
  const budget = await getBudgetWithAccounts(params.budgetPublicId);

  if (!budget) return null;

  return (
    <div className="grid h-full grid-cols-[auto_1fr]">
      <SideNav budget={budget} />
      <main className="h-full bg-gray-900 p-6 text-gray-100">{children}</main>
    </div>
  );
}
