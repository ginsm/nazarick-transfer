import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfigButton from 'renderer/components/ConfigButton';
import ProfileSelector from 'renderer/components/ProfileSelector';
import TransferButton from 'renderer/components/TransferButton';
import useStore from 'renderer/store';
import welcomeToast from 'renderer/toasts/welcomeToast';

const HomeRoute = () => {
  const navigate = useNavigate();
  const firstLaunch = useStore((state) => state.firstLaunch);
  const setFirstLaunch = useStore((state) => state.setFirstLaunch);

  useEffect(() => {
    // setFirstLaunch(true);
    if (firstLaunch) {
      navigate('/config');
      welcomeToast();
    }
  }, [firstLaunch, navigate, setFirstLaunch]);

  return (
    <div className="route">
      <Toaster />
      <div className="level is-flex">
        <div className="level-left">
          <h1 className="title is-3">Nazarick Transfer</h1>
        </div>
        <div className="level-right">
          <ConfigButton />
        </div>
      </div>
      <ProfileSelector />
      <TransferButton />
    </div>
  );
};

export default HomeRoute;
