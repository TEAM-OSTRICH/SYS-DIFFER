import React, { Component } from 'react';
import DiffDbDisplay from '../components/DiffDbDisplay.jsx';

const DiffDbDisplayContainer = (props) => {
  const { db, diffDbColors } = props;
  const tables = db.map(tableInfo => <DiffDbDisplay key={tableInfo.name} tableInfo={tableInfo} diffDbColors={diffDbColors} />);

  return (
    <div id="dbDisplayContainer">
      {tables}
    </div>
  );
};

export default DiffDbDisplayContainer;
