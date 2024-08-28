'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { cn } from '@/lib/utils';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function Arsredovisningsbrister({
  discrepanciesData,
  range,
}: {
  discrepanciesData: {
    date: string;
    identifiedIssues: number;
    percentage: number | null;
  }[];
  range: 'daily' | 'monthly';
}) {
  const chartConfig = {
    identifiedIssues: {
      label: 'Identifierade brister',
      color: 'hsl(var(--chart-1))',
    },
    percentage: {
      label: '% brister',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const [visibleLines, setVisibleLines] = React.useState({
    identifiedIssues: true,
    percentage: true,
  });

  const toggleLine = (dataKey: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  const total = React.useMemo(
    () => ({
      identifiedIssues: discrepanciesData.reduce((acc, curr) => acc + curr.identifiedIssues, 0),
      percentage:
        discrepanciesData.reduce((acc, curr) => acc + (curr.percentage ?? 0), 0) /
        discrepanciesData.filter((item) => item.percentage !== null).length,
    }),
    [discrepanciesData],
  );

  const chartData = discrepanciesData.map((item) => ({
    date: item.date,
    identifiedIssues: item.identifiedIssues,
    percentage: item.percentage !== null ? Number(item.percentage.toFixed(1)) : null,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="mb-2">Brister i årsredovisningar</CardTitle>
          <CardDescription>Exkluderar sen årsstämma, sen årsredovisning, likviditetsplikt, och fel soliditet.</CardDescription>
        </div>

        <div className="flex">
          {Object.entries(chartConfig)
            .filter(([key]) => key !== 'views')
            .map(([key, config]) => {
              const isVisible = visibleLines[key as keyof typeof visibleLines];
              return (
                <button
                  key={key}
                  onClick={() => toggleLine(key as keyof typeof visibleLines)}
                  className={cn(
                    'flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6',
                  )}
                >
                  <span className="text-muted-foreground flex items-center gap-2 whitespace-nowrap text-xs">
                    <span
                      className="block h-2 w-2 whitespace-nowrap rounded-full bg-slate-300"
                      style={{
                        backgroundColor: isVisible && 'color' in config ? config.color : undefined,
                      }}
                    />
                    {key === 'percentage' ? 'Genomsnittliga brister' : 'Antal brister'}
                  </span>
                  <span className="whitespace-nowrap text-lg leading-none sm:text-3xl">
                    {key === 'percentage'
                      ? `${Number(total[key as keyof typeof total].toFixed(1)).toLocaleString('sv-SE')} %`
                      : total[key as keyof typeof total].toLocaleString('sv-SE')}
                  </span>
                </button>
              );
            })}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />

            <YAxis yAxisId="left" axisLine={false} tickLine={false} tickFormatter={(value) => value.toLocaleString('sv-SE')} width={30} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (range === 'monthly') {
                  return date.toLocaleDateString('sv-SE', {
                    month: 'short',
                  });
                } else {
                  return date.toLocaleDateString('sv-SE', {
                    month: 'short',
                    day: 'numeric',
                  });
                }
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              width={40}
            />

            <Line
              type="monotone"
              dataKey="identifiedIssues"
              stroke={chartConfig.identifiedIssues.color}
              strokeWidth={2}
              dot={false}
              yAxisId="left"
              name={chartConfig.identifiedIssues.label}
              hide={!visibleLines.identifiedIssues}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="percentage"
              stroke={chartConfig.percentage.color}
              strokeWidth={2}
              dot={false}
              yAxisId="right"
              name={chartConfig.percentage.label}
              hide={!visibleLines.percentage}
              isAnimationActive={false}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-48"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    if (range === 'monthly') {
                      return date.toLocaleDateString('sv-SE', {
                        month: 'short',
                      });
                    } else {
                      const weekday = date.toLocaleDateString('sv-SE', {
                        weekday: 'short',
                      });
                      return `${weekday}, ${date.toLocaleDateString('sv-SE', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}`;
                    }
                  }}
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
