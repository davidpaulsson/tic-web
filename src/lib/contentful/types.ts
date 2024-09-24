import { Document } from '@contentful/rich-text-types';

export type ContentfulPageResponse = {
  sys: {
    id: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: ContentfulPage[];
};

export type ContentfulPage = {
  sys: {
    id: string;
    contentType: { sys: { id: 'page' } };
  };
  fields: {
    internalTitle: string;
    title: string;
    description: string;
    slug: string;
    blocks: (
      | ContentfulBlockHero
      | ContentfulBlockProductFeature
      | ContentfulBlockContent
      | ContentfulBlockCarousel
      | ContentfulBlockStatic
    )[];
  };
};

export type ContentfulBlockCarousel = {
  sys: {
    id: string;
    contentType: { sys: { id: 'blockCarousel' } };
  };
  fields: {
    title: string;
    cards: ContentfulComponentCard[];
  };
};

export type ContentfulComponentCard = {
  sys: {
    id: string;
    contentType: { sys: { id: 'componentCard' } };
  };
  fields: {
    title: string;
    description: string;
    links: ContentfulPageResponse['items'];
    icon: 'check' | 'deviation' | 'document' | 'history' | 'intelligence' | 'more' | 'overview' | 'sale' | 'search';
  };
};

export type ContentfulComponentLink = {
  sys: {
    id: string;
    contentType: { sys: { id: 'componentLink' } };
  };
  fields: {
    label: string;
    link: ContentfulPage | ContentfulExternalPage;
  };
};

export type ContentfulBlockContent = {
  sys: {
    id: string;
    contentType: { sys: { id: 'blockContent' } };
  };
  fields: Document;
};

export type ContentfulBlockProductFeature = {
  sys: {
    id: string;
    contentType: { sys: { id: 'blockProductFeature' } };
  };
  fields: {
    title: string;
    label: string;
    description: string;
    cta: ContentfulComponentLink;
  };
};

export type ContentfulAsset = {
  sys: {
    id: string;
  };
  fields: {
    description: string;
    title: string;
    file: {
      contentType: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      url: string;
    };
  };
};

export type ContentfulBlockHero = {
  sys: {
    id: string;
    contentType: { sys: { id: 'blockHero' } };
  };
  fields: {
    internalTitle: string;
    title: string;
    subtitle: string;
    cta: (ContentfulComponentLink | ContentfulComponentStatic)[];
  };
};

export type ContentfulBlockStatic = {
  sys: {
    id: string;
    contentType: { sys: { id: 'blockStatic' } };
  };
  fields: {
    internalTitle: string;
    block: 'Accountant form' | 'API example' | 'Data sources' | 'Plan selection' | 'Pricing table' | 'Safer and easier business';
  };
};

export type ContentfulComponentStatic = {
  sys: {
    id: string;
    contentType: { sys: { id: 'componentStatic' } };
  };
  fields: {
    internalTitle: string;
    component: '"Get started for free" form';
  };
};

export type ContentfulNavigationResponse = {
  sys: {
    id: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: {
    fields: {
      links: (ContentfulPage | ContentfulExternalPage)[];
    };
  }[];
};

export type ContentfulExternalPage = {
  sys: {
    id: string;
    contentType: { sys: { id: 'externalPage' } };
  };
  fields: {
    title: string;
    url: string;
  };
};
