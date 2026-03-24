'use client';

import { useState } from 'react';

const labels = {
  en: { heading: 'Language', switch: 'Switch to Hindi' },
  hi: { heading: 'भाषा', switch: 'अंग्रेज़ी पर जाएँ' }
};

export function LanguageToggle() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-slate-500">{labels[lang].heading}</span>
      <button
        className="rounded-full border px-2 py-1"
        onClick={() => setLang((prev) => (prev === 'en' ? 'hi' : 'en'))}
      >
        {labels[lang].switch}
      </button>
    </div>
  );
}
