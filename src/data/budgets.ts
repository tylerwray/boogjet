import { db } from "./db";
import { currentUser } from "./user";

export async function listBudgets() {
  const user = await currentUser();

  return db.query.budgets.findMany({
    where: (budgets, { eq }) => eq(budgets.userId, user.id),
  });
}

export async function getBudgetWithAccounts(budgetId: number) {
  const user = await currentUser();

  return db.query.budgets.findFirst({
    where: (budgets, { eq, and }) =>
      and(eq(budgets.userId, user.id), eq(budgets.id, budgetId)),
    with: { accounts: true },
  });
}
