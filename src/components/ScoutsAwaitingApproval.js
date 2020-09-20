import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// hooks
import useFilters from '../hooks/useFilters';

// components
import PageError from './PageError';
import Loader from './Loader';

// helper
import { errorDisplayHandler } from '../utils/_helpers';

const ScoutsAwaitingApproval = () => {
  const location = useLocation();
  const from = { from: { pathname: location.pathname } };

  // filter
  const filterBy = {
    fieldKey: 'approved',
    comparismOperator: '==',
    value: false,
  };

  const { ordered: unApprovedScouts, fetching, error } = useFilters(
    'scouts',
    filterBy
  );

  return (
    <div className="border border-gray-200 text-xs px-2 mt-3">
      <h2 className="font-semibold uppercase py-2 border-b border-gray-200">
        Scouts Awaiting Approval
      </h2>
      <div>
        {unApprovedScouts &&
          unApprovedScouts.length > 0 &&
          unApprovedScouts.map((scout) => (
            <div
              className="py-2 px-2 border-b border-gray-100 flex items-center justify-between"
              key={scout.id}>
              <div className="flex items-center">
                <img
                  src={scout.photo.photoURL}
                  alt="scout pix"
                  className="w-8 h-8 rounded-full shadow-md"
                />
                <p className="text-xs font-semibold ml-2">{scout.fullName}</p>
              </div>
              <Link
                className="cursor-pointer opacity-75 text-secondary"
                to={{ pathname: `/scouts/${scout.id}`, state: from }}>
                <span className="material-icons ">visibility</span>
              </Link>
            </div>
          ))}
        {unApprovedScouts && unApprovedScouts.length === 0 && (
          <div className="py-2 font-semibold">No un-approved scouts</div>
        )}
        {fetching && <Loader />}
        {error && <PageError message={errorDisplayHandler(error)} />}
      </div>
    </div>
  );
};

export default ScoutsAwaitingApproval;
