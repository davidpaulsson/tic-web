'use client';

import { ReactTyped } from 'react-typed';

const ticExample = [
  '<span class="text-tic-purple-light">curl</span> https://api.tic.io/search/companies?<br/><span class="text-tic-purple-light">q</span>=+46850565800&amp;<br/><span class="text-tic-purple-light">query_by</span>=phoneNumbers.e164PhoneNumber&amp;<br/><span class="text-tic-purple-light">key</span>=your_api_kwy',
  '<span class="text-tic-purple-light">curl</span> https://api.tic.io/search/companies?<br/><span class="text-tic-purple-light">q</span>=+46850565800&amp;<br/><span class="text-tic-purple-light">query_by</span>=phoneNumbers.e164PhoneNumber&amp;<br/><span class="text-tic-purple-light">key</span>=your_api_key',
];

export const CurlExample = () => {
  return (
    <div className="container">
      <div className="rounded-lg bg-tic p-5 font-mono text-white shadow">
        <pre>
          <ReactTyped startWhenVisible strings={ticExample} typeSpeed={40} contentType="html" />
        </pre>
      </div>
    </div>
  );
};
