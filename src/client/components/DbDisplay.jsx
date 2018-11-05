import React, { Component } from 'react';

const DbDisplay = (props) => {
  const { tableInfo } = props;
  const { name, columns } = tableInfo;

  return (
    <ul>
      <li className="list-group-item">
        {name}
      </li>
      {columns.map(column => (
        <li className="list-group-item">
          {column.name}
          {' '}
          {column.dataType}
          {' '}
          {column.isNullable ? null : 'NOT NULL'}
          {' '}
          {column.constraintTypes
            ? column.constraintTypes.map((constraintType, index) => {
              if (index === column.constraintTypes.length - 1) {
                return constraintType;
              }
              return `${constraintType} `;
            })
            : null}
        </li>))
      }
    </ul>
  );
};

export default DbDisplay;
