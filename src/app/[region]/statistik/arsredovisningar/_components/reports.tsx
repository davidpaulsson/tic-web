import { getFinancialReports } from '../_lib/get-financial-reports';
import { Arsredovisningar } from './arsredovisningar';
import { Arsredovisningsbrister } from './arsredovisningsbrister';
import { Bokslutsprogram } from './bokslutsprogram';

export async function Reports({ range }: { range: 'daily' | 'monthly' }) {
  const data = await getFinancialReports({ range });

  return (
    <>
      <Arsredovisningar eReportsData={data.eReportsData} pReportsData={data.pReportsData} range={range} />
      <Arsredovisningsbrister discrepanciesData={data.discrepanciesData} range={range} />
      <Bokslutsprogram softwareData={data.softwareData} />
    </>
  );
}
