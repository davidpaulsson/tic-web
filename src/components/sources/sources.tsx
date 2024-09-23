import Image from 'next/image';

import Marquee from '../ui/marquee';
import { NeonGradientCard } from '../ui/neon-gradient-card';
import { ArbetsformedlingenLogo } from './logos/arbetsformedlingen-logo';
import { BingLogo } from './logos/bing-logo';
import { BolagsverketLogo } from './logos/bolagsverket-logo';
import { CsnLogo } from './logos/csn-logo';
import { FinansinspektionenLogo } from './logos/finansinspektionen-logo';
import { FolkhalsomyndighetenLogo } from './logos/folkhalsomyndigheten-logo';
import { ForsakringskassanLogo } from './logos/forsakringskassan-logo';
import { GoogleLogo } from './logos/google-logo';
import { KammarkollegietLogo } from './logos/kammarkollegiet-logo';
import { KronofogdenLogo } from './logos/kronofogden-logo';
import { LansstyrelsenLogo } from './logos/lansstyrelsen-logo';
import { PrvLogo } from './logos/prv-logo';
import { ScbLogo } from './logos/scb-logo';
import { SkatteverketLogo } from './logos/skatteverket-logo';
import tic from './logos/tic-intelligence.png';

const logos = [
  <LansstyrelsenLogo key="lansstyrelsen" />,
  <ArbetsformedlingenLogo key="arbetsformedlingen" />,
  <ScbLogo key="scb" />,
  <BolagsverketLogo key="bolagsverket" />,
  <ForsakringskassanLogo key="forsakringskassan" />,
  <FinansinspektionenLogo key="finansinspektionen" />,
  <KronofogdenLogo key="kronofogden" />,
  <PrvLogo key="prv" />,
  <GoogleLogo key="google" />,
  <SkatteverketLogo key="skatteverket" />,
  <KammarkollegietLogo key="kammarkollegiet" />,
  <BingLogo key="bing" />,
  <CsnLogo key="csn" />,
  <FolkhalsomyndighetenLogo key="folkhalsomyndigheten" />,
];

const LogoWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-20 items-center justify-center rounded-2xl border border-white/5 bg-gradient-to-b from-transparent to-white/5 [&>svg]:h-auto [&>svg]:w-10">
    {children}
  </div>
);

export const Sources = () => {
  const firstRow = logos.slice(0, logos.length / 2);
  const secondRow = logos.slice(logos.length / 2);

  return (
    <div className="relative bg-black">
      <div className="container">
        <div className="relative grid place-content-center bg-[#102030] py-32 md:py-60">
          <h2 className="z-10 text-balance text-center text-xl text-white md:text-3xl">Vi analyserar all data, från varje källa.</h2>
          <p className="z-10 mb-16 text-balance text-center text-xl text-white/60 md:text-3xl">
            Brister och avvikelser skapar vårt Intelligence Score.
          </p>

          <div className="mb-16 flex w-full flex-col items-center justify-center space-y-10 overflow-hidden md:space-y-20">
            <Marquee pauseOnHover={false} className="[--duration:40s]">
              {firstRow.map((logo, index) => (
                <LogoWrapper key={index}>{logo}</LogoWrapper>
              ))}
            </Marquee>

            <div className="relative">
              <NeonGradientCard>
                <Image src={tic} width={140} height={140} alt="TIC Intelligence" className="relative z-10" />
              </NeonGradientCard>
            </div>

            <Marquee reverse pauseOnHover={false} className="[--duration:40s]">
              {secondRow.reverse().map((logo, index) => (
                <LogoWrapper key={index}>{logo}</LogoWrapper>
              ))}
            </Marquee>
          </div>
          <p className="z-20 text-center text-sm text-white/60">Ett urval av våra datakällor.</p>

          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>
      </div>
    </div>
  );
};
