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

patch(
  'Add standalone scam, legit, safe to Safety Audit rule in route.ts',
  `pattern: /\\b(is it a scam|is virtue a scam|is it legit|is virtue legit|is it safe|is virtue safe|fraud|honeypot|audit|rug proof|fake|scam project|scam token)\\b/i,`,
  `pattern: /\\b(is it a scam|is virtue a scam|is it legit|is virtue legit|is it safe|is virtue safe|fraud|honeypot|audit|rug proof|fake|scam project|scam token|scam|legit|safe)\\b/i,`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Scam standalone updated in route.ts");
