"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAccount } from "~/data/accounts";

const newAccountSchema = z.object({
  accountName: z.string(),
  budgetPublicId: z.string(),
});

export async function createAccountAction(formData: FormData) {
  const parsed = newAccountSchema.parse(Object.fromEntries(formData));

  const accountPublicId = await createAccount(
    parsed.accountName,
    parsed.budgetPublicId,
  );

  redirect(`/budgets/${parsed.budgetPublicId}/accounts/${accountPublicId}`);
}
