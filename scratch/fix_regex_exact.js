const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// Replace the line in runElizaPriest
src = src.replace(
  /replyTemplate = replyTemplate\.replace\(new RegExp\(.*\);\s*/g,
  'replyTemplate = replyTemplate.replace(new RegExp(`\\\\$\${i}`, "g"), () => reflect(match[i].trim()));\n'
);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Regex replacement line fixed!');
