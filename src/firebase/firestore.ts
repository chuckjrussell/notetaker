import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  where,
  query,
  onSnapshot,
  Unsubscribe,
  getFirestore,
} from '@firebase/firestore';
import {app} from './firebase.config.ts';
import {
  UserModel,
  IFirestore,
  CampaignModel,
  NoteModel,
} from './firestoreTypes';

// Initialize Firebase
const db = getFirestore(app);

class FirestoreDB implements IFirestore {
  getUser(userId: string): Promise<UserModel> {
    return new Promise<UserModel>(async resolve => {
      const q = doc(db, 'Users', userId);
      const querySnapshot = await getDoc(q);
      resolve({
        id: querySnapshot.id,
        ...querySnapshot.data(),
      });
    });
  }

  getUsers() {
    return new Promise<UserModel[]>(async (resolve, reject) => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      resolve(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }

  getCampaigns(userId: string): Promise<CampaignModel[]> {
    return new Promise<CampaignModel[]>(async resolve => {
      const q = query(
        collection(db, 'Campaigns'),
        where('createdBy.userId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      resolve(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }

  getNotesSubscription(
    campaignId: string,
    callback: (notes: NoteModel[]) => void,
  ): Unsubscribe {
    const unsub = onSnapshot(
      collection(db, 'Campaigns', campaignId, 'notes'),
      querySnapshot => {
        const notes: NoteModel[] = [];
        querySnapshot.forEach(doc => {
          notes.push({id: doc.id, ...doc.data()});
        });
        callback(notes);
      },
    );
    return unsub;
  }

  createNote(campaignId: string, note: Omit<NoteModel, 'id'>) {
    return new Promise<NoteModel>(async resolve => {
      const notesCollection = collection(db, 'Campaigns', campaignId, 'notes');
      const retVal = await addDoc(notesCollection, note);
      resolve({...note, id: retVal.id});
    });
  }

  updateNote(campaignId: string, note: NoteModel) {
    return setDoc(doc(db, 'Campaigns', campaignId, 'notes', note.id), note);
  }
}

export default new FirestoreDB();
