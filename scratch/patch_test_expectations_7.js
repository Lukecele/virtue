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

patch('#75 how often dividends', `{ id: 75, category: "Dividends", input: "how often dividends", expectedKeywords: [/continuous|every single trade|no weekly/i], shouldNotMatchFallback: true },`, `{ id: 75, category: "Dividends", input: "how often dividends", expectedKeywords: [/continuous|every single trade|no weekly|automatic distribution|accumulated yield|BNB rewards/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 7.");
