/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const logo = (
  <svg viewBox="0 0 166 65" width="100" fill="none">
    <g clipPath="url(#prefix__clip0_323_206)" fill="#ffffff">
      <path d="M72.255 21.408h21.481V.074h-21.48v21.334zM166 .074h-42.962v21.334H166V.074z" />
      <path d="M101.554 21.405V64.07h64.442V42.739h-42.961V21.405h-21.481zM0 42.74h21.48v21.334h21.482V42.741h21.48V21.408h-21.48V.074H21.48v21.334H0V42.74z" />
    </g>
  </svg>
);

export async function GET(request: Request) {
  try {
    const font = await fetch(new URL('/public/Atkinson-Hyperlegible-Regular-102.ttf', import.meta.url)).then((res) => res.arrayBuffer());
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')!.length > 50
        ? searchParams.get('title')!.slice(0, 50) + '…'
        : searchParams.get('title')
      : 'The Intelligence Company';

    const descriptionRaw =
      searchParams.get('description') ||
      'Börja kostnadsfritt med företagsinformation och en modern kreditupplysningstjänst med alla företagsformer och privatpersoner. Vår AI-plattform ger säkra kredit- och affärsbeslut och vår blixtsnabba sökmotor hittar nya möjligheter på rekordtid.';
    const description = descriptionRaw.length > 260 ? descriptionRaw.slice(0, 260) + '…' : descriptionRaw;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(-45deg, #203040, #001020)',
            color: '#ffffff',
            height: '100%',
            width: '100%',
            fontFamily: '"Atkinson Hyperlegible"',
            padding: '100px 100px',
          }}
        >
          {logo}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 72 }}>{title}</div>
            <div style={{ fontSize: 24, marginTop: 36, color: '#b1bbc4', lineHeight: '1.75' }}>{description}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Atkinson Hyperlegible',
            data: font,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
