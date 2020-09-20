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
      newPassword: '',
    },
    // for validating fields
    validationSchema: yup.object({
      newPassword: yup.string().required('Required'),
    }),
    onSubmit: async ({ newPassword }) => {
      setError('');
      try {
        const user = auth().currentUser;

        await user.updatePassword(newPassword);

        toogleModal({
          open: false,
          component: '',
        });
        toogleToast(`Password changed.`);
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
        <span>Enter Your New Password</span>
        <span
          className="cursor-pointer material-icons"
          onClick={(e) => toogleModal({ open: false, component: '' })}>
          close
        </span>
      </h1>
      {error !== '' ? <FormError error={error} /> : null}
      <form onSubmit={formik.handleSubmit} className="my-2">
        <div className="form-control">
          <label htmlFor="newPassword" className="label">
            Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className="input-field"
            {...formik.getFieldProps('newPassword')}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <FormError error={formik.errors.newPassword} />
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
