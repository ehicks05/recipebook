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
        <h1 className="title">{title}</h1>
        {subtitle && <h3 className="subtitle">{subtitle}</h3>}
        {children && children}
      </div>
    </div>
  </section>
);

export default Hero;
