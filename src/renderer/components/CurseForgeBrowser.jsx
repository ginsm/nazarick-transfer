import React, { useState } from 'react';
import { MdOutlineScreenSearchDesktop, MdInfoOutline } from 'react-icons/md';
import useStore from 'renderer/store';
import curseForgeDirectoryHelp from 'renderer/toasts/curseForgeDirectoryHelp';

const CurseForgeBrowser = () => {
  const curseForgePath = useStore((state) => state.curseForgePath);
  const setCurseForgePath = useStore((state) => state.setCurseForgePath);
  const setProcessing = useStore((state) => state.setProcessing);
  const [error, setError] = useState('');

  return (
    <div>
      <h2 className="title is-5 flex-align" style={{ margin: '2em 0 0.8em 0' }}>
        CurseForge Directory{' '}
        <MdInfoOutline
          className="config-button"
          style={{ marginLeft: '0.3em', fontSize: '1.1em' }}
          onClick={curseForgeDirectoryHelp}
        />
      </h2>
      <div className="directory-browser">
        <button
          className="directory-browser__button button is-info"
          type="button"
          onClick={async () => {
            const browsing = window.electron.browseForCF(curseForgePath);
            setProcessing('browse', true);
            const [selection, err] = await browsing;
            setProcessing('browse', false);
            if (!err) setCurseForgePath(selection);
            setError(err);
          }}
        >
          <MdOutlineScreenSearchDesktop style={{ marginRight: '0.3em' }} />
          <span>Browse</span>
        </button>
        <div className="directory-browser__output has-text-justified">
          {curseForgePath}
        </div>
      </div>
      <div className="error">{error || null}</div>
    </div>
  );
};

export default CurseForgeBrowser;
