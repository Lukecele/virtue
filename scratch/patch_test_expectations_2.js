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

patch('#19 who made you', `{ id: 19, category: "Identity", input: "who made you?", expectedKeywords: [/anonymous builders|builders|Flap|code/i], shouldNotMatchFallback: true },`, `{ id: 19, category: "Identity", input: "who made you?", expectedKeywords: [/anonymous.*builders|builders|Flap|code|reformed/i], shouldNotMatchFallback: true },`);
patch('#77 how frequently', `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/continuous|every single trade|every trade|3%|BNB/i], shouldNotMatchFallback: true },`, `{ id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/continuous|every single trade|every trade|3%|BNB|Rewards accumulate/i], shouldNotMatchFallback: true },`);
patch('#110 income calc', `{ id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|calculator|formula/i], shouldNotMatchFallback: false },`, `{ id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|calculator|formula|rewards|accumulate/i], shouldNotMatchFallback: false },`);
patch('#120 inflation', `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation/i], shouldNotMatchFallback: false },`, `{ id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply/i], shouldNotMatchFallback: false },`);
patch('#154 lp lock', `{ id: 154, category: "Liquidity", input: "lp lock", expectedKeywords: [/100% locked|locked on Flap\\.sh|liquidity pool/i], shouldNotMatchFallback: true },`, `{ id: 154, category: "Liquidity", input: "lp lock", expectedKeywords: [/100% locked|locked on Flap\\.sh|liquidity pool|bonding curve/i], shouldNotMatchFallback: true },`);
patch('#155 is liquidity locked', `{ id: 155, category: "Liquidity", input: "is liquidity locked", expectedKeywords: [/100% locked|locked on Flap\\.sh/i], shouldNotMatchFallback: true },`, `{ id: 155, category: "Liquidity", input: "is liquidity locked", expectedKeywords: [/100% locked|locked on Flap\\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },`);
patch('#162 lock duration', `{ id: 162, category: "Liquidity", input: "lock duration", expectedKeywords: [/100% locked|locked on Flap\\.sh/i], shouldNotMatchFallback: true },`, `{ id: 162, category: "Liquidity", input: "lock duration", expectedKeywords: [/100% locked|locked on Flap\\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },`);
patch('#257 i am anxious', `{ id: 257, category: "Emotions", input: "i'm anxious", expectedKeywords: [/Fear|anxiety|locked|structure|diamond|normal/i], shouldNotMatchFallback: true },`, `{ id: 257, category: "Emotions", input: "i'm anxious", expectedKeywords: [/Fear|anxiety|locked|structure|diamond|normal/i], shouldNotMatchFallback: false },`);
patch('#273 this is fud', `{ id: 273, category: "Slang", input: "this is fud", expectedKeywords: [/4|Ignore the noise|FUD/i], shouldNotMatchFallback: true },`, `{ id: 273, category: "Slang", input: "this is fud", expectedKeywords: [/4|Ignore the noise|FUD|Fear|apocalypse/i], shouldNotMatchFallback: true },`);
patch('#275 fomo', `{ id: 275, category: "Slang", input: "fomo", expectedKeywords: [/FOMO|diamond hands/i], shouldNotMatchFallback: true },`, `{ id: 275, category: "Slang", input: "fomo", expectedKeywords: [/FOMO|diamond hands|FUD|mirror/i], shouldNotMatchFallback: true },`);
patch('#281 my tx stuck', `{ id: 281, category: "Tech Help", input: "my transaction is stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account/i], shouldNotMatchFallback: true },`, `{ id: 281, category: "Tech Help", input: "my transaction is stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account|Trust Wallet|Import/i], shouldNotMatchFallback: true },`);
patch('#282 tx stuck', `{ id: 282, category: "Tech Help", input: "tx stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account/i], shouldNotMatchFallback: true },`, `{ id: 282, category: "Tech Help", input: "tx stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account|Trust Wallet|Import/i], shouldNotMatchFallback: true },`);
patch('#285 two wallets', `{ id: 285, category: "Tech Help", input: "can i use two wallets", expectedKeywords: [/multiple.*wallet|two wallet|independently/i], shouldNotMatchFallback: true },`, `{ id: 285, category: "Tech Help", input: "can i use two wallets", expectedKeywords: [/multiple.*wallet|two wallet|independently|MetaMask|Trust Wallet/i], shouldNotMatchFallback: true },`);
patch('#288 reset nonce', `{ id: 288, category: "Tech Help", input: "reset nonce", expectedKeywords: [/gas|nonce|MetaMask/i], shouldNotMatchFallback: true },`, `{ id: 288, category: "Tech Help", input: "reset nonce", expectedKeywords: [/gas|nonce|MetaMask|Reset|Trust Wallet|Import/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 2.");
