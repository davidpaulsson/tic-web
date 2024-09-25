import { codeToHtml } from 'shiki';

import { CurlExampleClient } from './curl-example.client';

export const CurlExample = async () => {
  const out = await codeToHtml(
    `{
  "facet_counts": [],
  "found": 1,
  "hits": [
    {
      "document": {
        "id": "1234567",
        "companyId": 1234567,
        "iso3166CountryCode": "SE",
        "registrationNumber": "559999999",
        "legalEntityType": "Aktiebolag",
        "registrationDate": 1106697600,
        "mostRecentPurpose": "Bolaget skall bedriva dagis- och förskoleverksamhet ävensom idka därmed förenlig verksamhet.",
        "names": [
          {
            "nameOrIdentifier": "ACME AB",
            "companyNamingType": "legalName",
            "firstSeenAt": 1650499200
          }
        ],
        "phoneNumbers": [
          {
            "e164PhoneNumber": "+46XXXXXXXX",
            "phoneNumberType": "mobile",
            "numberPlanServiceType": "Mobiltelefonitjänster",
            "orginalOperator": "Telia Sverige AB",
            "priorOperator": null,
            "currentOperator": "Telia Sverige AB",
            "lastPortingDate": null
          }
        ],
        "hasPhoneNumbers": true,
        "emailAddresses": [],
        "hasEmailAddresses": false,
        "hyperlinks": [
          {
            "hyperlink": "https://allaforskolor.se/stad/forskolan-acme-ab",
            "hyperlinkType": "homepage"
          },
          {
            "hyperlink": "https://se.linkedin.com/in/forskolan-acme",
            "hyperlinkType": "linkedIn"
          }
        ],
        "hasHyperlinks": true,
        "sniCodes": [
          {
            "sni_2007Code": "85100",
            "sni_2007Name": "Förskoleutbildning"
          }
        ],
        "intelligence": [
          {
            "companyIntelligenceType": "annualReportDiscrepancies",
            "companyIntelligenceSubType": "MISSING_AUDITOR",
            "notes": "The company is missing an auditor and have passed the thresholds three years in a row and have violated the conditions.",
            "score": 255,
            "firstSeenAt": 1716854400,
            "documentUrl": null
          }
        ],
        "hasIntelligence": true,
        "status": [],
        "hasStatus": false,
        "mostRecentFinancialSummary": {
          "periodStart": 1672531200,
          "periodEnd": 1703980800,
          "rs_NetSalesK": 4015,
          "rs_OtherOperatingIncomeK": 0,
          "rs_OperatingProfitOrLossK": 106,
          "rs_SumFinancialItemsK": 1,
          "rs_ProfitAfterFinancialItemsK": 107,
          "bs_TotalAssetsK": 639,
          "fn_NumberOfEmployees": 4,
          "km_OperatingMargin": 0.0265,
          "km_NetProfitMargin": 0.0265,
          "km_EquityAssetsRatio": 0.2475,
          "km_GrossMargin": 0.915,
          "isAudited": false
        },
        "hasMostRecentFinancialSummary": true,
        "isRegisteredForVAT": false,
        "isRegisteredForFTax": true,
        "isRegisteredForPayroll": true,
        "ftaxTerminationReason": null,
        "bankAccounts": [
          {
            "bankAccountType": "bankgiro",
            "accountNumber": "12345678",
            "swift_BIC": null
          }
        ],
        "hasBankAccounts": true,
        "addresses": [
          {
            "addressType": "mailAddress",
            "co": null,
            "street": "Stora gatan",
            "houseNumber": "21",
            "postalCode": "12345",
            "city": "Nässjö",
            "countryCodeAlpha3": "SWE",
            "location": [
              57.63862,
              14.7152
            ]
          }
        ],
        "hasAddresses": true,
        "documents": [
          {
            "companyDocumentId": 10699498,
            "companyDocumentType": "annualReport",
            "documentDate": 1716854400,
            "documentTitle": "Annual report submitted electronically on 2024-05-28 for 2023-01-01 to 2023-12-31 and registered on 2024-05-28",
            "documentVersion": "9279863/2024",
            "documentValue1": "2023-01-01",
            "documentValue2": "2023-12-31",
            "documentValue3": "6001092391",
            "documentUrl": "https://api.tic.io/financial-documents/se/123456"
          },
          {
            "companyDocumentId": 8738530,
            "companyDocumentType": "annualReport",
            "documentDate": 1687996800,
            "documentTitle": "Annual report",
            "documentVersion": null,
            "documentValue1": null,
            "documentValue2": null,
            "documentValue3": null,
            "documentUrl": null
          },
          {
            "companyDocumentId": 8738529,
            "companyDocumentType": "annualReport",
            "documentDate": 1650499200,
            "documentTitle": "Annual report",
            "documentVersion": null,
            "documentValue1": null,
            "documentValue2": null,
            "documentValue3": null,
            "documentUrl": null
          }
        ],
        "hasDocuments": true,
        "stock": null,
        "hasStock": false,
        "lei": null,
        "hasLEI": false,
        "salesToPublicActors": [
          {
            "actorName": "Nässjö",
            "actorType": "Municipality",
            "actorCode": "0682",
            "invoicedApprox2022K": 209,
            "invoicedApprox2023K": 165
          }
        ],
        "hasSalesToPublicActors": true,
        "ecParticipant": null,
        "hasECParticipant": false,
        "franchisesOrLicences": [],
        "hasFranchisesOrLicences": false
      },
      "highlight": {},
      "highlights": []
    }
  ],
  "out_of": 938061,
  "page": 1,
  "request_params": {
    "collection_name": "companies_20240919",
    "first_q": "*",
    "per_page": 10,
    "q": "*"
  },
  "search_cutoff": false,
  "search_time_ms": 13
}`,
    {
      lang: 'json',
      theme: 'night-owl',
    },
  );

  return (
    <CurlExampleClient>
      <div dangerouslySetInnerHTML={{ __html: out }} />
    </CurlExampleClient>
  );
};
