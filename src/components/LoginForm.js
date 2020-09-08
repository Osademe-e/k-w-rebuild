import React, { useState, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

// app context
import { AppContext } from '../App';

// firebase imports
import useFirebase from '../hooks/useFirebase';

// helper functions
import { errorDisplayHandler } from '../utils/_helpers';

// components imports
import FormError from './FormError';

// icons
import { SigninIllustration } from '../assets/icons/svg';
import facebook from '../assets/icons/facebook.svg';
import google from '../assets/icons/google.svg';
import twitter from '../assets/icons/twitter.svg';

// scoped style
import './styles/Forms.css';

const LoginForm = () => {
  // getting modal object from context
  const { toogleModal } = useContext(AppContext);

  // app browser location object
  const location = useLocation();

  // App browser history object
  const history = useHistory();

  // last location in browser history
  const { from } = location.state || { from: { pathname: '/' } };

  // form error handler
  const [error, setError] = useState('');

  // var to disable social links button
  const [disableSocials, setDisableSocials] = useState(false);

  // firebase auth object
  const { auth } = useFirebase();

  // open modal to show forgot password form
  const openForgotPasswordModal = (e) => {
    toogleModal({
      open: true,
      component: 'forgot password',
    });
  };

  // function to login in with social accounts
  const loginWithProvider = async (providerName) => {
    setDisableSocials(true);
    try {
      if (providerName === 'google') {
        // google login flow with firebase
        let provider = new auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        auth().useDeviceLanguage();

        provider.setCustomParameters({
          login_hint: 'user@example.com',
        });

        auth().signInWithRedirect(provider);
      }

      if (providerName === 'facebook') {
        // google login flow with firebase
        let provider = new auth.FacebookAuthProvider();

        provider.addScope('user_birthday');

        auth().useDeviceLanguage();

        provider.setCustomParameters({
          display: 'popup',
        });

        auth().signInWithRedirect(provider);
      }

      if (providerName === 'twitter') {
        // google login flow with firebase
        let provider = new auth.TwitterAuthProvider();

        auth().useDeviceLanguage();

        auth().signInWithRedirect(provider);
      }
    } catch (error) {
      console.log(error);
      setError(errorDisplayHandler(error));
    }
  };

  const formik = useFormik({
    // form fields
    initialValues: {
      email: '',
      password: '',
    },
    // validation using yup
    validationSchema: yup.object({
      email: yup.string().email('Invalid Email Address').required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: async ({ email, password }) => {
      setError('');
      try {
        // log user in
        await auth().signInWithEmailAndPassword(email, password);

        // redirect user to last location in history
        history.replace(from);
      } catch (error) {
        setError(errorDisplayHandler(error));
      }
    },
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 px-1 text-primary-800">
        <h1 className="px-2 uppercase font-semibold">sign in</h1>
        {error !== '' ? <FormError error={error} /> : null}
        <form className="py-2" onSubmit={formik.handleSubmit}>
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
          <div className="flex justify-between items-center">
            <p
              className="font-semibold text-xs ml-2 cursor-pointer"
              onClick={openForgotPasswordModal}>
              Forgot sign in details?
            </p>
            <input
              value={formik.isSubmitting ? 'Signing in...' : 'Sign in'}
              type="submit"
              disabled={formik.isSubmitting}
              className="btn bg-secondary text-white mt-2 text-xs lg:text-sm mx-2"
            />
          </div>

          {/* select */}
          {/* <div className="form-control">
        <label
          htmlFor="select"
          className="text-sm font-semibold mb-2 text-primary-800">
          Choose
        </label>
        <div className="relative">
          <select className="input-field">
            <option>Here</option>
            <option>there</option>
            <option>ooo</option>
            <option>gjg</option>
            <option>jgjgj</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div> */}

          {/* radio */}
          {/* <div className="form-control">
        <label className="label">Gender</label>
        <div className="text-xs">
          <span className="mr-1">Male</span>{' '}
          <div className="inline-block relative mr-4">
            <input
              type="radio"
              name="gender"
              value="male"
              className="relative z-10 opacity-0"
            />
            <div className="circle absolute border border-primary-900 w-3 h-3 rounded-full top-0 left-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full"></div>
            </div>
          </div>
          <span className="mr-1">Female</span>{' '}
          <div className="inline-block relative mr-4">
            <input
              type="radio"
              name="gender"
              value="female"
              className="relative z-10 opacity-0"
            />
            <div className="circle absolute border border-primary-900 w-3 h-3 rounded-full top-0 left-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div> */}

          {/* checkbox */}
          {/* <div className="form-control">
        <label className="label">Hobbies</label>
        <div className="text-xs">
          <span className="mr-1">Football</span>{' '}
          <div className="inline-block relative mr-4">
            <input
              type="checkbox"
              name="hobbies"
              value="male"
              className="relative z-10 opacity-0"
            />
            <div className="square absolute border border-primary-900 w-3 h-3 top-0 left-0 "></div>
          </div>
        </div>
      </div> */}
          <div className="grid grid-cols-3 items-center justify-center text-center my-3 text-xs">
            <hr
              className="w-1/2"
              style={{
                width: '50%',
                justifySelf: 'end',
              }}
            />
            <p>or sign in with</p>
            <hr className="w-1/2" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-center text-xs mt-6 items-center justify-center">
            <button
              type="button"
              className="bg-blue-700 text-white rounded py-2 px-4"
              onClick={() => loginWithProvider('facebook')}
              disabled={disableSocials}>
              <img src={facebook} alt="facebook logo" className="w-3 inline" />
              &nbsp; Facebook
            </button>
            <button
              type="button"
              onClick={() => loginWithProvider('twitter')}
              className="bg-blue-400 text-white rounded py-2 px-4"
              disabled={disableSocials}>
              <img src={twitter} alt="facebook logo" className="w-3 inline" />
              &nbsp; Twitter
            </button>
            <button
              type="button"
              onClick={() => loginWithProvider('google')}
              className="bg-red-600 text-white rounded py-2 px-4"
              disabled={disableSocials}>
              <img src={google} alt="facebook logo" className="w-3 inline" />
              &nbsp; Google
            </button>
          </div>
        </form>
      </div>
      <div className="text-primary-800 w-full lg:w-1/2 p-2">
        <h1 className="px-2 uppercase font-semibold hidden lg:block">
          Register
        </h1>
        <div className="px-3 py-6 mt-4 bg-primary-100 rounded">
          <h3 className="font-semibold mb-3">
            Don’t have a Kingsports acount?
          </h3>
          <p className="text-xs mb-5 opacity-75">
            In that case, you are missing out on:
          </p>
          <ul className="font-semibold text-xs">
            <li className="mb-2">Kingsports Premium Pundit</li>
            <li className="mb-2">Featured Talent Sponsorship</li>
            <li className="mb-2">Favourite Club News & Notifications</li>
            <li className="mb-2">Customized site content</li>
          </ul>
          <Link
            to="/register"
            className="w-full bg-primary-700 block text-center mt-5 text-primary-100 btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
