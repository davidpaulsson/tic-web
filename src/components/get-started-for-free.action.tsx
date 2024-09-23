'use server';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export async function submitForm(data: { contact: string }) {
  const contact = data.contact;
  let payload;

  if (contact.includes('@')) {
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
      'x-api-key': 'hiWKaqPwKVsSYn6eg2lnKQyRdlV7QZEC',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();

    if (text === 'There is already a sign-up with the given e-mail address or phone number') {
      throw new Error('Det finns redan en registrering med den angivna e-postadressen eller telefonnumret.');
    }

    throw new Error(response.statusText);
  }

  return { success: true };
}
