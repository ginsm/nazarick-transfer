import customToast from 'renderer/utility/customToast';
import { MdInfoOutline } from 'react-icons/md';

const transferFilesHelp = () => {
  customToast({
    title: 'Transfer Files Help',
    message: (
      <div className="curseforge-directory__help">
        <p style={{ marginTop: '-0.5em' }}>
          This options expects you to select which files should be transferred
          during the transfer. Any unchecked files will be skipped.
        </p>
      </div>
    ),
    level: 'info',
    textAligned: 'left',
    buttonText: 'Got it!',
    toastOptions: {
      duration: Infinity,
    },
    icon: <MdInfoOutline />,
  });
};

export default transferFilesHelp;
