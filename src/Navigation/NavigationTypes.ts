export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Campaign: undefined;
  CampaignHome: {campaignId: string};
  Notes: {noteId: string; campaignId: string} | undefined;
};
