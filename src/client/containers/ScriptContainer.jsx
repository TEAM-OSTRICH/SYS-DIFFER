import React, { Component } from 'react';
import _ from 'lodash';
import ScriptDisplay from '../components/ScriptDisplay.jsx';

const handleClick = (id, diffDbColors, addScript, setBackgroundColor, tableInfo, column) => {
  // Select change.
  // Create query.
  const queryParams = id.split('-');

  // One query parameter means add or delete a table.
  if (queryParams.length === 1) {
    const { name, columns } = tableInfo;
    if (diffDbColors[id] === 'darkseagreen') {
      // Add a table.
      let columnString = '';

      // Build columns part of query.
      columns.forEach((column) => {
        const {
          name, dataType, isNullable, constraintTypes,
        } = column;

        columnString += `"${name}" ${dataType}`;

        // Add NOT NULL constraint if it exists.
        if (!isNullable) {
          columnString += ' NOT NULL';
        }

        if (constraintTypes !== undefined) {
          // Loop through and add all constraint types.
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
      });

      // Remove last comma.
      columnString = columnString.slice(0, columnString.length - 2);

      // Add script to create a table.
      return `CREATE TABLE "${name}" (${columnString});`;
    } if (diffDbColors[id] === 'indianred') {
      // Add script to delete a table.
      return `DROP TABLE "${name}";\n/*  ALERT: THIS WILL ALSO CASCADE DELETE ALL ASSOCIATED DATA  */`;
    }
  }

  // Two query params means add or delete column from table
  if (queryParams.length === 2) {
    const {
      name, dataType, isNullable, constraintTypes,
    } = column;
    const tableName = tableInfo.name;

    let columnString = `ALTER TABLE "${tableName}" `;

    if (diffDbColors[id] === 'darkseagreen') {
      // Add a column
      columnString += `ADD COLUMN "${name}" ${dataType}`;

      // Add NOT NULL constraint if it exists.
      if (!isNullable) {
        columnString += ' NOT NULL';
      }

      if (constraintTypes !== undefined) {
        // Loop through and add all constraint types.
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

      return columnString;
    }
    // Must be 'indianred' so delete a column
    return `ALTER TABLE "${tableName}" DROP COLUMN "${name}";\n/*  ALERT: THIS WILL ALSO CASCADE DELETE ALL ASSOCIATED DATA  */`;
  }

  // Four query params means add or delete data-type or constraint
  if (queryParams.length === 4) {
    const { name, dataType } = column;
    const tableName = tableInfo.name;

    // Add or remove a constraint.
    if (queryParams[2] === 'constraintType') {
      let columnString = `ALTER TABLE "${tableName}" `;

      if (diffDbColors[id] === 'darkseagreen') {
        // add a constraint
        columnString += 'ADD';

        if (queryParams[3].includes('REFERENCES')) {
          const constraintTypeArray = queryParams[3].split(' ');
          const foreignKey = ` FOREIGN KEY (${queryParams[1]}) REFERENCES ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;

          columnString += `${foreignKey}`;
        } else {
          columnString += ` ${queryParams[3]} ("${name}");`;
        }
        return columnString;
      }
      // remove a constraint
      columnString += `ALTER COLUMN "${name}" DROP ${queryParams[3]};`;
      return columnString;
    }

    // Modify a data type.
    if (queryParams[2] === 'dataType') {
      // add a dataType
      return `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" TYPE ${dataType};`;
    }

    // Add or remove NOT NULL constraint.
    if (queryParams[2] === 'nullable') {
      if (diffDbColors[id] === 'darkseagreen') {
        // add a "NOT NULL"
        console.log('kill myself');
        return `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" SET NOT NULL;`;
      }
      // remove a "NOT NULL"
      console.log('die');
      return `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" DROP NOT NULL;`;
    }
  }
};

const selectAll = (db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges) => {
  const ids = Object.keys(diffDbColors);
  const script = {};
  // console.log(backgroundColors);
  // Loop through all ids of backgroundColors and select changes.

  ids.forEach((id) => {
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
  });

  addAllChanges(script);
};

// const ScriptContainer = (props) => {
//   const {
//     script, removeAllChanges, db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges,
//   } = props;

//   return (
//     <div id="scriptContainer" ref="scriptContainer">
//       Script
//       <ScriptDisplay script={script} />
//       <button onClick={() => { selectAll(db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges); }
//       }
//       >
//       Add All
//       </button>
//       <button onClick={removeAllChanges}>Remove All</button>
//     </div>
//   );
// };

class ScriptContainer extends Component {
  constructor(props) {
    super(props);
  }

  toggleShowScript() {
    if (ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id === 'diffDbDisplayContainer') {
      ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id = 'hideScriptBox';
    } else {
      ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id = 'diffDbDisplayContainer';
    }
  }

  render() {
    const {
      script, removeAllChanges, db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges,
    } = this.props;

    return (
      <div id="scriptContainer" ref="scriptContainer">
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
  }
}

export default ScriptContainer;
