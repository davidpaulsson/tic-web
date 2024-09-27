'use client';

import IntercomMessengerJsSdk from '@intercom/messenger-js-sdk';

import { useEffect } from 'react';

export default function Intercom() {
  useEffect(() => {
    IntercomMessengerJsSdk({
      app_id: 'rqsx5tsk',
      action_color: '#001020',
      background_color: '#001020',
    });
  }, []);

  return null;
}
