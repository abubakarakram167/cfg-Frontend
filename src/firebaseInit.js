// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, TwitterAuthProvider, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9b9epiyKQYb2TNxk4NCQrCipPApWReg8",
  authDomain: "jmmb-b8fc1.firebaseapp.com",
  projectId: "jmmb-b8fc1",
  storageBucket: "jmmb-b8fc1.appspot.com",
  messagingSenderId: "1035132883073",
  appId: "1:1035132883073:web:3fd0473c344b5caaa9fd80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
};

export const getNodeToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 
        'BP3RSXCSEq-WQZ4VBfQmmBKX_f7ZILt0UX-uJQj2SjM9OjZ0-gf4tck-hgzMJl-oyANMtyvgAhfh3hX8tVS29UI'
    }).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        localStorage.setItem('deviceSubscriptionToken', JSON.stringify(currentToken))
        setTokenFound(currentToken);
        return currentToken;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

