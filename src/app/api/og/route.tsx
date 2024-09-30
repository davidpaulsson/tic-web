/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const logo = (
  <svg viewBox="0 0 166 65" width="100" fill="none">
    <g clipPath="url(#prefix__clip0_323_206)" fill="#708090">
      <path d="M72.255 21.408h21.481V.074h-21.48v21.334zM166 .074h-42.962v21.334H166V.074z" />
      <path d="M101.554 21.405V64.07h64.442V42.739h-42.961V21.405h-21.481zM0 42.74h21.48v21.334h21.482V42.741h21.48V21.408h-21.48V.074H21.48v21.334H0V42.74z" />
    </g>
  </svg>
);

export async function GET(request: Request) {
  try {
    const font = await fetch(new URL('/public/Atkinson-Hyperlegible-Regular-102.ttf', import.meta.url)).then((res) => res.arrayBuffer());

    // Background image
    const imageBuffer = await fetch(new URL('/public/og-bg.png', import.meta.url)).then((res) => res.arrayBuffer());
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageSrc = `data:image/png;base64,${base64Image}`;

    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'The Intelligence Company';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            fontFamily: '"Atkinson Hyperlegible"',
            padding: '100px 100px',
          }}
        >
          <img src={imageSrc} alt="" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          {logo}
          <div style={{ fontSize: 96, marginTop: 96 }}>{title}</div>
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
