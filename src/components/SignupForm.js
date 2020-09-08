import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

// app context
import { AppContext } from '../App';

// config
import { timestamp } from '../config/fbConfig.js';

// hooks
import useFirebase from '../hooks/useFirebase';
import useFirestore from '../hooks/useFirestore';

// helpers functions
import { errorDisplayHandler } from '../utils/_helpers';

// components imports
import FormError from './FormError';

// scooped style
import './styles/Forms.css';

const SignupForm = () => {
  // get toggle toast object from context
  const { toogleToast } = useContext(AppContext);

  // auth object
  const { auth } = useFirebase();

  // firestore object
  const firestore = useFirestore();

  // error state
  const [error, setError] = useState('');

  // create user function
  const createUser = async ({ email, password, firstName, lastName }) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      const user = auth().currentUser;

      await user.updateProfile({ displayName: `${lastName} ${firstName}` });

      await firestore
        .collection('users')
        .doc(user.uid)
        .set({ firstName, lastName, email, createdAt: timestamp() });

      await user.sendEmailVerification();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: yup.object({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      email: yup.string().email('Invalid email address').required('Required'),
      password: yup.string().required('Required'),
      confirmPassword: yup.string().required('Required'),
    }),

    onSubmit: async (
      { firstName, lastName, email, password, confirmPassword },
      { setSubmitting }
    ) => {
      setError('');

      // check if password matches confirm password
      if (password !== confirmPassword) {
        setError('Password do not match.');
        return setSubmitting(false);
      }

      try {
        await createUser({ email, password, firstName, lastName });

        toogleToast(`A verification mail has been sent to ${email}.`);
      } catch (error) {
        // display error message
        setError(errorDisplayHandler(error));
      }
    },
  });

  return (
    <div className="w-full px-1 text-primary-800">
      <h1 className="px-2 uppercase font-semibold">Create an account</h1>
      {error !== '' ? <FormError error={error} /> : null}
      <form className="py-2" onSubmit={formik.handleSubmit}>
        {/* first name */}
        <div className="form-control">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
            placeholder="John"
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <FormError error={formik.errors.firstName} />
          ) : null}
        </div>

        {/* last name */}
        <div className="form-control">
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
            placeholder="Doe"
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <FormError error={formik.errors.lastName} />
          ) : null}
        </div>

        {/* email */}
        <div className="form-control">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
            placeholder="example@gmail.com"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormError error={formik.errors.email} />
          ) : null}
        </div>

        {/* password */}
        <div className="form-control">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
            placeholder="****"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormError error={formik.errors.password} />
          ) : null}
        </div>

        {/* confirm password */}
        <div className="form-control">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
            placeholder="****"
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <FormError error={formik.errors.confirmPassword} />
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <input
            value={formik.isSubmitting ? 'Signing up...' : 'Sign up'}
            type="submit"
            disabled={formik.isSubmitting}
            className="btn bg-secondary text-white mt-2 text-xs lg:text-sm mx-2 hover:shadow-lg"
          />
          <div className="text-xs mt-2">
            <span>Have an account? </span>
            <button
              type="button"
              disabled={formik.isSubmitting}
              className="text-sm mr-2 text-secondary hover:shadow-md underline">
              <Link to="/login">Sign in</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
