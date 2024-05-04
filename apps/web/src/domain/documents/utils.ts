export const parse = (content: string) => {
  if (!content) {
    return initialContent;
  }
  try {
    const v = JSON.parse(content);
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return initialContent;
  }
};
export const initialContent = [
  {
    id: '1',
    type: 'p',
    children: [{ text: 'Start here...' }],
  },
];
