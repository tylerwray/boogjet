"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import dayjs from "dayjs";

import { cn } from "~/lib/utils";

type Props = React.HTMLAttributes<HTMLElement>;

export function MainNav({ className, ...props }: Props) {
  const { budgetPublicId } = useParams<{ budgetPublicId: string }>();
  const currentYearAndMonth = dayjs().format("YYYYMM");

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        href={`/budgets/${budgetPublicId}/${currentYearAndMonth}`}
        activeMatch={/budgets\/bud_[a-zA-Z\d]+\/[\d]{6}/}
      >
        Budget
      </NavLink>
      <NavLink href={`/budgets/${budgetPublicId}/accounts`}>Accounts</NavLink>
      <NavLink href={`/budgets/${budgetPublicId}/reports`}>Reports</NavLink>
      <NavLink href={`/budgets/${budgetPublicId}/settings`}>Settings</NavLink>
    </nav>
  );
}

function NavLink({
  href,
  children,
  activeMatch,
}: {
  href: string;
  children: React.ReactNode;
  activeMatch?: RegExp;
}) {
  const pathname = usePathname();
  const isActive = activeMatch ? activeMatch.test(pathname) : pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "" : "text-muted-foreground",
      )}
    >
      {children}
    </Link>
  );
}
