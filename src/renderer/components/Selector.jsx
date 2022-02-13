/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useStore from 'renderer/store';

const Selector = ({ profile, name, instances, setError }) => {
  const setProfile = useStore((state) => state.setProfile);
  const profileValue = useStore((state) => state[`${profile}Profile`]);
  const oppositeValue = useStore(
    (state) => state[`${profile === 'old' ? 'new' : 'old'}Profile`]
  );

  const [oldValue, setOldValue] = useState('');

  return (
    <div>
      <h3 className="title is-6" style={{ margin: '0.5em 0 0.8em 0' }}>
        {name} profile
      </h3>
      <div className="select">
        <select
          onFocus={(event) => setOldValue(event.target.value)}
          onChange={(event) => {
            const { value } = event.target;
            if (value !== 'Select Option...') {
              if (oppositeValue !== value) {
                setProfile(profile, value);
                setError('');
              } else {
                event.target.value = oldValue;
                setError(
                  'You cannot select the same profile for both choices.'
                );
              }
            } else {
              setProfile(profile, '');
              setError('');
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
