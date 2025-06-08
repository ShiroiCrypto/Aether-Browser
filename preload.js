const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Controles da janela
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  // Navegação
  navigate: (url) => ipcRenderer.send('navigate', url),
  goBack: () => ipcRenderer.send('go-back'),
  goForward: () => ipcRenderer.send('go-forward'),
  reload: () => ipcRenderer.send('reload'),

  // Eventos
  onUrlUpdate: (callback) => {
    ipcRenderer.on('url-update', (event, url) => callback(url));
  },
  onTitleUpdate: (callback) => {
    ipcRenderer.on('title-update', (event, title) => callback(title));
  },
  onFaviconUpdate: (callback) => {
    ipcRenderer.on('favicon-update', (event, favicon) => callback(favicon));
  },
  onLoadingStart: (callback) => {
    ipcRenderer.on('loading-start', () => callback());
  },
  onLoadingEnd: (callback) => {
    ipcRenderer.on('loading-end', () => callback());
  },
  onLoadingFailed: (callback) => {
    ipcRenderer.on('loading-failed', () => callback());
  }
}); 