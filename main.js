const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    backgroundColor: '#1a1a1a'
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'dist/index.html')}`;
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximize');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('unmaximize');
  });

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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Controles da janela
ipcMain.on('minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('close', () => {
  mainWindow.close();
});

// Navegação
ipcMain.on('navigate', (event, url) => {
  mainWindow.webContents.send('navigate', url);
});

ipcMain.on('go-back', () => {
  mainWindow.webContents.goBack();
});

ipcMain.on('go-forward', () => {
  mainWindow.webContents.goForward();
});

ipcMain.on('reload', () => {
  mainWindow.webContents.reload();
});

// AetherDock
ipcMain.on('toggle-dock', () => {
  mainWindow.webContents.send('toggle-dock');
}); 