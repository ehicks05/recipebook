import React from "react";
import { CgSpinner } from "react-icons/cg";

interface IProps {
  className?: string;
}

const Loading = ({ className = "" }: IProps) => (
  <div>
    <CgSpinner
      className={`mx-auto animate-spin text-9xl text-red-600 ${className}`}
    />
  </div>
);

export default Loading;
