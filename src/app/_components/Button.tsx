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
  "flex gap-1 appearance-none items-center justify-center select-none align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  outline: {
    primary:
      "shadow text-indigo-600 enabled:hover:bg-indigo-600/20 bg-transparent ring-1 ring-inset ring-current",
    gray: "shadow text-zinc-300 enabled:hover:bg-zinc-500/20 bg-transparent ring-1 ring-inset ring-current",
    red: "shadow text-red-700 enabled:hover:bg-red-700/20 bg-transparent ring-1 ring-inset ring-current",
  },
  solid: {
    primary:
      "shadow bg-indigo-600 enabled:hover:bg-indigo-700 text-white ring-indigo-600",
    gray: "",
    red: "shadow bg-red-700 enabled:hover:bg-red-800 text-white focus:ring-offset-red-700",
  },
  ghost: {
    primary:
      "bg-transparent shadow-none enabled:hover:shadow text-indigo-600 enabled:hover:bg-indigo-600/20 ring-current",
    gray: "bg-transparent shadow-none enabled:hover:shadow text-zinc-300 enabled:hover:bg-zinc-600/20 ring-current",
    red: "bg-transparent shadow-none enabled:hover:shadow text-red-600 enabled:hover:bg-red-600/20 ring-current",
  },
  link: {
    primary:
      "shadow-none bg-transparent text-indigo-600 enabled:hover:underline ring-current",
    gray: "",
    red: "shadow-none bg-transparent text-red-600 enabled:hover:underline ring-current",
  },
} as const;

type Variant = keyof typeof variants;
type Color = keyof (typeof variants)["solid"];

const sizes = {
  xs: "h-7 min-w-[2rem] text-xs px-2",
  sm: "h-8 min-w-[2.5rem] text-sm px-4",
  base: "h-10 min-w-[2.5rem] text-base px-4",
  lg: "h-12 min-w-[3rem] text-lg px-6",
} as const;

type Size = keyof typeof sizes;
