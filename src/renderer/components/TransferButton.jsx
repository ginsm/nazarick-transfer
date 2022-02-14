import React from 'react';
import useStore from 'renderer/store';
import transfer from 'renderer/utility/transfer';

const TransferButton = () => {
  const transferProcessing = useStore((state) => state.transferProcessing);
  const progress = useStore((state) => state.progress);

  return (
    <div>
      <div className="transfer-button__container">
        <button
          className={`button ${
            transferProcessing ? 'is-dark' : 'is-info'
          } transfer-button`}
          type="button"
          onClick={() => {
            if (transferProcessing) {
              transfer.suspendTransfer();
            } else {
              transfer.initiateTransfer();
            }
          }}
        >
          {transferProcessing ? 'Cancel Transfer' : 'Begin Transfer'}
        </button>
      </div>
      <div>
        {transferProcessing && (
          <progress
            className="progress is-link animated progress-bar"
            value={progress * 100}
            max={100}
          />
        )}
      </div>
    </div>
  );
};

export default TransferButton;
