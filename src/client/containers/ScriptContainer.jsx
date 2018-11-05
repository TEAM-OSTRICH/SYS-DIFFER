import React, { Component } from 'react';
import ScriptDisplay from '../components/ScriptDisplay.jsx';

const ScriptContainer = (props) => {
  const { script } = props;

  return (
    <div id="scriptContainer">
      Script
      <ScriptDisplay script={script} />
    </div>
  );
};

export default ScriptContainer;
