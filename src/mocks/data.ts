export const notes: {
  id: string;
  title: string;
  content: string;
  category: string;
}[] = [
  {
    id: '1',
    title: 'Qelline Alderleaf',
    content: 'Notes for Quelline go here.',
    category: 'Character',
  },
  {
    id: '2',
    title: 'Sildar Halwinter',
    content: 'Notes for Sildar',
    category: 'Character',
  },
  {
    id: '3',
    title: 'Daran Edermath',
    content: 'Notes for Daran',
    category: 'Character',
  },
  {
    id: '4',
    title: 'Lightbringer',
    content: 'Notes for Lightbringer',
    category: 'Item',
  },
  {
    id: '5',
    title: 'Gundren Rockseeker',
    content: 'Notes for Rockseeker',
    category: 'Character',
  },
  {
    id: '6',
    title: 'Wave Echo Cave',
    content: 'Notes for Wave Echo Cave',
    category: 'Location',
  },
];

export const initialNote = `
# TODO
## Markdown Editor
1) Fix markdown so its pretty
2) (DONE) Readd edit mode for markdown
3) (DONE) Fix session notes adding and removing from virtualized view

## UI
1) Finish implementing the tag toggle buttons
2) Refactor the note list/panels into PanelCard, NoteListSelector so that they can be re-used in the menu for small devices.
3) Finish implementing the small device menu

## Systems
1) Add a firebase for native implementation (auth)
2) Begin looking at firebase db integration
3) (DONE ISH) Fix SVGs for native, resolve remaining web -> native descrepancies (ie styles that don't align)

`;
