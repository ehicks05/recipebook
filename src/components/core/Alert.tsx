import { HiXCircle } from "react-icons/hi";

interface Props {
  variant: "error";
  title: string;
  description?: string;
}

const Alert = ({
  title = "Something went wrong...",
  description,
  variant = "error",
}: Props) => {
  console.log(`todo: add more variants beyond '${variant}'`);
  return (
    <div className="m-3 rounded bg-red-100 p-3">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <HiXCircle className="text-red-600" />
        <div className="text-red-800">{title}</div>
      </div>
      <div className="pl-7 text-red-700">{description}</div>
    </div>
  );
};

export default Alert;
