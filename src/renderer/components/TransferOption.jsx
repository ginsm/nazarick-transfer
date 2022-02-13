/* eslint-disable react/prop-types */
import React from 'react';
import useStore from 'renderer/store';

const TransferOption = (props) => {
  const { name, transfer } = props;
  const setFile = useStore((state) => state.setFile);
  return (
    <div className="checkbox">
      <label className="flex-align" htmlFor={name}>
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={transfer}
          onChange={(event) => {
            setFile(event.target.name, {
              transfer: event.target.checked,
            });
          }}
        />{' '}
        {name}
      </label>
    </div>
  );
};

export default TransferOption;
