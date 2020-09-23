import React, { useContext } from 'react';

// context
import { AppContext } from '../App';

// hooks
import useLive from '../hooks/useLive';

// components
import Loader from './Loader';

const LiveCard = () => {
  // context
  const { leagues } = useContext(AppContext);

  // hook
  const { live, fetching } = useLive(leagues.ordered);

  return (
    <>
      {live &&
        Object.keys(live).length > 0 &&
        Object.keys(live).map((countryName) => (
          <div key={countryName} className="px-1">
            {/* <div className="flex items-center">
              <img
                src={live[countryName].flag}
                alt="country flag"
                className="rounded-full mr-2 w-6 h-6 p-1 shadow"
              />
              <span className="font-semibold uppercase">{countryName}</span>
            </div> */}
            {Object.keys(live[countryName]?.leagues).map((leagueName) => (
              <div key={leagueName}>
                <div className="flex items-center">
                  <img
                    src={live[countryName]?.leagues?.[leagueName].logo}
                    alt="league logo"
                    className="rounded-full mr-2 w-5 h-5 p-1 shadow"
                  />
                  <span>{leagueName}</span>
                </div>
                <ul>
                  {live[countryName]?.leagues?.[leagueName].fixtures.map(
                    ({ fixture, goals, league, score, teams }) => (
                      <li
                        key={fixture.id}
                        className="p-1 border-b border-gray-300 flex items-center justify-evenly">
                        <span className="flex-1 flex items-center justify-center">
                          <img
                            src={teams.home.logo}
                            alt="team logo"
                            className="rounded-full mr-2 w-5 h-5 p-1 shadow hidden lg:block"
                          />
                          <small>{teams.home.name}</small>
                        </span>
                        <span className="px-1 flex items-center justify-evenly">
                          <small>{goals.home}</small>
                          <small className="px-1">-</small>
                          <small>{goals.away}</small>
                        </span>
                        <span className="flex-1 flex items-center justify-center">
                          <img
                            src={teams.away.logo}
                            alt="team logo"
                            className="rounded-full mr-2 w-5 h-5 p-1 shadow hidden lg:block"
                          />
                          <small>{teams.away.name}</small>
                        </span>
                        <span className="flex items-center flex-col px-3">
                          <small className="font-semibold text-green-600">
                            {fixture.status.elapsed}
                          </small>
                          <small>{fixture.status.short}</small>
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        ))}
      {live && Object.keys(live).length === 0 && (
        <div className="text-center font-semibold text-primary-900">
          No Live matches at the moment
        </div>
      )}
      {fetching && <Loader />}
    </>
  );
};

export default LiveCard;
