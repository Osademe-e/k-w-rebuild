import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import './styles/Headers.css';

// import appcontext from app.js
import { AppContext } from '../App';

// router imports
import { NavLink, useLocation, useHistory } from 'react-router-dom';

// firebase auth object
import useFirebase from '../hooks/useFirebase';

// helper functions
import { errorDisplayHandler } from '../utils/_helpers';

// components import
import TalentsDisplay from './TalentsDisplay';

// other imports
import logo from '../assets/images/logo svg/Asset 25@100px.svg';
import brand from '../assets/images/logo svg/Asset 19.svg';

// SVG
// import homeIcon from '../assets/icons/home.svg';
// import infoIcon from '../assets/icons/info.svg';
// import newsIcon from '../assets/icons/news.svg';
// import registerIcon from '../assets/icons/register.svg';
// import forumIcon from '../assets/icons/speech-bubble.svg';
// import talentIcon from '../assets/icons/flame.svg';
// import dashboardIcon from '../assets/icons/dashboard.svg';
// import premiumIcon from '../assets/icons/bag.svg';
// import signInIcon from '../assets/icons/signin.svg';
// import signOutIcon from '../assets/icons/signout.svg';
// import footballIcon from '../assets/icons/football.svg';

const Header = ({ featuredTalents }) => {
  // global state
  const { user, toogleToast } = useContext(AppContext);

  // firebase auth object
  const { auth } = useFirebase();

  // location and history
  const location = useLocation();
  const history = useHistory();

  const from = { from: { pathname: location.pathname } };

  // for mobile screen navigation control
  const [navOpened, setNavOpened] = useState(false);

  // toggle mobile navigation
  const menuChange = () => {
    setNavOpened((preState) => !preState);
  };

  // signout
  const signOut = async () => {
    try {
      await auth().signOut();
      history.push(location?.state?.from || '/');
    } catch (error) {
      toogleToast(errorDisplayHandler(error));
    }
  };

  useEffect(() => {
    if (window.innerWidth > 1024) {
      menuChange();
    }
  }, []);

  return (
    <AnimateSharedLayout>
      <motion.header
        layout
        className="lg:flex lg:items-center lg:bg-gray-900 lg:px-4 sticky">
        <motion.div
          layout
          className="hidden lg:block logo w-20 overflow-hidden mr-2">
          <img src={logo} alt="logo" />
        </motion.div>
        <motion.div layout className="nav w-full">
          <TalentsDisplay featuredTalents={featuredTalents} />
          <motion.nav
            layout
            className="flex flex-col lg:flex-row content-center justify-between px-2 py-4 bg-primary-500 text-primary-900 text-sm">
            <motion.ul
              layout
              className="flex flex-col lg:flex-row content-center justify-between">
              <motion.li
                layout
                className="flex justify-between lg:block mb-2 lg:mb-0 lg:mr-4 overflow-hidden">
                <NavLink exact to="/">
                  <img src={brand} alt="brand name" className="w-20" />
                </NavLink>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className={`lg:hidden cursor-pointer ${
                    navOpened ? 'hidden' : 'visible'
                  }`}
                  onClick={() => menuChange()}>
                  <path
                    d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                    fill="#1040e2"
                  />
                  <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
                </svg>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className={`lg:hidden cursor-pointer ${
                    navOpened ? 'visible' : 'hidden'
                  }`}
                  onClick={() => menuChange()}>
                  <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                </svg>
              </motion.li>
              <AnimatePresence>
                {navOpened && (
                  <motion.div
                    layout
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: '100%',
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className={`${
                      navOpened ? 'flex' : 'hidden'
                    } lg:flex flex-col lg:flex-row content-center justify-between overflow-hidden`}>
                    <li
                      className={`flex lg:hidden text-base lg:text-sm py-2 lg:py-0 lg:mr-3 hover:font-semibold hover:text-primary-900`}>
                      {/* <img src={homeIcon} alt="home" className="lg:hidden w-4 mr-2" /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        home
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/',
                          state: from,
                        }}>
                        Home
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:block text-base lg:text-sm py-2 lg:py-0 lg:mr-3 hover:font-semibold hover:text-primary-900`}>
                      {/* <img
                    src={infoIcon}
                    alt="about"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        info
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/about',
                          state: from,
                        }}>
                        About
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:block text-base lg:text-sm py-2 lg:py-0 lg:mr-3 hover:font-semibold hover:text-primary-900`}>
                      {/* <img
                    src={newsIcon}
                    alt="news"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        rss_feed
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/news',
                          state: from,
                        }}>
                        News
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:block text-base lg:text-sm py-2 lg:py-0 lg:mr-3 hover:font-semibold hover:text-primary-900`}>
                      {/* <img
                    src={talentIcon}
                    alt="talent"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        local_fire_department
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/talents',
                          state: from,
                        }}>
                        Talents
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:block text-base lg:text-sm py-2 lg:py-0 lg:mr-3 hover:font-semibold hover:text-primary-900`}>
                      {/* <img
                    src={premiumIcon}
                    alt="premium"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        shopping_bag
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/premium',
                          state: from,
                        }}>
                        Premium
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:block text-base lg:text-sm hover:font-semibold hover:text-primary-900 py-2 lg:py-0 `}>
                      {/* <img
                    src={forumIcon}
                    alt="forum"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        message
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/forum',
                          state: from,
                        }}>
                        Forum
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:hidden text-base lg:text-sm hover:font-semibold hover:text-primary-900 py-2 lg:py-0`}>
                      {/* <img
                    src={footballIcon}
                    alt="fixtures"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        calendar_view_day
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/fixtures',
                          state: from,
                        }}>
                        Fixtures
                      </NavLink>
                    </li>
                    <li
                      className={`flex lg:hidden text-base lg:text-sm hover:font-semibold hover:text-primary-900 py-2 lg:py-0 `}>
                      {/* <img
                    src={footballIcon}
                    alt="results"
                    className="lg:hidden w-4 mr-2"
                  /> */}
                      <span className="material-icons mr-2 lg:hidden">
                        score
                      </span>
                      <NavLink
                        exact
                        activeClassName="text-primary-900 font-semibold"
                        to={{
                          pathname: '/results',
                          state: from,
                        }}>
                        Results
                      </NavLink>
                    </li>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.ul>
            <AnimatePresence>
              {navOpened && (
                <motion.div
                  layout
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: '100%',
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className={`${
                    navOpened ? 'block' : 'hidden'
                  } lg:block overflow-hidden`}>
                  <motion.ul layout className="lg:flex lg:justify-between">
                    {!user && (
                      <>
                        <li
                          className={`flex lg:block hover:font-semibold hover:text-primary-900`}>
                          {/* <img
                        src={signInIcon}
                        alt="login"
                        className="lg:hidden w-4 mr-2"
                      /> */}
                          <span className="material-icons mr-2 lg:hidden">
                            login
                          </span>
                          <NavLink
                            exact
                            activeClassName="bg-primary-400"
                            to={{
                              pathname: '/login',
                              state: from,
                            }}
                            className={`btn text-primary-900`}>
                            sign in
                          </NavLink>
                        </li>
                        <li
                          className={`flex lg:block hover:font-semibold hover:text-primary-900`}>
                          {/* <img
                        src={registerIcon}
                        alt="register"
                        className="lg:hidden w-4 mr-2"
                      /> */}
                          <span className="material-icons mr-2 lg:hidden">
                            book
                          </span>
                          <NavLink
                            exact
                            activeClassName="bg-primary-400"
                            to={{
                              pathname: '/register',
                              state: from,
                            }}
                            className={`btn text-primary-900`}>
                            Register
                          </NavLink>
                        </li>
                      </>
                    )}
                    {user && (
                      <>
                        <li
                          className={`flex lg:block text-base lg:text-sm py-2 lg:py-0 lg:mr-3 hover:font-semibold hover:text-primary-900`}>
                          {/* <img
                        src={dashboardIcon}
                        alt="dashboard"
                        className="lg:hidden w-4 mr-2"
                      /> */}
                          <span className="material-icons mr-2 lg:hidden">
                            dashboard
                          </span>
                          <NavLink
                            exact
                            activeClassName="text-primary-900 font-semibold"
                            to={{
                              pathname: '/dashboard',
                              state: from,
                            }}>
                            Dashboard
                          </NavLink>
                        </li>
                        <li
                          className={`flex lg:block hover:font-semibold hover:text-primary-900`}>
                          {/* <img
                        src={signOutIcon}
                        alt="logout"
                        className="lg:hidden w-4 mr-2"
                      /> */}
                          <span className="material-icons mr-2 lg:hidden">
                            vpn_key
                          </span>
                          <span
                            className="btn text-primary-900"
                            onClick={signOut}>
                            Logout
                          </span>
                        </li>
                      </>
                    )}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
          <motion.ul
            layout
            className="hidden lg:flex text-sm mt-2 text-primary-100 px-2 py-1">
            <li
              className={`mr-3 hover:font-semibold hover:text-primary-200 relative`}>
              <NavLink
                exact
                activeClassName="active border-b-4 border-primary-500"
                className="px-2"
                to={{
                  pathname: '/',
                  state: from,
                }}>
                Home
              </NavLink>
            </li>
            <li
              className={`mr-3 hover:font-semibold hover:text-primary-200 relative`}>
              <NavLink
                exact
                activeClassName="active border-b-4 border-primary-500"
                className="px-2"
                to={{
                  pathname: '/fixtures',
                  state: from,
                }}>
                Fixtures
              </NavLink>
            </li>
            <li
              className={`hover:font-semibold hover:text-primary-200 relative`}>
              <NavLink
                exact
                activeClassName="active border-b-4 border-primary-500"
                className="px-2"
                to={{
                  pathname: '/results',
                  state: from,
                }}>
                Results
              </NavLink>
            </li>
          </motion.ul>
        </motion.div>
      </motion.header>
    </AnimateSharedLayout>
  );
};

export default Header;
