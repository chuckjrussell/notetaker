export const Schema = {
  campaign: 'Campaigns',
  notes: 'notes',
  noteContents: 'noteContents',
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
  id: string;
  contents?: string;
};

export type SubscriptionCallback<T> = (data: T) => void;

type Unsubscribe = () => void;

export interface IFirestore {
  getUser(userId: string): Promise<UserModel>;
  getUsers(): Promise<UserModel[]>;
  getCampaigns(userId: string): Promise<CampaignModel[]>;
  getCampaignsSubscription(
    userId: string,
    callback: SubscriptionCallback<CampaignModel[]>,
  ): Unsubscribe;
  getNotesSubscription(
    campaignId: string,
    callback: SubscriptionCallback<NoteModel[]>,
  ): Unsubscribe;
  createNote(campaignId: string, note: NoteModel): Promise<NoteModel>;
  updateNote(campaignId: string, note: NoteModel): Promise<any>;
  createNoteContent(
    campaignId: string,
    noteId: string,
    noteContents: Omit<NoteContentsModel, 'id'>,
  ): Promise<NoteContentsModel>;
  updateNoteContent(
    campaignId: string,
    noteId: string,
    noteContents: NoteContentsModel,
  ): Promise<any>;
  getNoteContentSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ): Unsubscribe;
}
