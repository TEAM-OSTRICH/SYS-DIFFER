import React, { Component } from 'react';

// added function to change clicked element's background color
const handleClick = (event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo) => {
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

  if (diffDbColors[id] !== undefined) {
    if (event.target.style.backgroundColor === diffDbColors[id]) {
      // Background color is set meaning change is selected so deselect change and remove query from script.
      target.style.backgroundColor = null;
      removeScript(id);
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
            const { name, dataType, constraintType } = column;
            columnString += `${name} ${dataType} ${constraintType}, `;
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
    }
  }
};

const DiffDbDisplay = (props) => {
  const {
    tableInfo, diffDbColors, addScript, removeScript, backgroundColors, setBackgroundColor,
  } = props;
  const { name, columns } = tableInfo;

/* eslint-disable */
  return (
    <ul className="list-group-item">
      <li
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
        onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo)}}
      >
        <span>{name}</span>
      </li>

      {columns.map(column => (
        <li
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
          onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor)}}
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
                    : 'rgba(0,0,0,.125)',
                  backgroundColor: backgroundColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    ? diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    : null,
              }
            }
            onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor)}}
          >
            {column.dataType}
          </span>
          {' '}
          {
            column.constraintType
              ? (
                <span
                  id={`${name}-${column.name}-constraintType-${column.constraintType}`}
                  className="column-property"
                  style={
                    {
                      borderColor:
                        diffDbColors[`${name}-${column.name}-constraintType-${column.constraintType}`]
                          ? diffDbColors[`${name}-${column.name}-constraintType-${column.constraintType}`]
                          : 'rgba(0,0,0,.125)',
                      backgroundColor: backgroundColors[`${name}-${column.name}-constraintType-${column.constraintType}`]
                          ? diffDbColors[`${name}-${column.name}-constraintType-${column.constraintType}`]
                          : null,
                    }
                  }
                  onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor)}}
                >
                  {column.constraintType}
                </span>)
              : null
          }
        </li>))
      }
    </ul>
  );
  /* eslint-enable */
};

export default DiffDbDisplay;
