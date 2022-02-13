import React from 'react';
import { MdOutlineScreenSearchDesktop, MdInfoOutline } from 'react-icons/md';
import useStore from 'renderer/store';

const CurseForgeBrowser = () => {
  const curseForgePath = useStore((state) => state.curseForgePath);
  const setCurseForgePath = useStore((state) => state.setCurseForgePath);

  return (
    <div>
      <h2 className="title is-5 flex-align" style={{ margin: '2em 0 0.8em 0' }}>
        CurseForge Directory{' '}
        <MdInfoOutline style={{ marginLeft: '0.5em', fontSize: '1.1em' }} />
      </h2>
      <div className="directory-browser">
        <button
          className="directory-browser__button button is-info"
          type="button"
          onClick={async () => {
            const selectedPath = await window.electron.browseForCurseForge(
              curseForgePath
            );
            setCurseForgePath(selectedPath);
          }}
        >
          <MdOutlineScreenSearchDesktop style={{ marginRight: '0.3em' }} />
          <span>Browse</span>
        </button>
        <div className="directory-browser__output has-text-justified">
          {curseForgePath}
        </div>
      </div>
    </div>
  );
};

export default CurseForgeBrowser;
