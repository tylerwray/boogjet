"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { deleteAccountAction, editAccountAction } from "./actions";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Input } from "~/components/ui/input";
import { Account } from "~/data/schema";

type Props = {
  account: Account;
};

export function EditAccountButton({ account }: Props) {
  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit account - {account.name}</DialogTitle>
          <DialogDescription>
            <EditAccountForm
              id="edit-account-form"
              account={account}
              onCancel={() => {}}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function EditAccountForm({
  id,
  onCancel,
  account,
}: {
  id: string;
  account: Account;
  onCancel: () => void;
}) {
  return (
    <form
      id={id}
      action={async (formData) => {
        await editAccountAction(formData);
        onCancel();
      }}
    >
      <EditAccountFormFields account={account} onCancel={onCancel} />
    </form>
  );
}

function EditAccountFormFields({
  account,
  onCancel,
}: {
  account: Account;
  onCancel: () => void;
}) {
  const { pending } = useFormStatus();
  const params = useParams<{
    budgetPublicId: string;
    accountPublicId: string;
  }>();

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
      <Input
        name="accountName"
        defaultValue={account.name}
        autoComplete="off"
        disabled={pending}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          color="gray"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={pending}
          form="edit-account-form"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
