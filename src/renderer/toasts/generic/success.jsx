import customToast from 'renderer/utility/customToast';

const success = (message) => {
  customToast({
    message: (
      <div>
        <p>{message}</p>
      </div>
    ),
    level: 'success',
    textAligned: 'left',
    deleteButton: true,
    toastOptions: {
      duration: 3000,
      position: 'bottom-right',
    },
  });
};

export default success;
