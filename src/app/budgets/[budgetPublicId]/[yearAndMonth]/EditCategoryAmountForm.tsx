"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "~/app/components/AmountInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn, amountIntToFloat, amountFloatToInt } from "~/lib/utils";

const formSchema = z.object({
  amount: z
    .custom<number>()
    .refine((value) => value ?? false, "Required")
    .refine((value) => Number.isFinite(Number(value)), "Invalid number")
    .transform((value) => amountFloatToInt(Number(value))),
});

type FormSchema = z.infer<typeof formSchema>;

export function EditCategoryAmountForm({ amount }: { amount: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: amountIntToFloat(amount),
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(values: FormSchema) {
    console.log(values.amount);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AmountInput
                  {...field}
                  ref={inputRef}
                  className={cn(
                    isOpen ? "border" : "border-transparent hover:border-input",
                  )}
                  onBlur={() => setIsOpen(false)}
                  onClick={() => setIsOpen(true)}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Amount assigned to the category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="sr-only invisible">
          Submit
        </button>
      </form>
    </Form>
  );
}
