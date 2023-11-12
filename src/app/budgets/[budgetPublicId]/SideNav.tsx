"use client";
import { useState, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "~/app/_components/Button";
import { Input } from "~/app/_components/Input";
import { createAccountAction } from "./actions";
import { useParams } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Account, Budget } from "~/data/schema";
import { Modal } from "~/app/_components/Modal";

type Props = {
  budget: Budget & { accounts: Account[] };
};

export function SideNav({ budget }: Props) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex h-full w-72 flex-col border-r border-gray-700 bg-gray-800 p-6 text-gray-200">
      <h2 className="flex items-center pb-4 text-xl">{budget?.name}</h2>
      <nav className="flex flex-1 flex-col">
        <NavItem
          href={`/budgets/${budget.publicId}`}
          isActive={pathname === `/budgets/${budget.publicId}`}
        >
          <CalendarDaysIcon className="h-5 w-5" />
          <div>Budget</div>
        </NavItem>
        <h3 className="pb-2 pt-4">Accounts</h3>
        <ul className="grid gap-2">
          {budget?.accounts.map((account) => (
            <li key={account.publicId}>
              <NavItem
                href={`/budgets/${budget.publicId}/accounts/${account.publicId}`}
                isActive={
                  pathname ===
                  `/budgets/${budget.publicId}/accounts/${account.publicId}`
                }
              >
                {account.name}
              </NavItem>
            </li>
          ))}
          <NewAccountButton />
        </ul>

        {/* Spacer */}
        <div className="grow"></div>

        <div className="grid gap-2">
          <NavItem href="/">View all budgets</NavItem>
          <SignOutButton>
            <NavItem href="#">Sign out</NavItem>
          </SignOutButton>
          <NavItem href="/profile">
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src={user?.imageUrl}
              alt="Profile image"
            />
            <span className="sr-only">Your profile</span>
            <span>{user?.firstName}</span>
          </NavItem>
        </div>
      </nav>
    </div>
  );
}

type NavItemProps = {
  children: ReactNode;
  isActive?: boolean;
  href: string;
};

function NavItem(props: NavItemProps) {
  return (
    <Link
      href={props.href}
      className={`flex items-center gap-2 rounded-md p-2 text-sm leading-6 hover:bg-gray-300/10 ${
        props.isActive ? "bg-gray-700" : ""
      }`}
    >
      {props.children}
    </Link>
  );
}

function NewAccountButton() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        onClick={openModal}
        variant="ghost"
        color="gray"
        size="sm"
        leftIcon={<PlusIcon />}
      >
        New account
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Create account">
        <NewAccountForm onComplete={closeModal} />
      </Modal>
    </>
  );
}

function NewAccountForm({ onComplete }: { onComplete: () => void }) {
  return (
    <form
      action={async (formData) => {
        await createAccountAction(formData);
        onComplete();
      }}
    >
      <NewAccountFormFields />
    </form>
  );
}

function NewAccountFormFields() {
  const params = useParams<{ budgetPublicId: string }>();
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-4">
      <input
        hidden
        name="budgetPublicId"
        defaultValue={params.budgetPublicId}
      />
      <Input
        name="accountName"
        label="Name"
        required
        autoComplete="off"
        disabled={pending}
      />
      <Button type="submit" disabled={pending}>
        Create
      </Button>
    </div>
  );
}
