"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "~/app/_components/Input";
import { Logo } from "~/Logo";

const userNavigation = [
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/signout" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className="min-h-full dark:bg-black dark:text-zinc-100">
      <Disclosure
        as="nav"
        className="border-b border-none border-opacity-25 dark:bg-black"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between border-b border-white border-opacity-25">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="hidden lg:ml-10 lg:block">
                    <div className="flex items-center space-x-4">
                      <Logo className="h-6 w-6" />
                      <Link
                        href="/"
                        className={`flex items-center gap-2 rounded-md p-2 text-sm leading-6 hover:bg-zinc-300/10 ${
                          false ? "bg-zinc-700" : ""
                        }`}
                      >
                        Budget
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <Input
                      placeholder="Search transactions"
                      leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-zinc-300/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 flex-shrink-0">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-zinc-100" : "",
                                    "block px-4 py-2 text-sm text-zinc-700",
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={classNames(
                    false
                      ? "bg-indigo-700 text-white"
                      : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={false ? "page" : undefined}
                >
                  Budget
                </Disclosure.Button>
              </div>
              <div className="border-t border-indigo-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user?.fullName}
                    </div>
                    <div className="text-sm font-medium text-indigo-300">
                      {user?.emailAddresses[0].emailAddress}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-12">{children}</main>
    </div>
  );
}

// "use client";
// import { useState, ReactNode } from "react";
// import { useFormStatus } from "react-dom";
// import { PlusIcon } from "@heroicons/react/20/solid";
// import { Button } from "~/app/_components/Button";
// import { Input } from "~/app/_components/Input";
// import { createAccountAction } from "./actions";
// import { useParams } from "next/navigation";
// import { SignOutButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { CalendarDaysIcon } from "@heroicons/react/24/outline";
// import { Account, Budget } from "~/data/schema";
// import { Modal } from "~/app/_components/Modal";

// type Props = {
//   budget: Budget & { accounts: Account[] };
// };

// export function SideNav({ budget }: Props) {
//   const pathname = usePathname();
//   const { user } = useUser();

//   return (
//     <div className="flex h-full w-72 flex-col border-r border-gray-700 bg-gray-800 p-6 text-gray-200">
//       <h2 className="flex items-center pb-4 text-xl">{budget?.name}</h2>
//       <nav className="flex flex-1 flex-col">
//         <NavItem
//           href={`/budgets/${budget.publicId}`}
//           isActive={pathname === `/budgets/${budget.publicId}`}
//         >
//           <CalendarDaysIcon className="h-5 w-5" />
//           <div>Budget</div>
//         </NavItem>
//         <h3 className="pb-2 pt-4">Accounts</h3>
//         <ul className="grid gap-2">
//           {budget?.accounts.map((account) => (
//             <li key={account.publicId}>
//               <NavItem
//                 href={`/budgets/${budget.publicId}/accounts/${account.publicId}`}
//                 isActive={
//                   pathname ===
//                   `/budgets/${budget.publicId}/accounts/${account.publicId}`
//                 }
//               >
//                 {account.name}
//               </NavItem>
//             </li>
//           ))}
//           <NewAccountButton />
//         </ul>

//         {/* Spacer */}
//         <div className="grow"></div>

//         <div className="grid gap-2">
//           <NavItem href="/">View all budgets</NavItem>
//           <SignOutButton>
//             <NavItem href="#">Sign out</NavItem>
//           </SignOutButton>
//           <NavItem href="/profile">
//             <img
//               className="h-8 w-8 rounded-full bg-gray-800"
//               src={user?.imageUrl}
//               alt="Profile image"
//             />
//             <span className="sr-only">Your profile</span>
//             <span>{user?.firstName}</span>
//           </NavItem>
//         </div>
//       </nav>
//     </div>
//   );
// }

// type NavItemProps = {
//   children: ReactNode;
//   isActive?: boolean;
//   href: string;
// };

// function NavItem(props: NavItemProps) {
//   return (
//     <Link
//       href={props.href}
//       className={`flex items-center gap-2 rounded-md p-2 text-sm leading-6 hover:bg-gray-300/10 ${
//         props.isActive ? "bg-gray-700" : ""
//       }`}
//     >
//       {props.children}
//     </Link>
//   );
// }

// function NewAccountButton() {
//   const [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   return (
//     <>
//       <Button
//         onClick={openModal}
//         variant="ghost"
//         color="gray"
//         size="sm"
//         leftIcon={<PlusIcon />}
//       >
//         New account
//       </Button>

//       <Modal isOpen={isOpen} onClose={closeModal} title="Create account">
//         <NewAccountForm onComplete={closeModal} />
//       </Modal>
//     </>
//   );
// }

// function NewAccountForm({ onComplete }: { onComplete: () => void }) {
//   return (
//     <form
//       action={async (formData) => {
//         await createAccountAction(formData);
//         onComplete();
//       }}
//     >
//       <NewAccountFormFields />
//     </form>
//   );
// }

// function NewAccountFormFields() {
//   const params = useParams<{ budgetPublicId: string }>();
//   const { pending } = useFormStatus();

//   return (
//     <div className="grid gap-4">
//       <input
//         hidden
//         name="budgetPublicId"
//         defaultValue={params.budgetPublicId}
//       />
//       <Input
//         name="accountName"
//         label="Name"
//         required
//         autoComplete="off"
//         disabled={pending}
//       />
//       <Button type="submit" disabled={pending}>
//         Create
//       </Button>
//     </div>
//   );
// }
