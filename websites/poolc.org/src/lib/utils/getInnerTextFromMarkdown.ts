import markdownit from 'markdown-it';

export function getInnerTextFromMarkdown(content: string) {
  const md = markdownit({ html: true });
  const rendered = md.render(content);
  const parser = new DOMParser();
  const parsed = parser.parseFromString(rendered, 'text/html');
  return parsed.body.innerText;
}
