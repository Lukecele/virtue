const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');
const orig = code.length;

function patch(desc, target, replacement, required = true) {
  if (!code.includes(target)) {
    if (required) console.error(`❌ PATCH FAILED (not found): ${desc}\n   TARGET: ${target.substring(0,80)}`);
    else console.warn(`⚠️  SKIPPED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// FIX #21 — Min holding: add "minimum.*tokens|minimum.*for dividend"
// ─────────────────────────────────────────────────────────────────────────────
patch(
  '#21: Expand minimum holding pattern to include tokens (plural)',
  `pattern: /\\b(minimum.*buy|min.*invest|smallest.*buy|how little|at least.*buy|minimum.*amount|min.*purchase|minimum.*hold|how many.*buy|minimum.*token|minimum.*holding)\\b/i,`,
  `pattern: /\\b(minimum.*buy|min.*invest|smallest.*buy|how little|at least.*buy|minimum.*amount|min.*purchase|minimum.*hold|how many.*buy|minimum.*token|minimum.*tokens|minimum.*for dividend|minimum.*for reward|minimum.*to earn|min.*to get|minimum.*quantity)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX #44 — Remove bscscan from DEX rule (bscscan has its own dedicated rule)
// ─────────────────────────────────────────────────────────────────────────────
patch(
  '#44: Remove bscscan from DEX standalone keywords pattern',
  `\\b(dex|dexscreener|ave|ave\\.ai|dextools|bscscan|gecko|coingecko|poocoin|bogged|`,
  `\\b(dex|dexscreener|ave|ave\\.ai|dextools|gecko|coingecko|poocoin|bogged|`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX #53 — Move existing holder rule to BEFORE the forgiveness/lore rule
// The forgiveness/lore rule has "\bvirtue\b" which catches "holding virtue"
// Solution: add "been holding.*virtue" and "holding.*virtue" to the existing
// holder rule that is currently just before the generic hold rule.
// Also fix pattern to catch more variants that precede the lore rule.
// ─────────────────────────────────────────────────────────────────────────────

// First, remove the current existing holder rule (added before hold rule)
patch(
  '#53 step 1: Remove existing holder rule from near hold rule',
  `  // ── EXISTING HOLDER (MUST be before generic hold rule) ────────────────────
  {
    pattern: /\\b(i already.*hold|already.*holding|i.*hold.*virtue|i have.*virtue|i own.*virtue|been holding|i am a holder|i'm a holder|im a holder|already.*bought.*virtue|i hold virtue|i still hold|i've been holding|been in since)\\b/i,
    replies: [
      "A diamond hand in the house of Virtue! You are already on the right side of the 3% tax — every trade by others generates BNB flowing directly to your wallet. Hold through the volatility and watch the passive income accumulate. The blocks reward patience. 💎",
      "Welcome, fellow builder. You are already earning passive BNB from every $VIRTUE trade. Check your accumulated rewards at any time on the Flap Tax Info page — and remember: auto-distribution kicks in at $4. Below that, claim manually at any time. 🙏"
    ],
    penance: "Hold and let the BNB dividends compound passively."
  },

  // ── SHOULD I HOLD (investment advice — before generic hold rule) ──────────`,
  `  // ── SHOULD I HOLD (investment advice — before generic hold rule) ──────────`
);

// Then add the existing holder rule BEFORE the forgiveness/lore rule
patch(
  '#53 step 2: Add existing holder rule BEFORE forgiveness/lore/virtue rule',
  `  // ── FORGIVENESS / LORE / THEMATIC (core theme — was MISSING!) ──────────────`,
  `  // ── EXISTING HOLDER (MUST be before forgiveness/virtue lore rule) ───────────
  {
    pattern: /\\b(i already.*hold|already.*holding|i.*hold.*virtue|i have.*virtue|i own.*virtue|been holding|i am a holder|i'm a holder|im a holder|already.*bought.*virtue|i hold virtue|i still hold|i've been holding|been in since|holding.*virtue|have held|i've held)\\b/i,
    replies: [
      "A diamond hand in the house of Virtue! You are already on the right side of the 3% tax — every trade by others generates BNB flowing directly to your wallet. Hold through the volatility and watch the passive income accumulate. The blocks reward patience. 💎",
      "Welcome, fellow builder. You are already earning passive BNB from every $VIRTUE trade. Check your accumulated rewards at any time on the Flap Tax Info page — and remember: auto-distribution kicks in at $4. Below that, claim manually at any time. 🙏"
    ],
    penance: "Hold and let the BNB dividends compound passively."
  },

  // ── FORGIVENESS / LORE / THEMATIC (core theme — was MISSING!) ──────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX #72 — Add metamask/import/add-token to project info exclusion list
// so "how do I add virtue to metamask" doesn't match project info
// ─────────────────────────────────────────────────────────────────────────────
patch(
  '#72: Add metamask/import/add keywords to project info exclusion list',
  `pattern: /^(?=.*\\b(virtue|\\$virtue|project|token)\\b)(?!.*\\b(buy|bought|buyed|sold|selled|sell|swap|hold|holding|lost|rugged|liquidated|scam|hack|drain|phish|rug|crash|dump|pump|leverage|margin|liquidat|gambl|casino|invest|dyor|safe|legit|fake|fraud|honeypot)\\b).*$/i,`,
  `pattern: /^(?=.*\\b(virtue|\\$virtue|project|token)\\b)(?!.*\\b(buy|bought|buyed|sold|selled|sell|swap|hold|holding|lost|rugged|liquidated|scam|hack|drain|phish|rug|crash|dump|pump|leverage|margin|liquidat|gambl|casino|invest|dyor|safe|legit|fake|fraud|honeypot|metamask|import|add virtue|add token|add.*wallet|withdraw|price|chart|volume|transfer|send|receive|dead|abandon|pangolin|pancake)\\b).*$/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX #74 — Price drop rule must fire before ELIZA "why is (.*)" pattern
// Add price-drop as explicit rule BEFORE the generic ELIZA patterns section
// ─────────────────────────────────────────────────────────────────────────────
patch(
  '#74: Add price drop rule BEFORE ELIZA patterns (so it precedes "why is (.*)")',
  `// ── COMPLEX ELIZA GRAMMAR PARSERS ────────────────────────────────────────`,
  `// ── PRICE DROP / CORRECTION (must be before ELIZA "why is (.*)" pattern) ──
  {
    pattern: /\\b(why.*price.*drop|price.*dropping|price.*falling|price.*down|why.*going down|going to zero|price.*crash|dump|dumping|being dumped|tanking|correction|rug check|is it rugging|red candle|in the red|candle.*red|red.*chart)\\b/i,
    replies: [
      "Price corrections are part of every asset's lifecycle — even the strongest ones. What matters in $VIRTUE is the structure beneath the price: every sell that causes the drop also generates 3% BNB tax paid to all holders. The paper hands fund the diamond hands. Always. 💎",
      "Price is temporary. Structure is permanent. Every sell of $VIRTUE — including the ones causing this drop — generates 3% BNB flowing to every remaining holder. A correction is a discount entry and an income event at the same time. This is the path of the diamond hand. 🙏"
    ],
    penance: "Buy the dip and collect BNB from the sellers."
  },

// ── COMPLEX ELIZA GRAMMAR PARSERS ────────────────────────────────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX #75 — Standalone "virtue price" rule BEFORE project info rule
// ─────────────────────────────────────────────────────────────────────────────
patch(
  '#75: Add anchored virtue price rule BEFORE project info rule',
  `  // ── PROJECT INFO ───────────────────────────────────────────────────────────`,
  `  // ── VIRTUE PRICE EXACT STANDALONE (before project info rule) ───────────────
  {
    pattern: /^\\s*(\\$?virtue\\s+price|price\\s+of\\s+\\$?virtue|\\$?virtue\\s+chart|live\\s+\\$?virtue|\\$?virtue\\s+live|virtue\\s+token\\s+price)\\s*[!?.]*\\s*$/i,
    replies: [
      \`The live $VIRTUE price and chart are available on Flap.sh: https://flap.sh/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777 — real-time price, volume, and market cap. Remember: every sell you see on the chart generates 3% BNB for diamond hand holders. 📊\`,
      "Check the live $VIRTUE price directly on Flap.sh. The Priest does not predict price — he only notes that every trade, up or down, generates 3% BNB tax flowing to holders. Focus on the dividend yield, not the candle color. 🙏"
    ]
  },

  // ── PROJECT INFO ───────────────────────────────────────────────────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX #80 — Expand ok/ack pattern to include word combos
// ─────────────────────────────────────────────────────────────────────────────
patch(
  '#80: Expand ok/ack pattern to handle combos like "ok got it"',
  `pattern: /^\\s*(okay|ok|got it|i see|understood|makes sense|clear|alright|alright then|noted|noted\\.|sure|i understand|i get it|perfect|cool|nice|interesting)\\s*[.!]*\\s*$/i,`,
  `pattern: /^\\s*(okay|ok|got it|i see|understood|makes sense|clear|alright|alright then|noted|noted\\.|sure|i understand|i get it|perfect|cool|nice|interesting|ok got it|okay got it|ok cool|ok nice|yeah ok|yep ok|got it thanks|alright cool|fair enough|sounds good|makes sense thanks|all clear|crystal clear)\\s*[.!?]*\\s*$/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(path, code, 'utf8');
const delta = code.length - orig;
console.log(`\n📄 Written. Size delta: ${delta > 0 ? '+' : ''}${delta} bytes (${orig} → ${code.length})`);
