import customToast from 'renderer/utility/customToast';
import { MdInfoOutline } from 'react-icons/md';

const curseForgeDirectoryHelp = () => {
  customToast({
    title: 'CurseForge Directory Help',
    message: (
      <div className="curseforge-directory__help">
        <div style={{ marginTop: '-0.5em' }}>
          This options expects you to select the CurseForge folder location. It
          should have four folders inside of it:
          <pre>Downloads, Export, Install, and Instances</pre>
        </div>
        <div style={{ marginTop: '1em' }}>
          For example, here&#39;s the default location on Windows:{' '}
          <pre>C:\Users\[user]\curseforge\</pre>
        </div>
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

export default curseForgeDirectoryHelp;
