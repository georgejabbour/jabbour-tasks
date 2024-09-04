import React from 'react';

const Spinner = ({ size = '4', color = 'white' }) => {

  return (
    <div className={`animate-spin mt-1 inline-block size-${size} border-[3px] border-current border-t-transparent text-${color} rounded-full`} role="status" aria-label="loading">
    </div>
  );
};

export default Spinner;
