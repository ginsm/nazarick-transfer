import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import useStore from 'renderer/store';
import transferFilesHelp from 'renderer/toasts/transferFilesHelp';
import TransferFilesOption from './TransferFilesOption';

const TransferFiles = () => {
  const files = useStore((state) => state.files);
  const setFilesTransfer = useStore((state) => state.setFilesTransfer);

  return (
    <div>
      <h2 className="title is-5 flex-align" style={{ margin: '2em 0 0.8em 0' }}>
        Transfer Options{' '}
        <MdInfoOutline
          className="config-button"
          style={{ marginLeft: '0.3em', fontSize: '1.1em' }}
          onClick={transferFilesHelp}
        />
      </h2>
      <div className="buttons are-small buttons__remove-margin">
        <button
          className="button"
          type="button"
          onClick={() => setFilesTransfer(true)}
        >
          All
        </button>
        <button
          className="button"
          type="button"
          onClick={() => setFilesTransfer(false)}
        >
          None
        </button>
      </div>
      <div>
        {files.map((file) => (
          <TransferFilesOption
            name={file.name}
            transfer={file.transfer}
            key={file.name}
          />
        ))}
      </div>
    </div>
  );
};

export default TransferFiles;
