import { Context } from 'telegraf';
import { InlineQueryResultArticle } from 'typegram';
import textTransform from './text_transform';

const inline = async (ctx: Context) => {
  const text: string = ctx.inlineQuery.query;
  if (text === '') return;
  const resultText: string = textTransform(text);

  const result: InlineQueryResultArticle[] = [
    {
      type: 'article',
      id: '1337',
      title: resultText,
      input_message_content: {
        message_text: resultText,
      },
    },
  ];

  await ctx.answerInlineQuery(result);
};

export default inline;
