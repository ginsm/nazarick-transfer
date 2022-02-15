import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';
import { TiCog } from 'react-icons/ti';
import useStore from 'renderer/store';

const ConfigButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fontSize = '2em';
  const transferProcessing = useStore((state) => state.transferProcessing);

  return location.pathname === '/config' ? (
    <MdOutlineClose
      style={{ fontSize }}
      className="config-button"
      title="Close Config"
      onClick={() => !transferProcessing && navigate('/')}
    />
  ) : (
    <TiCog
      style={{ fontSize }}
      className="config-button"
      title="Open Config"
      onClick={() => !transferProcessing && navigate('/config')}
    />
  );
};

export default ConfigButton;
