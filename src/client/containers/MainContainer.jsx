import React, { Component } from 'react';
import _ from 'lodash';
import { diff } from 'deep-diff';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import DbDisplayContainer from './DbDisplayContainer.jsx';
import DiffDbDisplayContainer from './DiffDbDisplayContainer.jsx';
import ScriptContainer from './ScriptContainer.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldDb: [],
      newDb: [],
      diffDb: [],
      script: [],
      oldDbDisplay: true,
      newDbDisplay: false,
      diffDbDisplay: false,
      scriptDisplay: false,
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.addScript = this.addScript.bind(this);
    this.removeScript = this.removeScript.bind(this);
  }

  componentWillMount() {
    const { input1, input2 } = this.props;
    console.log(this.props, input1, input2,'heyyy');
    // const input1 = 'postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk';
    // const input2 = 'postgres://dslgjgaw:vSOX1FK3PujhRKJSgm3lKL_86UADa2CU@stampy.db.elephantsql.com:5432/dslgjgaw';

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
      },
    };

    const pgp = require('pg-promise')(initOptions);


    const db = pgp(input1);

    const query = `SELECT
t.table_name,
c.column_name,
c.is_nullable,
c.data_type,
c.character_maximum_length,
tc.constraint_type,
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
WHERE table_type = 'BASE TABLE'
AND t.table_schema = 'game.dbo'
AND (constraint_type is null OR constraint_type <> 'FOREIGN KEY')
UNION ALL
SELECT
t.table_name,
c.column_name,
c.is_nullable,
c.data_type,
c.character_maximum_length,
tc.constraint_type,
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
WHERE table_type = 'BASE TABLE'
AND t.table_schema = 'game.dbo'
AND constraint_type = 'FOREIGN KEY'
ORDER BY table_name`;
    db.any(query)
      .then((schemaInfo) => {
        const { oldDb } = this.state;
        const oldDbCopy = oldDb.slice();

        let currentTableName;
        let table = {};
        console.log(schemaInfo, 'schema');
        schemaInfo.forEach((row) => {
          const {
            table_name, column_name, is_nullable, data_type, character_maximum_length, constraint_type, foreign_table_name, foreign_column_name,
          } = row;

          if (currentTableName === undefined) {
            currentTableName = table_name;
            table.name = table_name;
          }

          if (currentTableName !== undefined && currentTableName !== table_name) {
            currentTableName = table_name;
            // Add table to oldDb array.
            oldDbCopy.push(table);
            // Reset table.
            table = {};
            table.name = table_name;
          }

          // Create new column object.
          const column = {};
          column.name = column_name;
          column.dataType = data_type;
          if (data_type === 'character varying') column.dataType = `varchar (${character_maximum_length})`;
          if (constraint_type !== null) column.constraintType = constraint_type;

          // Add new column object to table.
          if (table.columns === undefined) table.columns = [column];
          else table.columns.push(column);
        });

        // Push the last table.
        oldDbCopy.push(table);

        this.setState({ oldDb: oldDbCopy });

        // Get new db info.
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
          },
        };

        const pgp = require('pg-promise')(initOptions);


        // const { url } = 'postgres://dslgjgaw:vSOX1FK3PujhRKJSgm3lKL_86UADa2CU@stampy.db.elephantsql.com:5432/dslgjgaw';

        const db2 = pgp(input2);
        db2.any(query)
          // .then(data=>console.log(data))
          // .then(data => data.json())
          .then((schemaInfo2) => {
            // console.log(schemaInfo2)
            const { newDb } = this.state;
            const newDbCopy = newDb.slice();

            let currentTableName;
            let table = {};
            // console.log(schemaInfo2);
            schemaInfo2.forEach((row) => {
              const {
                table_name, column_name, is_nullable, data_type, character_maximum_length, constraint_type, foreign_table_name, foreign_column_name,
              } = row;

              if (currentTableName === undefined) {
                currentTableName = table_name;
                table.name = table_name;
              }

              if (currentTableName !== undefined && currentTableName !== table_name) {
                currentTableName = table_name;
                // Add table to newDb array.
                newDbCopy.push(table);
                // Reset table.
                table = {};
                table.name = table_name;
              }

              // Create new column object.
              const column = {};
              column.name = column_name;
              column.dataType = data_type;
              if (data_type === 'character varying') column.dataType = `varchar (${character_maximum_length})`;
              if (constraint_type !== null) column.constraintType = constraint_type;

              // Add new column object to table.
              if (table.columns === undefined) table.columns = [column];
              else table.columns.push(column);
            });

            // Push the last table.
            newDbCopy.push(table);

            this.setState({ newDb: newDbCopy });
          })
          .then(() => {
            const { oldDb, newDb } = this.state;
            const diffDb = JSON.parse(JSON.stringify(newDb));
            const diffDbColors = {};

            // Check additions.
            oldDb.forEach((table, index) => {
              const foundTable = _.find(diffDb, { name: table.name });

              if (foundTable === undefined) {
                // Table does not exist.
                diffDb.push(table);
                // Add color scheme.
                diffDbColors[`${table.name}`] = 'green';

                // table.columns.forEach((column) => {
                //   diffDbColors[`${table.name}-${column.name}`] = 'green';
                // });
              } else {
                // Table exists.
                // Check columns.
                table.columns.forEach((column) => {
                  const foundColumn = _.find(foundTable.columns, { name: column.name });

                  if (foundColumn === undefined) {
                    // Column does not exist.
                    foundTable.columns.push(column);
                    // Add color scheme.
                    diffDbColors[`${table.name}-${column.name}`] = 'green';
                  } else {
                    // Column exists.
                    // Check properties.
                    const keys = Object.keys(column);

                    keys.forEach((key) => {
                      // console.log(foundColumn[key], column[key]);
                      if (foundColumn[key] === undefined) {
                        // Property does not exist.
                        foundColumn[key] = column[key];
                        // Add color scheme.
                        diffDbColors[`${table.name}-${column.name}-${key}-${column[key]}`] = 'green';
                      } else if (foundColumn[key] !== column[key]) {
                        // Property has been modified.
                        foundColumn[key] = column[key];
                        // Add color scheme.
                        diffDbColors[`${table.name}-${column.name}-${key}-${column[key]}`] = 'yellow';
                      }
                    });
                  }
                });
              }
            });

            // Check deletions.
            diffDb.forEach((table, index) => {
              const foundTable = _.find(oldDb, { name: table.name });

              if (foundTable === undefined) {
                // Table does not exist.
                // Add color scheme.
                diffDbColors[`${table.name}`] = 'red';
                // table.columns.forEach((column) => {
                //   diffDbColors[`${table.name}-${column.name}`] = 'green';
                // });
              } else {
                // Table exists.
                // Check columns.
                table.columns.forEach((column) => {
                  const foundColumn = _.find(foundTable.columns, { name: column.name });

                  if (foundColumn === undefined) {
                    // Column does not exist.
                    // Add color scheme.
                    diffDbColors[`${table.name}-${column.name}`] = 'red';
                  } else {
                    // Column exists.
                    // Check properties.
                    const keys = Object.keys(column);

                    keys.forEach((key) => {
                      if (foundColumn[key] === undefined) {
                        // Property does not exist.
                        // Add color scheme.
                        diffDbColors[`${table.name}-${column.name}-${key}-${column[key]}`] = 'red';
                      }
                    });
                  }
                });
              }
            });
            // console.log(diffDbColors);
            this.setState({ diffDb, diffDbColors });
          });
      });
  }

  changeDisplay(event) {
    const display = event.target.id;
    // Reset all displays to false.
    this.setState({
      oldDbDisplay: false,
      newDbDisplay: false,
      diffDbDisplay: false,
      scriptDisplay: false,
    });
    this.setState({ [display]: true });
  }

  addScript(query) {
    const { script } = this.state;
    script.push(query);
    this.setState({ script });
  }

  removeScript(query) {
    const { script } = this.state;
    script.filter(element => element !== query);
    this.setState({ script });
  }

  render() {
    const {
      oldDb, newDb, diffDb, script, oldDbDisplay, newDbDisplay, diffDbDisplay, scriptDisplay, diffDbColors, clickable, addScript, removeScript,
    } = this.state;
    const { changeDisplay } = this;

    return (
      <div>
        <button onClick={() => {
          console.log(this.props,'workkk')
          return this.props.history.push('/')}}>go home</button>
        <button id="oldDbDisplay" onClick={(event) => { changeDisplay(event); }}>New DB</button>
        <button id="newDbDisplay" onClick={(event) => { changeDisplay(event); }}>Current DB</button>
        <button id="diffDbDisplay" onClick={(event) => { changeDisplay(event); }}>DB Diff</button>
        <button id="scriptDisplay" onClick={(event) => { changeDisplay(event); }}>Script</button>
        {oldDbDisplay ? <DbDisplayContainer db={oldDb} /> : null}
        {newDbDisplay ? <DbDisplayContainer db={newDb} /> : null}
        {diffDbDisplay
          ? (
            <DiffDbDisplayContainer
              db={diffDb}
              diffDbColors={diffDbColors}
              addScript={addScript}
              removeScript={removeScript}
            />
          )
          : null}
        {scriptDisplay ? <ScriptContainer script={script} /> : null}
      </div>
    );
  }
}

export default withRouter(MainContainer);
