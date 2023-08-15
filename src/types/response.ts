import { PhotoCut } from '.';

export interface FilmsResponse {
  film_id: number;
  title: string;
  order: number;
  photo_cut_count: number;
  photo_cuts: PhotoCut[];
  likes: number;
  user_id: string;
}

export interface UserResponse {
  name: string;
  profile_img: string | null;
  text: string | null;
  user_id: string;
  visitors: number;
}
