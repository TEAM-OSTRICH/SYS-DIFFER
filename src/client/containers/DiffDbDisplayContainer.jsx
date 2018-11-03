import React, { Component } from 'react';
import DiffDbDisplay from '../components/DiffDbDisplay.jsx';
import ScriptContainer from './ScriptContainer.jsx';

const DiffDbDisplayContainer = (props) => {
  const {
    db, diffDbColors, addScript, removeScript, script, backgroundColors, setBackgroundColor,
  } = props;

  const tables = db.map(tableInfo => (
    <DiffDbDisplay
      key={tableInfo.name}
      tableInfo={tableInfo}
      diffDbColors={diffDbColors}
      addScript={addScript}
      removeScript={removeScript}
      backgroundColors={backgroundColors}
      setBackgroundColor={setBackgroundColor}
    />
  ));

  return (
    <div id="DiffDbDisplayContainer">
      <div id="dbDisplayContainer">
        {tables}
      </div>
      <ScriptContainer script={script} />
    </div>
  );
};

export default DiffDbDisplayContainer;
