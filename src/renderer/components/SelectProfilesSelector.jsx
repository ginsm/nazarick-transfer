/* eslint-disable react/prop-types */
import React from 'react';
import useStore from 'renderer/store';
import success from 'renderer/toasts/generic/success';

const Selector = ({ profile, name, instances, setRefreshInstances }) => {
  const oppositeProfile = profile === 'old' ? 'new' : 'old';
  const setProfile = useStore((state) => state.setProfile);
  const profileValue = useStore((state) => state[`${profile}Profile`]);
  const oppositeValue = useStore((state) => state[`${oppositeProfile}Profile`]);
  const transferProcessing = useStore((state) => state.transferProcessing);

  return (
    <div>
      <h3 className="title is-6" style={{ margin: '0.5em 0 0.8em 0' }}>
        {name} profile
      </h3>
      <div className="select">
        <select
          style={{ maxWidth: '10.0625em' }}
          onFocus={() => setRefreshInstances(true)}
          onChange={(event) => {
            const { value } = event.target;
            if (value !== 'Select Option...') {
              if (oppositeValue === value) {
                setProfile(oppositeProfile, profileValue);
                success('The profile choices have been swapped!');
              }
              setProfile(profile, value);
            } else {
              setProfile(profile, '');
            }
          }}
          value={profileValue}
          title={profileValue}
          disabled={transferProcessing}
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
