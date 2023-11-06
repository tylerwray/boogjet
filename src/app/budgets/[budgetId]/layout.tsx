import { SideNav } from "~/app/_components/SideNav";

export default function BudgetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { budgetId: number };
}) {
  console.log("TACO", params);
  return (
    <div className="grid h-full grid-cols-[auto_1fr]">
      <SideNav budgetId={params.budgetId} />
      {children}
    </div>
  );
}
