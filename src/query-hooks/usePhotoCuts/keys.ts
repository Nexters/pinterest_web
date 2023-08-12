const photoCutsKeys = {
  all: () => ['photoCuts'],
  item: (cutId: number) => [...photoCutsKeys.all(), cutId],
};

export default photoCutsKeys;
