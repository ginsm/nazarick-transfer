import customToast from 'renderer/utility/customToast';

const welcomeToast = () => {
  customToast({
    title: 'Welcome to Nazarick Transfer!',
    message: (
      <div>
        <p style={{ marginTop: '-0.5em' }}>
          Before you can begin transferring your configurations with ease,
          you&#39;ll need to configure this app -- this won&#39;t take long!
        </p>
        <p style={{ marginTop: '0.5em' }}>
          If you need help with any configuration option, you can click on the
          next to the option.
        </p>
      </div>
    ),
    level: 'info',
    textAligned: 'left',
    buttonText: 'Got it!',
    toastOptions: {
      duration: Infinity,
    },
  });
};

export default welcomeToast;
