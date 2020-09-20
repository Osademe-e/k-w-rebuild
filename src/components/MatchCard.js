import React, { useContext } from 'react';
import moment from 'moment';

// app context
import { AppContext } from '../App';

const MatchCard = ({ fixtures }) => {
  // context
  const { toogleModal } = useContext(AppContext);
  // console.log(fixtures);
  return fixtures.map(({ fixture, goals, league, score, teams }) => (
    <div
      className="rounded shadow my-2 px-2 py-4 flex items-center text-xs cursor-pointer"
      onClick={() =>
        toogleModal({
          open: true,
          component: 'match info',
          fixture: { fixture, goals, league, score, teams },
        })
      }
      key={fixture.id}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center my-1">
            <img
              src={teams.home.logo}
              alt={`${teams.home.name} logo`}
              className="w-5 h-5 mr-3"
            />
            <span>{teams.home.name}</span>
          </div>
          {['1H', 'HT', '2H', 'ET', 'P', 'FT', 'AET', 'PEN', 'BT'].includes(
            fixture.status.short
          ) && <div>{goals.home}</div>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center my-1">
            <img
              src={teams.away.logo}
              alt={`${teams.away.name} logo`}
              className="w-5 h-5 mr-3"
            />
            <span>{teams.away.name}</span>
          </div>
          {['1H', 'HT', '2H', 'ET', 'P', 'FT', 'AET', 'PEN', 'BT'].includes(
            fixture.status.short
          ) && <div>{goals.away}</div>}
        </div>
      </div>
      <div className="border-l border-gray-300 px-3 text-center ml-1">
        <div className="font-semibold">
          {fixture.status.short === 'NS'
            ? moment(fixture.date).format('ddd, D/MM')
            : fixture.status.short}
        </div>
        {['NS', 'FT'].includes(fixture.status.short) && (
          <div
            className={`${
              fixture.status.short === 'NS' ? 'font-semibold' : 'opacity-75'
            }`}>
            {fixture.status.short === 'NS'
              ? moment(fixture.data).format('HH:mm')
              : moment(fixture.date).format('ddd, D/MM')}
          </div>
        )}
      </div>
    </div>
  ));
};

export default MatchCard;
