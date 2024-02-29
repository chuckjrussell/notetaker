import firestore from '@react-native-firebase/firestore';
import {
  UserModel,
  IFirestore,
  CampaignModel,
  NoteModel,
} from './firestoreTypes';

class FirestoreDB implements IFirestore {
  getUser(userId: string) {
    return new Promise<UserModel>((resolve, reject) => {
      firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then(data => {
          resolve({id: data.id, ...data.data()});
        })
        .catch(err => {
          console.error('Error getting data ' + err);
          reject(err);
        });
    });
  }

  getUsers() {
    return new Promise<UserModel[]>((resolve, reject) => {
      firestore()
        .collection('Users')
        .get()
        .then(data => {
          resolve(data.docs.map(doc => ({id: doc.id, ...doc.data()})));
        })
        .catch(err => {
          console.error('Error getting data ' + err);
          reject(err);
        });
    });
  }
  getCampaigns(userId: string) {
    return new Promise<CampaignModel[]>((resolve, reject) => {
      firestore()
        .collection('Campaigns')
        .where('createdBy.userId', '==', userId)
        .get()
        .then(data => {
          resolve(data.docs.map(doc => ({id: doc.id, ...doc.data()})));
        })
        .catch(err => {
          console.error('Error getting data ' + err);
          reject(err);
        });
    });
  }
  getNotesSubscription(
    campaignId: string,
    callback: (notes: NoteModel[]) => void,
  ) {
    const unsub = firestore()
      .collection(`Campaigns/${campaignId}/notes`)
      .onSnapshot(querySnapshot => {
        const notes: NoteModel[] = [];
        querySnapshot.forEach(doc => {
          notes.push({id: doc.id, ...doc.data()});
        });
        callback(notes);
      });
    return unsub;
  }

  createNote(campaignId: string, note: NoteModel) {
    return new Promise<NoteModel>(resolve => {
      firestore()
        .collection(`Campaign/${campaignId}/notes`)
        .add(note)
        .then(data => resolve({...note, id: data.id}));
    });
  }

  updateNote(campaignId: string, note: NoteModel) {
    return firestore()
      .collection(`Campaign/${campaignId}/notes`)
      .doc(note.id)
      .update(note);
  }
}

export default new FirestoreDB();
