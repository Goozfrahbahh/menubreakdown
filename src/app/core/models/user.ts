export interface Profile {
  id: string;
  username: string;
  email: string;
  accessLevel: string;
  contact_information?: Contacts;
}

export interface Contacts {
  phone: string;
  city: string;
  country: string;
}

export const USER_STORAGE_KEY = 'supabase.auth.token';

export type Access = {
  level: string;
  name: string;
};
