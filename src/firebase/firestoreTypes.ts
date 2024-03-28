import {FieldValue} from '@firebase/firestore';

export const Schema = {
  campaign: 'Campaigns',
  notes: 'notes',
  noteContents: 'noteContents',
  users: 'Users',
  sessions: 'sessions',
  sessionContents: 'sessionContents',
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

export type SessionModel = {
  id: string;
  title?: string;
  snippet?: string;
  dateCreated?: string | FieldValue;
};

export type SessionContentsModel = {
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
  getNoteSubscription(
    campaignId: string,
    noteId: string,
    callback: SubscriptionCallback<NoteModel | undefined>,
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
  createSession(
    campaignId: string,
    session: Omit<SessionModel, 'id'>,
  ): Promise<SessionModel>;
  createSessionContent(
    campaignId: string,
    sessionId: string,
    sessionContents: Omit<NoteContentsModel, 'id'>,
  ): Promise<SessionContentsModel>;
  updateSessionContent(
    campaignId: string,
    sessionId: string,
    sessionContents: SessionContentsModel,
  ): Promise<any>;
  getLatestSessionSubscription(
    campaignId: string,
    callback: SubscriptionCallback<SessionModel | undefined>,
  ): Unsubscribe;
  getSessionsSubscription(
    campaignId: string,
    callback: SubscriptionCallback<SessionModel[]>,
  ): Unsubscribe;
  getSessionContentSubscription(
    campaignId: string,
    sessionId: string,
    callback: SubscriptionCallback<NoteContentsModel | undefined>,
  ): Unsubscribe;
}
