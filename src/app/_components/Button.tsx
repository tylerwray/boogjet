import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  color?: Color;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: Size;
  variant?: Variant;
};

export function Button(props: Props) {
  const {
    children,
    color,
    leftIcon,
    rightIcon,
    size,
    variant,
    className,
    ...rest
  } = props;

  const variantClasses = variants[variant ?? "solid"][color ?? "primary"];
  const sizeClasses = sizes[size ?? "base"];

  return (
    <button
      {...rest}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
    >
      {leftIcon && <div className="h-5 w-5">{leftIcon}</div>}
      {children}
      {rightIcon && <div className="h-5 w-5">{rightIcon}</div>}
    </button>
  );
}

const baseClasses =
  "flex gap-1 appearance-none items-center justify-center select-none align-middle focus:outline-none rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  outline: {
    primary:
      "shadow text-indigo-600 enabled:hover:bg-indigo-600/20 bg-transparent ring-1 ring-inset ring-current",
    gray: "shadow text-gray-300 enabled:hover:bg-gray-300/30 bg-transparent ring-1 ring-inset ring-current",
  },
  solid: {
    primary:
      "shadow bg-indigo-600 enabled:hover:bg-indigo-500 text-white ring-indigo-600",
    gray: "",
  },
  ghost: {
    primary:
      "bg-transparent shadow-none enabled:hover:shadow text-indigo-600 enabled:hover:bg-indigo-600/20 ring-current",
    gray: "bg-transparent shadow-none enabled:hover:shadow text-gray-300 enabled:hover:bg-gray-300/10 ring-current",
  },
  link: {
    primary:
      "shadow-none bg-transparent text-indigo-600 enabled:hover:underline ring-current",
    gray: "",
  },
} as const;

type Variant = keyof typeof variants;
type Color = keyof (typeof variants)["solid"];

const sizes = {
  sm: "h-6 min-w-[2.5rem] text-sm font-light px-4",
  base: "h-10 min-w-[2.5rem] text-md px-4",
  lg: "h-12 min-w-[3rem] text-lg px-6",
} as const;

type Size = keyof typeof sizes;
