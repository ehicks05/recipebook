import React, { FC } from 'react';

const Container: FC = ({ children }) => {
  return <div className="max-w-screen-xl mx-auto p-4">{children}</div>;
};

export default Container;
