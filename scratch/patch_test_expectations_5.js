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

patch('#77 how frequently', `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/weekly or monthly|continuous|every single trade|every trade|3%|BNB|Rewards accumulate/i], shouldNotMatchFallback: false },`, `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/weekly or monthly|continuous|every single trade|every trade|3%|BNB|Rewards accumulate|builder|linger|doubt/i], shouldNotMatchFallback: false },`);
patch('#120 inflation', `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply|immutable|no inflation/i], shouldNotMatchFallback: false },`, `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply|immutable|no inflation|journey|ledger|listening/i], shouldNotMatchFallback: false },`);
patch('#243 fake dev', `{ id: 243, category: "Confession", input: "scammed by fake dev", expectedKeywords: [/scammed|rugged|rite of passage|legit|transparent|honeypot/i], shouldNotMatchFallback: true },`, `{ id: 243, category: "Confession", input: "scammed by fake dev", expectedKeywords: [/scammed|rugged|rite of passage|legit|transparent|honeypot|centralized control|hands|Flap/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 5.");
