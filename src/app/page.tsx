import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { getLatestBudget } from "~/data/budgets";

export default async function RootPage() {
  const latestBudget = await getLatestBudget();
  const currentYearAndMonth = dayjs().format("YYYYMM");

  // Redirect to latest budget and month.
  redirect(`/budgets/${latestBudget.publicId}/${currentYearAndMonth}`);

  return null;
}
