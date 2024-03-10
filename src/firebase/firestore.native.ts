import firestore from '@react-native-firebase/firestore';
import {
  UserModel,
  IFirestore,
  CampaignModel,
  NoteModel,
  SubscriptionCallback,
  Schema,
  NoteContentsModel,
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

  getNoteContentSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ) {
    const unsub = firestore()
      .collection(`Campaigns/${campaignId}/notes`)
      .doc(noteId)
      .onSnapshot(querySnapshot => {
        callback({id: querySnapshot.id, ...querySnapshot.data});
      });
    return unsub;
  }
}

export default new FirestoreDB();
