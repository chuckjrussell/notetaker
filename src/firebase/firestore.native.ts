import firestore from '@react-native-firebase/firestore';
import {
  UserModel,
  IFirestore,
  CampaignModel,
  NoteModel,
  SubscriptionCallback,
  Schema,
  NoteContentsModel,
  SessionContentsModel,
  SessionModel,
} from './firestoreTypes';

class FirestoreDB implements IFirestore {
  getUser(userId: string) {
    return new Promise<UserModel>((resolve, reject) => {
      firestore()
        .collection(Schema.users)
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

  getCampaignsSubscription(
    userId: string,
    callback: SubscriptionCallback<CampaignModel[]>,
  ) {
    const unsub = firestore()
      .collection('Campaigns')
      .where('createdBy.userId', '==', userId)
      .onSnapshot(querySnapshot => {
        const campaigns: CampaignModel[] = [];
        querySnapshot.forEach(doc => {
          campaigns.push({id: doc.id, ...doc.data()});
        });
        callback(campaigns);
      });
    return unsub;
  }

  createCampaign(campaign: Omit<CampaignModel, 'id'>) {
    return new Promise<CampaignModel>(resolve => {
      firestore()
        .collection(`${Schema.campaign}`)
        .add(campaign)
        .then(data => resolve({...campaign, id: data.id}));
    });
  }
  getNotesSubscription(
    campaignId: string,
    callback: SubscriptionCallback<NoteModel[]>,
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
        .collection(`${Schema.campaign}/${campaignId}/${Schema.notes}`)
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

  /**********************************
   * NOTE CONTENTS
   **********************************/
  createNoteContent(
    campaignId: string,
    noteId: string,
    noteContents: Omit<NoteContentsModel, 'id'>,
  ) {
    return new Promise<NoteContentsModel>(resolve => {
      firestore()
        .collection(
          `${Schema.campaign}/${campaignId}/${Schema.notes}/${noteId}`,
        )
        .add(noteContents)
        .then(data => resolve({...noteContents, id: data.id}));
    });
  }

  updateNoteContent(
    campaignId: string,
    noteId: string,
    noteContents: NoteContentsModel,
  ) {
    return firestore()
      .collection(`${Schema.campaign}/${campaignId}/${Schema.notes}/${noteId}`)
      .doc(noteContents.id)
      .update(noteContents);
  }

  /**
   * WARNING THIS MAY BE WRONG, CHECK NATIVE NOTES  */
  getNoteContentSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ) {
    const unsub = firestore()
      .collection(
        `${Schema.campaign}/${campaignId}/${Schema.notes}/${noteId}/${Schema.noteContents}`,
      )
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) callback(undefined);
        else {
          callback({
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          });
        }
      });
    return unsub;
  }

  getNoteSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteModel | undefined>,
  ): () => void {
    const unsub = firestore()
      .collection(`${Schema.campaign}/${campaignId}/${Schema.notes}`)
      .doc(noteId)
      .onSnapshot(querySnapshot => {
        callback({id: querySnapshot.id, ...querySnapshot.data()});
      });
    return unsub;
  }
  createSession(
    campaignId: string,
    session: Omit<SessionModel, 'id'>,
  ): Promise<SessionModel> {
    return new Promise<SessionModel>(resolve => {
      firestore()
        .collection(`${Schema.campaign}/${campaignId}/${Schema.sessions}`)
        .add({
          ...session,
          dateCreated: firestore.FieldValue.serverTimestamp(),
        })
        .then(data => resolve({...session, id: data.id}));
    });
  }
  createSessionContent(
    campaignId: string,
    sessionId: string,
    sessionContents: Omit<NoteContentsModel, 'id'>,
  ): Promise<SessionContentsModel> {
    return new Promise<NoteContentsModel>(resolve => {
      firestore()
        .collection(
          `${Schema.campaign}/${campaignId}/${Schema.sessions}/${sessionId}`,
        )
        .add(sessionContents)
        .then(data => resolve({...sessionContents, id: data.id}));
    });
  }
  updateSessionContent(
    campaignId: string,
    sessionId: string,
    sessionContents: SessionContentsModel,
  ): Promise<any> {
    return firestore()
      .collection(
        `${Schema.campaign}/${campaignId}/${Schema.sessions}/${sessionId}`,
      )
      .doc(sessionContents.id)
      .update(sessionContents);
  }
  getLatestSessionSubscription(
    campaignId: string,
    callback: SubscriptionCallback<SessionModel | undefined>,
  ): () => void {
    const unsub = firestore()
      .collection(`${Schema.campaign}/${campaignId}/${Schema.sessions}`)
      .orderBy('dateCreated', 'desc')
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          callback(undefined);
        } else {
          callback({
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          });
        }
      });
    return unsub;
  }
  getSessionsSubscription(
    campaignId: string,
    callback: SubscriptionCallback<SessionModel[]>,
  ): () => void {
    const unsub = firestore()
      .collection(`${Schema.campaign}/${campaignId}/${Schema.sessions}`)
      .onSnapshot(querySnapshot => {
        const sessions: SessionModel[] = [];
        querySnapshot.forEach(doc => {
          sessions.push({id: doc.id, ...doc.data()});
        });
        callback(sessions);
      });
    return unsub;
  }
  getSessionContentSubscription(
    campaignId: string,
    sessionId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ): () => void {
    const unsub = firestore()
      .collection(
        `${Schema.campaign}/${campaignId}/${Schema.sessions}/${sessionId}/${Schema.sessionContents}`,
      )
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) callback(undefined);
        else {
          callback({
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          });
        }
      });
    return unsub;
  }
}

export default new FirestoreDB();
