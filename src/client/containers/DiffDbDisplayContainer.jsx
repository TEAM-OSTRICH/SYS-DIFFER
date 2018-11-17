import React, { Component } from 'react';
import _ from 'lodash';
import DiffDbDisplay from '../components/DiffDbDisplay.jsx';

const { remote } = require('electron');

const main = remote.require('./electron.js');
const electron = require('electron');

const { ipcRenderer } = electron;

class DiffDbDisplayContainer extends Component {
  /**
   * Add listens for addAll and removeAll events.
   * Draw lines for foreign key relationships and add listen for window resize and scroll.
   */
  componentDidMount() {
    const { removeAllChanges, drawLines, selectAll } = this.props;

    // Open script window when component renders.
    main.createScriptWindow();

    ipcRenderer.on('addAll', () => {
      const {
        db, diffDbColors, addAllChanges,
      } = this.props;

      selectAll(db, diffDbColors, addAllChanges);
    });

    ipcRenderer.on('removeAll', () => {
      removeAllChanges();
    });

    // Draw lines from foreign keys to table columns.
    drawLines();
    window.addEventListener('resize', drawLines);
    window.addEventListener('scroll', drawLines);
  }

  render() {
    const {
      db, diffDbColors, addScript, removeScript, backgroundColors, setBackgroundColor, handleSelect,
    } = this.props;

    const tables = db.map(tableInfo => (
      <DiffDbDisplay
        key={tableInfo.name}
        tableInfo={tableInfo}
        diffDbColors={diffDbColors}
        addScript={addScript}
        removeScript={removeScript}
        backgroundColors={backgroundColors}
        setBackgroundColor={setBackgroundColor}
        handleSelect={handleSelect}
      />
    ));

    return (
      <div id="dbDisplayContainer">
        {tables}
      </div>
    );
  }
}

export default DiffDbDisplayContainer;
