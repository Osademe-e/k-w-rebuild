import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// helper
import { pageAnim } from '../utils/_helpers';

// components import
import LoginForm from '../components/LoginForm';
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';

const Login = () => {
  const { user, authLoaded } = useContext(AppContext);

  // location
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  return !authLoaded ? (
    <Loader />
  ) : authLoaded && user ? (
    <motion.div exit="undefined">
      <Redirect to={from} />
    </motion.div>
  ) : (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative">
      <HeroContainer>
        <h1 className="text-xl lg:text-5xl font-semibold px-8 my-6 text-primary-100">
          Your Account
        </h1>
      </HeroContainer>
      <div className="lg:container mx-auto px-2 lg:px-0 flex justify-center items-center mt-5">
        <div className="w-full lg:w-3/4 shadow-lg rounded px-2 my-8 py-4 bg-white">
          {location?.state?.from === '/premium' && (
            <p className="font-semibold px-2 mb-2 text-primary-800">
              Sign up or Sign in to a kingsports account to have access to our
              offers
            </p>
          )}
          <LoginForm />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
