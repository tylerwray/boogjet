import { db } from "./db";

export async function listBudgetAccounts(budgetId: number) {
  return db.query.accounts.findMany({
    where: (accounts, { eq }) => eq(accounts.budgetId, budgetId),
  });
}
