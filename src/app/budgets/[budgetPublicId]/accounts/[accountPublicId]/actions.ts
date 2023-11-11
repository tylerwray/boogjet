"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateAccount } from "~/data/accounts";

const deleteAccountSchema = z.object({
  budgetPublicId: z.string(),
  accountPublicId: z.string(),
});

export async function deleteAccountAction(formData: FormData) {
  const parsed = deleteAccountSchema.parse(Object.fromEntries(formData));

  await updateAccount(parsed.accountPublicId, { deletedAt: new Date() });

  redirect(`/budgets/${parsed.budgetPublicId}`);
}

const editAccountSchema = z.object({
  budgetPublicId: z.string(),
  accountPublicId: z.string(),
  accountName: z.string(),
});

export async function editAccountAction(formData: FormData) {
  const parsed = editAccountSchema.parse(Object.fromEntries(formData));

  await updateAccount(parsed.accountPublicId, { name: parsed.accountName });

  redirect(
    `/budgets/${parsed.budgetPublicId}/accounts/${parsed.accountPublicId}`,
  );
}
