'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

import { json } from './json';

export function CurlExample() {
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  return (
    <div className="container grid grid-cols-4 gap-5">
      <div className="col-span-1 rounded-xl bg-slate-950 p-5">
        <ul className="space-y-5">
          <li>
            <button className="rounded-lg bg-slate-800 p-5 text-left transition-opacity" onClick={() => scrollTo('intelligence')}>
              <span className="block text-pretty text-slate-50">Intelligence Score</span>
              <span className="block text-pretty text-sm text-slate-300">
                Vi betygssätter alla brister och fel i information vi hittar.
              </span>
            </button>
          </li>
          <li>
            <button className="rounded-lg bg-slate-800 p-5 text-left opacity-50 transition-opacity hover:opacity-75">
              <span className="block text-pretty text-slate-50">Ekonomisk översikt</span>
              <span className="block text-pretty text-sm text-slate-300">Följ enkelt finansiell data om företaget.</span>
            </button>
          </li>
          <li>
            <button className="rounded-lg bg-slate-800 p-5 text-left opacity-50 transition-opacity hover:opacity-75">
              <span className="block text-pretty text-slate-50">Dokument och ärendehistorik</span>
              <span className="block text-pretty text-sm text-slate-300">Ladda hem årsredovisningar och följ ärendehistorik.</span>
            </button>
          </li>
          <li>
            <button className="rounded-lg bg-slate-800 p-5 text-left opacity-50 transition-opacity hover:opacity-75">
              <span className="block text-pretty text-slate-50">Försäljning till offentliga aktörer</span>
              <span className="block text-pretty text-sm text-slate-300">
                Se försäljning till offentliga aktörer, kommuner, myndigheter, mfl.
              </span>
            </button>
          </li>
        </ul>
      </div>
      <ScrollArea
        id="response"
        className="col-span-3 h-96 scroll-smooth rounded-xl bg-slate-950 p-5 font-mono text-sm [&_span]:whitespace-pre-wrap"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: json,
          }}
        />
      </ScrollArea>
    </div>
  );
}
