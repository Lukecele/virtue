const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;
const claimUrl = `https://flap.sh/bnb/${contractAddress}/taxinfo?lang=en`;

const newHumanAddictionsAndCryptoRules = `
  // ── GAMBLING ADDICTION & CASINO CONFESSIONS ──────────────────────────────
  {
    pattern: /\\b(ludopatic|ludopathy|gambler|gambling|casino|lost all in casino|gambled|roulette|slots|blackjack|poker|betting|lost my savings in casino|chased losses)\\b/i,
    replies: [
      "Gambling and casino games prey on impulse and ruin lives. In crypto as in life, chasing instant jackpots leads to empty hands. True financial freedom is built on patience, spot holding, and real yield like $VIRTUE's 3% BNB distributions. Step away from the casino, seek support if needed, and choose the path of disciplined holding. 🙏",
      "Chasing casino games or gambling apps is a dangerous cycle. The house always wins — except when you hold spot $VIRTUE, where every trade across the network pays 3% BNB dividends back to your wallet. Forgive your casino losses, close the betting apps, and build with spot holding."
    ],
    penance: "Step away from gambling, forgive past losses, and practice disciplined spot holding."
  },

  // ── SUBSTANCE DEPENDENCY & DRUG ADDICTION ─────────────────────────────────
  {
    pattern: /\\b(drug dipendedent|drug dependent|drug addiction|drug addict|addict|substance abuse|hooked on drugs|addicted to drugs|substance dependence|struggling with addiction)\\b/i,
    replies: [
      "Addiction is a heavy battle that tests the human spirit to its core. Acknowledging your struggle is the first step toward reclaiming your life. Surround yourself with supportive people, seek professional guidance, and remember that healing takes place one day — and one block — at a time. The High Priest honors your honesty. 🙏",
      "The Forgiveness Booth holds space for your healing. Overcoming substance dependence takes immense courage. Be gentle with yourself, seek medical or professional help, and take life one step at a time."
    ],
    penance: "Take one healthy step today, seek positive support, and honor your wellbeing."
  },

  // ── TOXIC BEHAVIOR & TOXICITY ──────────────────────────────────────────────
  {
    pattern: /\\b(tossic|toxic|toxic person|toxic behavior|toxic relationship|poisonous person|i'm toxic|i am toxic|being toxic)\\b/i,
    replies: [
      "Recognizing toxic behavior in yourself or your surroundings takes genuine self-awareness. Anger, toxicity, and hostility drain your peace just as FUD drains a portfolio. Choose forgiveness over bitterness, practice empathy, and build healthier connections with those around you. 🙏",
      "Toxicity comes from unhealed wounds. Choosing virtue means replacing toxicity with patience, understanding, and forgiveness — for yourself and others."
    ],
    penance: "Choose kindness over anger and build positive relationships."
  },

  // ── DISHONESTY & LYING CONFESSIONS ────────────────────────────────────────
  {
    pattern: /\\b(tell lies|always lie|always tell lies|lied to|liar|compulsive liar|deceiving people|lying to my)\\b/i,
    replies: [
      "Lies erode the foundation of trust — both in human relationships and on the immutable ledger of life. Truth can be uncomfortable, but living with honesty liberates the soul from paranoia and shame. Commit to transparency, speak the truth, and rebuild trust with those you deceived. 🙏",
      "The blockchain never lies, and true virtue requires the same truthfulness in human speech. Confess your deceit, apologize to those you misled, and walk forward with absolute honesty."
    ],
    penance: "Speak the truth in all things and rebuild trust with honesty."
  },

  // ── FUTURES, LEVERAGE & LIQUIDATION CONFESSIONS ────────────────────────────
  {
    pattern: /\\b(leverage|futures|100x|50x|20x|liquidated|liquidation|margin call|longed|shorted|margin liquidation)\\b/i,
    replies: [
      "Chasing high-leverage futures (50x-100x) is the fastest way to get liquidated by exchange market makers. Leverage trades against you — but spot holding $VIRTUE works for you, generating passive 3% BNB rewards from every buy and sell across the entire network. Delete the futures tab, hold spot, and sleep peacefully! 💎",
      "Getting liquidated on leverage is a harsh lesson in crypto vanity. Futures are designed to wipe out traders. Return to spot holding on BSC, swap BNB for $VIRTUE on Flap.sh (\${launchpadUrl}), and collect passive BNB dividends with zero liquidation risk."
    ],
    penance: "Delete your leverage trading apps and hold spot $VIRTUE."
  },

  // ── BSC NETWORK, GAS FEES & BEP-20 INFO ────────────────────────────────────
  {
    pattern: /\\b(bsc|bnb smart chain|binance smart chain|bep20|bep-20|gas fee|gas fees|gwei|network fees)\\b/i,
    replies: [
      "BNB Smart Chain (BSC / BEP-20) is known for high speed and ultra-low gas fees (usually just a few cents per transaction). $VIRTUE operates natively on BSC, meaning 100% of the 3% trading tax is converted directly to native BNB/WBNB and paid out on-chain with minimal gas overhead!",
      "Operating on BSC ensures that holders keep their earnings without losing them to high gas fees. Gas fees on BSC require only a tiny fraction of BNB (~$0.05). Hold spot $VIRTUE, keep a tiny bit of BNB for gas, and receive continuous dividend payouts."
    ],
    penance: "Ensure you keep ~0.005 BNB in your wallet for BSC gas fees."
  },

  // ── FLAP.SH LAUNCHPAD & TAX INFO PAGE ─────────────────────────────────────
  {
    pattern: /\\b(flap|flap\\.sh|launchpad|liquidity lock|locked liquidity|tax info|taxinfo|claim portal)\\b/i,
    replies: [
      \`Flap.sh is the official fair launchpad for $VIRTUE on BSC. It guarantees 100% locked liquidity, verified contract code, no dev pre-allocations, and an automated 3% BNB dividend mechanism. To trade or claim rewards under $4, use the official Flap.sh Tax Info page (\${claimUrl}). 🔒\`,
      \`Everything for $VIRTUE is verified on Flap.sh. 100% fair launch, zero team snipers, and locked liquidity. Swap BNB for $VIRTUE directly at: \${launchpadUrl}\`
    ],
    penance: "Verify locked liquidity on Flap.sh and trade safely."
  },

  // ── MARKET CAP, SUPPLY & TOKENOMICS MATH ───────────────────────────────────
  {
    pattern: /\\b(market cap|mcap|supply|1 billion|fixed supply|volume|trading volume|tokenomics breakdown)\\b/i,
    replies: [
      "$VIRTUE has a total fixed supply of 1,000,000,000 (1 Billion) tokens with zero minting functionality. Every buy and sell generates a 3% tax dedicated entirely to BNB dividend distributions for holders with at least 10,000 tokens (0.001% of supply). As daily volume grows, dividends scale directly!",
      "Tokenomics summary: Supply = 1 Billion $VIRTUE. Buy/Sell Tax = 3% (100% converted to BNB dividends for holders). Min holding for dividends = 10,000 $VIRTUE. Auto WBNB payouts at $4+, manual claims below $4 on Flap Tax Info."
    ],
    penance: "Run volume projections on the homepage Dividend Calculator."
  },
`;

src = src.replace('  // ── MALICIOUS INTENT / WANTING TO SCAM ──', newHumanAddictionsAndCryptoRules + '\n  // ── MALICIOUS INTENT / WANTING TO SCAM ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Human addictions (ludopathy, drugs, toxicity, lying) & crypto knowledge rules (futures, BSC gas, Flap, mcap) successfully patched into route.ts!');
