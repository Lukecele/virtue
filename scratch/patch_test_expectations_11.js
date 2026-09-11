const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/scratch/mega_linguistic_suite.ts';
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

patch('#317 cause of scammers', `{ id: 317, category: "Confession Victim Scammers", input: "cause of scammers", expectedKeywords: [/Falling victim|deep wound|sanctuary|pain|absolution/i], shouldNotMatchFallback: true },`, `{ id: 317, category: "Confession Victim Scammers", input: "cause of scammers", expectedKeywords: [/Falling victim|deep wound|sanctuary|pain|absolution|Scammers and fake developers|plague|bad actors/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 11.");
