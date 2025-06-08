const { ipcRenderer } = require('electron');

// Elementos da interface
const urlInput = document.getElementById('url-input');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const reloadButton = document.getElementById('reload');
const minimizeButton = document.getElementById('minimize');
const maximizeButton = document.getElementById('maximize');
const closeButton = document.getElementById('close');

// Funções de controle da janela
minimizeButton.addEventListener('click', () => {
    ipcRenderer.send('window-minimize');
});

maximizeButton.addEventListener('click', () => {
    ipcRenderer.send('window-maximize');
});

closeButton.addEventListener('click', () => {
    ipcRenderer.send('window-close');
});

// Funções de navegação
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let url = urlInput.value;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        ipcRenderer.send('navigate', url);
    }
});

backButton.addEventListener('click', () => {
    ipcRenderer.send('go-back');
});

forwardButton.addEventListener('click', () => {
    ipcRenderer.send('go-forward');
});

reloadButton.addEventListener('click', () => {
    ipcRenderer.send('reload');
});

// Atualizar a URL quando a página mudar
ipcRenderer.on('url-update', (event, url) => {
    urlInput.value = url;
}); 