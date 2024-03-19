"use client";

import { useOptimistic, useRef } from "react";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "~/lib/utils";
import { Category, CategoryFunds } from "~/data/schema";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { createCategoryAction } from "./actions";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { EditCategoryAmountForm } from "./EditCategoryAmountForm";

type OptimisticCategory = {
  name: string;
  publicId: string;
  categoryFunds: CategoryFunds[];
};

export function Categories({
  categories,
  categoryGroupPublicId,
  groupName,
}: {
  categories: (Category & { categoryFunds: CategoryFunds[] })[];
  categoryGroupPublicId: string;
  groupName: string | null;
}) {
  const [optimisticCategories, addOptimisticCategory] = useOptimistic(
    categories,
    (state: OptimisticCategory[], newCategory: OptimisticCategory) => [
      ...state,
      newCategory,
    ],
  );

  return (
    <div>
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
        <h3 className="font-semibold">{groupName}</h3>
        <NewCategoryButton
          categoryGroupPublicId={categoryGroupPublicId}
          addOptimisticCategory={addOptimisticCategory}
        />
      </div>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">Category</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Remaining</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticCategories.map((c) => (
            <TableRow
              key={c.publicId}
              className={cn(
                "cursor-pointer",
                c.publicId === "optimistic" ? "text-muted-foreground" : "",
              )}
            >
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>
                <EditCategoryAmountForm
                  amount={c.categoryFunds[0]?.amount ?? 0}
                />
              </TableCell>
              <TableCell>$300.00</TableCell>
              <TableCell>$700.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function NewCategoryButton({
  categoryGroupPublicId,
  addOptimisticCategory,
}: {
  categoryGroupPublicId: string;
  addOptimisticCategory: (args: OptimisticCategory) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New category</DialogTitle>
          <DialogDescription>Create a new category</DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          action={async (formData) => {
            const name = formData.get("categoryName") as string;
            if (name) {
              addOptimisticCategory({
                name,
                publicId: "optimistic",
                categoryFunds: [],
              });
            }

            await createCategoryAction(formData);
            formRef.current?.reset();
          }}
        >
          <NewCategoryFormFields
            categoryGroupPublicId={categoryGroupPublicId}
          />
        </form>
      </DialogContent>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="left">New category</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Dialog>
  );
}

function NewCategoryFormFields({
  categoryGroupPublicId,
}: {
  categoryGroupPublicId: string;
}) {
  const params = useParams<{ budgetPublicId: string }>();
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-4 py-4">
      <input
        name="budgetPublicId"
        hidden
        defaultValue={params.budgetPublicId}
      />
      <input
        name="categoryGroupPublicId"
        hidden
        defaultValue={categoryGroupPublicId}
      />
      <Input name="categoryName" disabled={pending} required />
      <DialogFooter>
        <DialogClose asChild>
          <Button
            size="sm"
            variant="ghost"
            color="gray"
            type="button"
            disabled={pending}
          >
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button size="sm" type="submit" disabled={pending}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
