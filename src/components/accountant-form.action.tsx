'use server';

export async function submitForm({ FirstName, LastName, Email }: { FirstName: string; LastName: string; Email: string }) {
  const response = await fetch('https://api.tic.io/internal/signup-auditor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'hiWKaqPwKVsSYn6eg2lnKQyRdlV7QZEC',
    },
    body: JSON.stringify({ FirstName, LastName, Email }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    if (text === 'E-mail address has already been registered') {
      throw new Error('Det finns redan en registrering med den angivna e-postadressen.');
    }

    throw new Error(response.statusText);
  }

  return { success: true };
}
