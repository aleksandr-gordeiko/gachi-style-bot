const textTransform = (message: string): string => {
  const messageArray: string[] = message.split(' ');
  const wrapper: string = '♂';
  const marker: string = '*';

  for (const wordIdx in messageArray) {
    const word = messageArray[wordIdx];
    if (word.length < 3) continue;
    if (word[0] === marker && word[word.length - 1] === marker) {
      messageArray[wordIdx] = `${wrapper}${word.slice(1, -1)}${wrapper}`;
    }
  }

  return messageArray.join(' ');
};

export default textTransform;
