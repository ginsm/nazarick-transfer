import React from 'react';
import { Toaster } from 'react-hot-toast';
import ConfigButton from 'renderer/components/ConfigButton';
import CurseForgeBrowser from 'renderer/components/CurseForgeBrowser';
import TransferOptions from 'renderer/components/TransferOptions';

const ConfigRoute = () => {
  return (
    <div className="route">
      <Toaster />
      <div className="level">
        <div className="level-left">
          <h1 className="title is-3">Configuration</h1>
        </div>
        <div className="level-right is-flex is-align-content-center">
          <ConfigButton />
        </div>
      </div>
      <CurseForgeBrowser />
      <TransferOptions />
    </div>
  );
};

export default ConfigRoute;
