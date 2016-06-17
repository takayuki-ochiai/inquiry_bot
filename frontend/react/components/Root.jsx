import React, { PropTypes } from 'react';


function Root({ test }) {
  return (
    <div>Hello Chat!{test}</div>
  );
}

Root.propTypes = {
  test: PropTypes.string.isRequired,
};

export default Root;
