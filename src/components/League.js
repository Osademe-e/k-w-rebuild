import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

// components
import MatchCard from './MatchCard';

// helper
import { leagueColor } from '../utils/_helpers';

const League = ({ country, data, type }) => {
  const history = useHistory();
  return (
    <div>
      <div
        className="flex items-center justify-between py-2 rounded-t px-2"
        style={leagueColor(data.name)}>
        <h2 className="uppercase font-bold text-lg">
          <span
            className="cursor-pointer"
            onClick={() =>
              history.push(`/${type ? type : 'fixtures'}?league=${data.name}`)
            }>
            {data.name}
          </span>
          &nbsp;
          <small
            className="opacity-50 text-xs cursor-pointer"
            onClick={() =>
              history.push(`/${type ? type : 'fixtures'}?country=${country}`)
            }>
            {country}
          </small>
        </h2>
        <img
          src={data.logo}
          alt="logo"
          className={`w-10 h-10 ${
            data.name === 'Premier League' ? 'bg-white' : ''
          }`}
        />
      </div>
      <div>
        {[
          ...new Set(
            data.fixtures.map((f) =>
              moment(f.fixture.date).format('dddd, D MMMM YYYY')
            )
          ),
        ].map((date) => (
          <div className="my-2" key={date}>
            <h2 className="py-2 opacity-50 uppercase text-xs font-semibold text-center">
              {date}
            </h2>
            <MatchCard
              key={date}
              fixtures={data.fixtures.filter(
                (f) =>
                  moment(f.fixture.date).format('dddd, D MMMM YYYY') === date
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default League;
