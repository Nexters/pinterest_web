export interface EditCuts {
  photo_cut_id: number;
  title?: string;
  text?: string;
  image?: string;
}

export interface CreateCuts {
  film_id: number;
  title: string;
  text: string;
  image: string;
}
