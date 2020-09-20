import React, { useContext } from 'react';

// app context
import { AppContext } from '../App';

// components
import Loader from './Loader';
import AdminLeague from './AdminLeague';
import PageError from './PageError';

// helper
import { errorDisplayHandler } from '../utils/_helpers';

const AdminLeagues = () => {
  // context
  const {
    leagues: { ordered, fetching, error },
  } = useContext(AppContext);

  return (
    <div className="border border-gray-200 text-xs px-2 mt-3">
      <h2 className="font-semibold uppercase py-2 border-b border-gray-200">
        Leagues
      </h2>
      {ordered &&
        ordered.length > 0 &&
        ordered.map((league) => (
          <AdminLeague key={league.id} league={league} />
        ))}
      {fetching && <Loader />}
      {error && <PageError message={errorDisplayHandler(error)} />}
    </div>
  );
};

export default AdminLeagues;
