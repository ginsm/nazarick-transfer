import React, { useEffect, useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import useStore from 'renderer/store';
import selectProfileToast from 'renderer/toasts/selectProfileToast';
import SelectProfilesSelector from './SelectProfilesSelector';

const ProfileSelector = () => {
  const curseForgePath = useStore((state) => state.curseForgePath);
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    let isMounted = true;

    window.electron
      .getInstances(curseForgePath)
      .then(([arr, err]) => {
        if (isMounted) {
          if (!err) setInstances(arr);
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
          onClick={selectProfileToast}
        />
      </h2>
      <div className="level" style={{ maxWidth: '22.5em' }}>
        <div className="level-left">
          <SelectProfilesSelector
            profile="old"
            name="Old"
            instances={instances}
          />
        </div>
        <div className="level-right">
          <SelectProfilesSelector
            profile="new"
            name="New"
            instances={instances}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;