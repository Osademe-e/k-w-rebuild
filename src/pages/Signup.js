import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// components import
import SignupForm from '../components/SignupForm';
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';

// helper
import { pageAnim } from '../utils/_helpers';

const Signup = () => {
  const { user, authLoaded } = useContext(AppContext);

  return !authLoaded ? (
    <Loader />
  ) : authLoaded && user ? (
    <motion.div exit="undefined">
      <Redirect to="/" />
    </motion.div>
  ) : (
    <motion.div
      className="relative"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h1 className="text-xl lg:text-5xl font-semibold px-8 my-6 text-primary-100">
          Sign Up
        </h1>
      </HeroContainer>
      <div className="lg:container mx-auto px-2 lg:px-0 flex justify-center items-center mt-5">
        <div className="w-full lg:w-1/2 shadow-lg rounded px-2 my-8 py-4 bg-white">
          <SignupForm />
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
