import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';

// app context
import { AppContext } from '../App';

// hooks
import useFirestoreDoc from '../hooks/useFirestoreDoc';

// components
import Loader from './Loader';
import PageError from './PageError';

// import logo from '../assets/images/logo svg/Asset 20.svg';

const DashboardScout = () => {
  const { user, profile } = useContext(AppContext);

  //   location
  // const location = useLocation();
  // const from = { from: { pathname: location.pathname } };

  //   hook
  const { doc, error, fetching } = useFirestoreDoc('scouts', user?.uid);

  return profile?.doc?.subscriptions?.scout ? (
    <div className="shadow rounded overflow-hidden bg-white text-sm mt-3">
      <h2 className="font-semibold uppercase py-2 border-b border-gray-200 text-sm px-2">
        Scout Profile
      </h2>
      {doc && (
        <>
          <div className="py-2 px-2">
            {doc && (
              <div>
                <div className="flex items-center">
                  <img
                    src={doc.photo.photoURL}
                    alt="talent pix"
                    className="rounded-full h-10 w-10"
                  />
                  <span className="ml-2 text-xs font-semibold">
                    <p className="uppercase">{doc.fullName}</p>
                    <p
                      className={`text-xs font-semibold ${
                        doc.approved ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {doc.approved ? 'Approved' : 'Waiting approval'} by admin
                    </p>
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* {doc.approved && (
            <div className="flex items-center justify-between py-2 border-t border-gray-200 px-2 text-primary-100 bg-gray-800 text-semibold">
              <p className="font-semibold text-xs uppercase">View Profile</p>
              <Link
                className="cursor-pointer opacity-75 hover:text-blue-600"
                to={{ pathname: `/scouts/${user.uid}`, state: from }}>
                <span className="material-icons ">visibility</span>
              </Link>
            </div>
          )} */}
        </>
      )}
      {fetching && !doc && <Loader />}
      {error && (
        <PageError message="Something went wrong loading profile. check your connetion and try again." />
      )}
    </div>
  ) : (
    <div className="shadow rounded overflow-hidden bg-gray-800 text-primary-100 text-sm mt-3">
      <div className="border-b border-gray-700">
        <h2 className="font-semibold uppercase py-2 text-sm px-2">Scouts</h2>
      </div>
      <div className="p-2 border-b border-gray-700">
        Kingsports has proffesional scouting agents registered on the platform
        looking/scouting for grass-root talents to play at international levels.
        Are you a scout and would like to join the Kingsports platform?,
        download our app to register.
        {/* <Link
          to={{
            pathname: '/scouts',
            state: from,
          }}
          className="text-primary-500">
          see registered scouts on our platform
        </Link> */}
      </div>
      {/* <div className="p-2 flex items-center justify-between">
        <img src={logo} alt="logo" className="w-20" />
        <Link
          to={{
            pathname: '/scout-signup',
            state: from,
          }}
          className="btn bg-secondary">
          Register
        </Link>
      </div> */}
    </div>
  );
};

export default DashboardScout;
