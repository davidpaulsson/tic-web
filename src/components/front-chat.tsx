// @/components/front-chat.tsx
'use client';

import Script from 'next/script';

// @/components/front-chat.tsx

export function FrontChat() {
  return <Script id="front-chat-script" src="https://chat-assets.frontapp.com/v1/chat.bundle.js" onLoad={initFrontChat}></Script>;
}

function initFrontChat() {
  //@ts-expect-error
  window.FrontChat('init', {
    chatId: '1ece8deb30d271d198fe682542a170a3',
    useDefaultLauncher: true,
  });
}
