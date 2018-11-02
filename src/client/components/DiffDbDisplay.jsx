import React, { Component } from 'react';

// added function to change clicked element's background color
const handleClick = (event, diffDbColors, addScript, removeScript) => {
  console.log('hey', event.target.style.borderColor);

  // // below is not correct!
  // // if click on just a little part, not the whole list,
  // if (event.target.parentNode.tagName === 'LI' && event.target.style.borderColor !== 'yellow') {
  //   event.target.parentNode.style.background = 'purple';
  //   // if click on the list, just turn list purple
  // } else if (event.target.parentNode.tagName === 'UL' || event.target.style.borderColor === 'yellow') {
  //   event.target.style.background = 'purple';
  // }

  if (diffDbColors[event.target.id] !== undefined) {
    if (event.target.style.backgroundColor === diffDbColors[event.target.id]) {
      // Create query.
      const queryParams = event.target.id.split('-');

      // One query param means add or delete a table.
      if (queryParams === 1) {
        if (diffDbColors[event.target.id] === 'green') {
          addScript(`
            '
          `);
        }
      }

      // Deselect change.
      event.target.style.backgroundColor = 'white';
    } else {
      // Select change.
      event.target.style.backgroundColor = diffDbColors[event.target.id];
    }
  }
};

const DiffDbDisplay = (props) => {
  const {
    tableInfo, diffDbColors, addScript, removeScript,
  } = props;
  const { name, columns } = tableInfo;
  console.log(diffDbColors);
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
          }
        }
        onClick={
          diffDbColors[name]
            ? (event) => {handleClick(event, diffDbColors, addScript, removeScript)}
            : null
        }
      >
        {name}
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
            }
          }
          onClick={
            diffDbColors[`${name}-${column.name}`]
              ? (event) => {handleClick(event, diffDbColors, addScript, removeScript)}
              : null
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
                    : 'rgba(0,0,0,.125)',
              }
            }
            onClick={
              diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                ? (event) => {handleClick(event, diffDbColors, addScript, removeScript)}
                : null
            }
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
                    }
                  }
                  onClick={diffDbColors[`${name}-${column.name}-constraintType-${column.constraintType}`] ? (event) => {handleClick(event, diffDbColors, addScript, removeScript)} : null}
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
