import { SignOutButton } from "@clerk/nextjs";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getBudgetWithAccounts } from "~/data/budgets";
import { currentUser } from "~/data/user";

export async function SideNav({ budgetPublicId }: { budgetPublicId: string }) {
  const user = await currentUser();
  const budget = await getBudgetWithAccounts(budgetPublicId);

  return (
    <div className="flex h-full w-72 flex-col bg-gray-900 p-6 text-gray-100">
      <h2 className="flex items-center pb-4 text-xl">{budget?.name}</h2>
      <nav className="flex flex-1 flex-col">
        <Link href="/" className="text-sm">
          View all budgets
        </Link>
        <ul className="flex flex-1 flex-col">
          {budget?.accounts.map((account) => (
            <li key={account.publicId}>
              <Link
                href={`/budgets/${budget.publicId}/accounts/${account.publicId}`}
                className={`${
                  false
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6`}
              >
                <CurrencyDollarIcon className="h-6 w-6 shrink-0" />
                {account.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="grid gap-2">
          <SignOutButton>
            <button className="text-left">Sign out</button>
          </SignOutButton>
          <Link
            href="/profile"
            className="flex items-center gap-4 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
          >
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src={user?.imageUrl}
              alt="Profile image"
            />
            <span className="sr-only">Your profile</span>
            <span>{user.firstName}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
