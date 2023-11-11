"use client";

import { useState } from "react";
import { Button } from "~/app/_components/Button";
import { Modal } from "~/app/_components/Modal";
import { deleteAccountAction, editAccountAction } from "./actions";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { PencilIcon } from "@heroicons/react/20/solid";
import { Input } from "~/app/_components/Input";
import { Account } from "~/data/schema";

type Props = {
  account: Account;
};

export function EditAccountButton({ account }: Props) {
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
        color="gray"
        variant="outline"
        size="sm"
        leftIcon={<PencilIcon />}
      >
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Edit account - ${account.name}`}
      >
        <EditAccountForm
          id="edit-account-form"
          onCancel={closeModal}
          account={account}
        />
      </Modal>
    </>
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
        label="Name"
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
