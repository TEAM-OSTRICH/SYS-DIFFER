import React, { Component } from 'react';

const DiffDbDisplay = (props) => {
  const {
    tableInfo, diffDbColors, addScript, removeScript, backgroundColors, setBackgroundColor, handleSelect,
  } = props;
  const { name, columns } = tableInfo;
/* eslint-disable */
  return (
    <div className="singleTable">   
    {/* // <ul className="list-group-item"> */}
    <ul>
    
      <li
        id={name}
        className= { diffDbColors[`${diffDbColors[name]}`]
        ? 'specialMom':'basicDiv' } 
        className="list-group-item"
        style={
          {
            'box-shadow': diffDbColors[name]
              ? `inset  0px 82px 7px ${diffDbColors[name].replace(diffDbColors[name].split(',')[3], '0.3)')}`
              : null,
            background: backgroundColors[name]
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
              'box-shadow': diffDbColors[`${name}-${column.name}`]
              ? `inset 0px 82px 7px ${diffDbColors[`${name}-${column.name}`].replace(diffDbColors[`${name}-${column.name}`].split(',')[3], '0.3)')}`
                : null,
              background: backgroundColors[`${name}-${column.name}`]
                ? diffDbColors[`${name}-${column.name}`]
                : null,
            }
          }
          onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
        >
        
          <span class="firstSpan">{column.name}</span>
       
          {' '}
          <div className= { diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                ? 'specialMom':'basicDiv' } >
          <span
            id={`${name}-${column.name}-dataType-${column.dataType}`}
            className="column-property"
            className = { diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]?'specialShit':null }
            style={
              {
                'box-shadow':
                  diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    ? `inset 0px 82px 7px ${diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`].replace(diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`].split(',')[3], '0.3)')}`
                    : null,
                  background: backgroundColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    ? diffDbColors[`${name}-${column.name}-dataType-${column.dataType}`]
                    : null,
              }
            }
            onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
          >
            {column.dataType}
          </span>
          </div>
          {' '}
          {
            !column.isNullable
              ? (
                <div className= { diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                ? 'specialMom':'basicDiv' } >
                
                <span
                  id={`${name}-${column.name}-nullable-${column.isNullable}`}
                  className="column-property"
                  className = { diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                  ? 'specialShit':null }
                  style={
                    {
                      'box-shadow':
                        diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          ? `inset  0px 82px 7px ${diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`].replace(diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`].split(',')[3], '0.3)')}`
                          : null,
                        background: backgroundColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          ? diffDbColors[`${name}-${column.name}-nullable-${column.isNullable}`]
                          : null,
                    }
                  }
                  onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
                >
                  NOT NULL
                </span>

                </div>
              ) 
            : null
          }
          {' '}
          {
            column.constraintTypes
              ? (
                column.constraintTypes.map((constraintType, index) => (
                  <div className= { diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`]
                ? 'specialMom':'basicDiv' } >
                  <span
                    id={`${name}-${column.name}-constraintType-${constraintType}`}
                    className="column-property"
                    style={
                      {
                        'box-shadow':
                          diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`]
                            ? `inset  0px 82px 7px ${diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`].replace(diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`].split(',')[3], '0.3)')}`
                            : null,
                        background: backgroundColors[`${name}-${column.name}-constraintType-${constraintType}`]
                            ? diffDbColors[`${name}-${column.name}-constraintType-${constraintType}`]
                            : null,
                      }
                    }
                    onClick={(event) => {handleSelect(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
                  >
                    {constraintType}
                    {index !== column.constraintTypes - 1 ? ' ' : null }
                  </span>
                  </div>
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
