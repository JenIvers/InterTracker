export const register = (onUpdate: (registration: ServiceWorkerRegistration) => void) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available; please refresh.
                  onUpdate(registration);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('SW registration failed: ', error);
        });
    });
  }
};
