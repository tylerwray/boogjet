import { getBudgetWithAccounts } from "~/data/budgets";
import { Shell } from "./Shell";

export default async function BudgetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { budgetPublicId: string };
}) {
  const budget = await getBudgetWithAccounts(params.budgetPublicId);

  if (!budget) return null;

  return <Shell>{children}</Shell>;
}
