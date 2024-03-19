"use client";

import { useState } from "react";
import { createBudgetAction } from "./actions";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Budget } from "~/data/schema";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

type Selection = { label: string; value: string };

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface BudgetSwitcherProps extends PopoverTriggerProps {
  budgets: Budget[];
}

export function BudgetSwitcher({ className, budgets }: BudgetSwitcherProps) {
  const params = useParams<{ budgetPublicId: string }>();
  const router = useRouter();
  const currentYearAndMonth = dayjs().format("YYYYMM");

  const budgetItems = budgets.map((b) => ({
    label: b.name,
    value: b.publicId,
  }));

  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Selection>(
    budgetItems.find((b) => b.value === params.budgetPublicId) ||
      budgetItems[0],
  );

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a budget"
            className={cn("w-[280px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedBudget?.value}.png`}
                alt={selectedBudget?.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedBudget?.label}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search budgets..." />
              <CommandEmpty>No budget found.</CommandEmpty>
              <CommandGroup heading="Budgets">
                {budgetItems.map((budget) => (
                  <CommandItem
                    key={budget.value}
                    value={budget.value}
                    onSelect={() => {
                      setSelectedBudget(budget);
                      setOpen(false);
                      router.push(
                        `/budgets/${budget.value}/${currentYearAndMonth}`,
                      );
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    {budget.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedBudget.value === budget.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Create Budget
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New budget</DialogTitle>
          <DialogDescription>
            Add a new budget to manage your finances.
          </DialogDescription>
        </DialogHeader>

        <form action={createBudgetAction} id="new-budget-form">
          <div className="grid gap-4">
            <Input name="budgetName" required autoComplete="off" />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" form="new-budget-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
