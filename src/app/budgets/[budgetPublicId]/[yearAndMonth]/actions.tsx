"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAccount } from "~/data/accounts";
import { createCategory } from "~/data/categories";
import { getCategoryGroup } from "~/data/categoryGroups";

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

const newCategorySchema = z.object({
  categoryName: z.string(),
  categoryGroupPublicId: z.string(),
  budgetPublicId: z.string(),
});

export async function createCategoryAction(formData: FormData) {
  const parsed = newCategorySchema.parse(Object.fromEntries(formData));

  const categoryGroup = await getCategoryGroup(parsed.categoryGroupPublicId);

  if (!categoryGroup) throw new Error("No category group");

  await createCategory({
    name: parsed.categoryName,
    categoryGroupId: categoryGroup.id,
  });

  redirect(`/budgets/${parsed.budgetPublicId}`);
}
