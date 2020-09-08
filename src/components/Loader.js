import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div
        className="w-10 h-10 shadow rounded-full animate-spin"
        style={{
          border: '1px solid',
          borderRightColor: '#edd437',
          borderTopColor: '#edd437',
          borderLeftColor: '#3560A1',
          borderBottomColor: '#3560A1',
        }}></div>
    </div>
  );
};

export default Loader;
