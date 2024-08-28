'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { cn } from '@/lib/utils';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  views: {
    label: 'Registrerade årsredovisningar',
  },
  digitala: {
    label: 'Digitala',
    color: 'hsl(var(--chart-1))',
  },
  papper: {
    label: 'Papper',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function Arsredovisningar({
  eReportsData,
  pReportsData,
  range,
}: {
  eReportsData: {
    date: string;
    value: number;
  }[];
  pReportsData: {
    date: string;
    value: number;
  }[];
  range: 'daily' | 'monthly';
}) {
  const [visibleLines, setVisibleLines] = React.useState({
    digitala: true,
    papper: true,
  });

  const total = React.useMemo(
    () => ({
      digitala: eReportsData.reduce((acc, curr) => acc + curr.value, 0),
      papper: pReportsData.reduce((acc, curr) => acc + curr.value, 0),
    }),
    [eReportsData, pReportsData],
  );

  const chartData = React.useMemo(() => {
    const allDates = new Set([...eReportsData.map((e) => e.date), ...pReportsData.map((p) => p.date)]);
    return Array.from(allDates)
      .sort()
      .map((date) => {
        const eReport = eReportsData.find((e) => e.date === date);
        const pReport = pReportsData.find((p) => p.date === date);
        return {
          date,
          digitala: eReport?.value ?? 0,
          papper: pReport?.value ?? 0,
        };
      });
  }, [eReportsData, pReportsData]);

  const toggleLine = (dataKey: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="mb-2">Registrerade årsredovisningar</CardTitle>
          <CardDescription className="max-w-prose">
            Digitala årsredovisningar registreras alla dagar i veckan, medan pappersbaserade årsredovisningar endast registreras på helgfria
            vardagar.
          </CardDescription>
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
                  <span className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span
                      className="block h-2 w-2 rounded-full bg-slate-300"
                      style={{
                        backgroundColor: isVisible && 'color' in config ? config.color : undefined,
                      }}
                    />
                    {config.label}
                  </span>
                  <span className="text-lg leading-none sm:text-3xl">{total[key as keyof typeof total].toLocaleString('sv-SE')}</span>
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
              top: 24,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} />

            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => value.toLocaleString('sv-SE')} />

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

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-48"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    if (range === 'monthly') {
                      return date.toLocaleDateString('sv-SE', {
                        month: 'long',
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

            <Line
              dataKey="digitala"
              type="monotone"
              stroke={chartConfig.digitala.color}
              strokeWidth={2}
              dot={false}
              name="digitala"
              hide={!visibleLines.digitala}
              isAnimationActive={false}
            />

            <Line
              dataKey="papper"
              type="monotone"
              stroke={chartConfig.papper.color}
              strokeWidth={2}
              dot={false}
              name="papper"
              hide={!visibleLines.papper}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
