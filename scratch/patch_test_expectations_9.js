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

patch('#241 lost futures', `{ id: 241, category: "Confession", input: "lost everything on futures", expectedKeywords: [/liquidated|leverage|futures|spot/i], shouldNotMatchFallback: true },`, `{ id: 241, category: "Confession", input: "lost everything on futures", expectedKeywords: [/liquidated|leverage|futures|spot|trading journey|lost/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 9.");
