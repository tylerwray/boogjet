import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export function Button(props: Props) {
  return (
    <button
      {...props}
      className={`rounded bg-indigo-600 px-4 py-1 font-medium text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
