const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');

function patch(desc, target, replacement) {
  if (!code.includes(target)) {
    console.error(`❌ PATCH FAILED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

// 1. Remove scammers from line 703 defensive scam rule
patch(
  'Remove scammers from general scam query rule',
  `pattern: /\\b(scam|scammers|legit|safe|safety|fraud|honeypot|audit|rug proof|fake)\\b/i,`,
  `pattern: /\\b(is it a scam|is virtue a scam|is it legit|is virtue legit|is it safe|is virtue safe|fraud|honeypot|audit|rug proof|fake|scam project|scam token)\\b/i,`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Scammer order updated in route.ts");
