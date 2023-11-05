import { db } from "~/db";
import { currentUser } from "./user";

export async function listUserBudgets() {
  const user = await currentUser();

  return db.budget.findMany({ where: { userId: user.id } });
}
