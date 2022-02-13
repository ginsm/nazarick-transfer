import { IpcMainInvokeEvent, dialog } from 'electron';
import { readdir, pathExists, copy } from 'fs-extra';
import path from 'path';

interface CopyFileObj {
  cfPath: string;
  name: string;
  index: number;
  profiles: string[];
}

const getElectronHandlers = () => {
  const validCFPath = async (cfPath: string) => {
    if (await pathExists(cfPath)) {
      const files = await readdir(cfPath);

      // Ensure that they selected the proper folder
      const expectedContents = [
        'Downloads',
        'Export',
        'Install',
        'Instances',
      ].every((file) => files.includes(file));

      if (expectedContents) return true;
    }
    return false;
  };

  return {
    browseForCF: async (_e: IpcMainInvokeEvent, oldPath: string) => {
      const selection = await dialog.showOpenDialog({
        properties: ['openDirectory'],
      });

      if (!selection.canceled) {
        const directory = selection.filePaths[0];
        const valid = await validCFPath(directory);
        if (valid) return [directory, ''];
        return [oldPath, 'Oops, that seems to be the wrong directory!'];
      }

      return [oldPath, ''];
    },

    getInstances: async (_e: IpcMainInvokeEvent, cfPath: string) => {
      if (await validCFPath(cfPath)) {
        return [await readdir(path.join(cfPath, 'Instances')), ''];
      }
      return [[], 'Please change your CurseForge Directory option, thank you!'];
    },

    validCFPath: async (_e: IpcMainInvokeEvent, cfPath: string) =>
      validCFPath(cfPath),

    /**
     * This method expects that the obj has correct variables 100% of the time.
     * @param _e
     * @param obj
     * @returns
     */
    copyFile: async (_e: IpcMainInvokeEvent, obj: CopyFileObj) => {
      if (!obj.cfPath || !obj.name || obj.profiles.length !== 2) {
        return [
          0,
          'Improper data has been sent to the copyFile function. Stopping transfer.',
        ];
      }

      const [src, dest] = obj.profiles.map((item) =>
        path.join(obj.cfPath, 'Instances', item, obj.name)
      );

      try {
        await copy(src, dest);
        return [obj.index, ''];
      } catch (err) {
        return [obj.index, 'An unexpected error occurred. Stopping transfer.'];
      }
    },
  };
};

export default getElectronHandlers;
