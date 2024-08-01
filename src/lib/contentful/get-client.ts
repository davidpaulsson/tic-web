import { createClient } from 'contentful';

export const getContentfulClient = (isPreview = false) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: isPreview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN! : process.env.CONTENTFUL_ACCESS_TOKEN!,
    host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  });

  return client;
};
