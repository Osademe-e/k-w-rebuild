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
      // // get current season of the league
      // const {
      //   data: { response },
      // } = await axios({
      //   method: 'GET',
      //   url: 'https://api-football-beta.p.rapidapi.com/leagues',
      //   headers: {
      //     'content-type': 'application/octet-stream',
      //     'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
      //     'x-rapidapi-key':
      //       '6ca93d05bfmsh84200550229e8dfp10d12fjsn21cd729ddadf',
      //     useQueryString: true,
      //   },
      //   params: {
      //     name: leagueName,
      //     current: 'true',
      //     country,
      //   },
      // });

      // // construct data structure for storage
      // if (response.length > 0) {
      //   const docId = response[0].league.id.toString();
      //   const docData = {
      //     country: response[0].country,
      //     year: Math.max(...response[0].seasons.map((s) => Number(s.year))),
      //     name: response[0].league.name,
      //     logo: response[0].league.logo,
      //     type: response[0].league.type,
      //   };

      //   // get league fixtures
      //   const {
      //     data: { response: fixtures },
      //   } = await axios({
      //     method: 'GET',
      //     url: 'https://api-football-beta.p.rapidapi.com/fixtures',
      //     headers: {
      //       'content-type': 'application/octet-stream',
      //       'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
      //       'x-rapidapi-key':
      //         '6ca93d05bfmsh84200550229e8dfp10d12fjsn21cd729ddadf',
      //       useQueryString: true,
      //     },
      //     params: {
      //       league: docId,
      //       season: docData.year,
      //     },
      //   });

      //   docData.fixtures = fixtures;

      //   // save to db
      //   await firestore.collection('leagues').doc(docId).set(docData);
      // } else {
      //   toogleModal({
      //     open: false,
      //     component: '',
      //     message: null,
      //   });
      //   toogleToast('Season not started');
      // }

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
            console.log(error);
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
