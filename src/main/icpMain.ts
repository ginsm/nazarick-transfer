import { ipcMain } from 'electron';
import Store from 'electron-store';

import getStoreHandlers from './handlers/store';
import getElectronHandlers from './handlers/electron';

const registerIcpHandlers = () => {
  const store = new Store();

  const handlers = {
    store: {
      ...getStoreHandlers(store),
    },
    electron: {
      ...getElectronHandlers(),
    },
  };

  // Exposed as 'window.store'
  ipcMain.on('electron-store-get', handlers.store.get);
  ipcMain.on('electron-store-set', handlers.store.set);
  ipcMain.on('electron-store-delete', handlers.store.delete);

  // Exposed as 'window.electron'
  ipcMain.handle('get-curseforge-instances', handlers.electron.getInstances);
  ipcMain.handle('browse-for-curseforge', handlers.electron.browseForCF);
  ipcMain.handle('valid-curseforge-path', handlers.electron.validCFPath);
};

export default registerIcpHandlers;
