import { REGIONS } from '@/lib/constants';
import {
  ContentfulBlockHero,
  ContentfulBlockProductFeature,
  ContentfulComponentStatic,
  ContentfulPageResponse,
} from '@/lib/contentful/types';
import { cn } from '@/lib/utils';

import { GetStartedForFree } from '@/components/get-started-for-free';
import { Hero, HeroSubtitle, HeroTitle } from '@/components/hero';
import { ProductFeature } from '@/components/product-feature';

type Props = {
  region: (typeof REGIONS)[number];
  blocks: ContentfulPageResponse['items'][number]['fields']['blocks'];
};

export const Blocks = ({ blocks, region }: Props) => {
  return blocks.map((block) => {
    switch (block.sys.contentType.sys.id) {
      case 'blockHero':
        const hero = block.fields as ContentfulBlockHero['fields'];
        return (
          <Hero key={block.sys.id}>
            <HeroTitle>{hero.title}</HeroTitle>
            <HeroSubtitle
              className={cn({
                'mb-10': hero.cta?.length > 0,
              })}
            >
              {hero.subtitle}
            </HeroSubtitle>

            {hero.cta?.map((cta) => {
              switch (cta.sys.contentType.sys.id) {
                case 'componentStatic': {
                  const { component } = cta.fields as ContentfulComponentStatic['fields'];
                  switch (component) {
                    case '"Get started for free" form':
                      return <GetStartedForFree key={cta.sys.id} region={region} />;
                    default:
                      return null;
                  }
                }
                default:
                  return null;
              }
            })}
          </Hero>
        );
      case 'blockProductFeature': {
        const feature = block.fields as ContentfulBlockProductFeature['fields'];
        const index = blocks.findIndex((b) => b.sys.id === block.sys.id);
        const align = index % 2 === 0 ? 'left' : 'right';
        return <ProductFeature key={block.sys.id} align={align} {...feature} />;
      }
      default:
        return null;
    }
  });
};
