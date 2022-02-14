/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpcMainInvokeEvent, dialog } from 'electron';
import { readdir, pathExists, copy } from 'fs-extra';
import path from 'path';

interface CopyFileObj {
  cfPath: string;
  name: string;
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

    copyFile: async (_e: IpcMainInvokeEvent, obj: CopyFileObj) => {
      const issues = [
        !obj.name,
        !(await validCFPath(obj.cfPath)),
        obj.profiles.length !== 2,
      ];

      if (issues.some(Boolean))
        return ['Improper data has been sent. Stopping transfer.'];

      const [src, dest] = obj.profiles.map((item) =>
        path.join(obj.cfPath, 'Instances', item, obj.name)
      );

      try {
        await copy(src, dest);
        return [];
      } catch (err: any) {
        if (err.code === 'ENOENT') return [];
        return ['An unexpected error occurred. Stopping transfer.'];
      }
    },
  };
};

export default getElectronHandlers;
