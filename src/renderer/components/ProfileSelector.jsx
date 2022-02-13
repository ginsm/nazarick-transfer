import React, { useEffect, useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import useStore from 'renderer/store';
import Selector from './Selector';

const ProfileSelector = () => {
  const curseForgePath = useStore((state) => state.curseForgePath);
  const [instances, setInstances] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const getInstances = async () => {
      return window.electron.getInstances(curseForgePath);
    };

    getInstances()
      .then(([arr, err]) => {
        if (isMounted) {
          if (!err) setInstances(arr);
          setError(err);
        }
        return [arr, err];
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [curseForgePath]);

  return (
    <div>
      <h2 className="title is-5 flex-align" style={{ margin: '2em 0 0.8em 0' }}>
        Select Profiles{' '}
        <MdInfoOutline
          className="config-button"
          style={{ marginLeft: '0.3em', fontSize: '1.1em' }}
          onClick={console.log}
        />
      </h2>
      <div className="level" style={{ maxWidth: '26.5em' }}>
        <div className="level-left">
          <Selector
            profile="old"
            name="Old"
            instances={instances}
            setError={setError}
          />
        </div>
        <div className="level-right">
          <Selector
            profile="new"
            name="New"
            instances={instances}
            setError={setError}
          />
        </div>
      </div>
      <div className="error">{error || null}</div>
    </div>
  );
};

export default ProfileSelector;
