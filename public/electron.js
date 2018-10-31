const {

  electron,

  app,

  BrowserWindow,

  ipcMain,

  Menu,

} = require('electron');

const path = require('path');

const url = require('url');

require('electron-reload')(__dirname)

const isDev = require('electron-is-dev');

const fs = require('fs');


const {

  LOAD_LOCAL_FILE,

  LOCAL_FILE_TEXT,

} = require('../src/constants.js');

// Keep a global reference of the window object
let mainWindow;


function createWindow() {
  // create browser window
  mainWindow = new BrowserWindow({ width: 900, height: 680 });

  mainWindow.loadURL(
    // if not 'isDev' load the index.html of the app.  Otherwise load localhost:3000
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'dist/index.html')}`,

  );
  // Listening for when the window is closed... delete corresponding element
  mainWindow.on('closed', () => mainWindow = null);


  // BrowserWindow.addDevToolsExtension('/path/to/extension');
}


function loadFile() {
  fs.readFile('localfile.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);

      return;
    }

    const jsondata = JSON.parse(data);

    const filedata = jsondata.key;

    mainWindow.webContents.send(LOCAL_FILE_TEXT, filedata);
  });
}


ipcMain.on(LOAD_LOCAL_FILE, () => {
  loadFile();
});


// To be called when Electron has finishe initializing and is ready to create browser windows
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // Just have app quit if window closed
  app.quit();
  // // On Macs applications stay active until user explicitly quits
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  // Recreate window in app when dock item is clicked and there are no open windows
  if (mainWindow === null) {
    createWindow();
  }
});
