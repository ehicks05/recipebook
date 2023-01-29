import { HiCheckCircle, HiXCircle } from "react-icons/hi";

const VARIANTS = {
  error: {
    background: "bg-red-100 dark:bg-red-900",
    title: "text-red-800 dark:text-red-100",
    description: "text-red-700 dark:text-red-200",
    icon: "text-red-600 dark:text-red-300",
    Icon: HiXCircle,
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
}

const Alert = ({
  title = "Something went wrong...",
  description,
  variant = "error",
}: Props) => {
  const { Icon, ...classes } = VARIANTS[variant];
  return (
    <div className={`m-3 rounded p-3 ${classes.background}`}>
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Icon className={classes.icon} />
        <div className={classes.title}>{title}</div>
      </div>
      <div className={`pl-7 ${classes.description}`}>{description}</div>
    </div>
  );
};

export default Alert;
