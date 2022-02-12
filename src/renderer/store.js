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
    files: [
      {
        name: 'options.txt',
        transfer: true,
        transferred: false,
      },
      {
        name: 'servers.dat',
        transfer: true,
        transferred: false,
      },
      {
        name: 'config',
        transfer: true,
        transferred: false,
      },
      {
        name: 'resourcepacks',
        transfer: true,
        transferred: false,
      },
      {
        name: 'saves',
        transfer: true,
        transferred: false,
      },
      {
        name: 'schematics',
        transfer: true,
        transferred: false,
      },
      {
        name: 'screenshots',
        transfer: true,
        transferred: false,
      },
      {
        name: 'shaderpacks',
        transfer: true,
        transferred: false,
      },
      {
        name: 'XaeroWaypoints',
        transfer: true,
        transferred: false,
      },
      {
        name: 'XaeroWorldMap',
        transfer: true,
        transferred: false,
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
