import React from 'react';

export default ({ pastDelay, error }) => {
  if (error)
    return 'Failed to load component';

  if (pastDelay)
    return (
      <div className="p-15">
        <p>Loading...</p>
      </div>
    );
  return null;
};
