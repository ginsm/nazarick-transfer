const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // dialog.showOpenDialog
  browseForCurseForge(oldPath) {
    return ipcRenderer.invoke('browse-for-curseforge', oldPath);
  },
});

// electron-store methods
contextBridge.exposeInMainWorld('store', {
  get(property) {
    return ipcRenderer.sendSync('electron-store-get', property);
  },

  set(property, val) {
    ipcRenderer.send('electron-store-set', property, val);
  },

  delete(property) {
    ipcRenderer.send('electron-store-delete', property);
  },
});

// necessary path methods
contextBridge.exposeInMainWorld('path', {
  join(...paths) {
    return ipcRenderer.sendSync('path-join', paths);
  },
});
