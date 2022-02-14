import customToast from 'renderer/utility/customToast';

const warning = (message) => {
  customToast({
    message: (
      <div>
        <p>{message}</p>
      </div>
    ),
    level: 'warning',
    textAligned: 'left',
    deleteButton: true,
    toastOptions: {
      duration: 3000,
      position: 'bottom-right',
    },
  });
};

export default warning;
