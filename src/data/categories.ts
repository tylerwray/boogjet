import { db } from "./db";
import { generatePublicId } from "./helpers";
import { categories } from "./schema";

export async function createCategories(
  values: { name: string; categoryGroupId: number }[],
) {
  const insertValues = values.map((v) => ({
    ...v,
    publicId: generatePublicId("cat"),
  }));
  return db.insert(categories).values(insertValues);
}

export async function createCategory({
  name,
  categoryGroupId,
}: {
  name: string;
  categoryGroupId: number;
}) {
  const publicId = generatePublicId("cat");

  return db.insert(categories).values({
    name,
    publicId,
    categoryGroupId,
  });
}
