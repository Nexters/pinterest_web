const filmsKeys = {
  all: () => ['films'],

  list: (userId: string) => [...filmsKeys.all(), 'list', userId],
  item: (filmId: number) => [...filmsKeys.all(), 'item', filmId],
};

export default filmsKeys;
