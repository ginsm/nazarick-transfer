import customToast from 'renderer/utility/customToast';
import { MdInfoOutline } from 'react-icons/md';

const selectProfileToast = () => {
  customToast({
    message: (
      <div>
        <p>The profile choices have been swapped!</p>
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

export default selectProfileToast;
