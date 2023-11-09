import { db } from "./db";
import { generatePublicId } from "./helpers";
import { budgets } from "./schema";
import { currentUser } from "./user";

export async function listBudgets() {
  const user = await currentUser();

  return db.query.budgets.findMany({
    where: (budgets, { eq }) => eq(budgets.userId, user.id),
  });
}

export async function getBudgetWithAccounts(budgetPublicId: string) {
  const user = await currentUser();

  return db.query.budgets.findFirst({
    where: (budgets, { eq, and }) =>
      and(eq(budgets.userId, user.id), eq(budgets.publicId, budgetPublicId)),
    with: { accounts: true },
  });
}

export async function createBudget(name: string) {
  const user = await currentUser();

  const publicId = generatePublicId("bud");

  await db.insert(budgets).values({
    name,
    userId: user.id,
    publicId,
  });

  return publicId;
}

export async function getBudget(budgetPublicId: string) {
  const user = await currentUser();

  return db.query.budgets.findFirst({
    where: (budgets, { eq, and }) =>
      and(eq(budgets.userId, user.id), eq(budgets.publicId, budgetPublicId)),
  });
}
