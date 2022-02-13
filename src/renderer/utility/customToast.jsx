import toast from 'react-hot-toast';

const customToast = ({
  title,
  message,
  level = '',
  light = false,
  deleteButton = false,
  buttonText = '',
  buttonCallback,
  textAligned = 'center',
  toastOptions = {},
  icon = '',
}) => {
  toast.custom(
    (t) => (
      <div
        className={`toast-${
          t.visible ? 'animate-enter' : 'animate-leave'
        } notification ${level ? `is-${level}` : ''} ${
          light && 'is-light'
        } has-text-${textAligned}`}
        style={{
          maxWidth: '550px',
        }}
      >
        {deleteButton && (
          <button
            className="delete"
            type="button"
            onClick={() => toast.dismiss(t.id)}
          >
            Close Toast
          </button>
        )}
        {title && (
          <>
            <h3 className="title is-5 flex-align">
              <span
                className="flex-align"
                style={{ marginRight: '0.4em', fontSize: '1em' }}
              >
                {icon}
              </span>{' '}
              {title}
            </h3>
          </>
        )}
        {message}
        {buttonText && (
          <div className="level">
            <div className="level-left" />
            <div className="level-right">
              <div className="level-item">
                <button
                  className="button"
                  type="button"
                  onClick={buttonCallback || (() => toast.dismiss(t.id))}
                  style={{ marginTop: '0.3em' }}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    { ...toastOptions }
  );
};

export default customToast;
