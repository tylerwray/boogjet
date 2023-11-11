"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { softDeleteAccount } from "~/data/accounts";

const deleteAccountSchema = z.object({
  budgetPublicId: z.string(),
  accountPublicId: z.string(),
});

export async function deleteAccountAction(formData: FormData) {
  const parsed = deleteAccountSchema.parse(Object.fromEntries(formData));

  await softDeleteAccount(parsed.accountPublicId);

  redirect(`/budgets/${parsed.budgetPublicId}`);
}
