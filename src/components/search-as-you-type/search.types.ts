/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CompaniesResponse {
  facet_counts: any[];
  found: number;
  hits: Hit[];
  out_of: number;
  page: number;
  request_params: RequestParams;
  search_cutoff: boolean;
  search_time_ms: number;
}

export interface Hit {
  document: Document;
  highlight: Highlight;
  highlights: any[];
  text_match: number;
  text_match_info: TextMatchInfo;
}

export interface Document {
  id: string;
  iso3166CountryCode: string;
  registrationNumber: string;
  registrationDate: number;
  mostRecentPurpose?: string;
  names: Name[];
  phoneNumbers: PhoneNumber[];
  emailAddresses: any[];
  sniCodes: SniCode[];
  intelligence: any[];
  status: Status[];
  mostRecentAnnualReportOverview?: MostRecentAnnualReportOverview;
  isRegisteredForVAT?: boolean;
  isRegisteredForFTax: any;
  isRegisteredForPayroll?: boolean;
  ftaxTerminationReason: any;
  bankAccounts: BankAccount[];
  addresses: Address[];
}

export interface Name {
  nameOrIdentifier: string;
  companyNamingType: string;
  firstSeenAtUtc: string;
}

export interface PhoneNumber {
  e164PhoneNumber: string;
  phoneNumberType: string;
}

export interface SniCode {
  sni_2007Code: string;
  sni_2007Name: string;
}

export interface Status {
  companyStatusType: string;
  statusDate: string;
  statusDescription: string;
}

export interface MostRecentAnnualReportOverview {
  annualReportPeriod: number;
  netSales: number;
  operatingProfit: number;
  profitForTheYear: number;
  grossMargin: any;
  operatingMargin: number;
  netProfitMargin: number;
  equityAssetsRatio: number;
  quickRatio: number;
  netSalesChange: number;
  numberOfEmployees?: number;
}

export interface BankAccount {
  bankAccountType: string;
  accountNumber: string;
  swifT_BIC: any;
}

export interface Address {
  addressType: string;
  co?: string;
  street: string;
  postalCode: string;
  city: string;
  countryCodeAlpha3?: string;
  location?: number[];
}

export interface Highlight {}

export interface TextMatchInfo {
  best_field_score: string;
  best_field_weight: number;
  fields_matched: number;
  num_tokens_dropped: number;
  score: string;
  tokens_matched: number;
  typo_prefix_score: number;
}

export interface RequestParams {
  collection_name: string;
  first_q: string;
  per_page: number;
  q: string;
}
