import React from 'react';

const PageError = ({ message }) => {
  return (
    <div className="text-center text-sm p-2 bg-red-100 rounded text-red-500">
      {message}
    </div>
  );
};

export default PageError;
