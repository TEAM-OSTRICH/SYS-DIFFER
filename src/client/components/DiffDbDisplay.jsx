import React, { Component } from 'react';

const DiffDbDisplay = (props) => {
  const { tableInfo, diffDbColors } = props;
  const { name, columns } = tableInfo;
  console.log(diffDbColors);

  return (
    <ul
      className="list-group-item"
      style={
        {
          borderColor: diffDbColors[name]
            ? diffDbColors[name]
            : 'rgba(0,0,0,.125)',
        }
      }
    >
      <li className="list-group-item">
        {name}
      </li>

      {columns.map(column => (
        <li
          className="list-group-item"
          style={
            {
              borderColor: diffDbColors[`${name}-${column.name}`]
                ? diffDbColors[`${name}-${column.name}`]
                : 'rgba(0,0,0,.125)',
            }
          }
        >
          <span>{column.name}</span>
          {' '}
          <span
            className="column-property"
            style={
              {
                borderColor:
                  diffDbColors[`${name}-${column.name}-${column.dataType}`]
                    ? diffDbColors[`${name}-${column.name}-${column.dataType}`]
                    : 'rgba(0,0,0,.125)',
              }
            }
          >
            {column.dataType}
          </span>
          {' '}
          {
            column.constraintType
              ? (
                <span
                  className="column-property"
                  style={
                    {
                      borderColor:
                        diffDbColors[`${name}-${column.name}-${column.constraintType}`]
                          ? diffDbColors[`${name}-${column.name}-${column.constraintType}`]
                          : 'rgba(0,0,0,.125)',
                    }
                  }
                >
                  {column.constraintType}
                </span>)
              : null
          }
        </li>))
      }
    </ul>
  );
};

export default DiffDbDisplay;
