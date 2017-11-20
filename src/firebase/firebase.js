import * as firebase from 'firebase';

const prodConfig = {
  apiKey: 'AIzaSyBqGNzKlC88TuT281WcWPYFWmz8Ib8UQ4s',
  authDomain: 'road-beyond-react-app.firebaseapp.com',
  databaseURL: 'https://road-beyond-react-app.firebaseio.com',
  projectId: 'road-beyond-react-app',
  storageBucket: 'road-beyond-react-app.appspot.com',
  messagingSenderId: '779454115476'
};

const devConfig = {
  apiKey: 'AIzaSyBqGNzKlC88TuT281WcWPYFWmz8Ib8UQ4s',
  authDomain: 'road-beyond-react-app.firebaseapp.com',
  databaseURL: 'https://road-beyond-react-app.firebaseio.com',
  projectId: 'road-beyond-react-app',
  storageBucket: 'road-beyond-react-app.appspot.com',
  messagingSenderId: '779454115476'
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
