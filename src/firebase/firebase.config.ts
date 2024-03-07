// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from '@firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDjSutEy99EuxByhspW2Y_46HvdNqKtAjg',
  authDomain: 'notetaker-app-6d452.firebaseapp.com',
  projectId: 'notetaker-app-6d452',
  storageBucket: 'notetaker-app-6d452.appspot.com',
  messagingSenderId: '198400665431',
  appId: '1:198400665431:web:82c04d1fe8f4e9d68c8012',
  measurementId: 'G-MKK06EBR1V',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//export const notesCollection = collection(db, 'notes');
