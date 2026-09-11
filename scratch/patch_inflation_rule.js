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
  'Add inflation to Supply rule pattern in route.ts',
  `pattern: /\\b(supply|total supply|max supply|circulating supply|token supply|how many tokens|how many supply)\\b/i,`,
  `pattern: /\\b(supply|total supply|max supply|circulating supply|token supply|how many tokens|how many supply|is there inflation|inflation)\\b/i,`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Inflation rule updated in route.ts");
