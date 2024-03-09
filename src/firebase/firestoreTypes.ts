export const Schema = {
  campagin: 'Campaigns',
  notes: 'notes',
  users: 'Users',
};

export type UserModel = {
  firstName?: string;
  lastName?: string;
  id: string;
  emailAddress?: string;
  profilePic?: string;
};

export type CampaignModel = {
  id: string;
  name?: string;
  createdBy?: {
    userId?: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
  };
};

export type NoteModel = {
  id: string;
  title?: string;
  type?: string;
  snippet?: string;
  icon?: string;
};

export type NoteContentsModel = {
  contents?: string;
};

export type SubscriptionCallback<T> = (data: T) => void;

type Unsubscribe = () => void;

export interface IFirestore {
  getUser(userId: string): Promise<UserModel>;
  getUsers(): Promise<UserModel[]>;
  getCampaigns(userId: string): Promise<CampaignModel[]>;
  getNotesSubscription(
    campaignId: string,
    callback: SubscriptionCallback<NoteModel[]>,
  ): Unsubscribe;
  createNote(campaignId: string, note: NoteModel): Promise<NoteModel>;
  updateNote(campaignId: string, note: NoteModel): Promise<any>;
}
