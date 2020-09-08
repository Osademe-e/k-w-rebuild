import React from 'react';

import { Link } from 'react-router-dom';
import './styles/Footer.css';

import footerLogo from '../assets/images/logo svg/Asset 20.svg';

const Footer = () => {
  return (
    <footer className="text-primary-100 mt-2">
      <div className="social-links">
        <div className="lg:container mx-auto px-2 lg:px-0 py-3 flex items-center justify-around text-sm">
          <div>
            <img src={footerLogo} alt="logo" className="w-32 mb-3" />
            <ul>
              <li className="mb-2 hover:font-semibold">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2 hover:font-semibold">
                <Link to="/talents">Talents</Link>
              </li>
              <li className="mb-2 hover:font-semibold">
                <Link to="/news">News</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="uppercase font-semibold text-lg mb-3 mt-3">
              Social
            </h1>
            <ul>
              <li className="mb-2 hover:font-semibold">
                <Link to="/">Facebook</Link>
              </li>
              <li className="mb-2 hover:font-semibold">
                <Link to="/talents">Twitter</Link>
              </li>
              <li className="mb-2 hover:font-semibold">
                <Link to="/news">Instagram</Link>
              </li>
              <li className="mb-2 hover:font-semibold">
                <Link to="/news">Youtube</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center text-sm font-semibold lg:container mx-auto px-2 lg:px-0">
          <div className="text-center lg:text-left mb-3 lg:mb-0">
            <span>&copy; Kingsports Limited {new Date().getFullYear()}</span>
            <div className="text-primary-500 mt-2">
              <Link to="/terms">Terms Of Service | </Link>
              <Link to="/privacy">Privacy Policy </Link>
            </div>
          </div>
          <img src={footerLogo} alt="logo" className="w-20" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
