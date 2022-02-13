import { ipcMain, dialog, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import Store from 'electron-store';

const registerIcpHandlers = () => {
  const store = new Store();

  const handlers = {
    // Exposed as 'window.store'
    store: {
      get: async (event: IpcMainEvent, key: string) => {
        event.returnValue = store.get(key);
      },
      set: async (_event: IpcMainEvent, key: string, val: any) => {
        store.set(key, val);
      },
      delete: async (_event: IpcMainEvent, key: string) => {
        store.delete(key);
      },
    },

    // Exposed as 'window.electron'
    electron: {
      browseForCurseForge: async (
        _event: IpcMainInvokeEvent,
        oldPath: string
      ) => {
        const selection = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });

        if (!selection.canceled) {
          const directory = selection.filePaths[0];
          const files = await readdir(directory);

          // Ensure that they selected the proper folder
          const expectedContents = [
            'Downloads',
            'Export',
            'Install',
            'Instances',
          ].every((file) => files.includes(file));

          if (expectedContents) return [directory, ''];
          return [oldPath, 'Oops, that seems to be the wrong directory!'];
        }

        return [oldPath, ''];
      },
      getInstances: async (
        _event: IpcMainInvokeEvent,
        curseForgePath: string
      ) => {
        try {
          // This will error out if the path does not exist
          await stat(curseForgePath);
          // Otherwise, return the Instances directory contents
          return [await readdir(path.join(curseForgePath, 'Instances')), ''];
        } catch (err) {
          return [
            [],
            'Please change your CurseForge Directory option, thank you!',
          ];
        }
      },
    },

    // Exposed as 'window.path'
    path: {
      join: (event: IpcMainEvent, paths: string[]) => {
        event.returnValue = path.join(...paths);
      },
    },
  };

  // Exposed as 'window.store'
  ipcMain.on('electron-store-get', handlers.store.get);
  ipcMain.on('electron-store-set', handlers.store.set);
  ipcMain.on('electron-store-delete', handlers.store.delete);

  // Exposed as 'window.electron'
  ipcMain.handle(
    'browse-for-curseforge',
    handlers.electron.browseForCurseForge
  );

  ipcMain.handle('get-curseforge-instances', handlers.electron.getInstances);

  // Exposed as 'window.path'
  ipcMain.on('path-join', handlers.path.join);
};

export default registerIcpHandlers;
