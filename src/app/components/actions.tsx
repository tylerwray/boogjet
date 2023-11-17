"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createBudget } from "~/data/budgets";
const newBudgetSchema = z.object({
  name: z.string(),
});

export async function createBudgetAction(formData: FormData) {
  const name = formData.get("budgetName");
  const parsed = newBudgetSchema.parse({ name });

  const publicId = await createBudget(parsed.name);

  redirect(`/budgets/${publicId}`);
}
