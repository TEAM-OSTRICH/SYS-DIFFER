import React, { Component } from 'react';
import handleClick from './HandleClick.js';

// // added function to change clicked element's background color
// const handleClick = (event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column) => {
//   event.stopPropagation();
//   let id;
//   let target;
//   const { parentNode } = event.target;

//   if (diffDbColors[event.target.id] !== undefined) {
//     id = event.target.id;
//     target = event.target;
//   } else if (diffDbColors[parentNode.id] !== undefined) {
//     id = parentNode.id;
//     target = parentNode;
//   }
//   if (diffDbColors[id] !== undefined) {
//     if (target.style.backgroundColor === diffDbColors[id]) {
//       // Background color is set meaning change is selected.
//       // Deselect change and remove query from script.
//       setBackgroundColor(id);
//       removeScript(id);
//     } else {
//       // Select change.
//       setBackgroundColor(id);

//       // Create query.
//       // Determine type of query from id.
//       const queryParams = id.split('-');

//       // One query parameter means add or delete a table.
//       if (queryParams.length === 1) {
//         const { name, columns } = tableInfo;
//         if (diffDbColors[id] === 'darkseagreen') {
//           // Add a table.
//           let columnString = '';

//           // Build columns part of query.
//           columns.forEach((column) => {
//             const {
//               name, dataType, isNullable, constraintTypes,
//             } = column;

//             columnString += `"${name}" ${dataType}`;

//             // Add NOT NULL constraint if it exists.
//             if (!isNullable) {
//               columnString += ' NOT NULL';
//             }

//             if (constraintTypes !== undefined) {
//               // Loop through and add all constraint types.
//               constraintTypes.forEach((constraintType) => {
//                 if (constraintType.includes('REFERENCES')) {
//                   const constraintTypeArray = constraintType.split(' ');
//                   const foreignKey = ` ${constraintTypeArray[0]} ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;
//                   columnString += `${foreignKey}`;
//                 } else {
//                   columnString += ` ${constraintType}`;
//                 }
//               });
//             }

//             columnString += ', ';
//           });

//           // Remove last comma.
//           columnString = columnString.slice(0, columnString.length - 2);

//           // Add script to create a table.
//           addScript(id, `CREATE TABLE ${name} (${columnString});`);
//         } else if (diffDbColors[id] === 'indianred') {
//           // Add script to delete a table.
//           addScript(id, `DROP TABLE "${name}";\n/*  ALERT: THIS WILL ALSO CASCADE DELETE ALL ASSOCIATED DATA  */`);
//         }
//       }

//       // Two query params means add or delete column from table
//       if (queryParams.length === 2) {
//         const {
//           name, dataType, isNullable, constraintTypes,
//         } = column;
//         const tableName = tableInfo.name;
//         let columnString = `ALTER TABLE "${tableName}" `;
//         if (diffDbColors[id] === 'darkseagreen') {
//           // Add a column
//           columnString += `ADD COLUMN "${name}" ${dataType}`;

//           // Add NOT NULL constraint if it exists.
//           if (!isNullable) {
//             columnString += ' NOT NULL';
//           }

//           if (constraintTypes !== undefined) {
//             // Loop through and add all constraint types.
//             constraintTypes.forEach((constraintType) => {
//               if (constraintType.includes('REFERENCES')) {
//                 const constraintTypeArray = constraintType.split(' ');
//                 const foreignKey = ` ${constraintTypeArray[0]} ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;
//                 columnString += `${foreignKey}`;
//               } else {
//                 columnString += ` ${constraintType}`;
//               }
//             });
//           }

//           columnString += ';';

//           addScript(id, columnString);
//         } else {
//           // Must be 'indianred' so delete a column
//           addScript(id, `ALTER TABLE "${tableName}" DROP COLUMN "${name}";\n/*  ALERT: THIS WILL ALSO CASCADE DELETE ALL ASSOCIATED DATA  */`);
//         }
//       }

//       // Four query params means add or delete data-type or constraint
//       if (queryParams.length === 4) {
//         const {
//           name, dataType, constraintTypes, constraintNames,
//         } = column;
//         const tableName = tableInfo.name;
//         console.log('qParams2', queryParams, 'column2', column, 'tableInfo2', tableInfo);
//         // Add or remove a constraint.
//         if (queryParams[2] === 'constraintType') {
//           let columnString = `ALTER TABLE "${tableName}" `;

//           if (diffDbColors[id] === 'darkseagreen') {
//             // add a constraint
//             columnString += 'ADD';

//             if (queryParams[3].includes('REFERENCES')) {
//               const constraintTypeArray = queryParams[3].split(' ');
//               const foreignKey = ` FOREIGN KEY (${queryParams[1]}) REFERENCES ${constraintTypeArray[3]} (${constraintTypeArray[1]})`;

//               columnString += `${foreignKey}`;
//             } else {
//               columnString += ` ${queryParams[3]} ("${name}");`;
//             }
//             addScript(id, columnString);
//           } else {
//             // remove a constraint
//             columnString += `DROP "${constraintNames[constraintTypes.indexOf(queryParams[3])]}";`;
//             addScript(id, columnString);
//           }
//         }

//         // Modify a data type.
//         if (queryParams[2] === 'dataType') {
//           // add a dataType
//           addScript(id, `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" TYPE ${dataType} USING "${name}"::${dataType};`);
//         }

//         // Add or remove NOT NULL constraint.
//         if (queryParams[2] === 'nullable') {
//           if (diffDbColors[id] === 'darkseagreen') {
//             // add a "NOT NULL"
//             console.log('kill myself');
//             addScript(id, `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" SET NOT NULL;`);
//           } else {
//             // remove a "NOT NULL"
//             console.log('die');
//             addScript(id, `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" DROP NOT NULL;`);
//           }
//         }
//       }
//     }
//   }
// };

const DiffDbDisplay = (props) => {
  const {
    tableInfo, diffDbColors, addScript, removeScript, backgroundColors, setBackgroundColor,
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
          onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
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
            onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
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
                  onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
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
                    onClick={(event) => {handleClick(event, diffDbColors, addScript, removeScript, setBackgroundColor, tableInfo, column)}}
                  >
                    {constraintType}
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
