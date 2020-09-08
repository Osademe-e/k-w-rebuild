import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

// context
import { AppContext } from '../App';

import kingsportsIcon from '../assets/images/logo svg/Asset 19.svg';

// components
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';

import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

// hooks
import useFirestoreCollection from '../hooks/useFirestoreCollection';

const Premium = () => {
  const { user, profile, authLoaded } = useContext(AppContext);

  //   paystack config
  const config = {
    reference: cryptoRandomString({ length: 15 }),
    email: user?.email,
    amount: 2000000,
    publicKey: 'pk_test_134e2c76e4e4fda92db39f612614077a241b16f1',
  };

  const initializePayment = usePaystackPayment(config);

  //   location
  const location = useLocation();

  const { ordered, fetching, error } = useFirestoreCollection('premium');

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Premium
        </h2>
      </HeroContainer>
      {/* {error && <div>{errorDisplayHandler(error)}</div>} */}
      <main className="lg:container mx-auto px-2 lg:px-0 my-5">
        {!authLoaded || profile.fetching || fetching ? (
          <Loader />
        ) : !user ||
          (user &&
            (!profile?.doc?.premium ||
              (profile?.doc?.premium &&
                ordered.find((o) => o.userId === user.uid).expAt <
                  Date.now()))) ? (
          <div className="rounded shadow-lg w-full lg:w-1/2 mx-auto text-primary-900 overflow-hidden">
            <div className="bg-primary-500 px-3 py-6">
              <img src={kingsportsIcon} alt="kingsport" className="w-24" />
              <h2 className="font-semibold mt-2">Premium Features</h2>
              <ul className="mt-3 list-disc ml-4">
                <li>Premium game pundits</li>
                <li>24/7 Customer support service</li>
                <li>Premium game analysis</li>
              </ul>
            </div>
            <div className="bg-primary-900 px-3 py-6 text-primary-100">
              {(!user || !profile?.doc?.premium) && (
                <h2 className="text-xl border-b border-gray-900">
                  Monthly Subscription
                </h2>
              )}
              {user &&
                profile?.doc?.premium &&
                ordered.find((o) => o.userId === user.uid).expAt <
                  Date.now() && (
                  <p className="text-sm border-b border-gray-900">
                    Your Monthly Subscription has{' '}
                    <span className="bg-primary-100 p-1 text-red-600 font-semibold mb-2">
                      Expired.
                    </span>
                    Subscribe to continue access to our premium features.
                  </p>
                )}
              <div className="flex justify-between items-center mt-3 text-sm">
                <p>One Month Subscription</p>
                <p>&#x20A6; 20,000</p>
              </div>
              {!user && (
                <Link
                  className="btn mt-3 w-full bg-secondary block text-center"
                  to={{
                    pathname: '/login',
                    state: {
                      from: location.pathname,
                    },
                  }}>
                  Pay
                </Link>
              )}
              {user &&
                (!profile?.doc?.premium ||
                  (profile?.doc?.premium &&
                    ordered.find((o) => o.userId === user.uid).expAt <
                      Date.now())) && (
                  <button
                    className="btn mt-3 w-full bg-secondary"
                    onClick={() => {
                      initializePayment();
                    }}>
                    Pay
                  </button>
                )}
            </div>
          </div>
        ) : (
          <div>Premium content</div>
        )}
      </main>
    </motion.div>
  );
};

export default Premium;
