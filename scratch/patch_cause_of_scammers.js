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
  'Fix cause of scammers regex pattern in route.ts',
  `pattern: /\\b((cause|because|due to|by|from)\\s+scammers?|scammers?\\s+(took|stole|drained|ruined|got me)|(got|was|been)\\s+scammed|lost.*scammers?|scammed by|scammer took|scammer stole|fake dev scam)\\b/i,`,
  `pattern: /\\b((cause|because|due to|by|from)\\s+(of\\s+)?scammers?|scammers?\\s+(took|stole|drained|ruined|got me)|(got|was|been)\\s+scammed|lost.*scammers?|scammed by|scammers?|scammer took|scammer stole|fake dev scam)\\b/i,`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Regex pattern fixed in route.ts");
