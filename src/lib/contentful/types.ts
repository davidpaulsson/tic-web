import { Document } from '@contentful/rich-text-types';

export type ContentfulPageResponse = {
  sys: {
    id: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: {
    fields: {
      internalTitle: string;
      title: string;
      slug: string;
      blocks: (ContentfulBlockHero | ContentfulBlockProductFeature | ContentfulBlockContent | ContentfulBlockCarousel)[];
    };
  }[];
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
  };
};

export type ContentfulComponentLink = {
  sys: {
    id: string;
    contentType: { sys: { id: 'componentLink' } };
  };
  fields: {
    label: string;
    link: {
      sys: {
        id: string;
        contentType: { sys: { id: 'page' } };
      };
      fields: {
        title: string;
        slug: string;
      };
    };
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
    icon: ContentfulAsset;
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
    cta: ContentfulComponentLink[];
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
      links: {
        fields: {
          title: string;
          slug: string;
        };
      }[];
    };
  }[];
};
