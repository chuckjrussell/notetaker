import {initializeAuth, getReactNativePersistence} from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from '@firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyDjSutEy99EuxByhspW2Y_46HvdNqKtAjg',
  authDomain: 'notetaker-app-6d452.firebaseapp.com',
  projectId: 'notetaker-app-6d452',
  storageBucket: 'notetaker-app-6d452.appspot.com',
  messagingSenderId: '198400665431',
  appId: '1:198400665431:web:82c04d1fe8f4e9d68c8012',
  measurementId: 'G-MKK06EBR1V',
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
