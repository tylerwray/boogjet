import { getBudget } from "./budgets";
import { db } from "./db";
import { generatePublicId } from "./helpers";
import { accounts, budgets, Account } from "./schema";
import { currentUser } from "./user";

export async function getAccount(accountPublicId: string) {
  const user = await currentUser();

  // TODO: Re-think auth model here. Don't love always joining on budgets.
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.publicId, accountPublicId),
    with: { budget: true },
  });

  if (account?.budget.userId !== user.id) {
    return null;
  }

  return account;
}

export async function createAccount(name: string, budgetPublicId: string) {
  const publicId = generatePublicId("acct");

  const budget = await getBudget(budgetPublicId);

  if (!budget) {
    throw new Error("Budget not found.");
  }

  await db.insert(accounts).values({
    name,
    budgetId: budget.id,
    publicId,
  });

  return publicId;
}
