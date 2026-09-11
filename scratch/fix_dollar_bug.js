const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// Replace the line in runElizaPriest where replace is called
src = src.replace(
  /replyTemplate = replyTemplate\.replace\(`\$\{i\}`,\s*reflect\(match\[i\]\.trim\(\)\)\);/g,
  "replyTemplate = replyTemplate.replace(new RegExp(`\\\\$\${i}`, 'g'), () => reflect(match[i].trim()));"
);

src = src.replace(
  /replyTemplate = replyTemplate\.replace\(`\$\$\{i\}`,\s*reflect\(match\[i\]\.trim\(\)\)\);/g,
  "replyTemplate = replyTemplate.replace(new RegExp(`\\\\$\${i}`, 'g'), () => reflect(match[i].trim()));"
);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Line 1158 fixed!');
