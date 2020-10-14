import React, { useContext, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

// context
import { AppContext } from '../App';

import { PaystackPublicKey } from '../config/config';

import kingsportsIcon from '../assets/images/logo svg/Asset 19.svg';

const DashboardPremium = () => {
  const { user, profile } = useContext(AppContext);

  //   paystack config
  const [config] = useState(() => ({
    reference: cryptoRandomString({ length: 15 }),
    email: user?.email,
    amount: 2000000,
    publicKey: PaystackPublicKey,
    metadata: {
      userId: user?.uid,
    },
  }));

  const initializePayment = usePaystackPayment(config);

  return !profile?.doc?.subscriptions?.premium?.subscribed ||
    +moment(profile?.doc?.subscriptions?.premium?.bundle.expAt.toDate()) <
      +moment() ? (
    <div className="shadow rounded overflow-hidden text-sm mt-3 text-primary-900">
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
        {!profile?.doc?.subscriptions?.premium?.subscribed && (
          <h2 className="text-xl border-b border-gray-900">
            Monthly Subscription
          </h2>
        )}
        {profile?.doc?.subscriptions?.premium?.subscribed &&
          +moment(profile?.doc?.subscriptions?.premium?.bundle.expAt.toDate()) <
            +moment() && (
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
        <div className="mt-3 text-sm">
          <p>
            This website require you to be 18 years or age or older to
            subscribe.
          </p>
        </div>
        <button
          className="btn mt-3 w-full bg-secondary"
          onClick={() => {
            initializePayment();
          }}>
          Pay
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default DashboardPremium;
