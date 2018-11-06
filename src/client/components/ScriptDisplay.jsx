import React, { Component } from 'react';

const ScriptDisplay = (props) => {
  const { script } = props;
  let scriptString = '';

  Object.values(script).map((query) => {
    scriptString += `${query} \n`;
  });

  return (
    <div>
      <h4><a href="#scriptTextArea" data-toggle="collapse">Scripts</a></h4>
      <textarea id="scriptTextArea" className="collapse in" value={scriptString} readOnly />
    </div>
  );
};

export default ScriptDisplay;
