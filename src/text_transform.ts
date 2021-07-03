import * as fs from 'fs';

const glossary: object = JSON.parse(fs.readFileSync('./glossary.json', 'utf-8'));

const findAndWrapAllWithGachi = (template: string, replacement: string, messageArray: string[]): string[] => {
  const wrapper: string = '♂';
  const result: string[] = messageArray;
  let idx: number = result.indexOf(template);

  while (idx !== -1) {
    result[idx] = `${wrapper}${replacement}${wrapper}`;
    idx = result.indexOf(template);
  }

  return result;
};

const textTransform = (message: string): string => {
  let messageArray: string[] = message.split(' ');

  for (const glossaryKey in glossary) {
    if (Object.prototype.hasOwnProperty.call(glossary, glossaryKey)) {
      for (const glossaryReplacement of glossary[glossaryKey]) {
        const template: string = glossaryReplacement;
        messageArray = findAndWrapAllWithGachi(template, glossaryKey, messageArray);
      }
    }
  }

  return messageArray.join(' ');
};

export default textTransform;
