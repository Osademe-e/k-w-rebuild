import React from 'react';

import { Link } from 'react-router-dom';
import './styles/Footer.css';

import footerLogo from '../assets/images/logo svg/Asset 20.svg';
import facebookIcon from '../assets/icons/facebookIcon.svg';
import youtubeIcon from '../assets/icons/17232598641556105346.svg';
import twitterIcon from '../assets/icons/17998766861556105338.svg';
import instagramIcon from '../assets/icons/19042250241579774616.svg';

const Footer = () => {
  return (
    <footer className="text-primary-100 mt-2">
      <div className="social-links">
        <div className="lg:container mx-auto px-2 lg:px-0 py-3 flex justify-evenly text-sm">
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
              Contact Us
            </h1>
            <a
              href="mailto:support@kingsports.pro"
              className="cursor-pointer block"
              target="_blank"
              rel="noopener noreferrer">
              support@kingsports.pro
            </a>
            <a
              href="mailto:admin@kingsports.pro"
              className="cursor-pointer block"
              target="_blank"
              rel="noopener noreferrer">
              admin@kingsports.pro
            </a>
            {/* <a
              href="https://api.whatsapp.com/send?phone=2348120130191"
              className="cursor-pointer"
              target="_blank"
              rel="noopener noreferrer">
              call/whatsapp +2348120130191
            </a> */}
          </div>
          <div>
            <h1 className="uppercase font-semibold text-lg mb-3 mt-3">
              Social
            </h1>
            <ul className="flex items-center justify-evenly">
              <li className="mb-2 hover:font-semibold">
                <a
                  href="https://www.facebook.com/kingsportsProo"
                  target="_bank">
                  <img
                    src={facebookIcon}
                    alt="facebook icon"
                    className="w-8 h-8 rounded-full mr-1"
                  />
                </a>
              </li>
              <li className="mb-2 hover:font-semibold">
                <a href="https://www.twitter.com/Kingsports_Pro" target="_bank">
                  <img
                    src={twitterIcon}
                    alt="twitter icon"
                    className="w-8 h-8 rounded-full mr-1"
                  />
                </a>
              </li>
              <li className="mb-2 hover:font-semibold">
                <a
                  href="https://www.instagram.com/_kingsports_pro/"
                  target="_bank">
                  <img
                    src={instagramIcon}
                    alt="instagram icon"
                    className="w-8 h-8 rounded-full mr-1"
                  />
                </a>
              </li>
              <li className="mb-2 hover:font-semibold">
                <a
                  href="https://www.youtube.com/channel/UCG1seQScR6ocNP0CkoBWSlA?view_as=subscriber"
                  target="_bank">
                  <img
                    src={youtubeIcon}
                    alt="youtube icon"
                    className="w-8 h-8 rounded-full mr-1"
                  />
                </a>
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
