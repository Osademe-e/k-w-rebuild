import React from 'react';
import './styles/HeroContainer.css';

const HeroContainer = ({ children }) => (
  <section className="hero py-3">{children}</section>
);

export default HeroContainer;
