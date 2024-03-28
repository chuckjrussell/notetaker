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
  orderBy,
  limit,
  connectFirestoreEmulator,
  serverTimestamp,
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
  SessionModel,
  SessionContentsModel,
} from './firestoreTypes';

// Initialize Firebase
const db = getFirestore(app);

if (process.env.NODE_ENV === 'DEV') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

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

  getCampaignsSubscription(
    userId: string,
    callback: SubscriptionCallback<CampaignModel[]>,
  ): Unsubscribe {
    const unsub = onSnapshot(
      query(
        collection(db, 'Campaigns'),
        where('createdBy.userId', '==', userId),
      ),
      querySnapshot => {
        const campaigns: CampaignModel[] = [];
        querySnapshot.forEach(doc => {
          campaigns.push({id: doc.id, ...doc.data()});
        });
        callback(campaigns);
      },
    );
    return unsub;
  }

  createCampaign(campaign: Omit<CampaignModel, 'id'>) {
    return new Promise<NoteContentsModel>(async resolve => {
      const campaignCollection = collection(db, Schema.campaign);
      const retVal = await addDoc(campaignCollection, campaign);
      resolve({...campaign, id: retVal.id});
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

  /*************************************************
   * Session
   **************************************************/
  createSession(campaignId: string, session: Omit<SessionModel, 'id'>) {
    return new Promise<SessionModel>(async resolve => {
      const sessionsCollection = collection(
        db,
        Schema.campaign,
        campaignId,
        Schema.sessions,
      );
      const retVal = await addDoc(sessionsCollection, {
        ...session,
      });
      setDoc(doc(db, Schema.campaign, campaignId, Schema.sessions, retVal.id), {
        ...session,
        id: retVal.id,
        dateCreated: serverTimestamp(),
      });
      resolve({
        ...session,
        id: retVal.id,
      });
    });
  }

  getLatestSessionSubscription(
    campaignId: string,
    callback: SubscriptionCallback<SessionModel | undefined>,
  ): Unsubscribe {
    const unsub = onSnapshot(
      query(
        collection(db, Schema.campaign, campaignId, Schema.sessions),
        orderBy('dateCreated'),
        limit(1),
      ),
      querySnapshot => {
        if (querySnapshot.empty) {
          callback(undefined);
        } else {
          callback({
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          });
        }
      },
    );
    return unsub;
  }

  getSessionsSubscription(
    campaignId: string,
    callback: SubscriptionCallback<SessionModel[]>,
  ): Unsubscribe {
    const unsub = onSnapshot(
      collection(db, Schema.campaign, campaignId, Schema.sessions),
      querySnapshot => {
        const sessions: SessionModel[] = [];
        querySnapshot.forEach(doc => {
          sessions.push({id: doc.id, ...doc.data()});
        });
        callback(sessions);
      },
    );
    return unsub;
  }

  createSessionContent(
    campaignId: string,
    sessionId: string,
    sessionContents: Omit<NoteContentsModel, 'id'>,
  ) {
    return new Promise<NoteContentsModel>(async resolve => {
      const noteContentsCollection = collection(
        db,
        Schema.campaign,
        campaignId,
        Schema.sessions,
        sessionId,
        Schema.sessionContents,
      );
      const retVal = await addDoc(noteContentsCollection, sessionContents);
      resolve({...sessionContents, id: retVal.id});
    });
  }

  updateSessionContent(
    campaignId: string,
    sessionId: string,
    sessionContents: SessionContentsModel,
  ) {
    return setDoc(
      doc(
        db,
        Schema.campaign,
        campaignId,
        Schema.sessions,
        sessionId,
        Schema.sessionContents,
        sessionContents.id,
      ),
      sessionContents,
    );
  }

  getSessionContentSubscription(
    campaignId: string,
    sessionId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ): Unsubscribe {
    const unsub = onSnapshot(
      collection(
        db,
        Schema.campaign,
        campaignId,
        Schema.sessions,
        sessionId,
        Schema.sessionContents,
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
