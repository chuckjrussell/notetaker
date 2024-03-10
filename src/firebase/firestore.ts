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
  NoteContentsModel,
  SubscriptionCallback,
  Schema,
} from './firestoreTypes';

// Initialize Firebase
const db = getFirestore(app);

class FirestoreDB implements IFirestore {
  getUser(userId: string): Promise<UserModel> {
    return new Promise<UserModel>(async resolve => {
      const q = doc(db, Schema.users, userId);
      const querySnapshot = await getDoc(q);
      resolve({
        id: querySnapshot.id,
        ...querySnapshot.data(),
      });
    });
  }

  getUsers() {
    return new Promise<UserModel[]>(async (resolve, reject) => {
      const querySnapshot = await getDocs(collection(db, Schema.users));
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
    callback: SubscriptionCallback<NoteModel[]>,
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

  getNoteSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteModel | undefined>,
  ): Unsubscribe {
    const unsub = onSnapshot(
      doc(db, 'Campaigns', campaignId, 'notes', noteId),
      querySnapshot => {
        callback({id: querySnapshot.id, ...querySnapshot.data()});
      },
    );
    return unsub;
  }

  /**********************************
   * NOTE CONTENTS
   **********************************/
  createNoteContent(
    campaignId: string,
    noteId: string,
    noteContents: Omit<NoteContentsModel, 'id'>,
  ) {
    return new Promise<NoteContentsModel>(async resolve => {
      const noteContentsCollection = collection(
        db,
        Schema.campaign,
        campaignId,
        Schema.notes,
        noteId,
        Schema.noteContents,
      );
      const retVal = await addDoc(noteContentsCollection, noteContents);
      resolve({...noteContents, id: retVal.id});
    });
  }

  updateNoteContent(
    campaignId: string,
    noteId: string,
    noteContents: NoteContentsModel,
  ) {
    return setDoc(
      doc(
        db,
        Schema.campaign,
        campaignId,
        Schema.notes,
        noteId,
        Schema.noteContents,
        noteContents.id,
      ),
      noteContents,
    );
  }

  getNoteContentSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ) {
    const unsub = onSnapshot(
      collection(
        db,
        Schema.campaign,
        campaignId,
        Schema.notes,
        noteId,
        Schema.noteContents,
      ),
      querySnapshot => {
        if (!querySnapshot.empty) {
          const noteDoc = querySnapshot.docs[0];
          callback({id: noteDoc.id, ...noteDoc.data()});
        } else {
          callback(undefined);
        }
      },
    );
    return unsub;
  }
}

export default new FirestoreDB();
