"use client";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createCategoryAction } from "./actions";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";

export function NewCategoryButton({
  categoryGroupPublicId,
  addOptimisticCategory,
}: {
  categoryGroupPublicId: string;
  addOptimisticCategory: (args: { name: string; publicId: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  function openInput() {
    setIsOpen(true);
    requestAnimationFrame(() => {
      nameRef.current?.focus();
    });
  }

  function closeInput() {
    setIsOpen(false);
  }

  return (
    <div className="flex h-10 items-center">
      <div className={isOpen ? "block" : "hidden"}>
        <NewCategoryForm
          closeInput={closeInput}
          categoryGroupPublicId={categoryGroupPublicId}
          addOptimisticCategory={addOptimisticCategory}
          nameRef={nameRef}
        />
      </div>
      <button
        className={`flex w-full items-center px-8 py-2 text-sm hover:bg-zinc-700/20 ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={openInput}
      >
        New category
      </button>
    </div>
  );
}

function NewCategoryForm({
  closeInput,
  categoryGroupPublicId,
  addOptimisticCategory,
  nameRef,
}: {
  closeInput: () => void;
  categoryGroupPublicId: string;
  addOptimisticCategory: (args: { name: string; publicId: string }) => void;
  nameRef: React.Ref<HTMLInputElement>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="pl-8"
      action={async (formData) => {
        const name = formData.get("categoryName") as string;
        if (name) {
          addOptimisticCategory({
            name,
            publicId: "optimistic",
          });
        }

        await createCategoryAction(formData);
        closeInput();
        formRef.current?.reset();
      }}
    >
      <NewCategoryFormFields
        categoryGroupPublicId={categoryGroupPublicId}
        closeInput={closeInput}
        nameRef={nameRef}
      />
    </form>
  );
}

function NewCategoryFormFields({
  categoryGroupPublicId,
  closeInput,
  nameRef,
}: {
  closeInput: () => void;
  categoryGroupPublicId: string;
  nameRef: React.Ref<HTMLInputElement>;
}) {
  const params = useParams<{ budgetPublicId: string }>();
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center gap-2">
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
      <Input name="categoryName" disabled={pending} required ref={nameRef} />
      <Button
        size="sm"
        variant="ghost"
        color="gray"
        onClick={closeInput}
        type="button"
        disabled={pending}
      >
        Cancel
      </Button>
      <Button size="sm" type="submit" disabled={pending} onClick={closeInput}>
        Save
      </Button>
    </div>
  );
}
