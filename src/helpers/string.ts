/**
 * html decode
 * @example htmlEncode('<div>content</div>') // content
 */
export function htmlDecode(input: string) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
