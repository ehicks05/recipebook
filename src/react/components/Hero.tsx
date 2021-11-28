import React, { FunctionComponent } from 'react';

interface IProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Hero: FunctionComponent<IProps> = ({
  title,
  subtitle,
  children,
}: IProps) => (
  <section className="bg-gray-50 dark:bg-gray-800">
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="">
        {title && (
          <div className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
            {title}
          </div>
        )}
        {subtitle && (
          <div className="text-gray-600 dark:text-gray-300">{subtitle}</div>
        )}
        {children}
      </div>
    </div>
  </section>
);

export default Hero;
