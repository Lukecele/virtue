const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');
const orig = code.length;

function patch(desc, target, replacement) {
  if (!code.includes(target)) {
    console.error(`❌ PATCH FAILED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

// 1. Remove shitcoin & memecoin from bought top confession rule (line ~190)
patch(
  'Remove shitcoin & memecoin from bought-top confession rule',
  `pattern: /\\b(shitcoin|memecoin|chased pump|bought top|bought the top|sold bottom|sold the bottom|ape in|aped in|fomoed into|bought peak)\\b/i,`,
  `pattern: /\\b(chased pump|bought top|bought the top|sold bottom|sold the bottom|ape in|aped in|fomoed into|bought peak)\\b/i,`
);

// 2. Insert SHITCOIN / MEMECOIN / UTILITY rule into core waterfall (near top)
const shitcoinUtilityRule = `  // 4. SHITCOIN / MEMECOIN / UTILITY TOKEN DISAMBIGUATION
  {
    pattern: /\\b(shitcoin|memecoin|shit coin|meme coin|utility token|is this a shitcoin|is virtue a shitcoin|are you a shitcoin|is it a shitcoin|is this a memecoin|are you a memecoin|is virtue a memecoin|memecoin or utility|shitcoin or utility|just a meme|just a memecoin|just a shitcoin|shitcoin or not|memecoin or not)\\b/i,
    replies: [
      "$VIRTUE is a meme token with real on-chain utility! Unlike traditional zero-utility 'shitcoins' that rely purely on hype and rug potential, $VIRTUE rewards holders with continuous 3% BNB dividends from every trade. It combines the viral lore of CZ's tweet ('Forgiveness is a virtue!') with real, verifiable passive yield. Not a zero-value shitcoin — a meme token with an automated income engine! 💎⚡",
      "Is $VIRTUE a shitcoin or a utility token? It is the evolution of both! It carries the viral culture of a meme token inspired by CZ's famous tweet, but acts as a real utility asset by distributing 3% BNB dividends directly to your wallet from all network volume. Locked liquidity, zero minting, no team bags — real yield, not empty promises. 🛡️",
      "Call it a meme token with real yield! Many call all new tokens 'shitcoins' until they inspect the contract: $VIRTUE has 100% locked liquidity on Flap.sh, no dev pre-allocations, and pays holders 3% BNB automatically on every trade. A meme with a real financial engine behind it."
    ],
    penance: "Inspect the contract on BscScan and verify the 3% BNB dividend mechanism."
  },

`;

patch(
  'Insert Shitcoin / Memecoin / Utility rule into Core Waterfall',
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────`,
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────\n` + shitcoinUtilityRule
);

fs.writeFileSync(path, code, 'utf8');
console.log(`Updated. Size: ${code.length}`);
