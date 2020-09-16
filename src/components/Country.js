import React from 'react';
import { useHistory } from 'react-router-dom';

// components
import League from './League';

// hooks
import useQuery from '../hooks/useQuery';

const Country = ({ data, type }) => {
  const query = useQuery();
  const country = query.get('country');
  const league = query.get('league');

  const history = useHistory();

  return (
    <div>
      {Object.keys(data.leagues).map((leagueName, i) => (
        <div key={leagueName}>
          <League
            country={data.name}
            data={data.leagues[leagueName]}
            type={type}
          />
          {country && league ? null : (
            <div
              key={i}
              className="py-1 mb-2 text-right px-2 text-xs font-semibold text-secondary">
              <div
                onClick={() =>
                  history.push(
                    `/${type ? type : 'fixtures'}?country=${
                      data.name
                    }&league=${leagueName}`
                  )
                }
                className="flex items-center justify-end cursor-pointer">
                View All <span className="material-icons">arrow_right_alt</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Country;
