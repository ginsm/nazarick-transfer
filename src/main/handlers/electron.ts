import { IpcMainInvokeEvent, dialog } from 'electron';
import { readdir, pathExists } from 'fs-extra';
import path from 'path';

const getElectronHandlers = () => {
  return {
    browseForCF: async (_event: IpcMainInvokeEvent, oldPath: string) => {
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

    getInstances: async (_event: IpcMainInvokeEvent, cfPath: string) => {
      if (await pathExists(cfPath)) {
        return [await readdir(path.join(cfPath, 'Instances')), ''];
      }
      return [[], 'Please change your CurseForge Directory option, thank you!'];
    },

    validCFPath: async (_event: IpcMainInvokeEvent, cfPath: string) => {
      return pathExists(cfPath);
    },
  };
};

export default getElectronHandlers;
