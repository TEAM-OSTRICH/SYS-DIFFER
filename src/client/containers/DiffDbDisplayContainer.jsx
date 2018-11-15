import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import DiffDbDisplay from '../components/DiffDbDisplay.jsx';
import ScriptContainer from './ScriptContainer.jsx';

const remote = require('electron').remote;

const main = remote.require('./electron.js');
const electron = require('electron');

const { ipcRenderer } = electron;

// const DiffDbDisplayContainer = (props) => {
//   const {
//     db, diffDbColors, addScript, removeScript, script, backgroundColors, setBackgroundColor, removeAllChanges, addAllChanges,
//   } = props;

//   const tables = db.map(tableInfo => (
//     <DiffDbDisplay
//       key={tableInfo.name}
//       tableInfo={tableInfo}
//       diffDbColors={diffDbColors}
//       addScript={addScript}
//       removeScript={removeScript}
//       backgroundColors={backgroundColors}
//       setBackgroundColor={setBackgroundColor}
//     />
//   ));

//   const killGrayBox = () => {
//     const Value = React.findDOMNode(this.refs.location).value;
//   };

//   return (
//     <div id="DiffDbDisplayContainer">
//       <button>Ge Kill Kevin</button>
//       <div id="dbDisplayContainer">
//         {tables}
//       </div>
//       <ScriptContainer
//         script={script}
//         removeAllChanges={removeAllChanges}
//         db={db}
//         diffDbColors={diffDbColors}
//         addScript={addScript}
//         backgroundColors={backgroundColors}
//         setBackgroundColor={setBackgroundColor}
//         addAllChanges={addAllChanges}
//       />
//     </div>
//   );
// };

class DiffDbDisplayContainer extends Component {
  constructor(props) {
    super(props);

    // this.killGrayBox = this.killGrayBox.bind(this);
    // this.openScriptWindow = this.openScriptWindow.bind(this);
  }

  componentDidMount() {
    const { removeAllChanges } = this.props;

    main.createScriptWindow();

    ipcRenderer.on('addAll', (event) => {
      const {
        db, diffDbColors, addScript, removeScript, script, backgroundColors, setBackgroundColor, removeAllChanges, addAllChanges,
      } = this.props;
      selectAll(db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges);
    });

    ipcRenderer.on('removeAll', (event) => {
      removeAllChanges();
    });
  }

  killGrayBox() {
    if (ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id === 'diffDbDisplayContainer') {
      ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id = 'hideScriptBox';
    } else {
      ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id = 'diffDbDisplayContainer';
    }
  }

  // openScriptWindow() {
  //   main.createScriptWindow();
  // }

  render() {
    const {
      db, diffDbColors, addScript, removeScript, script, backgroundColors, setBackgroundColor, removeAllChanges, addAllChanges,
    } = this.props;
    const { killGrayBox } = this;
    console.log(diffDbColors);
    const tables = db.map(tableInfo => (
      <DiffDbDisplay
        key={tableInfo.name}
        tableInfo={tableInfo}
        diffDbColors={diffDbColors}
        addScript={addScript}
        removeScript={removeScript}
        backgroundColors={backgroundColors}
        setBackgroundColor={setBackgroundColor}
      />
    ));

    return (
      <div>
        {/* <button onClick={killGrayBox}>kevin</button>
        <button onClick={this.openScriptWindow}>Script</button> */}
        {/* <div id="diffDbDisplayContainer" ref="diffDbDisplayContainer"> */}
        <div id="dbDisplayContainer">
          {tables}
        </div>
        {/* <ScriptContainer
            script={script}
            removeAllChanges={removeAllChanges}
            db={db}
            diffDbColors={diffDbColors}
            addScript={addScript}
            backgroundColors={backgroundColors}
            setBackgroundColor={setBackgroundColor}
            addAllChanges={addAllChanges}
          /> */}
        {/* </div> */}
      </div>
    );
  }
}

// Imported from ScriptContainer.

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
      return `CREATE TABLE ${name} (${columnString});`;
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
    const {
      name, dataType, constraintTypes, constraintNames,
    } = column;
    const tableName = tableInfo.name;
    console.log('qParams2', queryParams, 'column2', column, 'tableInfo2', tableInfo);
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
      columnString += `DROP "${constraintNames[constraintTypes.indexOf(queryParams[3])]}";`;
      return columnString;
    }

    // Modify a data type.
    if (queryParams[2] === 'dataType') {
      // add a dataType
      return `ALTER TABLE "${tableName}" ALTER COLUMN "${name}" TYPE ${dataType} USING "${name}"::${dataType};`;
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
  const script = [];
  // console.log(backgroundColors);
  // Loop through all ids of backgroundColors and select changes.

  ids.forEach((id) => {
    const idArray = id.split('-');
    const tableName = idArray[0];
    const foundTable = _.find(db, { name: tableName });

    if (idArray.length === 1) {
      script.push({ id, query: handleClick(id, diffDbColors, addScript, setBackgroundColor, foundTable) });
    } else {
      const columnName = idArray[1];
      const foundColumn = _.find(foundTable.columns, { name: columnName });
      script.push({ id, query: handleClick(id, diffDbColors, addScript, setBackgroundColor, foundTable, foundColumn) });
    }
  });

  addAllChanges(script);
};

export default DiffDbDisplayContainer;
