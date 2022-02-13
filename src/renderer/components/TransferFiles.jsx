import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import useStore from 'renderer/store';
import transferFilesHelp from 'renderer/toasts/transferFilesHelp';
import TransferOption from './TransferOption';

const TransferFiles = () => {
  const files = useStore((state) => state.files);
  return (
    <div>
      <h2 className="title is-5 flex-align" style={{ margin: '2em 0 0.8em 0' }}>
        Transfer Files{' '}
        <MdInfoOutline
          className="config-button"
          style={{ marginLeft: '0.3em', fontSize: '1.1em' }}
          onClick={transferFilesHelp}
        />
      </h2>
      <div>
        {files.map((file) => (
          <TransferOption
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
