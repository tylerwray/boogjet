import { forwardRef, InputHTMLAttributes, useId } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  size?: Size;
};

const InputComponent = (props: Props, ref: React.Ref<HTMLInputElement>) => {
  const { size = "base", label, ...rest } = props;

  const sizeClasses = sizes[size];

  const id = useId();

  return (
    <div className="grid gap-2">
      {label ? (
        <label
          htmlFor={props.id ?? id}
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          {label}
        </label>
      ) : null}
      <input
        {...rest}
        ref={ref}
        className={`${sizeClasses} block w-full rounded-md border-0 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-600 ${props.className}`}
        id={props.id ?? id}
      />
    </div>
  );
};

const sizes = {
  sm: "py-1 text-xs leading-5",
  base: "py-1.5 text-sm leading-6",
} as const;
type Size = keyof typeof sizes;

export const Input = forwardRef(InputComponent);
