'use client';

import Script from 'next/script';

declare global {
  interface Window {
    FrontChat: (command: string, options: { chatId: string; useDefaultLauncher: boolean }) => void;
  }
}

export const FrontChat = () => (
  <Script
    src="https://chat-assets.frontapp.com/v1/chat.bundle.js"
    strategy="lazyOnload"
    onLoad={() => {
      window.FrontChat('init', {
        chatId: '1ece8deb30d271d198fe682542a170a3',
        useDefaultLauncher: true,
      });
    }}
  />
);
