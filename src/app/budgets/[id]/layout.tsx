import { SideNav } from "~/app/_components/SideNav";

export default function BudgetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="grid h-full grid-cols-[auto_1fr]">
      <SideNav budgetPublicId={params.id} />
      <main className="h-full bg-gray-800 p-6 text-gray-100">{children}</main>
    </div>
  );
}
