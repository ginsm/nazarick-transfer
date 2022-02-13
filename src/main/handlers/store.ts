import { IpcMainEvent } from 'electron';
import Store from 'electron-store';

const getStoreHandlers = (store: Store) => {
  return {
    get: async (event: IpcMainEvent, key: string) => {
      event.returnValue = store.get(key);
    },

    set: async (_event: IpcMainEvent, key: string, val: any) => {
      store.set(key, val);
    },

    delete: async (_event: IpcMainEvent, key: string) => {
      store.delete(key);
    },
  };
};

export default getStoreHandlers;
