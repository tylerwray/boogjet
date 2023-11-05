import { SignOutButton, currentUser } from "@clerk/nextjs";
import { listUserBudgets } from "~/data/budget";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <SignOutButton>
        <button>Sign out</button>
      </SignOutButton>
      <Budgets />
    </main>
  );
}

async function Budgets() {
  const budgets = await listUserBudgets();

  return (
    <div className="w-full max-w-xs">
      {budgets.map((b) => (
        <div key={b.id}>{b.name}</div>
      ))}
    </div>
  );
}
