import customToast from 'renderer/utility/customToast';
import { MdInfoOutline } from 'react-icons/md';

const selectProfileToast = () => {
  customToast({
    title: 'Select Profiles Help',
    message: (
      <div className="curseforge-directory__help">
        <p style={{ marginTop: '-0.5em' }}>
          This options expects you to select your old and new profile. These are
          the two profiles that will be used during the transfer (old -&gt;
          new).
        </p>
        <h3 className="title is-6" style={{ margin: 0, marginTop: '1.2em' }}>
          Hint
        </h3>
        <p style={{ marginTop: '0.3em' }}>
          If you would like to change which files should be transferred you can
          do so in the config menu. To get there, click the gear in the top
          right.
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
