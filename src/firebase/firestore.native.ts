import firestore from '@react-native-firebase/firestore';
import {IFirestore} from './firestoreTypes';

class FirestoreDB implements IFirestore {
  getUsers() {
    return new Promise<any[]>((resolve, reject) => {
      firestore()
        .collection('Users')
        .get()
        .then(data => {
          console.log('Successfully got data');
          resolve(data.docs.map(doc => ({...doc.data()})));
        })
        .catch(err => {
          console.error('Error getting data ' + err);
          reject(err);
        });
    });
  }
}

export default new FirestoreDB();

// firestore()
//   .collection('Users')
//   .get()
//   .then(data => {
//     console.log(JSON.stringify(data));
//   });
