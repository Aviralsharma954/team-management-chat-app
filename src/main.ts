import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import fs from 'fs';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
const ws = require("ws");
const server = new ws.Server({port:'3000'})
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
  const windowWidth = 380;
  const windowHeight = 500;
  const createWindow = () => {
  // Create the browser window.
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const x = screenWidth - windowWidth - 10;
  const y = screenHeight - windowHeight - 10;
  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    minimizable: false,
    resizable: false,
  });
  
  // Lock window size
  mainWindow.setMinimumSize(windowWidth, windowHeight);
  mainWindow.setMaximumSize(windowWidth, windowHeight);

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

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const moveWindow = debounce((direction: string, mainWindow: BrowserWindow, screenWidth: number, screenHeight: number) => {
  const padding = 10;
  
  // Force correct window size first
  mainWindow.setBounds({
    width: windowWidth,
    height: windowHeight,
    x: mainWindow.getBounds().x,
    y: mainWindow.getBounds().y
  });

  // Get current position after ensuring correct size
  const bounds = mainWindow.getBounds();
  let x = Math.round(bounds.x);
  let y = Math.round(bounds.y);

  switch (direction) {
    case 'top':
      y = padding;
      break;
    case 'bottom':
      y = Math.round(screenHeight - windowHeight - padding);
      break;
    case 'left':
      x = padding;
      break;
    case 'right':
      x = Math.round(screenWidth - windowWidth - padding);
      break;
  }

  // Ensure integer values for position
  x = Math.round(Math.max(padding, Math.min(x, screenWidth - windowWidth - padding)));
  y = Math.round(Math.max(padding, Math.min(y, screenHeight - windowHeight - padding)));

  // Use setBounds instead of setPosition to maintain size and position together
  mainWindow.setBounds({
    x,
    y,
    width: windowWidth,
    height: windowHeight
  });
}, 100);

// express server code for settings | config 
server.on('connection', (socket:any) => {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  socket.on('message', (msg:any) => {
    const b = Buffer.from(msg);
    const direction = b.toString();
    const mainWindow = BrowserWindow.getAllWindows()[0];

    moveWindow(direction, mainWindow, screenWidth, screenHeight);
  });
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
