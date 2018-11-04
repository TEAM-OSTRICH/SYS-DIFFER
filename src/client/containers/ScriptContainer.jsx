import React, { Component } from 'react';
import ScriptDisplay from '../components/ScriptDisplay.jsx';

const ScriptContainer = (props) => {
  const { script } = props;

  return (
    <div id="dbDisplayContainer">
      <h1>Script</h1>
      <ScriptDisplay script={script} />
    </div>
  );
};

export default ScriptContainer;
