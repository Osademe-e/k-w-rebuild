import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// helper
import { pageAnim } from '../utils/_helpers';

const Dashboard = () => {
  const { toogleModal, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const updateLeague = async () => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Updating...',
    });

    try {
      // get current season of the league
      const {
        data: { response },
      } = await axios({
        method: 'GET',
        url: 'https://api-football-beta.p.rapidapi.com/leagues',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
          'x-rapidapi-key':
            '6ca93d05bfmsh84200550229e8dfp10d12fjsn21cd729ddadf',
          useQueryString: true,
        },
        params: {
          name: 'Primera Division',
          current: 'true',
          country: 'Spain',
        },
      });

      console.log(response);

      // construct data structure for storage
      if (response.length > 0) {
        const docId = response[0].league.id.toString();
        const docData = {
          country: response[0].country,
          year: Math.max(...response[0].seasons.map((s) => Number(s.year))),
          name: response[0].league.name,
          logo: response[0].league.logo,
          type: response[0].league.type,
        };

        // get league fixtures
        const {
          data: { response: fixtures },
        } = await axios({
          method: 'GET',
          url: 'https://api-football-beta.p.rapidapi.com/fixtures',
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
            'x-rapidapi-key':
              '6ca93d05bfmsh84200550229e8dfp10d12fjsn21cd729ddadf',
            useQueryString: true,
          },
          params: {
            league: docId,
            season: docData.year,
          },
        });
        console.log(fixtures);

        docData.fixtures = fixtures;

        // save to db
        await firestore.collection('leagues').doc(docId).set(docData);

        toogleModal({
          open: false,
          component: '',
          message: null,
        });
        toogleToast('Update Successfull');
      } else {
        toogleModal({
          open: false,
          component: '',
          message: null,
        });
        toogleToast('Season not started');
      }
    } catch (error) {
      console.log(error);
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast(error.message);
    }
  };

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      Dashboard
      <button onClick={updateLeague} className="btn">
        Update League
      </button>
    </motion.div>
  );
};

export default Dashboard;
