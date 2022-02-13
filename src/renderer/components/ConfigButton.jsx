import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';
import { TiCog } from 'react-icons/ti';

const ConfigButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fontSize = '2em';

  return location.pathname === '/config' ? (
    <MdOutlineClose
      style={{ fontSize }}
      className="config-button"
      title="Close Config"
      onClick={() => navigate('/')}
    />
  ) : (
    <TiCog
      style={{ fontSize }}
      className="config-button"
      title="OpenConfig"
      onClick={() => navigate('/config')}
    />
  );
};

export default ConfigButton;
