import create from 'zustand';
import { devtools } from 'zustand/middleware';

const hasProperty = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

const setter = (set, key, value) => {
  return set((state) => {
    if (!hasProperty(state, key)) return state;
    return { [key]: value };
  });
};

const useStore = create(
  devtools((set) => ({
    // Variable defaults
    curseForgePath: '',
    oldProfile: '',
    newProfile: '',
    browseProcessing: false,
    transferProcessing: false,
    firstLaunch: true,
    progress: 0,
    files: [
      {
        name: 'options.txt',
        transfer: true,
      },
      {
        name: 'servers.dat',
        transfer: true,
      },
      {
        name: 'config',
        transfer: true,
      },
      {
        name: 'resourcepacks',
        transfer: true,
      },
      {
        name: 'saves',
        transfer: true,
      },
      {
        name: 'schematics',
        transfer: true,
      },
      {
        name: 'screenshots',
        transfer: true,
      },
      {
        name: 'shaderpacks',
        transfer: true,
      },
      {
        name: 'XaeroWaypoints',
        transfer: true,
      },
      {
        name: 'XaeroWorldMap',
        transfer: true,
      },
    ],

    // Overwrite with electron state
    ...(window.store.get('state') || {}),

    // Setters
    setFile: (name, obj) =>
      set((state) => {
        const files = state.files.map((file) => {
          if (file.name === name)
            return {
              ...file,
              ...obj,
            };
          return file;
        });

        return { files };
      }),

    setFilesTransfer: (bool) =>
      set((state) => {
        const files = state.files.map((file) => ({
          ...file,
          transfer: bool,
        }));

        return { files };
      }),

    setProgress: (value) => setter(set, 'progress', value),
    setProfile: (key, value) => setter(set, `${key}Profile`, value),
    setProcessing: (key, value) => setter(set, `${key}Processing`, value),
    setCurseForgePath: (value) => setter(set, 'curseForgePath', value),
    setFirstLaunch: (value) => setter(set, 'firstLaunch', value),
  }))
);

// Set electron-store upon state changes
useStore.subscribe(async (state) => {
  window.store.set(
    'state',
    Object.fromEntries(
      Object.entries(state).filter(
        ([_key, value]) => typeof value !== 'function'
      )
    )
  );
});

export default useStore;
