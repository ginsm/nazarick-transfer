import customToast from 'renderer/utility/customToast';

const error = (message) => {
  customToast({
    message: (
      <div>
        <p>{message}</p>
      </div>
    ),
    level: 'danger',
    textAligned: 'left',
    deleteButton: true,
    toastOptions: {
      duration: 3000,
      position: 'bottom-right',
    },
  });
};

export default error;
