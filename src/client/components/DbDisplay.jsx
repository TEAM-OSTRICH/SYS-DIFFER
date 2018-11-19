import React, { Component } from 'react';

class DbDisplay extends Component {
  render() {
    const { tableInfo } = this.props;
    const { name, columns } = tableInfo;

    return (
      <div className="singleTable">
        <ul>
          <li className="list-group-item">{name}</li>
          {
            columns.map(column => (
              <li className="list-group-item">
                <span className="firstSpan">{column.name}</span>
                {' '}
                {column.dataType}
                {' '}
                {column.isNullable ? null : 'NOT NULL'}
                {' '}
                {column.constraintTypes
                  ? column.constraintTypes.map((constraintType, index) => {
                    if (index === column.constraintTypes.length - 1) {
                      return constraintType === "PRIMARY KEY" ? "PRIMARY KEY 🔑" : constraintType.includes("REFERENCES") ? constraintType+' 🗝 ': constraintType;
                    }
                    return `${constraintType === "PRIMARY KEY" ? "PRIMARY KEY 🔑" : constraintType.includes("REFERENCES") ? constraintType+' 🗝 ':constraintType} `;
                  })
                  : null}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default DbDisplay;
