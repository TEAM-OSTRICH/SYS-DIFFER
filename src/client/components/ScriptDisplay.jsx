import React, { Component } from 'react';

const ScriptDisplay = (props) => {
  const { script } = props;

  return (
    <div>
      {Object.values(script).map(query => (
        <p>{query}</p>
      ))}
    </div>
  );
};

export default ScriptDisplay;
