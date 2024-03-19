import * as React from "react";

import { cn } from "~/lib/utils";

export interface AmountInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const AmountInput = ({ className, ...props }: AmountInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "flex h-10 w-full items-center gap-0.5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
        className,
      )}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      <div className="">$</div>
      <input
        className="flex w-full bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        ref={inputRef}
        {...props}
      />
    </div>
  );
};

AmountInput.displayName = "AmountInput";

export { AmountInput };
