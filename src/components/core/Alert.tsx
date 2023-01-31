import type { ReactNode } from "react";
import { HiCheckCircle, HiInformationCircle, HiXCircle } from "react-icons/hi";

const VARIANTS = {
  error: {
    background: "bg-red-100 dark:bg-red-900",
    title: "text-red-800 dark:text-red-100",
    description: "text-red-700 dark:text-red-200",
    icon: "text-red-600 dark:text-red-300",
    Icon: HiXCircle,
  },
  info: {
    background: "bg-sky-100 dark:bg-sky-900",
    title: "text-sky-800 dark:text-sky-100",
    description: "text-sky-700 dark:text-sky-200",
    icon: "text-sky-600 dark:text-sky-300",
    Icon: HiInformationCircle,
  },
  success: {
    background: "bg-green-100 dark:bg-green-900",
    title: "text-green-800 dark:text-green-100",
    description: "text-green-700 dark:text-green-200",
    icon: "text-green-600 dark:text-green-300",
    Icon: HiCheckCircle,
  },
} as const;

interface Props {
  variant: keyof typeof VARIANTS;
  title: string;
  description?: string;
  children?: ReactNode;
}

const Alert = ({
  title = "Something went wrong...",
  description,
  variant = "error",
  children,
}: Props) => {
  const { Icon, ...classes } = VARIANTS[variant];
  return (
    <div className={`rounded p-3 ${classes.background}`}>
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Icon className={classes.icon} />
        <div className={classes.title}>{title}</div>
      </div>
      {description && (
        <div className={`pl-7 ${classes.description}`}>{description}</div>
      )}
      {children && (
        <div className={`pl-7 ${classes.description}`}>{children}</div>
      )}
    </div>
  );
};

export default Alert;
