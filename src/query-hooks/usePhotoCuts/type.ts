export interface EditCuts {
  photo_cut_id: number;
  title?: string;
  text?: string;
  image?: string;
  link?: string;
}

export interface CreateCuts {
  photo_cut_id: number;
  title: string;
  text: string;
  image: string;
  link: string;
}
