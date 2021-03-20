export const preHTMLClear = (html: string) => {
  let finalHTML;

  finalHTML = html.replace(/\n/g, '');
  finalHTML = finalHTML.replace(/&nbsp;/g, ' ');

  return finalHTML;
};

export const cleanText = (text) => {
  let finalText;

  finalText = text.replace(/\[.*?\]/g, '');
  finalText = finalText.trim();

  return finalText;
};

export const cleanFromTags = (el) => {
  const { children, name } = el;

  const text = children
    .map((childNode) => {
      const { type, data } = childNode;

      if (type === 'text') {
        return cleanText(data);
      } else if (type === 'tag') {
        return cleanFromTags(childNode);
      }

      return '';
    })
    .filter((nodeText) => nodeText.trim().length !== 0)
    .join('');

  return text;
};

export const cleanSrc = (src: string) => {
  const [finalSrc] = src.match(/(.*?(?:jpg|png|jpeg))|.*/);

  return finalSrc;
};
