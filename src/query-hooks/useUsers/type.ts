export interface EditUser {
  user_id: string;
  name?: string;
  text?: string;
  profile_image?: string;
  password?: string;
}

export interface CreateUser {
  user_id: string;
  password: string;
}

export interface CreateVisitLog {
  name: string;
  text: string;
  userId: string;
}
