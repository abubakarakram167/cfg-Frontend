async function subscribeNotification(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker && navigator.serviceWorker
      .register('/firebase-messaging-sw.js', { scope: '/' })
      .then(function (registration) {
        // eslint-disable-next-line no-console
        console.log('[SW]: SCOPE: ', registration.scope);
        return registration.scope;
      })
      .catch(function (err) {
        console.log(err.message);
        return err;
      });
      await navigator.serviceWorker.ready; // Here's the waiting
  }
}

export default subscribeNotification;