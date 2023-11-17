"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

import { deleteAccountAction } from "./actions";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Input } from "~/components/ui/input";

export function DeleteAccountButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger>Delete</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              <p className="pb-4">
                Are you sure you want to delete your account?
                <br />
                Type 'delete account' to confirm.
              </p>
              <DeleteAccountForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DeleteAccountForm() {
  return (
    <form action={deleteAccountAction}>
      <DeleteAccountFormFields />
    </form>
  );
}

function DeleteAccountFormFields() {
  const params = useParams<{
    budgetPublicId: string;
    accountPublicId: string;
  }>();

  const { pending } = useFormStatus();

  return (
    <div className="grid gap-4">
      <input
        hidden
        name="accountPublicId"
        defaultValue={params.accountPublicId}
      />
      <input
        hidden
        name="budgetPublicId"
        defaultValue={params.budgetPublicId}
      />
      <Input required pattern="delete account" placeholder="delete account" />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          color="gray"
          variant="ghost"
          size="sm"
          disabled={pending}
        >
          Cancel
        </Button>
        <Button type="submit" color="red" size="sm" disabled={pending}>
          Yes, Delete Account
        </Button>
      </div>
    </div>
  );
}
