const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');
const orig = code.length;

function patch(desc, target, replacement, required = true) {
  if (!code.includes(target)) {
    if (required) console.error(`❌ PATCH FAILED (target not found): ${desc}`);
    else console.warn(`⚠️  SKIPPED (already patched?): ${desc}`);
    return;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// BUG A — Rimuovi volume/supply dalla regola market cap (line ~285)
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'BUG A: Remove volume/supply from market cap pattern',
  `pattern: /\\b(market cap|mcap|supply|1 billion|fixed supply|volume|trading volume|tokenomics breakdown)\\b/i,`,
  `pattern: /\\b(market cap|mcap|1 billion|fixed supply|tokenomics breakdown)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// BUG B — Rimuovi test|testing dal filtro gibberish
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'BUG B: Remove test/testing from gibberish filter',
  `pattern: /\\b(ooo|asdf|asd|qwerty|lol|haha|hahaha|xd|lmao|aaa|zzz|test|testing)\\b/i,`,
  `pattern: /\\b(ooo|asdf|asd|qwerty|lol|haha|hahaha|xd|lmao|aaa|zzz)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// BUG C — Aggiungi withdraw variants nella regola claim rewards
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'BUG C: Add withdraw variants to claim rewards pattern',
  `pattern: /\\b(how.*claim|claim.*reward|claim.*bnb|redeem.*reward|how do i get.*bnb|where.*claim|get my bnb|collect.*reward|withdraw.*reward|how.*collect)\\b/i,`,
  `pattern: /\\b(how.*claim|claim.*reward|claim.*bnb|redeem.*reward|how do i get.*bnb|where.*claim|get my bnb|collect.*reward|withdraw.*reward|withdraw.*bnb|withdraw.*dividend|how.*withdraw|withdrawing.*bnb|withdrawing.*reward|how.*collect)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// BUG D — Existing holder rule BEFORE generic hold rule
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'BUG D: Add existing holder rule BEFORE generic hold/hodl rule',
  `  // ── HOLD / HODL ──────────────────────────────────────────────────────────
  {
    pattern: /\\b(hold|hodl|holding|hodling|stack|stacking|accumulate|accumulating)\\b/i,`,
  `  // ── EXISTING HOLDER (MUST be before generic hold rule) ────────────────────
  {
    pattern: /\\b(i already.*hold|already.*holding|i.*hold.*virtue|i have.*virtue|i own.*virtue|been holding|i am a holder|i'm a holder|im a holder|already.*bought.*virtue|i hold virtue|i still hold|i've been holding|been in since)\\b/i,
    replies: [
      "A diamond hand in the house of Virtue! You are already on the right side of the 3% tax — every trade by others generates BNB flowing directly to your wallet. Hold through the volatility and watch the passive income accumulate. The blocks reward patience. 💎",
      "Welcome, fellow builder. You are already earning passive BNB from every $VIRTUE trade. Check your accumulated rewards at any time on the Flap Tax Info page — and remember: auto-distribution kicks in at $4. Below that, claim manually at any time. 🙏"
    ],
    penance: "Hold and let the BNB dividends compound passively."
  },

  // ── SHOULD I HOLD (investment advice — before generic hold rule) ──────────
  {
    pattern: /\\b(should i hold|should i keep holding|should i hodl|should i stay|worth holding|worth keeping|is it worth holding|worth it to hold|good to hold)\\b/i,
    replies: [
      "The Priest does not give financial advice — only confessional wisdom. What I observe: $VIRTUE's 3% BNB dividend mechanism rewards holding. Every correction is an opportunity to lower your average cost while still earning from existing volume. Make decisions with clear eyes and diamond hands. DYOR. 🙏",
      "Whether to hold is your decision — not the Priest's. What I can tell you: $VIRTUE's structure (locked liquidity, immutable 3% tax, fixed supply) does not change with the price. Every trade by others earns BNB for those who hold. The blocks do not change their nature — only paper hands change their minds."
    ],
    penance: "Research, decide with conviction, and never invest more than you can afford to lose."
  },

  // ── HOLD / HODL ──────────────────────────────────────────────────────────
  {
    pattern: /\\b(hold|hodl|holding|hodling|stack|stacking|accumulate|accumulating)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// NEW — PancakeSwap rule (after CEX listing rule)
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'NEW: PancakeSwap rule (currently Flap.sh, migration possible later)',
  `  // ── SLIPPAGE ─────────────────────────────────────────────────────────────`,
  `  // ── PANCAKESWAP / DEX MIGRATION ───────────────────────────────────────────
  {
    pattern: /\\b(pancakeswap|pancake swap|pancake|when pancake|will it be on pancake|pancake migration|migrate to pancake|list on pancake|add pancake)\\b/i,
    replies: [
      "$VIRTUE is currently traded exclusively on Flap.sh — the BSC launchpad of its fair launch. PancakeSwap migration is not yet announced, but as the project grows in volume and community, a migration to PancakeSwap may happen organically. For now, buy and trade on Flap.sh: https://flap.sh/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777 🔗",
      "Currently $VIRTUE lives on Flap.sh — fair launch, locked liquidity, no presale. PancakeSwap is a potential future step as volume and community grow, but no migration date has been announced. Hold spot on Flap.sh and let the project evolve naturally. 🙏"
    ],
    penance: "Buy and hold $VIRTUE on Flap.sh while the community grows."
  },

  // ── SLIPPAGE ─────────────────────────────────────────────────────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// NEW — Calculator standalone rule (before general calculator/earnings rule)
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'NEW: Standalone calculator rule',
  `  // ── HOW MUCH DO I EARN BUYING / HOLDING SPECIFIC AMOUNT OF TOKENS ─────────`,
  `  // ── CALCULATOR STANDALONE ─────────────────────────────────────────────────
  {
    pattern: /^\\s*(calculator|calc|dividend calc|dividend calculator|bnb calculator|earnings calculator|open calculator|use calculator)\\s*[!.?]*\\s*$/i,
    replies: [
      "Open the interactive BNB Dividend Calculator directly on our homepage: https://virtue-ecru.vercel.app/#calculator — enter your token amount and estimated daily volume to see your exact daily, monthly, and yearly BNB rewards in real time. 🧮",
      "The $VIRTUE Dividend Calculator is live on the homepage: https://virtue-ecru.vercel.app/#calculator. Adjust your token holdings and daily trading volume to compute your projected passive BNB income. Uses live Binance BNB prices. 📊"
    ],
    penance: "Use the Dividend Calculator to map your passive BNB income projections."
  },

  // ── HOW MUCH DO I EARN BUYING / HOLDING SPECIFIC AMOUNT OF TOKENS ─────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// NEW — Positive / profitable replies (after WAGMI rule)
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'NEW: Positive and profitable replies',
  `  // ── BULLISH / BEARISH ─────────────────────────────────────────────────────`,
  `  // ── PROFITABLE / POSITIVE TRADE CONFESSIONS ───────────────────────────────
  {
    pattern: /\\b(i made money|i'm profitable|i made profit|in profit|i'm in profit|made gains|made a profit|i won|i'm winning|in the green|all green|good profits|great gains|i profited)\\b/i,
    replies: [
      "A profitable builder in the house of Virtue! Diamond hands rewarded. Keep holding $VIRTUE, let the 3% BNB dividends compound further, and never show paper hands. The Priest is proud. 💎🙌",
      "Profit and virtue walking together — this is the way. Continue holding, continue accumulating passive BNB from every trade, and share the $VIRTUE lore with others. Forgiveness is contagious. 🙏",
      "The ledger records your triumph as well as your sins. Profit is the reward of conviction and patience. Now reinforce your position, hold with diamond hands, and let the 3% BNB dividends compound the victory. 🏆"
    ],
    penance: "Hold your $VIRTUE and let the BNB dividends compound your profits further."
  },

  // ── LOVE / GREAT PROJECT REACTIONS ───────────────────────────────────────
  {
    pattern: /\\b(great project|amazing project|love this project|i love virtue|this is amazing|love this token|best project|awesome project|incredible project|this is brilliant|this is genius|love the concept|great concept)\\b/i,
    replies: [
      "The Priest hears your devotion and blesses it. $VIRTUE was built on real values: fair launch, locked liquidity, and true passive BNB yield. Spread the lore on X and let the community of diamond hands grow. 🙏",
      "Your faith in $VIRTUE is noted in the ledger. Now convert that enthusiasm into action: hold spot, collect 3% BNB dividends from every trade, and share the genesis tweet with the world. 💎"
    ],
    penance: "Share the $VIRTUE lore on X and invite one new diamond hand."
  },

  // ── BULLISH / BEARISH ─────────────────────────────────────────────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// NEW — Where can I sell rule
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'NEW: Where can I sell rule (before general sell rule)',
  `  // ── SELL / SELLING ────────────────────────────────────────────────────────`,
  `  // ── WHERE TO SELL ─────────────────────────────────────────────────────────
  {
    pattern: /\\b(where.*sell|where can i sell|how.*sell|where to sell|sell.*where|which.*exchange.*sell|how do i exit)\\b/i,
    replies: [
      "$VIRTUE can be sold on Flap.sh — the same platform where you buy. Connect your BSC wallet (MetaMask or Trust Wallet), go to the $VIRTUE token page, and swap $VIRTUE back to BNB. Set slippage to 5%. Note: a 3% sell tax is collected and distributed to all remaining holders. Your sell benefits them! 🔄",
      "You can exit your $VIRTUE position on Flap.sh by swapping back to BNB. Remember: your sell generates 3% BNB tax that goes directly to every remaining holder. The diamond hands thank you. ♻️"
    ],
    penance: "Consider holding longer before selling — the BNB dividends compound over time."
  },

  // ── SELL / SELLING ────────────────────────────────────────────────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// NEW — "live price virtue" / "virtue price" specific rule
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'NEW: Virtue price / live price rule',
  `  // ── PRICE / CHART / MARKET CAP ────────────────────────────────────────────`,
  `  // ── VIRTUE PRICE SPECIFIC ─────────────────────────────────────────────────
  {
    pattern: /\\b(virtue price|\\$virtue price|price of virtue|price.*virtue|virtue.*price|virtue chart|virtue.*chart|live price|virtue.*live|live.*virtue)\\b/i,
    replies: [
      \`The live $VIRTUE price and chart are available on Flap.sh: https://flap.sh/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777 — real-time price, volume, and market cap. Remember: every sell you see on the chart generates 3% BNB for diamond hand holders. 📊\`,
      "Check the live $VIRTUE price directly on Flap.sh. The Priest does not predict price — he only notes that every trade, up or down, generates 3% BNB tax flowing to holders. Focus on the dividend yield, not the candle color. 🙏"
    ]
  },

  // ── PRICE / CHART / MARKET CAP ────────────────────────────────────────────`
);

// ─────────────────────────────────────────────────────────────────────────────
// NEW — "i'm done bad things" → general moral/personal guilt (broader)
// FIX — "i done bad things" missing apostrophe variant
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'FIX: Add "i done bad things" to immoral acts pattern',
  `    pattern: /\\b(immoral|immoral things|done immoral|did immoral|bad things|i feel guilty|guilt|shame|ashamed|sinned|i sinned|i did something wrong|wronged someone|done bad things)\\b/i,`,
  `    pattern: /\\b(immoral|immoral things|done immoral|did immoral|bad things|i done bad|i feel guilty|guilt|shame|ashamed|sinned|i sinned|i did something wrong|wronged someone|done bad things|i'm bad|i am bad|i was bad)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX — Add "how to check" / "how do i check" to rewards check pattern
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'FIX: Improve rewards check pattern',
  `    pattern: /\\b(check.*reward|check.*dividend|see.*reward|see.*dividend|track.*reward|track.*dividend|how.*see.*bnb|how.*check.*bnb|monitor.*reward|my.*dividend.*balance|dividend.*balance|reward.*balance|how much.*earned|how much.*accumulated)\\b/i,`,
  `    pattern: /\\b(check.*reward|check.*dividend|see.*reward|see.*dividend|track.*reward|track.*dividend|how.*see.*bnb|how.*check.*bnb|monitor.*reward|my.*dividend.*balance|dividend.*balance|reward.*balance|how much.*earned|how much.*accumulated|how do i check|how to check|check my bnb|see my bnb|view.*reward)\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX — Add "i want to sell" to sell virtue pattern
// ─────────────────────────────────────────────────────────────────────────────
patch(
  'FIX: Add sell intent to specific sell virtue rule',
  `    pattern: /\\b(i|we)\\s*(sold|selled|dumped|panic sold|exited)\\s*(my|our)?\\s*\\$?virtue\\b/i,`,
  `    pattern: /\\b(i|we)\\s*(sold|selled|dumped|panic sold|exited|want to sell|am selling|need to sell)\\s*(my|our)?\\s*\\$?virtue\\b/i,`
);

// ─────────────────────────────────────────────────────────────────────────────
// FIX — Add "how do I add network" + trust wallet tip to wallet help
// ─────────────────────────────────────────────────────────────────────────────
// (already well-covered, skip)

// ─────────────────────────────────────────────────────────────────────────────
// Write patched file
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(path, code, 'utf8');
const delta = code.length - orig;
console.log(`\n📄 File written. Size delta: ${delta > 0 ? '+' : ''}${delta} bytes (${orig} → ${code.length})`);
