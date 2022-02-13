import customToast from 'renderer/utility/customToast';
import { MdInfoOutline } from 'react-icons/md';

const selectProfileToast = () => {
  customToast({
    title: 'Select Profiles Help',
    message: (
      <div className="curseforge-directory__help">
        <p style={{ marginTop: '-0.5em' }}>
          This options expects you to select your old and new profile. It will
          move the enabled files from the old profile to the new one.
        </p>
        <p style={{ marginTop: '1em' }}>
          You can change which files should be transferred in the config menu.
          To get there, simply click the gear in the top right.
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

export default selectProfileToast;
