import { InputHTMLAttributes, HTMLProps, useId } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Input(props: Props) {
  const id = useId();

  return (
    <div className="grid gap-2">
      <label
        htmlFor={props.id ?? id}
        className="block text-sm font-medium leading-6 text-gray-100"
      >
        {props.label}
      </label>
      <input
        {...props}
        className={`block w-full rounded-md border-0 bg-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${props.className}`}
        id={props.id ?? id}
      />
    </div>
  );
}
