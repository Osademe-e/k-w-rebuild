import React from 'react';

// components
import AdminLeagues from './AdminLeagues';
import TalentsAwaitingApproval from './TalentsAwaitingApproval';
import ScoutsAwaitingApproval from './ScoutsAwaitingApproval';
import Actions from './Actions';

const AdminPanel = () => {
  return (
    <div className=":lgflex-1 bg-white text-primary-600 shadow rounded mt-2 lg:mt-0 w-full">
      <h2 className="font-semibold uppercase text-primary-100 bg-gray-800 py-2 border-b border-gray-700 text-sm px-2">
        Admin Panel
      </h2>
      <div className="lg:flex">
        <div className="lg:flex-1 lg:mr-2">
          <TalentsAwaitingApproval />
          <Actions />
        </div>

        <div className="lg:flex-1">
          <ScoutsAwaitingApproval />
          <AdminLeagues />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
