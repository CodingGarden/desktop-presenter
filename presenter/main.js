const path = require('path');
const url = require('url');
const electron = require('electron');
const { app, BrowserWindow, globalShortcut, Menu } = electron;


app.dock.hide();

let mainWindow;

function createWindow () {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.setIgnoreMouseEvents(true);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  globalShortcut.register('command+ctrl+h', () => {
    mainWindow.webContents.executeJavaScript('toggleMouseHighlight()');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
