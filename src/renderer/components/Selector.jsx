/* eslint-disable react/prop-types */
import React from 'react';
import useStore from 'renderer/store';
import swappedProfilesToast from 'renderer/toasts/swappedProfilesToast';

const Selector = ({ profile, name, instances }) => {
  const oppositeProfile = profile === 'old' ? 'new' : 'old';
  const setProfile = useStore((state) => state.setProfile);
  const profileValue = useStore((state) => state[`${profile}Profile`]);
  const oppositeValue = useStore((state) => state[`${oppositeProfile}Profile`]);

  return (
    <div>
      <h3 className="title is-6" style={{ margin: '0.5em 0 0.8em 0' }}>
        {name} profile
      </h3>
      <div className="select">
        <select
          onChange={(event) => {
            const { value } = event.target;
            if (value !== 'Select Option...') {
              if (oppositeValue === value) {
                setProfile(oppositeProfile, profileValue);
                swappedProfilesToast();
              }
              setProfile(profile, value);
            } else {
              setProfile(profile, '');
            }
          }}
          value={profileValue}
        >
          <option>Select Option...</option>
          {instances.map((instance) => (
            <option key={instance}>{instance}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selector;
