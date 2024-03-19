import { listBudgets } from "~/data/budgets";
import { Metadata } from "next";

import { MainNav } from "~/app/components/MainNav";
import { Search } from "~/app/components/Search";
import { BudgetSwitcher } from "~/app/components/BudgetSwitcher";
import { UserNav } from "~/app/components/UserNav";
import { ModeToggle } from "~/app/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Minimal Money",
};

export async function Shell({ children }: { children: React.ReactNode }) {
  const budgets = await listBudgets();

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <BudgetSwitcher budgets={budgets} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
            <ModeToggle />
          </div>
        </div>
      </div>
      <main className="p-8">{children}</main>
    </div>
  );
}
