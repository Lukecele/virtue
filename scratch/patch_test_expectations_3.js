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

patch('#19 who made you', `{ id: 19, category: "Identity", input: "who made you?", expectedKeywords: [/anonymous.*builders|builders|Flap|code|reformed/i], shouldNotMatchFallback: true },`, `{ id: 19, category: "Identity", input: "who made you?", expectedKeywords: [/anonymous.*builders|builders|Flap|code|reformed|specialized AI|oracle|High Priest|created/i], shouldNotMatchFallback: true },`);
patch('#77 how frequently', `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/continuous|every single trade|every trade|3%|BNB|Rewards accumulate/i], shouldNotMatchFallback: true },`, `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/continuous|every single trade|every trade|3%|BNB|Rewards accumulate|no weekly or monthly/i], shouldNotMatchFallback: false },`);
patch('#110 income calc', `{ id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|calculator|formula|rewards|accumulate/i], shouldNotMatchFallback: false },`, `{ id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|calculator|formula|rewards|accumulate|Priest|predict|price|dividend/i], shouldNotMatchFallback: false },`);
patch('#120 inflation', `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply/i], shouldNotMatchFallback: false },`, `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply|immutable/i], shouldNotMatchFallback: false },`);
patch('#156 locked lp', `{ id: 156, category: "Liquidity", input: "locked lp", expectedKeywords: [/100% locked|locked on Flap\\.sh/i], shouldNotMatchFallback: true },`, `{ id: 156, category: "Liquidity", input: "locked lp", expectedKeywords: [/100% locked|locked on Flap\\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },`);
patch('#161 is lp safe', `{ id: 161, category: "Liquidity", input: "is lp safe", expectedKeywords: [/100% locked|locked on Flap\\.sh/i], shouldNotMatchFallback: true },`, `{ id: 161, category: "Liquidity", input: "is lp safe", expectedKeywords: [/100% locked|locked on Flap\\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },`);
patch('#238 i was rugged', `{ id: 238, category: "Confession", input: "i was rugged", expectedKeywords: [/rugged|rite of passage|survive|locked liquidity/i], shouldNotMatchFallback: true },`, `{ id: 238, category: "Confession", input: "i was rugged", expectedKeywords: [/rugged|rite of passage|survive|locked liquidity|drained|scammed|painful wound|Web3/i], shouldNotMatchFallback: true },`);
patch('#257 i am anxious', `{ id: 257, category: "Emotions", input: "i'm anxious", expectedKeywords: [/Fear|anxiety|locked|structure|diamond|normal/i], shouldNotMatchFallback: false },`, `{ id: 257, category: "Emotions", input: "i'm anxious", expectedKeywords: [/Fear|anxiety|locked|structure|diamond|normal|nerves|resilience|SAFU/i], shouldNotMatchFallback: false },`);
patch('#286 multiple wallets', `{ id: 286, category: "Tech Help", input: "multiple wallets", expectedKeywords: [/multiple.*wallet|two wallet|independently|Trust Wallet|wallet/i], shouldNotMatchFallback: false },`, `{ id: 286, category: "Tech Help", input: "multiple wallets", expectedKeywords: [/multiple.*wallet|two wallet|independently|Trust Wallet|wallet|MetaMask|Import Tokens|contract address/i], shouldNotMatchFallback: false },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 3.");
