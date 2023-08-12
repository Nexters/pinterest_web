const usersKeys = {
  all: () => ['users'],
  item: (userId: string) => [...usersKeys.all(), 'item', userId],

  /** 방명록 */
  visitLogs: (userId: string) => [...usersKeys.all(), 'visitLogs', userId],
};

export default usersKeys;
