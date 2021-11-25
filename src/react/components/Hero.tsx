import React, { FunctionComponent } from 'react';

interface IProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Hero: FunctionComponent<IProps> = ({ title, subtitle, children }: IProps) => (
  <section className="hero">
    <div className="hero-body">
      <div className="container">
        {title && <div className="text-3xl font-semibold text-gray-200">{title}</div>}
        {subtitle && <div className="subtitle">{subtitle}</div>}
        {children && children}
      </div>
    </div>
  </section>
);

export default Hero;
