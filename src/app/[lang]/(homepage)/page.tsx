import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getDictionary } from '@/lib/get-dictionary';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

import HeroBackground from './assets/hero-background.jpg';
import IconAffarshantering from './assets/icon-affarshantering.png';
import IconAiPlattform from './assets/icon-ai-plattform.png';
import IconCrmIntegrering from './assets/icon-crm-integrering.png';
import IconDokumenthantering from './assets/icon-dokumenthantering.png';
import { FeatureSection } from './components/feature-section';
import { Hero, HeroSubtitle, HeroTitle } from './components/hero';
import { TeknikOmraden } from './components/teknikomraden';

export default async function Home({ params }: Readonly<{ params: { lang: string } }>) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <title>{dict.homepage.meta.title}</title>
      <meta name="description" content={dict.homepage.meta.description} />

      <div className="relative overflow-hidden py-6">
        <Image src={HeroBackground} alt="" fill={true} priority={true} placeholder="blur" quality={100} className="z-[-1] object-cover" />
        <Header theme="light" lang={params.lang} />
        <Hero>
          <HeroTitle>{dict.homepage.hero.title}</HeroTitle>
          <HeroSubtitle>{dict.homepage.hero.subtitle}</HeroSubtitle>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="secondary" asChild>
              <Link href={dict.homepage.hero.ctaUrl} className="group flex gap-2">
                {dict.homepage.hero.cta} <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={dict.homepage.hero.secondaryCtaUrl} className="group flex gap-2 text-white hover:text-white">
                {dict.homepage.hero.secondaryCta}
                <ChevronRight className="h-5 w-5 text-[#C8B8DC] transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Hero>
      </div>

      <main>
        <div className="py-6">
          <FeatureSection
            align="left"
            topIcon={<Image src={IconAiPlattform} alt="" width={40} height={40} />}
            topTitle={dict.homepage.features.aiPlatform.topTitle}
            title={dict.homepage.features.aiPlatform.title}
            content={dict.homepage.features.aiPlatform.description}
            linkHref={dict.homepage.features.aiPlatform.link.url}
            linkLabel={dict.homepage.features.aiPlatform.link.title}
          />

          <FeatureSection
            align="right"
            className="bg-gradient-to-b from-[#F3F2FF] to-[#CDE5F6]"
            topIcon={<Image src={IconAffarshantering} alt="" width={40} height={40} />}
            topTitle={dict.homepage.features.businessManagement.topTitle}
            title={dict.homepage.features.businessManagement.title}
            content={dict.homepage.features.businessManagement.description}
            linkHref={dict.homepage.features.businessManagement.link.url}
            linkLabel={dict.homepage.features.businessManagement.link.title}
          />

          <FeatureSection
            align="left"
            topIcon={<Image src={IconCrmIntegrering} alt="" width={40} height={40} />}
            topTitle={dict.homepage.features.crmIntegration.topTitle}
            title={dict.homepage.features.crmIntegration.title}
            content={dict.homepage.features.crmIntegration.description}
            linkHref={dict.homepage.features.crmIntegration.link.url}
            linkLabel={dict.homepage.features.crmIntegration.link.title}
          />

          <FeatureSection
            align="right"
            className="bg-gradient-to-b from-[#F3F2FF] to-[#CDE5F6]"
            topIcon={<Image src={IconDokumenthantering} alt="" width={40} height={40} />}
            topTitle={dict.homepage.features.documentManagement.topTitle}
            title={dict.homepage.features.documentManagement.title}
            content={dict.homepage.features.documentManagement.description}
            linkHref={dict.homepage.features.documentManagement.link.url}
            linkLabel={dict.homepage.features.documentManagement.link.title}
          />

          <FeatureSection
            align="left"
            topIcon={<Image src={IconCrmIntegrering} alt="" width={40} height={40} />}
            topTitle={dict.homepage.features.creditInformation.topTitle}
            title={dict.homepage.features.creditInformation.title}
            content={dict.homepage.features.creditInformation.description}
            linkHref={dict.homepage.features.creditInformation.link.url}
            linkLabel={dict.homepage.features.creditInformation.link.title}
          />
        </div>

        <TeknikOmraden />
      </main>
    </>
  );
}
