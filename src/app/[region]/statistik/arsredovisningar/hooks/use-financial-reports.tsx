import { useQuery } from '@tanstack/react-query';

import { formatDate } from '@/lib/utils';

interface Root {
  eReports: number[][];
  pReports: number[][];
  softwareEnum: SoftwareEnum;
  softwareUsed: number[][];
  /**
   * This contains the number of discrepancies we are finding in the registered financial reports for the same day. The format is an array of arrays with the type [Float,Float,Float] with the first representing YYMMDD (e.g year, month and day note that year is only given in two digits eg. 2024 = 24, 2025 = 25). The second represent the number of discrepancies found for the same date as the registered financial report. The second represent the number of discrepancies found for the same date as the registered financial report. The third represents the percentage of found discrepancies compared to the same days registered financial reports.
   */
  intelligence: number[][];
  softwareYTD: SoftwareYtd;
}

interface SoftwareEnum {
  '0': 'Agoy';
  '1': 'Aprello';
  '2': 'BL Bokslut';
  '3': 'Briljant Ekonomisystem';
  '4': 'Digitalaårsredovisningen';
  '5': 'Dooer';
  '6': 'E-revisor.se';
  '7': 'eDeklarera Årsredovisning';
  '8': 'Hogia Audit med Bokslut';
  '9': 'Hogia Bokslut';
  '10': 'Hogia Bokslut Företag';
  '11': 'Invenseit digitala årsredovisningar';
  '12': 'minårsredovisning.se';
  '13': 'SmartÅrsredovisning';
  '14': 'Visma Advisor Period & Year-end Closing';
  '15': 'Visma Bokslut';
  '16': 'Visma eEkonomi Deklaration/Årsredovisning';
  '17': 'Wint Annual Accounts Service';
  '18': 'Wolters Kluwer Bokslut';
  '19': 'Wolters Kluwer Capego';
  '20': 'www.closerly.io';
  '21': 'Årsredovisning Online';
  '22': 'Årsredovisning-direkt.se';
}

interface SoftwareYtd {
  'BL Bokslut': number;
  'Wolters Kluwer Capego': number;
  Aprello: number;
  'Visma eEkonomi Deklaration/Årsredovisning': number;
  'Hogia Bokslut Företag': number;
  Dooer: number;
  'Wint Annual Accounts Service': number;
  SmartÅrsredovisning: number;
  'Hogia Bokslut': number;
  'Hogia Audit med Bokslut': number;
  'eDeklarera Årsredovisning': number;
  'Årsredovisning Online': number;
  'Invenseit digitala årsredovisningar': number;
  'Wolters Kluwer Bokslut': number;
  'Briljant Ekonomisystem': number;
  'E-revisor.se': number;
  Agoy: number;
  'Visma Advisor Period & Year-end Closing': number;
  'Årsredovisning-direkt.se': number;
  'www.closerly.io': number;
  'Visma Bokslut': number;
  'minårsredovisning.se': number;
  Digitalaårsredovisningen: number;
}

export const useFinancialReports = ({ range }: { range: 'daily' | 'monthly' }) => {
  const { data, error, status } = useQuery({
    queryKey: ['discrepancies', range],
    queryFn: async () => {
      const response = await fetch(`https://api.tic.io/statistics/se/bolagsverket/financial-reports/${range}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json: Root = await response.json();

      // Prepare data for electronic reports chart
      const eReportsData = json.eReports.map(([date, value]) => ({
        date: formatDate(range === 'monthly' ? `${date}01` : date.toString()),
        value,
      }));

      // Prepare data for paper reports chart
      const pReportsData = json.pReports.map(([date, value]) => ({
        date: formatDate(range === 'monthly' ? `${date}01` : date.toString()),
        value,
      }));

      // Prepare data for discrepancies chart
      const discrepanciesData = json.intelligence.map(([date, identifiedIssues, percentage]) => ({
        date: formatDate(range === 'monthly' ? `${date}01` : date.toString().padStart(6, '0')),
        identifiedIssues,
        percentage: percentage !== -1 ? percentage * 100 : null,
      }));

      // Prepare data for software chart
      const softwareData = Object.entries(json.softwareYTD).map(([name, value]) => ({
        name,
        value,
      }));

      return {
        eReportsData,
        pReportsData,
        discrepanciesData,
        softwareData,
      };
    },
  });

  return { data, error, status };
};
