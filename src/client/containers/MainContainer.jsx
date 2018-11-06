import React, { Component } from "react";
import _ from "lodash";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import DbDisplayContainer from "./DbDisplayContainer.jsx";
import DiffDbDisplayContainer from "./DiffDbDisplayContainer.jsx";
import ScriptContainer from "./ScriptContainer.jsx";

const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    // console.log('Connected to database:', cp.database);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    // console.log('Disconnecting from database:', cp.database);
  },
  query(e) {
    // console.log('QUERY:', e.query);
  },
  receive(data, result, e) {
    // console.log('DATA: ', data);
  }
};

const pgp = require("pg-promise")(initOptions);

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devDb: [],
      prodDb: [],
      diffDb: [],
      script: {},
      devDbDisplay: true,
      prodDbDisplay: false,
      diffDbDisplay: false,
      scriptDisplay: false,
      backgroundColors: {}
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.addScript = this.addScript.bind(this);
    this.removeScript = this.removeScript.bind(this);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
  }

  componentWillMount() {
    let {
      input1,
      input2,
      inputLinkSchema1,
      inputLinkSchema2,
      inputObj1Schema,
      inputObj2Schema
    } = this.props;
    if (input1 === "" || input2 === "") {
      input1 = `postgres://${this.props.inputObj1User}:${
        this.props.inputObj1Pass
      }@${this.props.inputObj1Host}:${this.props.inputObj1Port}/${
        this.props.inputObj1Dbname
      }`;
      input2 = `postgres://${this.props.inputObj2User}:${
        this.props.inputObj2Pass
      }@${this.props.inputObj2Host}:${this.props.inputObj2Port}/${
        this.props.inputObj2Dbname
      }`;
      inputLinkSchema1 = inputObj1Schema;
      inputLinkSchema2 = inputObj2Schema;
    }
    console.log("INPUT", inputLinkSchema1, inputLinkSchema2);
    // const input1 = 'postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk';
    // const input2 = 'postgres://dslgjgaw:vSOX1FK3PujhRKJSgm3lKL_86UADa2CU@stampy.db.elephantsql.com:5432/dslgjgaw';

    let query = `
      SELECT
      t.table_name,
      c.column_name,
      c.is_nullable,
      c.data_type,
      c.character_maximum_length,
      string_agg(tc.constraint_type, ', ') AS constraint_types,
      null AS foreign_table_name,
      null AS foreign_column_name
      FROM
      information_schema.tables AS t JOIN information_schema.columns AS c
        ON t.table_name = c.table_name
      LEFT JOIN information_schema.key_column_usage AS kcu
        ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN information_schema.table_constraints AS tc
        ON kcu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu 
        ON tc.constraint_name = ccu.constraint_name
      WHERE t.table_type = 'BASE TABLE'
      AND t.table_schema = '${inputLinkSchema1}'
      AND (tc.constraint_type is null OR tc.constraint_type <> 'FOREIGN KEY')
      GROUP BY t.table_name, c.column_name,  c.is_nullable, c.data_type, c.character_maximum_length
      UNION ALL
      SELECT
      t.table_name,
      c.column_name,
      c.is_nullable,
      c.data_type,
      c.character_maximum_length,
      string_agg(tc.constraint_type, ', ') AS constraint_types,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
      FROM
      information_schema.tables AS t JOIN information_schema.columns as c
        ON t.table_name = c.table_name
      LEFT JOIN information_schema.key_column_usage as kcu
        ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN information_schema.table_constraints as tc
        ON kcu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu
        ON tc.constraint_name = ccu.constraint_name
      WHERE t.table_type = 'BASE TABLE'
      AND t.table_schema = '${inputLinkSchema1}'
      AND tc.constraint_type = 'FOREIGN KEY'
      GROUP BY t.table_name, c.column_name,  c.is_nullable, c.data_type, c.character_maximum_length, ccu.table_name, ccu.column_name
      ORDER BY table_name, column_name
      `;
    let query2 = `
      SELECT
      t.table_name,
      c.column_name,
      c.is_nullable,
      c.data_type,
      c.character_maximum_length,
      string_agg(tc.constraint_type, ', ') AS constraint_types,
      null AS foreign_table_name,
      null AS foreign_column_name
      FROM
      information_schema.tables AS t JOIN information_schema.columns AS c
        ON t.table_name = c.table_name
      LEFT JOIN information_schema.key_column_usage AS kcu
        ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN information_schema.table_constraints AS tc
        ON kcu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu 
        ON tc.constraint_name = ccu.constraint_name
      WHERE t.table_type = 'BASE TABLE'
      AND t.table_schema = '${inputLinkSchema2}'
      AND (tc.constraint_type is null OR tc.constraint_type <> 'FOREIGN KEY')
      GROUP BY t.table_name, c.column_name,  c.is_nullable, c.data_type, c.character_maximum_length
      UNION ALL
      SELECT
      t.table_name,
      c.column_name,
      c.is_nullable,
      c.data_type,
      c.character_maximum_length,
      string_agg(tc.constraint_type, ', ') AS constraint_types,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
      FROM
      information_schema.tables AS t JOIN information_schema.columns as c
        ON t.table_name = c.table_name
      LEFT JOIN information_schema.key_column_usage as kcu
        ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN information_schema.table_constraints as tc
        ON kcu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu
        ON tc.constraint_name = ccu.constraint_name
      WHERE t.table_type = 'BASE TABLE'
      AND t.table_schema = '${inputLinkSchema2}'
      AND tc.constraint_type = 'FOREIGN KEY'
      GROUP BY t.table_name, c.column_name,  c.is_nullable, c.data_type, c.character_maximum_length, ccu.table_name, ccu.column_name
      ORDER BY table_name, column_name
      `;

    const devDbConn = pgp(input1);
    const prodDbConn = pgp(input2);

    // Parse schemaInfo to create table objects.
    const setDbInfo = (dbName, schemaInfo) => {
      const dbCopy = [];

      let currentTableName;
      let table = {};

      schemaInfo.forEach(row => {
        const {
          table_name,
          column_name,
          is_nullable,
          data_type,
          character_maximum_length,
          constraint_types,
          foreign_table_name,
          foreign_column_name
        } = row;

        if (currentTableName === undefined) {
          currentTableName = table_name;
          table.name = table_name;
        }

        if (currentTableName !== undefined && currentTableName !== table_name) {
          currentTableName = table_name;
          // Add table to oldDb array.
          dbCopy.push(table);
          // Reset table.
          table = {};
          table.name = table_name;
        }

        // Create new column object.
        const column = {};
        column.name = column_name;
        column.isNullable = (is_nullable == "YES" ? true : false);
        
        column.dataType = data_type;
        if (data_type === "character varying")
          column.dataType = `varchar (${character_maximum_length})`;
        if (data_type === "double precision") column.dataType = "float";
        if (constraint_types !== null) {
          const constraintTypesArray = constraint_types.split(", ");
          column.constraintTypes = [];

          constraintTypesArray.forEach(constraintType => {
            let constraintTypeTemp = constraintType;

            if (constraintType === "FOREIGN KEY")
              constraintTypeTemp = `REFERENCES ${foreign_column_name} IN ${foreign_table_name}`;

            column.constraintTypes.push(constraintTypeTemp);
          });
        }

        // Add new column object to table.
        if (table.columns === undefined) table.columns = [column];
        else table.columns.push(column);
      });

      // Push the last table.
      dbCopy.push(table);

      // this.setState({ [dbName]: dbCopy });
      return dbCopy;
    };

    // Create diffDb by comparing table objects in database arrays.
    const diffDatabases = (devDb, prodDb) => {
      const diffDb = JSON.parse(JSON.stringify(prodDb));
      const diffDbColors = {};
      const backgroundColors = {};
      console.log(devDb, prodDb);
      // Check for additions and modifications.
      devDb.forEach((table) => {
        const foundTable = _.find(diffDb, { name: table.name });

        if (foundTable === undefined) {
          // Table does not exist.
          diffDb.push(table);
          // Add color scheme.
          diffDbColors[`${table.name}`] = "green";
          backgroundColors[`${table.name}`] = false;
        } else {
          // Table exists.
          // Check columns.
          table.columns.forEach((column) => {
            const foundColumn = _.find(foundTable.columns, {
              name: column.name
            });

            if (foundColumn === undefined) {
              // Column does not exist.
              foundTable.columns.push(column);
              // Add color scheme.
              diffDbColors[`${table.name}-${column.name}`] = "green";
              backgroundColors[`${table.name}-${column.name}`] = false;
            } else {
              // Column exists.
              // Check column properties.

              // Check data type.
              if (column.dataType !== foundColumn.dataType) {
                // Property has been modified.
                foundColumn.dataType = column.dataType;
                // Add color scheme.
                diffDbColors[
                  `${table.name}-${column.name}-dataType-${column.dataType}`
                ] = "yellow";
                backgroundColors[
                  `${table.name}-${column.name}-dataType-${column.dataType}`
                ] = false;
              }

              // Check not null constraint.
              console.log(column, column.isNullable, 'VS', foundColumn, foundColumn.isNullable)
              if (
                column.isNullable === false &&
                column.isNullable !== foundColumn.isNullable
              ) {
                // Property has been modified.
                foundColumn.isNullable = column.isNullable;
                // Add color scheme.
                console.log(column.isNullable, "ahhhhh nullable");
                diffDbColors[
                  `${table.name}-${column.name}-nullable-${column.isNullable}`
                ] = "green";
                backgroundColors[
                  `${table.name}-${column.name}-nullable-${column.isNullable}`
                ] = false;
              }

              // Check constraint types.
              if (column.constraintTypes !== undefined) {
                column.constraintTypes.forEach((constraintType) => {
                  if (
                    foundColumn.constraintTypes === undefined ||
                    !foundColumn.constraintTypes.includes(constraintType)
                  ) {
                    // Property does not exist.
                    if (foundColumn.contstraintTypes === undefined) {
                      foundColumn.constraintTypes = [];
                    }
                    foundColumn.constraintTypes.push(constraintType);
                    // Add color scheme.
                    diffDbColors[
                      `${table.name}-${
                        column.name
                      }-constraintType-${constraintType}`
                    ] = 'green';
                    backgroundColors[
                      `${table.name}-${
                        column.name
                      }-constraintType-${constraintType}`
                    ] = false;
                  }
                });
              }

              // const keys = Object.keys(column);

              // keys.forEach((key) => {
              //   // console.log(foundColumn[key], column[key]);
              //   if (foundColumn[key] === undefined) {
              //     // Property does not exist.
              //     foundColumn[key] = column[key];
              //     // Add color scheme.
              //     diffDbColors[`${table.name}-${column.name}-${key}-${column[key]}`] = 'green';
              //     backgroundColors[`${table.name}-${column.name}-${key}-${column[key]}`] = false;
              //   } else if (foundColumn[key] !== column[key]) {
              //     // Property has been modified.
              //     foundColumn[key] = column[key];
              //     // Add color scheme.
              //     diffDbColors[`${table.name}-${column.name}-${key}-${column[key]}`] = 'yellow';
              //     backgroundColors[`${table.name}-${column.name}-${key}-${column[key]}`] = false;
              //   }
              // });
            }
          });
        }
      });

      // Check for deletions.
      diffDb.forEach(table => {
        const foundTable = _.find(devDb, { name: table.name });

        if (foundTable === undefined) {
          // Table does not exist.
          // Add color scheme.
          diffDbColors[`${table.name}`] = "red";
          backgroundColors[`${table.name}`] = false;
        } else {
          // Table exists.
          // Check columns.
          table.columns.forEach(column => {
            const foundColumn = _.find(foundTable.columns, {
              name: column.name
            });

            if (foundColumn === undefined) {
              // Column does not exist.
              // Add color scheme.
              diffDbColors[`${table.name}-${column.name}`] = "red";
              backgroundColors[`${table.name}-${column.name}`] = false;
            } else {
              // else if (column.constraintTypes !== undefined) {
              // Column exists.
              // Check column properties.
              // Do not have to check if data type exists because all columns must have a data type.

              // Check not null constraint.
              if (
                column.isNullable === false &&
                column.isNullable !== foundColumn.isNullable
              ) {
                console.log('do sth')
                // Property has been modified.

                // Ge commented out below 1 line to test
                // foundColumn.isNullable = column.isNullable;

                // Add color scheme.
                diffDbColors[
                  `${table.name}-${column.name}-nullable-${column.isNullable}`
                ] = "red";
                backgroundColors[
                  `${table.name}-${column.name}-nullable-${column.isNullable}`
                ] = false;
              }

              // Check constraint types.
              if (column.constraintTypes !== undefined) {
                column.constraintTypes.forEach(constraintType => {
                  if (
                    foundColumn.constraintTypes === undefined ||
                    !foundColumn.constraintTypes.includes(constraintType)
                  ) {
                    // Property does not exist.
                    // Add color scheme.
                    diffDbColors[
                      `${table.name}-${
                        column.name
                      }-constraintType-${constraintType}`
                    ] = "red";
                    backgroundColors[
                      `${table.name}-${
                        column.name
                      }-constraintType-${constraintType}`
                    ] = false;
                  }
                });
              }

              // const keys = Object.keys(column);

              // keys.forEach((key) => {
              //   if (foundColumn[key] === undefined) {
              //     // Property does not exist.
              //     // Add color scheme.
              //     diffDbColors[`${table.name}-${column.name}-${key}-${column[key]}`] = 'red';
              //     backgroundColors[`${table.name}-${column.name}-${key}-${column[key]}`] = false;
              //   }
              // });
            }
          });
        }
      });
      this.setState({ diffDbColors, backgroundColors });
      return diffDb;
    };

    let devDb;
    let prodDb;
    let diffDb;

    // Query new and current database for schema information.
    // Run diffing algorithm.
    devDbConn.any(query2).then(schemaInfo => {
      devDb = setDbInfo("devDb", schemaInfo);

      // inputLinkSchema1 = inputLinkSchema2;
      prodDbConn
        .any(query)
        .then(schemaInfo2 => {
          prodDb = setDbInfo("prodDb", schemaInfo2);
        })
        // Determine differences between databases.
        .then(() => {
          diffDb = diffDatabases(devDb, prodDb);

          // Sort database arrays so that common tables appear first.
          let commonTablesArray = [];
          let differentTablesArray = [];

          // Sort devDb.
          devDb.forEach(table => {
            const foundTable = _.find(prodDb, { name: table.name });

            if (foundTable !== undefined) {
              commonTablesArray.push(table);
            } else {
              differentTablesArray.push(table);
            }
          });

          const sortedDevDb = commonTablesArray.concat(differentTablesArray);
          commonTablesArray = [];
          differentTablesArray = [];

          // Sort prodDb.
          prodDb.forEach(table => {
            const foundTable = _.find(devDb, { name: table.name });

            if (foundTable !== undefined) {
              commonTablesArray.push(table);
            } else {
              differentTablesArray.push(table);
            }
          });

          const sortedProdDb = commonTablesArray.concat(differentTablesArray);
          commonTablesArray = [];
          differentTablesArray = [];

          // Sort diffDb.
          diffDb.forEach(table => {
            const foundTable1 = _.find(devDb, { name: table.name });
            const foundTable2 = _.find(prodDb, { name: table.name });

            if (foundTable1 !== undefined && foundTable2 !== undefined) {
              commonTablesArray.push(table);
            } else {
              differentTablesArray.push(table);
            }
          });

          const sortedDiffDb = commonTablesArray.concat(differentTablesArray);

          this.setState({
            devDb: sortedDevDb,
            prodDb: sortedProdDb,
            diffDb: sortedDiffDb
          });
        });
    });
  }

  setBackgroundColor(id) {
    const { backgroundColors } = this.state;
    const backgroundColorsCopy = JSON.parse(JSON.stringify(backgroundColors));

    backgroundColorsCopy[id] = !backgroundColorsCopy[id];
    this.setState({ backgroundColors: backgroundColorsCopy });
  }

  addScript(id, query) {
    const { script } = this.state;
    const scriptCopy = JSON.parse(JSON.stringify(script));

    scriptCopy[id] = query;
    this.setState({ script: scriptCopy });
  }

  changeDisplay(event) {
    const display = event.target.id;
    // Reset all displays to false.
    this.setState({
      devDbDisplay: false,
      prodDbDisplay: false,
      diffDbDisplay: false,
      scriptDisplay: false
    });
    this.setState({ [display]: true });
  }

  removeScript(id) {
    const { script } = this.state;
    const scriptCopy = Object.assign({}, script);
    console.log(scriptCopy, "OLD");
    delete scriptCopy[id];
    console.log(scriptCopy, "NEW");
    this.setState({ script: scriptCopy });
  }

  render() {
    const {
      devDb,
      prodDb,
      diffDb,
      script,
      devDbDisplay,
      prodDbDisplay,
      diffDbDisplay,
      scriptDisplay,
      diffDbColors,
      backgroundColors
    } = this.state;
    const { changeDisplay, addScript, removeScript, setBackgroundColor } = this;

    /* eslint-disable */
    return (
      <div>
        <button
          onClick={event => {
            console.log(this.props, "workkk");
            return this.props.history.push("/");
          }}
        >
          Home
        </button>
        <button
          id="devDbDisplay"
          onClick={event => {
            changeDisplay(event);
          }}
        >
          Dev DB
        </button>
        <button
          id="prodDbDisplay"
          onClick={event => {
            changeDisplay(event);
          }}
        >
          Prod DB
        </button>
        <button
          id="diffDbDisplay"
          onClick={event => {
            changeDisplay(event);
          }}
        >
          DB Diff
        </button>
        {/* <button id="scriptDisplay" onClick={(event) => { changeDisplay(event); }}>Script</button> */}
        {devDbDisplay ? <DbDisplayContainer db={devDb} /> : null}
        {prodDbDisplay ? <DbDisplayContainer db={prodDb} /> : null}
        {diffDbDisplay ? (
          <DiffDbDisplayContainer
            db={diffDb}
            diffDbColors={diffDbColors}
            addScript={addScript}
            removeScript={removeScript}
            script={script}
            backgroundColors={backgroundColors}
            setBackgroundColor={setBackgroundColor}
          />
        ) : null}
        {/* {scriptDisplay ? <ScriptContainer script={script} /> : null} */}
      </div>
    );
    /* eslint-enable */
  }
}

export default withRouter(MainContainer);
