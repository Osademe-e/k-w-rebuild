import React, { useContext } from 'react';

// app context
import { AppContext } from '../App';

// components
import DashboardTalent from './DashboardTalent';
import DashboardScout from './DashboardScout';
import DashboardPremium from './DashboardPremium';

const RegularProfile = () => {
  // context
  const { profile, toogleModal } = useContext(AppContext);
  return (
    <div
      className={`lg:mx-2 ${
        profile?.doc?.role === 'super admin' ? 'lg:w-1/4' : ''
      }`}>
      <div className="rounded shadow bg-white overflow-hidden text-sm">
        <h2 className="font-semibold uppercase py-2 border-b border-gray-200 text-sm px-2">
          {profile?.doc?.firstName} {profile?.doc?.lastName}
        </h2>
        <div className="py-2 px-2">
          <p>{profile?.doc?.email}</p>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-gray-200 px-2 text-primary-100 bg-gray-800 text-semibold">
          <p className="font-semibold text-xs uppercase">Change Password</p>
          <span
            className="material-icons cursor-pointer opacity-75 hover:text-blue-600"
            onClick={() =>
              toogleModal({
                open: true,
                component: 'old password',
              })
            }>
            edit
          </span>
        </div>
      </div>
      <DashboardTalent />
      <DashboardScout />
      <DashboardPremium />
    </div>
  );
};

export default RegularProfile;
