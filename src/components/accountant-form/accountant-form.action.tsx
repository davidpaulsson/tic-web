'use server';

export async function submitForm({ FirstName, LastName, Email }: { FirstName: string; LastName: string; Email: string }) {
  const response = await fetch('https://api.tic.io/internal/signup-auditor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.TIC_INTERNAL_KEY!,
    },
    body: JSON.stringify({ FirstName, LastName, Email }),
  });

  if (!response.ok) {
    const text = await response.text();
    if (text === 'E-mail address has already been registered') {
      return {
        success: false,
        message: 'Det finns redan en registrering med den angivna e-postadressen.',
      };
    }

    throw new Error(response.statusText);
  }

  return {
    success: true,
    message: 'Tack! Du får snart ett meddelande med uppgifter.',
  };
}
