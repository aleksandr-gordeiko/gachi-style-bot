import * as fs from 'fs';

const glossary: object = JSON.parse(fs.readFileSync('./glossary.json', 'utf-8'));

const findWord = (word: string, text: string): number => {
  const arr: string[] = text.split(' ');
  const idx = arr.indexOf(word);

  if (idx === -1 || idx === 0) return idx;
  if (idx === arr.length - 1) return text.length - word.length;

  return text.indexOf(` ${word} `) + 1;
};

const findAndWrapAllWithGachi = (template: string, replacement: string, text: string): string => {
  const wrapper: string = '♂';
  let result = text;
  let idx: number = findWord(template, result);

  while (idx !== -1) {
    result = result.slice(0, idx) + wrapper + replacement + wrapper + result.slice(idx + template.length);
    idx = findWord(template, result);
  }

  return result;
};

const textTransform = (message: string): string => {
  let result: string = message;
  for (const glossaryKey in glossary) {
    for (const glossaryElementKey in glossary[glossaryKey]) {
      const template: string = glossary[glossaryKey][glossaryElementKey];
      result = findAndWrapAllWithGachi(template, glossaryKey, result);
    }
  }
  return result;
};

export default textTransform;
