const {

  electron,

  app,

  BrowserWindow,

  ipcMain,

} = require('electron');


const path = require('path');

const url = require('url');

const isDev = require('electron-is-dev');

const fs = require('fs');


const {

  LOAD_LOCAL_FILE,

  LOCAL_FILE_TEXT,

} = require('../src/constants.js');


let mainWindow;
let scriptWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    // titleBarStyle: 'hidden',
    width: 960,
    height: 760,
    // minHeight: 680,
    backgroundColor: '#b5beda',
    // show: false,
  });

  // ge tried to fix white flash but failed
  // mainWindow.on('ready-to-show', function() {
  //   mainWindow.show();
  //   mainWindow.focus();
  // });

  mainWindow.loadURL(

    // isDev ? 'http://localhost:3000' :
    `file://${path.join(__dirname, './../dist/index.html')}`,

  );
  // ge commented it out just to test
  mainWindow.on('closed', () => mainWindow = null);


  // BrowserWindow.addDevToolsExtension('/path/to/extension');
}

exports.createScriptWindow = () => {
  if (!scriptWindow) {
    const mainWindowPos = mainWindow.getPosition();

    scriptWindow = new BrowserWindow({
      frame: false,
      // titleBarStyle: 'hidden',
      width: 400,
      height: 600,
      // minHeight: 680,
      backgroundColor: '#b5beda',
      // show: false,
      x: mainWindowPos[0] + 960,
      y: mainWindowPos[1],
    });

    // ge tried to fix white flash but failed
    // mainWindow.on('ready-to-show', function() {
    //   mainWindow.show();
    //   mainWindow.focus();
    // });

    scriptWindow.loadURL(

      // isDev ? 'http://localhost:3000' :
      `file://${path.join(__dirname, './../public/script.html')}`,

    );
    // ge commented it out just to test
    scriptWindow.on('closed', () => scriptWindow = null);

    // mainWindow.focus();
  // BrowserWindow.addDevToolsExtension('/path/to/extension');
  }
};

// function loadFile() {
//   fs.readFile('localfile.json', 'utf8', (err, data) => {
//     if (err) {
//       console.log(err);

//       return;
//     }

//     const jsondata = JSON.parse(data);

//     const filedata = jsondata.key;

//     mainWindow.webContents.send(LOCAL_FILE_TEXT, filedata);
//   });
// }


// ipcMain.on(LOAD_LOCAL_FILE, () => {
//   loadFile();
// });


app.on('ready', createWindow);
// app.on('ready', createScriptWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
    // createScriptWindow();
  }
});

ipcMain.on('updateScript', (event, script) => {
  scriptWindow.webContents.send('updateScript', script);
});

ipcMain.on('addAll', (event) => {
  mainWindow.webContents.send('addAll');
});
