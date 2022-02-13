const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // dialog.showOpenDialog
  browseForCF(oldPath) {
    return ipcRenderer.invoke('browse-for-curseforge', oldPath);
  },

  getInstances(curseForgePath) {
    return ipcRenderer.invoke('get-curseforge-instances', curseForgePath);
  },

  validCurseForgePath(curseForgePath) {
    return ipcRenderer.invoke('valid-curseforge-path', curseForgePath);
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
