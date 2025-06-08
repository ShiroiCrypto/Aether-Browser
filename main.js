const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false, // Remove a barra de título padrão
    backgroundColor: '#1a1a1a' // Cor de fundo escura
  });

  mainWindow.loadFile('index.html');

  // Atualizar URL na barra de endereços
  mainWindow.webContents.on('did-navigate', (event, url) => {
    mainWindow.webContents.send('url-update', url);
  });
}

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

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
}); 