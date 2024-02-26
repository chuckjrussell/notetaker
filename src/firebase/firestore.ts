import {db} from './firebase.config.ts';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {IFirestore} from './firestoreTypes';

class FirestoreDB implements IFirestore {
  getUsers() {
    return new Promise<any[]>(async (resolve, reject) => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      console.log(JSON.stringify(querySnapshot));
      //   querySnapshot.forEach(doc => console.log(doc.data()));
      resolve(querySnapshot.docs.map(doc => ({...doc.data()})));
    });
  }
}

export default new FirestoreDB();
