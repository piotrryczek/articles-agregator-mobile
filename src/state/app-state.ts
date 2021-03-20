import { UserRole, RegionGroup } from 'types';

export type AppState = {
  jwtToken: string;
  role: UserRole | null;
  publisherId: string;
  regionGroups: RegionGroup[];
  savedArticles: string[];
  followedRegions: string[];
  reportedArticles: string[];
  hasAccess: boolean;
};
