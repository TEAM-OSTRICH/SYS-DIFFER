import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

// added function to change clicked element's background color
const handleClick = (event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column) => {
  event.stopPropagation();
  let id;
  let target;
  const { parentNode } = event.target;

  if (diffDbColors[event.target.id] !== undefined) {
    id = event.target.id;
    target = event.target;
  } else if (diffDbColors[parentNode.id] !== undefined) {
    id = parentNode.id;
    target = parentNode;
  }
  console.log('e.t.s.b', event.target.style.backgroundColor, 'k', diffDbColors[id], 'scared');
  if (diffDbColors[id] !== undefined) {
    if (target.style.backgroundColor === diffDbColors[id]) {
      // Background color is set meaning change is selected so deselect change and remove query from script.
      target.style.backgroundColor = null;
      removeScript(id);
      console.log(id, 'id');
      setBackgroundColor(id);
    } else {
      // Select change.
      target.style.backgroundColor = diffDbColors[id];
      setBackgroundColor(id);

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
          addScript(id, `CREATE TABLE ${name} (${columnString});`);
        } else if (diffDbColors[id] === 'red') {
          // Add script to delete a table.
          addScript(id, `DROP TABLE ${name};`);
        }
      }
      // Two query params means add or delete column from table
      if (queryParams.length === 2) {
        // console.log('tableInfo', tableInfo);
        const { name, dataType, constraintTypes } = column;
        const tableName = tableInfo.name;
        let columnString = `ALTER TABLE ${tableName} `;
        if (diffDbColors[id] === 'green') {
          // Add a column
          columnString += `ADD COLUMN ${name} ${dataType}`;
          // if (dataType) {
          //   columnString += ` ${dataType}`;
          // }
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
          columnString += ';';
          addScript(id, columnString);
        } else {
          // Must be 'red' so delete a column
          addScript(id, `ALTER TABLE ${tableName} DROP COLUMN ${name};/*  ALERT: CASCADE DELETE WILL ALSO DELETE ALL ASSOCIATED DATA  */`);
        }
      }
      // Four query params means add or delete data-type or constraint
      if (queryParams.length === 4) {
        // console.log('queryParams', queryParams);
        console.log('qp4 column', column);
        const { name, dataType, constraintTypes } = column;
        const tableName = tableInfo.name;
        if (queryParams[2] === 'constraintType') {
          let columnString = `ALTER TABLE ${tableName} `;
          if (diffDbColors[id] === 'green') {
            // add a constraint
            columnString += 'ADD';
            constraintTypes.forEach((constraintType) => {
              if (constraintType.includes('REFERENCES')) {
                const constraintTypeArray = constraintType.split(' ');
                const foreignKey = ` ${constraintTypeArray[0]} ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;
                columnString += `${foreignKey}`;
              } else {
                columnString += ` ${constraintType}`;
              }
              console.log('columnString', columnString);
            });
            columnString += `(${name});`;
            addScript(id, columnString);
          } else {
            // remove a constraint
            columnString += `ALTER COLUMN ${name} DROP ${queryParams[3]};`;
            addScript(id, columnString);
          }
        }
        if (queryParams[2] === 'dataType') {
          // add a dataType
          addScript(id, `ALTER TABLE ${tableName} ALTER COLUMN ${name} TYPE ${dataType};`);
        }
      }
    }
  }
};

const DiffDbDisplay = (props) => {
  const {
    tableInfo,
    diffDbColors,
    addScript,
    removeScript,
    backgroundColors,
    setBackgroundColor,
  } = props;
  const { name, columns } = tableInfo;

  /* eslint-disable */
  return (
    <Table className="table table-border table-striped table-hover">
      <tbody>
        <tr>
          <th
            id={name}
            className="list-group-item"
            style={
              {
                borderColor: diffDbColors[name]
                  ? diffDbColors[name]
                  : 'rgba(0,0,0,.125)',
                backgroundColor: backgroundColors[name]
                  ? diffDbColors[name]
                  : null,
              }
            }
            onClick={
              (event) => {
                handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo)
              }
            }
          >
            <span>{name}</span>
          </th>
        </tr>
      {columns.map(column => (
        <tr>
          <td
            id={`${name}-${column.name}`}
            className="list-group-item"
            style={
              {
                borderColor: diffDbColors[`${name}-${column.name}`]
                  ? diffDbColors[`${name}-${column.name}`]
                  : 'rgba(0,0,0,.125)',
                backgroundColor: backgroundColors[`${name}-${column.name}`]
                  ? diffDbColors[`${name}-${column.name}`]
                  : null,
              }
            }
            onClick={
              (event) => {
                handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)
              }
            }
          >
            <span>{column.name}</span>
            {' '}
            <span
              id={`${name}-${column.name}-dataType-${column.dataType}`}
              className="column-property"
              style={
                {
                  borderColor:
                    diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                      ? diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                      : null,
                  backgroundColor: backgroundColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    ? diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    : null,
                }
              }
              onClick={
                (event) => {
                  handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)
                }
              }
            >
              {column.dataType}
            </span>
            {' '}
            {
              !column.isNullable
                ? (
                  <span
                    id={`${name}-${column.name}-nullable-${column.isNullable}`}
                    className="column-property"
                    style={
                      {
                        borderColor:
                          diffDbColors[`${name}-${column.name}-nullable-${column.dataType}`]
                            ? diffDbColors[`${name}-${column.name}-nullable-${column.dataType}`]
                            : null,
                        backgroundColor: backgroundColors[`${name}-${column.name}-nullable-${column.dataType}`]
                          ? diffDbColors[`${name}-${column.name}-nullable-${column.dataType}`]
                          : null,
                      }
                    }
                    onClick={
                      (event) => {
                        handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)
                      }
                    }
                  >
                    NOT NULL
                  </span>
                )
                : null
            }
            {' '}
            {
              column.constraintTypes
                ? (
                  column.constraintTypes.map(constraintType => (
                    <span
                      id={`${name}-${column.name}-constraintType-${constraintType}`}
                      className="column-property"
                      style={
                        {
                          borderColor:
                            diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`]
                              ? diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`]
                              : null,
                          backgroundColor: backgroundColors[`${name}-${column.name}-constraintType-${constraintType}`]
                            ? diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`]
                            : null,
                        }
                      }
                      onClick={
                        (event) => {
                          handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)
                        }
                      }
                    >
                      {constraintType}
                    </span>
                  )
                  )
                )
                : null
            }
          </td>
        </tr>))
      }
    </tbody>
    </Table>
  );
  /* eslint-enable */
};

export default DiffDbDisplay;
