import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvSxt6yMMnt7fkO8tOS9GXYZRC42W3ZO0',
  authDomain: 'kingsports-bc92d.firebaseapp.com',
  databaseURL: 'https://kingsports-bc92d.firebaseio.com',
  projectId: 'kingsports-bc92d',
  storageBucket: 'kingsports-bc92d.appspot.com',
  messagingSenderId: '211834759507',
  appId: '1:211834759507:web:4c43e6ee59f82f47bc19a6',
  measurementId: 'G-0D43TRGRVZ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// enable offline support
// firebase
//   .firestore()
//   .enablePersistence()
//   .catch(function (err) {
//     console.log(err);
//     if (err.code === 'failed-precondition') {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code === 'unimplemented') {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   });

const kingsportFirestore = firebase.firestore();
const kingsportStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment;

export { kingsportFirestore, kingsportStorage, firebase, timestamp, increment };
