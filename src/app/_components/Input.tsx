import { forwardRef, InputHTMLAttributes, useId } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  size?: Size;
  leftIcon?: React.ReactNode;
};

const InputComponent = (props: Props, ref: React.Ref<HTMLInputElement>) => {
  const { size = "base", label, leftIcon, ...rest } = props;

  const sizeClasses = sizes[size];

  const id = useId();

  return (
    <div className="grid gap-2">
      {label ? (
        <label
          htmlFor={props.id ?? id}
          className="block text-sm font-medium leading-6 text-zinc-100"
        >
          {label}
        </label>
      ) : null}
      <div className="relative text-zinc-600 focus-within:text-zinc-400">
        {leftIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {leftIcon}
          </div>
        ) : null}

        <input
          {...rest}
          ref={ref}
          className={`${sizeClasses} block w-full rounded-md border-0 bg-zinc-900 text-zinc-200 ${
            leftIcon ? "pl-10" : ""
          } shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-zinc-600 ${
            props.className
          }`}
          id={props.id ?? id}
        />
      </div>
    </div>
  );
};

{
  /* <input
  id="search"
  placeholder="Search"
  type="search"
  className="block w-full rounded-md border-0 bg-white py-1.5  pr-3 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6"
  name="search"
/> */
}

const sizes = {
  sm: "py-1 text-xs leading-5",
  base: "py-1.5 text-sm leading-6",
} as const;
type Size = keyof typeof sizes;

export const Input = forwardRef(InputComponent);
