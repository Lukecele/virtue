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

const coreKeywordsWaterfall = `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────
  // 1. LIQUIDITY / LP / LOCKED LIQUIDITY
  {
    pattern: /\\b(liquidity|lp|liquidity locked|locked liquidity|lp locked|locked lp|liquidity lock|lock liquidity|lp lock|lock lp|is liquidity locked|is lp locked)\\b/i,
    replies: [
      \`The liquidity for $VIRTUE is 100% locked on Flap.sh — this prevents team drains or rug pulls. 100% of initial LP was locked permanently at fair launch on BSC. You can inspect the live pool and lock details directly on Flap.sh: \${launchpadUrl} 🔒\`,
      "The $VIRTUE liquidity pool is permanently locked on Flap.sh. No developer or insider can remove or drain liquidity. The trading pool is safe, public, and fully immutable."
    ],
    penance: "Verify the locked liquidity status on Flap.sh."
  },

  // 2. SUPPLY / TOTAL SUPPLY / MAX SUPPLY
  {
    pattern: /\\b(supply|total supply|max supply|circulating supply|token supply|how many tokens|how many supply)\\b/i,
    replies: [
      \`$VIRTUE has a fixed total supply of 1,000,000,000 tokens (1 Billion). 100% circulating from day zero on Flap.sh, with zero team allocations, zero locked dev bags, and no mint function. Fixed forever. 📊\`,
      "Total supply is 1 Billion $VIRTUE (1,000,000,000). All tokens are in circulation with locked liquidity. There is no mint function and no inflation."
    ],
    penance: "Calculate your supply share using the homepage calculator."
  },

  // 3. TAX / FEES / BUY TAX / SELL TAX
  {
    pattern: /\\b(tax|taxes|buy tax|sell tax|transfer tax|tax rate|how much tax|3% tax|tax %)\\b/i,
    replies: [
      "$VIRTUE features a clean 3% buy tax and 3% sell tax. 100% of all taxes collected are converted to BNB and distributed directly to holders with at least 10,000 tokens. Zero dev tax, zero marketing cut, zero treasury fee. Pure passive yield. 💰",
      "The tax is 3% on buys and 3% on sells. 100% of the tax goes to BNB dividends for holders. There are no hidden fees or team cuts."
    ],
    penance: "Collect your share of the 3% BNB tax pool."
  },

`;

patch(
  'Insert Core Domain Keyword Waterfall after Help Menu',
  `  // ── EARLY SELLER REGRET & MISSED 100X GAINS ────────────────────────────────`,
  coreKeywordsWaterfall + `  // ── EARLY SELLER REGRET & MISSED 100X GAINS ────────────────────────────────`
);

fs.writeFileSync(path, code, 'utf8');
console.log(`Updated. Size: ${code.length}`);
