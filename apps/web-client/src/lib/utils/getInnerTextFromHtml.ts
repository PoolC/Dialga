export function getInnerTextFromHtml(content: string) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(content, 'text/html');
  return parsed.body.innerText;
}
