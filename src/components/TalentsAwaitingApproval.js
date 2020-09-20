import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// hooks
import useFilters from '../hooks/useFilters';

// components
import PageError from './PageError';
import Loader from './Loader';

// helper
import { errorDisplayHandler } from '../utils/_helpers';

const TalentsAwaitingApproval = () => {
  const location = useLocation();
  const from = { from: { pathname: location.pathname } };

  // filter
  const filterBy = {
    fieldKey: 'approved',
    comparismOperator: '==',
    value: false,
  };

  const { ordered: unApprovedTalents, fetching, error } = useFilters(
    'talents',
    filterBy
  );

  return (
    <div className="border border-gray-200 text-xs px-2 mt-3">
      <h2 className="font-semibold uppercase py-2 border-b border-gray-200">
        Talents Awaiting Approval
      </h2>
      <div>
        {unApprovedTalents &&
          unApprovedTalents.length > 0 &&
          unApprovedTalents.map((talent) => (
            <div
              className="py-2 px-2 border-b border-gray-100 flex items-center justify-between"
              key={talent.id}>
              <div className="flex items-center">
                <img
                  src={talent.profile.photo.photoURL}
                  alt="talent pix"
                  className="w-8 h-8 rounded-full shadow-md"
                />
                <p className="text-xs font-semibold ml-2">
                  {talent.profile.fullName}
                </p>
              </div>
              <Link
                className="cursor-pointer opacity-75 text-secondary"
                to={{ pathname: `/talents/${talent.id}`, state: from }}>
                <span className="material-icons ">visibility</span>
              </Link>
            </div>
          ))}
        {unApprovedTalents && unApprovedTalents.length === 0 && (
          <div className="py-2 font-semibold">No un-approved talents</div>
        )}
        {fetching && <Loader />}
        {error && <PageError message={errorDisplayHandler(error)} />}
      </div>
    </div>
  );
};

export default TalentsAwaitingApproval;
