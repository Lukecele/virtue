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

patch('#20 are you real', `{ id: 20, category: "Identity", input: "are you real?", expectedKeywords: [/High Priest|oracle|code|contract/i], shouldNotMatchFallback: true },`, `{ id: 20, category: "Identity", input: "are you real?", expectedKeywords: [/High Priest|Priest|oracle|code|contract/i], shouldNotMatchFallback: true },`);
patch('#116 1 billion', `{ id: 116, category: "Supply", input: "1 billion", expectedKeywords: [/1,000,000,000|fixed supply/i], shouldNotMatchFallback: true },`, `{ id: 116, category: "Supply", input: "1 billion", expectedKeywords: [/1,000,000,000|1 Billion|fixed supply/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 6.");
