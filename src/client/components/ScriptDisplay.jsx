import React, { Component } from 'react';

const ScriptDisplay = (props) => {
  const { script } = props;
  let scriptString = '';

  Object.values(script).map((query) => {
    scriptString += `${query}\n\n`;
  });

  return (
    <div>
      <textarea id="scriptTextArea" value={scriptString} readOnly />
    </div>
  );
};

export default ScriptDisplay;
