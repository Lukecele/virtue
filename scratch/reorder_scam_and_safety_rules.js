const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

// Remove the Safety, Longterm, WhyBuy, Victim rules from their current lower position
const safetyBlockRegex = /\/\/ ── IS \$VIRTUE A SCAM[\s\S]*?\/\/ ── DISCLAIMER /;
src = src.replace(safetyBlockRegex, '// ── DISCLAIMER ');

const newPreProjectInfoRules = `
  // ── IS $VIRTUE A SCAM / IS THIS LEGIT (Project Safety Check) ──────────────
  {
    pattern: /^\\s*(is this|is virtue|is it|are you|is the project)\\s+(a\\s+)?(scam|legit|scammers|honeypot|fake|safe|fraud)\\b|\\b(is virtue a scam|is this legit|are you scammers|is it safe|is this safe|is it legit|is virtue legit|honeypot check|rug proof)\\b/i,
    replies: [
      \`A scam requires centralized control — but $VIRTUE is 100% out of our hands. It was launched on Flap.sh (BSC), featuring locked liquidity, a verified contract with no mint function, and zero team token allocations. The single developer wallet bought only ~$40–$60 worth on the open market. 100% of the 3% trading tax flows directly back to holders in BNB. Check the contract yourself: \${launchpadUrl} 🛡️\`,
      "$VIRTUE is 100% legit and transparent. Built on Flap.sh on BSC, it features zero sniped bundle wallets, locked liquidity, and an immutable 3% BNB dividend mechanism. No hidden taxes, no dev dumps, and no rug vectors. Code is law, and the ledger does not lie."
    ],
    penance: "Inspect the verified BSC contract on Flap.sh and hold with confidence."
  },

  // ── IS THIS A LONG-TERM PROJECT ───────────────────────────────────────────
  {
    pattern: /\\b(long-term|long term|longterm|long term project|longterm project|future of virtue|will this last|holding long term|sustainability)\\b/i,
    replies: [
      "$VIRTUE is designed for the long term. Unlike pump-and-dump meme coins that decay after days, $VIRTUE rewards continuous holding: 3% of every single buy and sell transaction is distributed in BNB/WBNB directly to holders. As volume fluctuates, continuous rewards compound for diamond hands over months and years. Built to last on BSC.",
      "We are building for the long horizon. Inspired by CZ's famous ethos ('Forgiveness is a virtue!'), $VIRTUE combines viral culture with sustainable 3% BNB dividend tokenomics. No team dumps, no artificial inflation — just real yield for long-term spot holders. 💎🙌"
    ],
    penance: "Hold $VIRTUE long term and compound your BNB dividends."
  },

  // ── WHY BUY $VIRTUE / VALUE PROPOSITION ────────────────────────────────────
  {
    pattern: /\\b(why buy|why should i buy|why buy virtue|why hold virtue|reasons to buy|what makes virtue special|why invest|why \\$?virtue)\\b/i,
    replies: [
      "Why buy $VIRTUE? 1️⃣ Passive Yield: Earn continuous 3% BNB dividends from all trading volume. 2️⃣ 100% Fair Launch: Locked liquidity on Flap.sh with zero team allocations & honest dev entry (~$40-$60 buy). 3️⃣ CZ Lore: Born from CZ's iconic tweet ('Forgiveness is a virtue!'). 4️⃣ No Mint / No Scam: Fully verified BSC contract. Hold spot, earn BNB! 💎",
      "In a market full of rugs and short-lived hype, $VIRTUE pays you real BNB rewards just for holding. Every buy and sell on the network generates 3% tax converted to BNB for holders with 10,000+ tokens. Why hold plain cash when you can earn passive BNB?"
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh and start earning passive dividends."
  },
`;

src = src.replace('  // ── CONTRACT ADDRESS ──', newPreProjectInfoRules + '\n  // ── CONTRACT ADDRESS ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Reordered Safety, Long-term & Why Buy rules above PROJECT INFO in route.ts!');
