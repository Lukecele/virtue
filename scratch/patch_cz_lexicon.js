const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// 1. Add CZ "4" Standalone Intent Rule before greetings
const czFourRule = `
  // ── CZ "4" SIGNATURE RULE ──────────────────────────────────────────────────
  {
    pattern: /^\\s*4\\s*[!.?]*\\s*$/i,
    replies: [
      "4. Ignore FUD, fake news, and noise. Keep BUIDLing $VIRTUE, hold spot, and collect your 3% BNB dividends in peace. 🙏",
      "Rule 4 from CZ: Minimize noise, ignore attacks, stay SAFU, and keep building with diamond hands. 🙏"
    ],
    penance: "Post '4' and 'Forgiveness is a virtue' on X."
  },

`;

src = src.replace('  // ── GREETINGS ──', czFourRule + '  // ── GREETINGS ──');

// 2. Enhance FUD rule with CZ's "4"
src = src.replace(
  `"FUD is the noise between the blocks. It is designed to shake weak hands loose of their positions before the next move. The High Priest does not panic. We buy the FUD dip on Flap.sh and collect BNB dividends while the fudders wait on the sidelines.",`,
  `"CZ taught us the ultimate response to FUD: 4. Ignore the noise, stay SAFU, buy the dip on Flap.sh, and collect 3% BNB dividends while the fudders watch from the sidelines. 🙏",`
);

// 3. Enhance HOLD rule with CZ's famous quote "If you can't hold, you won't be rich"
src = src.replace(
  `"HODL is the first commandment of the Forgiveness Booth. Those who hold spot $VIRTUE are rewarded with 3% BNB dividends from every trade, while the paper hands pay the tax. Are your hands made of diamonds? 💎",`,
  `"CZ said it best: 'If you can't hold, you won't be rich.' HODL is the cornerstone of $VIRTUE. Hold spot, let the 3% BNB tax compound, and stay SAFU. Are your hands made of diamonds? 💎",`
);

// 4. Enhance SAFETY rule with SAFU terminology
src = src.replace(
  `"Flap.sh is a secure BSC launchpad with built-in liquidity locks and contract verification. No team tokens, no presale, no rug vectors. The contract is immutable and the Priest is watching. 👁️"`,
  `"Stay SAFU. $VIRTUE operates on a verified BSC contract with locked liquidity on Flap.sh. Zero mint functions, single dev wallet ($40-$60 buy), and 100% passive BNB dividends paid on-chain. Your holdings stay SAFU. 🛡️"`
);

// 5. Add CZ BUIDL / SAFU rule
const czLexiconRule = `  // ── CZ LEXICON (BUIDL / SAFU / NFA) ───────────────────────────────────────
  {
    pattern: /\\b(buidl|buidling|safu|stay safu|nfa|not financial advice|ignore noise|ignore fud|rule 4)\\b/i,
    replies: [
      "Keep BUIDLing and stay SAFU. CZ's philosophy is embedded in $VIRTUE: simple code, real yield, zero hype. Hold spot, collect 3% BNB dividends, and ignore the noise. NFA, DYOR. 🙏",
      "Stay SAFU, traveler. In these blocks we BUIDL for the long term. 3% of every trade flows to holders as BNB automatically. Remember rule 4: ignore FUD and keep holding."
    ],
    penance: "Keep BUIDLing spot $VIRTUE and stay SAFU."
  },

`;

src = src.replace('  // ── GENERIC QUESTIONS ──', czLexiconRule + '  // ── GENERIC QUESTIONS ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ CZ iconic lexicon (4, BUIDL, SAFU, NFA, quotes) successfully injected!');
