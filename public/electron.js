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

let mainWindow;
let scriptWindow;

// create main window and initialize options
function createMainWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    width: 960,
    height: 760,
    x: 50,
    y: 0,
    minWidth: 960,
    minHeight: 760,
    // backgroundColor: '#b5beda',
    backgroundColor: '#f1f2f4',
  });

  mainWindow.loadURL(
    // isDev ? 'http://localhost:3000' :
    `file://${path.join(__dirname, './../dist/index.html')}`,
  );

  mainWindow.on('closed', () => mainWindow = null);
}

// create script window and set options
exports.createScriptWindow = () => {
  if (!scriptWindow) {
    const mainWindowPos = mainWindow.getPosition();

    scriptWindow = new BrowserWindow({
      frame: false,
      // titleBarStyle: 'hidden',
      width: 400,
      height: 600,
      minWidth: 400,
      minHeight: 600,
      // minHeight: 680,
      // backgroundColor: '#b5beda',
      backgroundColor: '#f1f2f4',
      // show: false,
      x: mainWindowPos[0] + 960,
      y: mainWindowPos[1],
      alwaysOnTop: true,
      parent: mainWindow, // return to this
    });

    scriptWindow.loadURL(
      // isDev ? 'http://localhost:3000' :
      `file://${path.join(__dirname, './../public/script.html')}`,
    );

    scriptWindow.on('closed', () => scriptWindow = null);
  }
};

exports.closeScriptWindow = () => {
  if (scriptWindow) {
    scriptWindow.close();
    scriptWindow = null;
  }
};

app.on('ready', createMainWindow);
// app.on('ready', createScriptWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
    // createScriptWindow();
  }
});

// listening for 'updateScript' from MainContainer -> send 'updateScript' and script-array with all queries to display to scriptWindow
ipcMain.on('updateScript', (event, script) => {
  scriptWindow.webContents.send('updateScript', script);
});

// listening for 'addAll' from script.js -> send 'addAll' to DiffDbDisplayContainer component in mainWindow
ipcMain.on('addAll', (event) => {
  mainWindow.webContents.send('addAll');
});

ipcMain.on('removeAll', (event) => {
  mainWindow.webContents.send('removeAll');
});
