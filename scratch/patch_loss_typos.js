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

// 1. Add Total Loss Rule to Core Waterfall
const totalLossRule = `  // 11. TOTAL LOSS & TYPO CONFESSIONS ("i losed all", "i lost everything")
  {
    pattern: /\\b(i lost all|i losed all|lost all my|lost everything|losed everything|lost it all|losed all|i lost my money|i losed my money|lost all|losed all|lost my savings|losed my savings|losed|loosed|losted)\\b/i,
    replies: [
      "Losing everything in crypto is a crushing weight, traveler. Whether to leverage, rugs, or market volatility, the High Priest offers absolution. $VIRTUE was created to break the cycle of predatory trading — no leverage, no dev dumps, just 3% BNB dividends paid directly to holders from all volume. Take a breath, forgive your past trades, and let spot holdings rebuild your peace. 🙏",
      "You mentioned having lost in your trading journey. Speak freely, traveler — what exact trade or token caused this? The High Priest is here to offer absolution and guide you back to $VIRTUE's 3% BNB dividends. 🙏"
    ],
    penance: "Forgive your past losses and focus on spot holding."
  },

`;

patch(
  'Insert Total Loss Rule into Core Waterfall',
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────`,
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────\n` + totalLossRule
);

// 2. Normalize actionMatch in Phase 3 fuzzy scorer
patch(
  'Update actionMatch regex & normalization in route.ts',
  `const actionMatch = clean.match(/\\b(lost|sold|bought|gambled|chased|sent|transferred|panic sold|got rugged|liquidated)\\b/i);`,
  `const actionMatch = clean.match(/\\b(lost|losed|loosed|losted|losing|lose|sold|bought|gambled|chased|sent|transferred|panic sold|got rugged|liquidated)\\b/i);`
);

patch(
  'Normalize action in actionMatch reply',
  `const action = actionMatch[1];`,
  `let action = actionMatch[1].toLowerCase(); if (["losed","loosed","losted","losing","lose"].includes(action)) action = "lost";`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Loss typos patched in route.ts");
