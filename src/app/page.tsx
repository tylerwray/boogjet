import { currentUser } from "@clerk/nextjs";
import { listBudgets } from "~/data/budgets";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-zinc-900 dark:text-white">
      <Budgets />
    </main>
  );
}

async function Budgets() {
  const budgets = await listBudgets();

  return (
    <div className="w-full max-w-xs">
      {budgets.map((b) => (
        <div key={b.id}>{b.name}</div>
      ))}
    </div>
  );
}
