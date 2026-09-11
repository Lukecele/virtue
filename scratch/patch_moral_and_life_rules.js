const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

// NEW RULES FOR MORAL SINS, SCAMMERS, BNB ACTIONS & LIFE JOURNEYS
const moralAndLifeRules = `
  // ── SCAMMER & DECEIT CONFESSIONS ──────────────────────────────────────────
  {
    pattern: /\\b(scammer|scammed|stole|rugged people|rugged others|i'm a scammer|i am a scammer|i'm scammer|cheated people|stole crypto)\\b/i,
    replies: [
      "To scam or deceive others is the heaviest weight a soul can carry in these blocks. But true repentance begins with honest confession. Return what you took where possible, turn away from deceit, and walk the path of honest building. In $VIRTUE, we believe even past mistakes can be forgiven if you choose to build with integrity today. 🙏",
      "Confessing to scamming takes raw honesty. The blockchain records all actions — but your future is not written in stone. Make restitution, renounce scams, buy spot $VIRTUE on Flap.sh, and let your future trades pay honest 3% BNB dividends to the community."
    ],
    penance: "Make restitution for past harms, renounce scams, and build with honesty."
  },

  // ── IMMORAL ACTS & GENERAL MORAL GUILT ───────────────────────────────────
  {
    pattern: /\\b(immoral|immoral things|done immoral|did immoral|bad things|i feel guilty|guilt|shame|ashamed|sinned|i sinned|i did something wrong|wronged someone|done bad things)\\b/i,
    replies: [
      "The ledger of life records our stumbles as well as our triumphs. If you have done immoral things or lost your way, acknowledge the wrongdoing, seek forgiveness from those you harmed, and strive to build with honor going forward. Forgiveness is a virtue — both for others and for yourself. 🙏",
      "We all carry moments we are not proud of. The Forgiveness Booth exists to remind you that your past does not define your future. Forgive your stumbles, make amends where possible, and walk with a clean conscience."
    ],
    penance: "Make amends where you can, forgive yourself, and walk with an honest heart."
  },

  // ── BOUGHT BNB ACTION ─────────────────────────────────────────────────────
  {
    pattern: /\\b(i|we)\\s*(bought|buyed|buy|acquired|got|hold|holding|stacked)\\s*(my|our)?\s*(bnb|binance coin)\\b/i,
    replies: [
      \`Holding BNB is the fuel of the BNB Smart Chain! Now you are ready for the next step: swap BNB for $VIRTUE on Flap.sh (\${launchpadUrl}) to enter the 3% dividend pool and start earning passive BNB on every trade. 💎\`,
      \`Acquiring BNB is a strong move on BSC! To start compounding your BNB holdings, swap for $VIRTUE on Flap.sh (\${launchpadUrl}). Every buy and sell across the network will distribute 3% BNB taxes back to your wallet.\`
    ],
    penance: "Swap your BNB for $VIRTUE on Flap.sh to earn continuous dividends."
  },

  // ── SOLD BNB ACTION ───────────────────────────────────────────────────────
  {
    pattern: /\\b(i|we)\\s*(sold|selled|dumped|exited)\\s*(my|our)?\s*(bnb|binance coin)\\b/i,
    replies: [
      "Selling your BNB exits your position in the BNB Smart Chain ecosystem. Was it to take profit or out of fear? The ledger recorded your exit — but whenever you are ready, you can return, acquire BNB, and swap for $VIRTUE on Flap.sh to earn 3% dividends on every trade. 🙏"
    ],
    penance: "Reaccumulate BNB and hold spot $VIRTUE with diamond hands."
  },

  // ── GENERAL LIFE JOURNEY & PERSONAL STRUGGLES ──────────────────────────────
  {
    pattern: /\\b(my journey|life journey|feel lost|lost my way|depressed|hard times|struggling|bad choices|regret my choices|made a mistake in life|life is hard)\\b/i,
    replies: [
      "Every traveler in these blocks walks a unique and often difficult journey. Mistakes and regrets are not the end of your story — they are lessons carved into your block height. Forgive your past stumbles, focus on the present, and build step by step toward a better tomorrow. 🙏",
      "The journey of life has bear markets and bull runs. In moments of hardship or doubt, remember CZ's words: 'Forgiveness is a virtue!' Forgive yourself for past decisions, stay resilient, and keep building."
    ],
    penance: "Forgive your past mistakes and take one positive step forward today."
  },
`;

src = src.replace('  // ── CZ "4" SIGNATURE RULE ──', moralAndLifeRules + '\n  // ── CZ "4" SIGNATURE RULE ──');

// REPLACE GENERIC PENANCES WITH CONTEXT-APPROPRIATE ONES
const oldGenericPenances = `const genericPenances = [
  "Buy spot $VIRTUE on Flap.sh and hold.",
  "Tell another builder: 'Forgiveness is a virtue.' 🙏",
  "Collect your BNB dividends passively and hold through the next dip.",
  "Share the CZ tweet lore on X: https://x.com/cz_binance/status/1970358398760952106",
  "Forgive your developer, forgive the dip, and stack $VIRTUE.",
  "Set slippage to 5% and complete your swap on Flap.sh.",
  "Delete the leverage app and buy spot $VIRTUE."
];`;

const newGenericPenances = `const genericPenances = [
  "Forgive your past mistakes and move forward with conviction.",
  "Tell another builder: 'Forgiveness is a virtue.' 🙏",
  "Hold spot $VIRTUE with diamond hands and collect your 3% BNB dividends.",
  "Share the CZ tweet lore on X: https://x.com/cz_binance/status/1970358398760952106",
  "Forgive your developer, forgive the dip, and keep building."
];`;

src = src.replace(oldGenericPenances, newGenericPenances);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Moral sin, scammer, BNB action & life journey rules successfully patched into route.ts!');
