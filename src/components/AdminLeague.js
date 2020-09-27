import React, { useContext } from 'react';
// import axios from 'axios';

// app context
import { AppContext } from '../App';

// hookx
// import useFirestore from '../hooks/useFirestore';
import useFirebase from '../hooks/useFirebase';

// helper
import { errorDisplayHandler, updateLeague } from '../utils/_helpers';

const AdminLeague = ({ league }) => {
  const { toogleModal, toogleToast, user } = useContext(AppContext);

  // const firestore = useFirestore();
  const firebase = useFirebase();

  const updateLeagues = async (country, leagueName) => {
    toogleModal({
      open: true,
      component: 'loader',
      message: `Updating ${leagueName}...`,
    });

    try {
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      updateLeague(
        {
          token: idToken,
          uid: user?.uid,
          name: leagueName,
          country,
        },
        (error) => {
          if (error) {
            toogleModal({
              open: false,
              component: '',
              message: null,
            });
            return toogleToast(errorDisplayHandler(error));
          }
        }
      );

      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast(`${leagueName} updated.`);
    } catch (error) {
      console.log(error);
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast(errorDisplayHandler(error));
    }
  };
  return (
    <div className="py-2 px-2 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={league.logo}
          alt="league logo"
          className="w-8 h-8 rounded-full shadow-md"
        />
        <p className="text-xs font-semibold ml-2">{league.name}</p>
      </div>
      <span
        className="cursor-pointer text-xs text-primary-100 bg-secondary rounded py-2 px-3 hover:shadow font-semibold"
        onClick={() => updateLeagues(league.country.name, league.name)}>
        Update
      </span>
    </div>
  );
};

export default AdminLeague;
