import Image from "next/image";

import { asNumber } from '@/lib/utils';

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
  <div className="flex size-20 items-center justify-center rounded-2xl border border-tic-50/5 bg-gradient-to-b from-transparent to-tic-50/5 max-md:scale-75 [&>svg]:h-auto [&>svg]:w-10">
    {children}
  </div>
);

export const Sources = () => {
  const firstRow = logos.slice(0, logos.length / 2);
  const secondRow = logos.slice(logos.length / 2);

  return (
    <div className="container">
      <div className="overflow-hidden rounded-2xl bg-tic-900">
        <div className="relative grid place-content-center py-8 md:py-16">
          <h2 className="z-10 mb-1 text-balance px-6 text-xl text-tic-100 md:text-center md:text-3xl">
            Vi analyserar all data, från varje källa.
          </h2>
          <p className="z-10 mb-6 text-pretty px-6 text-base text-tic-400 sm:max-w-[62ch] md:m-auto md:mb-16 md:text-balance md:px-2 md:text-center md:text-lg">
            Brister och avvikelser skapar vårt Intelligence Score.
          </p>

          <div className="mb-6 flex w-full flex-col items-center justify-center space-y-10 overflow-hidden md:mb-16 md:space-y-20">
            <Marquee pauseOnHover={false} className="[--duration:40s]">
              {firstRow.map((logo, index) => (
                <LogoWrapper key={index}>{logo}</LogoWrapper>
              ))}
            </Marquee>

            <div className="relative">
              <NeonGradientCard>
                <Image
                  src={tic}
                  width={140}
                  height={140}
                  alt="TIC Intelligence"
                  className="relative z-10 rounded-3xl"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </NeonGradientCard>
            </div>

            <Marquee reverse pauseOnHover={false} className="[--duration:40s]">
              {secondRow.reverse().map((logo, index) => (
                <LogoWrapper key={index}>{logo}</LogoWrapper>
              ))}
            </Marquee>
          </div>
          <p className="z-20 px-6 text-center text-sm text-tic-400">Detta är endast ett urval av våra datakällor.</p>
        </div>
      </div>
    </div>
  );
};
