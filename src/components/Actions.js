import React, { useContext } from 'react';

// context
import { AppContext } from '../App';

const Actions = () => {
  const { toogleModal } = useContext(AppContext);

  const actions = ['Make News Post', 'Make Forum Post', 'Make Premium Post'];
  const colors = ['green', 'blue', 'orange'];
  return (
    <div className="border border-gray-200 text-xs px-2 mt-3">
      <h2 className="font-semibold uppercase py-2 border-b border-gray-200">
        Actions
      </h2>
      <div className="mt-2 grid grid-cols-2 lg:grid-cols-3 gap-1 pb-2">
        {actions.map((action, i) => (
          <span
            key={i}
            className={`bg-${colors[i]}-600 text-primary-100 text-xs font-semibold text-center uppercase cursor-pointer p-2 rounded hover:border hover:border-gray-700`}
            onClick={() =>
              toogleModal({
                open: true,
                component: action,
              })
            }>
            {action}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Actions;
