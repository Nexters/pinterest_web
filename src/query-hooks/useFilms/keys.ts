const filmsKeys = {
  all: () => ['films'] as const,

  list: (userId: string) => [...filmsKeys.all(), 'list', userId] as const,
  item: (filmId: number) => [...filmsKeys.all(), 'item', filmId] as const,
};

export default filmsKeys;
