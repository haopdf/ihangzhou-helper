// Fix pages where .p-hero is used as text-title (not real banner)
// scenic, coffee use .p-hero for the text title element, conflicting with channel.css
// Rename .p-hero → .p-name and .p-hero-sub → .p-subtitle in those pages

import fs from 'fs';
const base = '/Users/asind/PycharmProjects/ihangzhou-helper';

for (const f of ['scenic.html', 'coffee.html']) {
  let html = fs.readFileSync(`${base}/${f}`, 'utf-8');

  // Only rename inside JS strings (where it's used as title text)
  // '<div class="p-hero">' → '<div class="p-name">'
  html = html.replace(/class="p-hero">/g, 'class="p-name">');
  // .p-hero-sub → .p-subtitle
  html = html.replace(/\.p-hero-sub/g, '.p-subtitle');
  // in CSS too
  html = html.replace(/\.p-hero\s*\{/g, '.p-name {');

  fs.writeFileSync(`${base}/${f}`, html);
  console.log(`OK ${f}`);
}
