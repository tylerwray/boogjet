import dayjs from "dayjs";
import { redirect } from "next/navigation";

export default async function BudgetPage({
  params,
}: {
  params: { budgetPublicId: string };
}) {
  const currentYearAndMonth = dayjs().format("YYYYMM");

  // Redirect to latest budget month.
  redirect(`/budgets/${params.budgetPublicId}/${currentYearAndMonth}`);

  return null;
}
