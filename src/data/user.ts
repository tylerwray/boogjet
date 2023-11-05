import { currentUser as clerkCurrentUser } from "@clerk/nextjs";

export async function currentUser() {
  const user = await clerkCurrentUser();

  if (!user) throw new Error("No currentUser found");

  return user;
}
