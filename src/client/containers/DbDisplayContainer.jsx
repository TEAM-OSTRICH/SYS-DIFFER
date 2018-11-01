import React, { Component } from 'react';
import DbDisplay from '../components/DbDisplay.jsx';

const DbDisplayContainer = (props) => {
  const { db } = props;
  const tables = db.map(tableInfo => <DbDisplay key={tableInfo.name} tableInfo={tableInfo} />);

  return (
    <div id="dbDisplayContainer">
      {tables}
    </div>
  );
};

export default DbDisplayContainer;
