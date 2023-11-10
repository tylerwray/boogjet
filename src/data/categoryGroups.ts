import { getBudget } from "./budgets";
import { createCategories, createCategory } from "./categories";
import { db } from "./db";
import { generatePublicId } from "./helpers";
import { categoryGroups } from "./schema";

export async function listCategoryGroups(budgetPublicId: string) {
  const budget = await getBudget(budgetPublicId);

  return db.query.categoryGroups.findMany({
    where: (categoryGroups, { eq }) => eq(categoryGroups.budgetId, budget.id),
    with: {
      categories: true,
    },
  });
}

export async function createDefaultCategoryStructure(budgetPublicId: string) {
  const budget = await getBudget(budgetPublicId);
  const flexiGroup = await createCategoryGroup("Flexi", budget.id);
  const fixedGroup = await createCategoryGroup("Fixed", budget.id);
  const futureGroup = await createCategoryGroup("Future", budget.id);

  return createCategories([
    { name: "🍓 Groceries", categoryGroupId: flexiGroup.id },
    { name: "🍴 Dining out", categoryGroupId: flexiGroup.id },
    { name: "👖 Clothing", categoryGroupId: flexiGroup.id },
    { name: "🎉 Fun money", categoryGroupId: flexiGroup.id },
    { name: "🏡 Rent", categoryGroupId: fixedGroup.id },
    { name: "⚡️ Utilities", categoryGroupId: fixedGroup.id },
    { name: "📱 Cell phone", categoryGroupId: fixedGroup.id },
    { name: "📡 Internet", categoryGroupId: fixedGroup.id },
    { name: "📜 Insurance", categoryGroupId: fixedGroup.id },
    { name: "❤️ Medical", categoryGroupId: fixedGroup.id },
    { name: "🕹 Subscriptions", categoryGroupId: fixedGroup.id },
    { name: "🛠 Car Maintenance", categoryGroupId: futureGroup.id },
    { name: "🎉 Celebrations", categoryGroupId: futureGroup.id },
    { name: "🏝️ Vacations", categoryGroupId: futureGroup.id },
    { name: "💝 Giving", categoryGroupId: futureGroup.id },
    { name: "🦺 Emergency Fund", categoryGroupId: futureGroup.id },
  ]);
}

async function createCategoryGroup(name: string, budgetId: number) {
  const publicId = generatePublicId("catgrp");

  await db.insert(categoryGroups).values({
    name,
    publicId,
    budgetId,
  });

  const categoryGroup = await db.query.categoryGroups.findFirst({
    where: (categoryGroups, { eq }) => eq(categoryGroups.publicId, publicId),
  });

  if (!categoryGroup) throw new Error("No category group");

  return categoryGroup;
}
