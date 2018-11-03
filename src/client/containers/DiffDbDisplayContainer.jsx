import React, { Component } from 'react';
import DiffDbDisplay from '../components/DiffDbDisplay.jsx';
import ScriptContainer from './ScriptContainer.jsx';

const DiffDbDisplayContainer = (props) => {
  const {
    db, diffDbColors, addScript, removeScript, script,
  } = props;

  const tables = db.map(tableInfo => (
    <DiffDbDisplay
      key={tableInfo.name}
      tableInfo={tableInfo}
      diffDbColors={diffDbColors}
      addScript={addScript}
      removeScript={removeScript}
    />
  ));

  return (
    <div>
      <div id="dbDisplayContainer">
        {tables}
      </div>
      <ScriptContainer script={script} />
    </div>
  );
};

export default DiffDbDisplayContainer;
