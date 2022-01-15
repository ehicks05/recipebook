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
  <section className="bg-neutral-50 dark:bg-neutral-800">
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="">
        {title && (
          <div className="text-3xl font-semibold text-neutral-700 dark:text-neutral-200">
            {title}
          </div>
        )}
        {subtitle && (
          <div className="text-neutral-600 dark:text-neutral-300">
            {subtitle}
          </div>
        )}
        {children}
      </div>
    </div>
  </section>
);

export default Hero;
