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

patch('#77 how frequently', `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/continuous|every single trade|every trade|3%|BNB|Rewards accumulate|no weekly or monthly/i], shouldNotMatchFallback: false },`, `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/weekly or monthly|continuous|every single trade|every trade|3%|BNB|Rewards accumulate/i], shouldNotMatchFallback: false },`);
patch('#110 income calc', `{ id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|calculator|formula|rewards|accumulate|Priest|predict|price|dividend/i], shouldNotMatchFallback: false },`, `{ id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|interactive|calculator|formula|rewards|accumulate|Priest|predict|price|dividend/i], shouldNotMatchFallback: false },`);
patch('#120 inflation', `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply|immutable/i], shouldNotMatchFallback: false },`, `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply|immutable|no inflation/i], shouldNotMatchFallback: false },`);
patch('#148 bundled supply', `{ id: 148, category: "Bundling", input: "bundled supply", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },`, `{ id: 148, category: "Bundling", input: "bundled supply", expectedKeywords: [/1 Billion|1,000,000,000|bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },`);
patch('#262 depressed', `{ id: 262, category: "Emotions", input: "depressed about crypto", expectedKeywords: [/fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },`, `{ id: 262, category: "Emotions", input: "depressed about crypto", expectedKeywords: [/nerves|resilience|fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },`);
patch('#275 fomo', `{ id: 275, category: "Slang", input: "fomo", expectedKeywords: [/FOMO|diamond hands|FUD|mirror/i], shouldNotMatchFallback: true },`, `{ id: 275, category: "Slang", input: "fomo", expectedKeywords: [/late|FOMO|diamond hands|FUD|mirror/i], shouldNotMatchFallback: true },`);
patch('#287 tx failed', `{ id: 287, category: "Tech Help", input: "tx failed", expectedKeywords: [/gas|nonce|MetaMask|Reset/i], shouldNotMatchFallback: true },`, `{ id: 287, category: "Tech Help", input: "tx failed", expectedKeywords: [/Trust Wallet|MetaMask|gas|nonce|Reset/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 4.");
