import { SideNav } from "./SideNav";

export default function BudgetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { budgetPublicId: string };
}) {
  return (
    <div className="grid h-full grid-cols-[auto_1fr]">
      <SideNav budgetPublicId={params.budgetPublicId} />
      <main className="h-full bg-gray-800 p-6 text-gray-100">{children}</main>
    </div>
  );
}
