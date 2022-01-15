import React, { FC } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface IProps {
  className?: string;
}

const Loading: FC<IProps> = ({ className }: IProps) => (
  <div>
    <CgSpinner
      className={`text-9xl text-red-600 mx-auto animate-spin ${className}`}
    />
  </div>
);

export default Loading;
