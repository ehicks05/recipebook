import React, { FunctionComponent } from 'react';
import Footer from './Footer';
import Navbar from './Navbar/Navbar';

interface IProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Loading: FunctionComponent<IProps> = ({
  title,
  subtitle,
  children,
}: IProps) => (
  <section className="hero is-fullheight">
    <div className="hero-head">
      <Navbar />
    </div>
    <div className="hero-body">
      <div className="container">
        {title && <h1 className="title">{title}</h1>}
        {subtitle && <h3 className="subtitle">{subtitle}</h3>}
        {children && children}
      </div>
    </div>
    <div className="hero-foot">
      <Footer />
    </div>
  </section>
);

export default Loading;
