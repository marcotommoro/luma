export const root = {
  note: ({ id }: { id: string }): number => {
    return 10;
  },
  notes: async () => {
    return [1, 2, 3, 4, 5, 6];
  },
  addNote: async ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    return "aggiunta" + title + description;
  },
};

module.exports = { root };
