import { codeToHtml } from 'shiki';

export async function CurlExample() {
  const randomRegistrationNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  const curl = await codeToHtml(
    `curl https://api.tic.io/search/companies?
q=${randomRegistrationNumber}&
query_by=registrationNumber`,
    {
      lang: 'shell',
      theme: 'monokai',
    },
  );

  const json = await codeToHtml(
    `{
  "intelligence": [
    {
        "companyIntelligenceType": "affliatedWithArticle",
        "companyIntelligenceSubType": "AFFILIATION",
        "notes": "The business started to be affiliated with external data on 2024-07-29 indicating discrepancies.",
        "score": 255,
        "firstSeenAt": 1722211200,
        "externalId": null
    },
    {
        "companyIntelligenceType": "annualReportDiscrepancies",
        "companyIntelligenceSubType": "DUPLICATE",
        "notes": "The annual report for 2023-01-01 till 2023-12-31 is similar to one or many more annual reports that has been submitted for other companies",
        "score": 255,
        "firstSeenAt": 1715299200,
        "externalId": null
    },
  ]
  // Läs mer i vår dokumentation -> https://docs.tic.io
}`,
    {
      lang: 'json',
      theme: 'monokai',
    },
  );

  return (
    <div className="container grid grid-cols-12 font-mono text-sm md:grid-rows-12">
      <div className="col-span-full overflow-hidden rounded-xl bg-[#272822] max-md:mb-5 md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-5">
        <div className="border-b border-b-[#F8F8F2]/10 px-5 py-2 text-xs text-[#F8F8F2]">cURL</div>
        <div className="[&>pre]:p-5 [&_span]:whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: curl }} />
      </div>

      <div className="col-span-full overflow-hidden rounded-xl bg-[#272822] md:col-start-5 md:col-end-13 md:row-start-3 md:row-end-13">
        <div className="border-b border-b-[#F8F8F2]/10 px-5 py-2 text-xs text-[#F8F8F2]">JSON response</div>
        <div className="[&>pre]:rounded-xl [&>pre]:p-5 [&_span]:whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: json }} />
      </div>
    </div>
  );
}
