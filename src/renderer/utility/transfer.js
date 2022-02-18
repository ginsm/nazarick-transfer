import error from 'renderer/toasts/generic/error';
import success from 'renderer/toasts/generic/success';
import warning from 'renderer/toasts/generic/warning';
import { sleep } from './helpers';

const { default: useStore } = require('renderer/store');

const transfer = {
  initiateTransfer: async () => {
    const { files, newProfile, oldProfile } = useStore.getState();
    const base = await transfer.getBaseCopyObject();
    const profilesSet = [oldProfile, newProfile].every(Boolean);

    if (!(await window.electron.validCurseForgePath(base.cfPath))) {
      error('You need to select a valid CurseForge location.');
      return false;
    }

    if (!profilesSet) {
      error('You need to select both profiles before proceeding.');
      return false;
    }

    useStore.setState({ transferProcessing: true });

    const chain = await transfer.updateChain(files, 0, base);

    if (chain.success) {
      success('Transfer has successfully finished!');
    } else if (chain.error === 'Abort') {
      warning('Transfer has been aborted.');
    } else {
      error(chain.error);
    }

    transfer.suspendTransfer(chain.success);
    return true;
  },

  updateChain: async (files, index, base) => {
    const { transferProcessing } = useStore.getState();

    if (!transferProcessing) {
      return {
        success: false,
        error: 'Abort',
      };
    }

    if (files.length > index) {
      const file = files[index];

      if (file.transfer) {
        const fileTransfer = await window.electron.copyFile({
          ...base,
          name: file.name,
        });

        if (fileTransfer.length > 0) {
          return {
            success: false,
            error: fileTransfer[0],
          };
        }
      }

      useStore.setState({ progress: (index + 1) / files.length });

      return transfer.updateChain(files, index + 1, base);
    }

    return {
      success: true,
      error: '',
    };
  },

  getBaseCopyObject: async () => {
    const { curseForgePath, oldProfile, newProfile } = useStore.getState();
    return {
      cfPath: curseForgePath,
      profiles: [oldProfile, newProfile],
    };
  },

  suspendTransfer: async (wait = false) => {
    if (wait) await sleep(500);
    useStore.setState({ progress: 0 });
    useStore.setState({ transferProcessing: false });
  },
};

export default transfer;
