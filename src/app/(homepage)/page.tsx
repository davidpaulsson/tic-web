import Image from 'next/image';

import { Header } from '@/components/header';

import { FeatureSection } from './feature-section';
import { Hero } from './hero';
import HeroBackground from './hero-background.jpg';
import IconAffarshantering from './icon-affarshantering.png';
import IconAiPlattform from './icon-ai-plattform.png';
import IconCrmIntegrering from './icon-crm-integrering.png';
import IconDokumenthantering from './icon-dokumenthantering.png';
import { TeknikOmraden } from './teknikomraden';

export default function Home() {
  return (
    <>
      <title>The Intelligence Company</title>
      <meta
        name="description"
        content="Upptäck en AI-revolution inom affärsinsikter. Högre kvalitet och 10X mer företagsinfo. Vår AI-plattform Ormeo bäddar för säkrare affärsbeslut och identifierar nya kunder och möjligheter snabbare än någonsin."
      />

      <div className="relative overflow-hidden py-6">
        <Image src={HeroBackground} alt="" fill={true} priority={true} placeholder="blur" quality={100} className="z-[-1] object-cover" />
        <Header theme="light" />
        <Hero />
      </div>
      <main>
        <div className="py-6">
          <FeatureSection
            align="left"
            topIcon={<Image src={IconAiPlattform} alt="" width={40} height={40} />}
            topTitle="AI-plattform"
            title="Supersäkert och enkelt med Ormeo®"
            content="Ta total kontroll över företagsinformation med vår AI-drivna plattform Ormeo®. Vår avancerade AI tolkar varje detalj i årsredovisningar, finansiell data, myndighetsinformation, offentlig information, sociala företagsprofiler, adressdata och mycket mer. Upptäck kraften i datadriven insikt och gör smartare affärsbeslut på ett ögonblick."
            linkHref="/ormeo"
            linkLabel="Testa Ormeo"
          />

          <FeatureSection
            align="right"
            className="bg-gradient-to-b from-[#F3F2FF] to-[#CDE5F6]"
            topIcon={<Image src={IconAffarshantering} alt="" width={40} height={40} />}
            topTitle="Affärshantering"
            title="En smartare och säkrare affärshantering med vår AI-plattform"
            content="TIC:s AI-plattform övervakar ständigt tusentals datakällor för att identifiera avvikelser och mönster i register, årsredovisningar och andra informationskällor. Med Ormeo® eliminerar du obehagliga överraskningar och får full koll på vem du gör affärer med. Säker och smart affärshantering har aldrig varit enklare."
            linkHref="/ormeo"
            linkLabel="Läs mer om vår AI-teknik"
          />

          <FeatureSection
            align="left"
            topIcon={<Image src={IconCrmIntegrering} alt="" width={40} height={40} />}
            topTitle="CRM-integrering"
            title="Öka din försäljning och dina intäkter direkt"
            content="Med vår AI-plattform Ormeo® kan du enkelt identifiera nya potentiella kunder genom prospektering och smarta urval. Använd vårt webbverktyg för personlig och effektiv marknadsföring, och integrera Ormeo® helt sömlöst med ditt befintliga CRM-system. Upptäck hur det känns att på riktigt revolutionera sin försäljning."
            linkHref="/ormeo"
            linkLabel="Se integrationen live"
          />

          <FeatureSection
            align="right"
            className="bg-gradient-to-b from-[#F3F2FF] to-[#CDE5F6]"
            topIcon={<Image src={IconDokumenthantering} alt="" width={40} height={40} />}
            topTitle="Dokumenthantering"
            title="Dataanalys och skräddarsydd rådgivning"
            content="Kombinera dina egna data med hundratals datakällor i vår AI-plattform Ormeo för att få helt nya insikter om dina affärsrelationer. Ormeo® hanterar alla typer av dokument- och filformat samt bilder, och tolkar både strukturerad och ostrukturerad data. Upptäck kraften i datadriven rådgivning och förvandla din verksamhet."
            linkHref="/ormeo"
            linkLabel="Testa Ormeo"
          />

          <FeatureSection
            align="left"
            topIcon={<Image src={IconCrmIntegrering} alt="" width={40} height={40} />}
            topTitle="Mer än kreditupplysingar"
            title="Mer än ett vanligt kreditupplysningsbolag"
            content="Vi är mer än ett vanligt kreditupplysningsbolag – vi gör affärer säkrare och tryggare genom att ge dig bättre koll på vem du gör affärer med. Vår avancerade teknik bearbetar årsredovisningar, registerinformation och andra källor för att identifiera avvikelser. Våra tjänster är helt kostnadsfria för offentliga aktörer och icke vinstdrivna organisationer."
            linkHref="/ormeo"
            linkLabel="Börja kostnadsfritt"
          />
        </div>

        <TeknikOmraden />
      </main>
    </>
  );
}
