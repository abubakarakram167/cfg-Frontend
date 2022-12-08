// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyD9b9epiyKQYb2TNxk4NCQrCipPApWReg8",
    authDomain: "jmmb-b8fc1.firebaseapp.com",
    projectId: "jmmb-b8fc1",
    storageBucket: "jmmb-b8fc1.appspot.com",
    messagingSenderId: "1035132883073",
    appId: "1:1035132883073:web:3fd0473c344b5caaa9fd80"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/cfg-logo.png',
    vibrate: [200, 100, 200],
    image: payload.data.image,
    badge: "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', event => {
    console.log(event)
    event.notification.close();
    window.open('http://localhost:3001/', '_blank'); 
    return event;
  });
  