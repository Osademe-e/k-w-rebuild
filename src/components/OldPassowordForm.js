import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';

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
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.1 },
  },
};

const OldPasswordForm = () => {
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
      oldPassword: '',
    },
    // for validating fields
    validationSchema: yup.object({
      oldPassword: yup.string().required('Required'),
    }),
    onSubmit: async ({ oldPassword }) => {
      setError('');
      try {
        const user = auth().currentUser;
        // get credentials
        let credential = auth.EmailAuthProvider.credential(
          user.email,
          oldPassword
        );

        await user.reauthenticateWithCredential(credential);

        toogleModal({
          component: 'new password',
        });
      } catch (error) {
        setError(errorDisplayHandler(error));
      }
    },
  });

  return (
    <motion.div
      className="text-primary-800 w-full lg:w-1/2 my-10 bg-white shadow rounded p-4 mx-auto"
      variants={pFormAnim}
      exit="hidden">
      <h1 className="px-2 border-b border-gray-200 text-base lg:text-2xl py-4 flex items-center justify-between">
        <span>Enter Your Old Password</span>
        <span
          className="cursor-pointer material-icons"
          onClick={(e) => toogleModal({ open: false, component: '' })}>
          close
        </span>
      </h1>
      {error !== '' ? <FormError error={error} /> : null}
      <form onSubmit={formik.handleSubmit} className="my-2">
        <div className="form-control">
          <label htmlFor="oldPassword" className="label">
            Password
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            className="input-field"
            {...formik.getFieldProps('oldPassword')}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <FormError error={formik.errors.oldPassword} />
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
  );
};

export default OldPasswordForm;
