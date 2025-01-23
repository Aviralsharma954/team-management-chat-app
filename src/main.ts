import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import fs from 'fs';
const express = require('express')
const server = express()
const port = 3000;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8')).config[0];
const createWindow = () => {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  const windowWidth = config.width || 380;
  const windowHeight = config.height || 500;
  const x = config['position-x'] === 'right' ? screenWidth - windowWidth - 10 : 10;
  const y = config['position-y'] === 'bottom' ? screenHeight - windowHeight - 10 : 10;
  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    minimizable: false,
  });
  fs.watchFile('./config.json', () => {
    config = JSON.parse(fs.readFileSync('./config.json', 'utf8')).config[0];
    const x = config['position-x'] === 'right' ? screenWidth - windowWidth - 10 : 10;
    const y = config['position-y'] === 'bottom' ? screenHeight - windowHeight - 10 : 10;
    mainWindow.setPosition(x, y);
    mainWindow.setSize(config.width, config.height);
  });
  mainWindow.webContents.openDevTools();
  setInterval(() => {
    mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  }, 500);
  mainWindow.setPosition(x, y);
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/sec/app/main.ts`));
  }
};


// express server code for settings | config 
server.get('/config/:direction', (req:any, res:any) => {
  const direction  = req.params.direction;
  if(direction=='left-right'){
    config = JSON.parse(fs.readFileSync('./config.json', 'utf8')).config[0];
    config['position-x'] = config['position-x'] === 'right' ? 'left' : 'right';
  }else{
    config['position-y'] = config['position-y'] === 'bottom' ? 'top' : 'bottom';
  }
  fs.writeFileSync('./config.json', JSON.stringify({ config: [config] }, null, 2));
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
