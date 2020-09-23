import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';

// app context
import { AppContext } from '../App';

// helper
import { leagueColor } from '../utils/_helpers';

const editScoutCommentFormVariants = {
  hidden: {
    opacity: 0,
    bottom: -100,
  },
  visible: {
    opacity: 1,
    bottom: 0,
    transition: {
      delay: 0.2,
      duration: 0.1,
    },
  },
};

const MatchInfo = () => {
  const {
    modal: {
      fixture: { fixture, league, goals, score, teams },
    },
    toogleModal,
  } = useContext(AppContext);
  console.log(fixture, league, goals, score, teams);

  return (
    <motion.div
      variants={editScoutCommentFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute w-full text-xs">
      <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t bg-white overflow-hidden">
        <div className="py-4 px-2 lg:px-4 bg-black text-white">
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <img
                src={league.flag}
                alt="country flag"
                className="w-5 h-5 rounded-full mr-2"
              />
              <span>Sports</span>
            </div>
            <span
              className="material-icons cursor-pointer"
              onClick={() =>
                toogleModal({
                  open: false,
                  fixture: null,
                  component: '',
                })
              }>
              close
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p>
              {teams.home.name} vs {teams.away.name}
            </p>
            <p>{league.round}</p>
          </div>
        </div>

        <div className="px-2 lg:px-4 py-3 border-b border-gray-300">
          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <span
                className="mr-2"
                style={{ color: leagueColor(league.name).backgroundColor }}>
                {league.name}
              </span>
              <span>
                {moment(fixture.date).format(
                  `ddd, D/MM${fixture.status.short === 'NS' ? ',HH:mm' : ''}`
                )}
              </span>
            </div>
            <span>{fixture.status.long}</span>
          </div>
          {/* logo */}
          <div className="flex items-center justify-evenly py-2">
            <div className="grid grid-cols-1 gap-1 items-center justify-center">
              <img
                src={teams.home.logo}
                alt="team logo"
                className="w-10 h-10 object-contain object-center mb-2"
              />
              <p className="font-semibold">{teams.home.name}</p>
            </div>
            <div className="flex-1 flex items-center justify-evenly text-xl font-semibold">
              {fixture.status.short === 'FT' ||
              fixture.status.short === '1H' ||
              fixture.status.short === 'HT' ||
              fixture.status.short === '2H' ? (
                <>
                  <span>{goals.home}</span>
                  <span>-</span>
                  <span>{goals.away}</span>
                </>
              ) : (
                <span>vs</span>
              )}
            </div>
            <div className="self-center">
              <img
                src={teams.away.logo}
                alt="team logo"
                className="w-10 h-10 object-contain object-center mb-2"
              />
              <p className="font-semibold">{teams.away.name}</p>
            </div>
          </div>
        </div>

        {/* <Scorers /> */}

        {/* referee */}
        {fixture.referee && (
          <div className="px-2 py-3 bg-gray-200 border-t border-b border-gray-300">
            Referee: <span className="font-semibold">{fixture.referee}</span>
          </div>
        )}

        {/* staduim */}
        <div className="px-2 py-3 bg-gray-200 border-t border-b border-gray-300">
          Stadium:{' '}
          <span className="font-semibold">
            {fixture.venue.name}, {fixture.venue.city}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchInfo;
