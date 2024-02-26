type FirestoreUser = any;

export interface IFirestore {
  getUsers(): Promise<FirestoreUser[]>;
}
