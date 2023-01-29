import { HiCheckCircle, HiXCircle } from "react-icons/hi";

const VARIANTS = {
  error: {
    background: "bg-red-100",
    title: "text-red-800",
    description: "text-red-700",
    icon: "text-red-600",
    Icon: HiXCircle,
  },
  success: {
    background: "bg-green-100",
    title: "text-green-800",
    description: "text-green-700",
    icon: "text-green-600",
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
  const classes = VARIANTS[variant];
  const { Icon } = classes;
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
