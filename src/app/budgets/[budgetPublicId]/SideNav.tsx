"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { NewAccountButton } from "./NewAccountButton";
import { Account, Budget } from "~/data/schema";

type Props = {
  budget: Budget & { accounts: Account[] };
};

export function SideNav({ budget }: Props) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex h-full w-72 flex-col bg-gray-800 p-6 text-gray-200">
      <h2 className="flex items-center pb-4 text-xl">{budget?.name}</h2>
      <nav className="flex flex-1 flex-col">
        <Link
          href={`/budgets/${budget.publicId}`}
          className={`flex items-center gap-2 rounded-md p-2 text-sm leading-6 hover:bg-gray-300/10 ${
            pathname === `/budgets/${budget.publicId}` ? "bg-gray-700" : ""
          }`}
        >
          <CalendarDaysIcon className="h-5 w-5" />
          <div>Budget</div>
        </Link>
        <h3 className="pb-2 pt-4">Accounts</h3>
        <ul className="grid gap-2">
          {budget?.accounts.map((account) => (
            <li key={account.publicId}>
              <Link
                href={`/budgets/${budget.publicId}/accounts/${account.publicId}`}
                className={`flex gap-2 rounded-md p-2 text-sm leading-6 hover:bg-gray-300/10 ${
                  pathname ===
                  `/budgets/${budget.publicId}/accounts/${account.publicId}`
                    ? "bg-gray-700"
                    : ""
                }`}
              >
                {account.name}
              </Link>
            </li>
          ))}
          <NewAccountButton />
        </ul>

        {/* Spacer */}
        <div className="grow"></div>

        <div className="grid gap-2">
          <Link href="/">View all budgets</Link>
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
            <span>{user?.firstName}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
