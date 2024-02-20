export const notes: {
  id: number;
  title: string;
  content: string;
  category: string;
}[] = [
  {
    id: 1,
    title: 'Qelline Alderleaf',
    content: 'Notes for Quelline go here.',
    category: 'Character',
  },
  {
    id: 2,
    title: 'Sildar Halwinter',
    content: '',
    category: 'Character',
  },
  {
    id: 3,
    title: 'Daran Edermath',
    content: '',
    category: 'Character',
  },
  {
    id: 4,
    title: 'Lightbringer',
    content: '',
    category: 'Item',
  },
  {
    id: 5,
    title: 'Gundren Rockseeker',
    content: '',
    category: 'Character',
  },
  {
    id: 6,
    title: 'Wave Echo Cave',
    content: '',
    category: 'Location',
  },
];

export const initialNote = `
# TODO
1) Fix markdown so its pretty
2) Readd edit mode for markdown AND monospace the editor
3) (DONE) Fix session notes adding and removing from virtualized view
4) Finish implementing the tag toggle buttons
5) Add a firebase for native implementation (auth)
6) Begin looking at firebase db integration

`;
