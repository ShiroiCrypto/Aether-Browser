const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#0A0F2C'
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Atualizar URL na barra de endereços
  mainWindow.webContents.on('did-navigate', (event, url) => {
    mainWindow.webContents.send('url-update', url);
  });

  mainWindow.webContents.on('did-navigate-in-page', (event, url) => {
    mainWindow.webContents.send('url-update', url);
  });

  mainWindow.webContents.on('page-title-updated', (event, title) => {
    mainWindow.webContents.send('title-update', title);
  });

  mainWindow.webContents.on('did-start-loading', () => {
    mainWindow.webContents.send('loading-started');
  });

  mainWindow.webContents.on('did-stop-loading', () => {
    mainWindow.webContents.send('loading-stopped');
  });

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.webContents.send('loading-failed');
  });

  mainWindow.webContents.on('page-favicon-updated', (event, favicons) => {
    mainWindow.webContents.send('favicon-update', favicons[0]);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Controles da janela
ipcMain.on('window-minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('window-close', () => {
  mainWindow.close();
});

// Navegação
ipcMain.on('navigate', (event, url) => {
  mainWindow.loadURL(url);
});

ipcMain.on('go-back', () => {
  if (mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
  }
});

ipcMain.on('go-forward', () => {
  if (mainWindow.webContents.canGoForward()) {
    mainWindow.webContents.goForward();
  }
});

ipcMain.on('reload', () => {
  mainWindow.webContents.reload();
});

// AetherDock
ipcMain.on('toggle-dock', () => {
  mainWindow.webContents.send('toggle-dock');
}); 