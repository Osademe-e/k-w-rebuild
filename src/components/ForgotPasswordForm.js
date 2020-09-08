import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';

// app context
import { AppContext } from '../App';

// hooks
// firebase object
import useFirebase from '../hooks/useFirebase';

// helper functions
import { errorDisplayHandler } from '../utils/_helpers';

// components
import FormError from './FormError';

// scooped style
import './styles/Forms.css';

// animation
const pFormAnim = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const ForgotPasswordForm = () => {
  // get modal and toast from context
  const { toogleModal, toogleToast } = useContext(AppContext);

  // error state
  const [error, setError] = useState('');

  // firebase auth
  const { auth } = useFirebase();

  // using formik library for form and yup for validation
  const formik = useFormik({
    // form fields
    initialValues: {
      email: '',
    },
    // for validating fields
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async ({ email }) => {
      setError('');
      try {
        // send reset email
        await auth().sendPasswordResetEmail(email);
        toogleModal({
          open: false,
          component: '',
        });
        toogleToast(`A password reset email has been sent to ${email}.`);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          return setError(error.message);
        }
        setError(errorDisplayHandler(error));
      }
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        className="text-primary-800 w-full lg:w-1/2 my-10 bg-white shadow rounded p-4 mx-auto"
        variants={pFormAnim}
        exit="hidden">
        <h1 className="px-2 border-b border-gray-200 text-base lg:text-2xl py-4 flex items-center justify-between">
          <span>Enter Your Email Address</span>
          <span
            className="cursor-pointer"
            onClick={(e) => toogleModal({ open: false, component: '' })}>
            x
          </span>
        </h1>
        {error !== '' ? <FormError error={error} /> : null}
        <form onSubmit={formik.handleSubmit} className="my-2">
          <div className="form-control">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <FormError error={formik.errors.email} />
            ) : null}
          </div>
          <input
            type="submit"
            className="btn text-white bg-secondary mx-2 mt-2"
            disabled={formik.isSubmitting}
            value={formik.isSubmitting ? 'Submitting...' : 'Submit'}
          />
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPasswordForm;
