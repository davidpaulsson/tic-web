import { GetStartedButton } from './get-started-button';

export const SaferAndEasierBusiness = () => {
  return (
    <div className="container py-40">
      <h2 className="mb-2 text-balance text-center text-xl md:text-3xl">Säkrare och enklare affärer.</h2>
      <p className="mx-auto mb-10 max-w-prose text-balance text-center text-lg text-tic-lighter md:text-2xl">
        Vår AI-plattformen övervakar ständigt hundratals datakällor för att identifiera avvikelser och mönster i register, årsredovisningar
        och andra källor. Få koll på vem du gör affärer och slipp obehagliga överraskningar.
      </p>
      <div className="mx-auto flex justify-center gap-3">
        <GetStartedButton plan="Free" />
        <GetStartedButton plan="Premium" />
      </div>
    </div>
  );
};
