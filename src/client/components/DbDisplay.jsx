import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

const DbDisplay = (props) => {
  const { tableInfo } = props;
  const { name, columns } = tableInfo;

  return (
    <div>

    <Button bsStyle="primary">test</Button>
    <Table className="table table-border table-striped table-hover">
      <tbody>
        <tr>
          <th className="list-group-item">
            {name}
          </th>
        </tr>
        {columns.map(column => (
          <tr>
            <td className="list-group-item">
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
            </td>
          </tr>))
        }
      </tbody>
    </Table>
    </div>
  );
};

export default DbDisplay;
