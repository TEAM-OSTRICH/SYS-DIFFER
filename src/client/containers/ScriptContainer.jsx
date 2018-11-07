import React, { Component } from 'react';
import _ from 'lodash';
import ScriptDisplay from '../components/ScriptDisplay.jsx';

const handleClick = (id, diffDbColors, addScript, setBackgroundColor, tableInfo, column) => {
  // Select change.

  // GE commented below 1 line out just to test
  // setBackgroundColor(id);

  // Create query.
  const queryParams = id.split('-');

  // One query parameter means add or delete a table.
  if (queryParams.length === 1) {
    const { name, columns } = tableInfo;
    if (diffDbColors[id] === 'green') {
      // Add a table.
      let columnString = '';

      columns.forEach((column, index) => {
        const { name, dataType, constraintTypes } = column;

        columnString += `${name} ${dataType}`;

        if (constraintTypes !== undefined) {
          // Add all constraint types.
          constraintTypes.forEach((constraintType) => {
            if (constraintType.includes('REFERENCES')) {
              const constraintTypeArray = constraintType.split(' ');
              const foreignKey = ` ${constraintTypeArray[0]} ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;
              columnString += `${foreignKey}`;
            } else {
              columnString += ` ${constraintType}`;
            }
          });
        }

        columnString += ', ';

        // if (constraintType.includes('REFERENCES')) {
        //   console.log(constraintType);
        //   const constraintTypeArray = constraintType.split(' ');
        //   console.log(constraintTypeArray);
        //   const foreignKey = `${constraintTypeArray[0]} ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;
        //   columnString += `${name} ${dataType} ${foreignKey}, `;
        // } else {
        //   columnString += `${name} ${dataType} ${constraintType}, `;
        // }
      });

      // Remove last comma.
      columnString = columnString.slice(0, columnString.length - 2);

      // Add script to create a table.
      return `CREATE TABLE ${name} (${columnString});`;
    } if (diffDbColors[id] === 'red') {
      // Add script to delete a table.
      return `DROP TABLE ${name};`;
    }
  }

  // Two query params means add or delete column from table
  if (queryParams.length === 2) {
    // console.log('tableInfo', tableInfo);
    const { name, dataType, constraintType } = column;
    const tableName = tableInfo.name;
    let columnString = `ALTER TABLE ${tableName} `;
    if (diffDbColors[id] === 'green') {
      // Add a column
      columnString += `ADD COLUMN ${name}`;
      if (dataType) {
        columnString += ` ${dataType}`;
      }
      if (constraintType) {
        columnString += ` ${constraintType}`;
      }
      columnString += ';';
      return columnString;
    }
    // Must be 'red' so delete a column
    return `ALTER TABLE ${tableName} DROP COLUMN ${name};/*  ALERT: THIS WILL ALSO CASCADE DELETE ALL ASSOCIATED DATA  */`;
  }

  // Four query params means add or delete data-type or constraint
  if (queryParams.length === 4) {
    // console.log('queryParams', queryParams);
    const { name, dataType, constraintType } = column;
    const tableName = tableInfo.name;
    if (queryParams[2] === 'constraintType') {
      if (diffDbColors[id] === 'green') {
        // add a constraint
        return `ALTER TABLE ${tableName} ADD ${constraintType}(${name});`;
      }
      // remove a constraint
      return `ALTER TABLE ${tableName} ALTER COLUMN ${name} DROP ${constraintType};`;
    }
    if (queryParams[2] === 'dataType') {
      // add a dataType
      return `ALTER TABLE ${tableName} ALTER COLUMN ${name} TYPE ${dataType}();`;
    }
    if (queryParams[2] === 'nullable') {
      console.log(diffDbColors[id]);
      if (diffDbColors[id] === 'green') {
        // add a "NOT NULL"
        return `ALTER TABLE ${tableName} ALTER COLUMN ${name} SET NOT NULL;`;
      }
      // remove a "NOT NULL"
      return `ALTER TABLE ${tableName} ALTER COLUMN ${name} DROP NOT NULL;`;
    }
  }
};

const selectAll = (db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges) => {
  const ids = Object.keys(diffDbColors);
  const script = {};
  // console.log(backgroundColors);
  // Loop through all ids of backgroundColors and select changes.

  ids.forEach((id) => {
    // if (backgroundColors[id] === false) {
    const idArray = id.split('-');
    const tableName = idArray[0];
    const foundTable = _.find(db, { name: tableName });

    if (idArray.length === 1) {
      script[id] = handleClick(id, diffDbColors, addScript, setBackgroundColor, foundTable);
    } else {
      const columnName = idArray[1];
      const foundColumn = _.find(foundTable.columns, { name: columnName });
      script[id] = handleClick(id, diffDbColors, addScript, setBackgroundColor, foundTable, foundColumn);
    }
    // }
    console.log(id, script[id]);
  });
  console.log(script, 'script');
  addAllChanges(script);
};

const ScriptContainer = (props) => {
  const {
    script, removeAllChanges, db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges,
  } = props;
  return (
    <div id="scriptContainer">
      Script
      <ScriptDisplay script={script} />
      <button onClick={() => { selectAll(db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges); }
      }
      >
      Add All
      </button>
      <button onClick={removeAllChanges}>Remove All</button>
    </div>
  );
};

export default ScriptContainer;
