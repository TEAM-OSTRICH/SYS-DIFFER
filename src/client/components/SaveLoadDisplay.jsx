import React, { Component } from 'react';

const { remote } = require('electron');

const { app } = remote;
const fs = require('fs');
const storage = require('electron-storage');


class SaveLoadDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileToLoad: '',
    };

    this.saveState = this.saveState.bind(this);
    this.updateFileToLoad = this.updateFileToLoad.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }

  componentDidMount() {
    let list;
    const getPath = app.getPath('userData');
    if (fs.existsSync(`${getPath}/saveFiles`)) {
      const files = fs.readdirSync(`${getPath}/saveFiles`);
      this.setState({
        files,
      });
      console.log(files, 'files');
      // storage.get('./saveFiles', (err, data) => {
      //   if (err) {
      //     console.error(err, 'err in get');
      //   } else {

      //     console.log(data, 'getback');
      //   }
      // });
    } else {
      console.log('Directory does not exist');
    }
  }

  saveState() {
    const data = this.props.testData;
    console.log(data, 'dt');
    const input = document.getElementById('fileName').value;
    if (input && input.length <= 64) {
      // check regex in the future :(
      storage.set(`./saveFiles/${input}`, data, (err) => {
        if (err) {
          console.error(err, 'err');
        } else {
          console.log('saved??');

          let list;
          const getPath = app.getPath('userData');
          if (fs.existsSync(`${getPath}/saveFiles`)) {
            const files = fs.readdirSync(`${getPath}/saveFiles`);
            this.setState({
              files,
            });
            console.log(files, 'files');
            // storage.get('./saveFiles', (err, data) => {
            //   if (err) {
            //     console.error(err, 'err in get');
            //   } else {

            //     console.log(data, 'getback');
            //   }
            // });
          } else {
            console.log('Directory does not exist');
          }
        }
      });
    }
  }

  updateFileToLoad(event) {
    console.log(event.target.innerText);
    this.setState({ fileToLoad: event.target.innerText });
  }

  loadFile() {
    storage.get(`./saveFiles/${this.state.fileToLoad}`, (err, data) => {
      if (err) {
        console.error(err, 'err in get');
      } else {
        console.log(data, 'getback');
      }
    });
  }

  render() {
    // const getState = () => {
    //   const input = document.getElementById('fileName').value;
    //   storage.get(`./saveFiles/${input}`, (err, data) => {
    //     if (err) {
    //       console.error(err, 'err in get');
    //     } else {
    //       console.log(data, 'getback');
    //     }
    //   });
    // };

    return (
      <div>
        {/* <textarea
          id="scriptTextArea"
          value={`
            Save 1 Created at 11/7/18\n
            Save 2 Created at 11/8/18\n
            Save 3 Created at 11/9/18\n`}
        /> */}
        <ul id="saveLoadArea">
          {this.state.files.map(file => <li className="list-group-item" onClick={this.updateFileToLoad}>{file}</li>)}
        </ul>
        <button onClick={this.loadFile}>Load File</button>
        <br />
        <input id="fileName" placeholder="fileName" />
        <button onClick={this.saveState}>Save</button>
        {/* <button onClick={getState}>Load</button> */}
      </div>
    );
  }
}

export default SaveLoadDisplay;
