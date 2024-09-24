'use server';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export async function submitForm(data: { contact: string }) {
  const contact = data.contact;
  const isEmail = contact.includes('@');
  let payload;
  if (isEmail) {
    payload = { Email: contact };
  } else {
    // Assuming 'SE' as the default country code
    // TODO: Update when we add more contries
    const phoneNumber = parsePhoneNumberFromString(contact, 'SE');
    if (phoneNumber && phoneNumber.isValid()) {
      payload = { E164MobilePhoneNumber: phoneNumber.format('E.164') };
    } else {
      throw new Error('Invalid phone number');
    }
  }

  const response = await fetch('https://api.tic.io/internal/signup', {
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
        message: `Det finns redan en registrering med den angivna ${isEmail ? 'e-postadressen' : 'telefonnumret'}.`,
      };
    }

    throw new Error(response.statusText);
  }

  return {
    success: true,
    message: `Tack! Du får snart ett ${isEmail ? 'e-post' : 'SMS'}-meddelande med uppgifter hur du kommer åt vårt API.`,
  };
}
