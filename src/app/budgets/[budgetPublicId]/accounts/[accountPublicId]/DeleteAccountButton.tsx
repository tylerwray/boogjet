"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "~/app/_components/Button";
import { Modal } from "~/app/_components/Modal";
import { deleteAccountAction } from "./actions";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";

export function DeleteAccountButton() {
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
        color="red"
        variant="outline"
        size="sm"
        leftIcon={<TrashIcon />}
      >
        Delete Account
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal} title="Delete account">
        <DeleteAccountForm onCancel={closeModal} />
      </Modal>
    </>
  );
}

function DeleteAccountForm({ onCancel }: { onCancel: () => void }) {
  return (
    <form action={deleteAccountAction}>
      <p className="pb-4">Are you sure you want to delete your account?</p>
      <DeleteAccountFormFields onCancel={onCancel} />
    </form>
  );
}

function DeleteAccountFormFields({ onCancel }: { onCancel: () => void }) {
  const params = useParams<{
    budgetPublicId: string;
    accountPublicId: string;
  }>();

  const { pending } = useFormStatus();

  return (
    <>
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
        <Button type="submit" color="red" size="sm" disabled={pending}>
          Yes, Delete Account
        </Button>
      </div>
    </>
  );
}
