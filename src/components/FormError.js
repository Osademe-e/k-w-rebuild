import React from 'react';

const FormError = ({ error }) => {
  return (
    <div className="text-xs p-2 mt-2 text-red-600 bg-red-100 rounded">
      {error}
    </div>
  );
};

export default FormError;
