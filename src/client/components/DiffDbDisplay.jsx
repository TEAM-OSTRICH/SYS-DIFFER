import React, { Component } from 'react';

const DiffDbDisplay = (props) => {
  const {
    tableInfo, diffDbColors, addScript, removeScript, backgroundColors, setBackgroundColor, handleSelect,
  } = props;
  const { name, columns } = tableInfo;
/* eslint-disable */
  return (
    <div>      
    {/* // <ul className="list-group-item"> */}
    <ul>
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
        onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo)}}
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
          onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
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
            onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
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
                        diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          ? diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          : null,
                        backgroundColor: backgroundColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          ? diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          : null,
                    }
                  }
                  onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
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
                column.constraintTypes.map((constraintType, index) => (
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
                    onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
                  >
                    {constraintType}
                    {index !== column.constraintTypes - 1 ? ' ' : null }
                  </span>
                  )
                )
              )
              : null
          }
        </li>))
      }
    </ul>
    </div>
  );
  /* eslint-enable */
};

export default DiffDbDisplay;
