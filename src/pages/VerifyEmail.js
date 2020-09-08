import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

// context
import { AppContext } from '../App';

// hooks
// - firebase
import useFirebase from '../hooks/useFirebase';

// components
import FormError from '../components/FormError';

// helper function
import { errorDisplayHandler, pageAnim } from '../utils/_helpers';

const VerifyEmail = () => {
  // toogleToast function from context
  const { toogleToast, toogleModal, user } = useContext(AppContext);

  // component state
  const [error, setError] = useState('');

  // auth object
  const { auth } = useFirebase();

  // sent email
  const sendVerificationEmail = async () => {
    setError('');
    try {
      toogleModal({
        component: 'loader',
        open: true,
        message: `Sending verification mail to ${user.email}`,
      });

      await auth().currentUser.sendEmailVerification();

      toogleModal({
        component: '',
        open: false,
        message: null,
      });

      toogleToast(`An email verification mail has been sent to ${user.email}`);
    } catch (error) {
      toogleModal({
        component: '',
        open: false,
        message: null,
      });

      if (error.code) {
        return setError(error.message);
      }
      setError(errorDisplayHandler(error));
    }
  };

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="lg:container mx-auto px-2 lg:px-0 flex justify-center items-center">
      <motion.div
        className="text-primary-800 w-full lg:w-1/2 mt-3 bg-white shadow rounded py-4 mx-auto text-center font-semibold"
        initial={{
          y: '-100vh',
          opacity: 0,
        }}
        animate={{
          y: '50%',
          opacity: 1,
          transition: { delay: 0.5 },
        }}>
        {error !== '' && <FormError error={error} />}
        <div className="text-lg mb-3">Please verify your email address.</div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ delay: 1.5, duration: 1 }}>
          <span className="text-sm">Didn't receive any mail? </span>&nbsp;
          <button
            type="button"
            className="text-sm btn bg-secondary text-white"
            onClick={sendVerificationEmail}>
            Resend
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VerifyEmail;
