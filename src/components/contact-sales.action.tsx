'use server';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export async function submitForm(data: {
  FirstName: string;
  LastName: string;
  CompanyName?: string | undefined;
  EmailAddress?: string | undefined;
  E164MobilePhoneNumber?: string | undefined;
}) {
  const payload = data;
  if (payload.E164MobilePhoneNumber) {
    const phoneNumber = parsePhoneNumberFromString(payload.E164MobilePhoneNumber, 'SE');
    if (phoneNumber && phoneNumber.isValid()) {
      payload.E164MobilePhoneNumber = phoneNumber.format('E.164');
    }
  }

  const response = await fetch('https://api.tic.io/internal/contact-sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.TIC_INTERNAL_KEY!,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();

    if (text === 'There is already a sign-up with the given e-mail address or phone number') {
      return {
        success: false,
        message: 'Det finns redan en registrering med den angivna e-postadressen eller telefonnumret.',
      };
    }

    throw new Error(response.statusText);
  }

  return {
    success: true,
    message: 'Tack! Du blir snart kontaktad.',
  };
}
