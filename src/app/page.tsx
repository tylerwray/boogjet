import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { createBudget, listBudgets } from "~/data/budgets";
import { Input } from "./_components/Input";
import { redirect } from "next/navigation";

import { z } from "zod";
import { Button } from "./_components/Button";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <main className="grid min-h-screen flex-1 content-start justify-center gap-4 bg-black py-16 text-zinc-100">
      <h2 className="text-xl">Budgets</h2>
      <Budgets />
    </main>
  );
}

async function Budgets() {
  const budgets = await listBudgets();

  return (
    <div className="grid w-80 content-start gap-4">
      {budgets.length === 0 ? (
        <div className="text-sm">No budgets yet.</div>
      ) : (
        budgets.map((b) => (
          <Link
            key={b.publicId}
            className="block rounded-md border border-zinc-500 bg-zinc-800 px-2 py-4 hover:bg-zinc-600/60"
            href={`/budgets/${b.publicId}`}
          >
            {b.name}
          </Link>
        ))
      )}
      <hr className="border-zinc-700" />
      <NewBudgetForm />
    </div>
  );
}

const newBudgetSchema = z.object({
  name: z.string(),
});

async function NewBudgetForm() {
  async function create(formData: FormData) {
    "use server";

    const name = formData.get("budgetName");
    const parsed = newBudgetSchema.parse({ name });

    const publicId = await createBudget(parsed.name);

    redirect(`/budgets/${publicId}`);
  }

  return (
    <form action={create}>
      <h2 className="pb-4 text-xl">New Budget</h2>
      <div className="grid gap-4">
        <Input name="budgetName" label="Name" required autoComplete="off" />
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
