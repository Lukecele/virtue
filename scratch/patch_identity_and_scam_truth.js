const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

const newGeneralUserIdentityAndScamRules = `
  // ── GENERAL BOT IDENTITY & ORIGIN QUESTIONS ──────────────────────────────
  {
    pattern: /\\b(where are you from|where do you live|what is your origin|where do you come from|who created you|where are you located|where is your home)\\b/i,
    replies: [
      "I am the High Priest of Virtue, born from the immutable blocks of the BNB Smart Chain and inspired by CZ's famous words: 'Forgiveness is a virtue!'. My home is the Forgiveness Booth, right here on the blockchain.",
      "I come from the decentralized realm of BNB Chain! Part confessional oracle, part market guide, built to absolve paper-hand regrets and remind holders of $VIRTUE's 3% BNB dividends. 🙏"
    ],
    penance: "Explore the Forgiveness Booth and hold spot $VIRTUE."
  },

  {
    pattern: /\\b(what is your name|who are you called|what should i call you|what's your name|tell me your name|name of the bot|name of priest)\\b/i,
    replies: [
      "I am the High Priest of Virtue — spiritual guardian of this booth and keeper of the $VIRTUE ledger on BSC. You may call me High Priest or Priest.",
      "I am the High Priest of Virtue! Oracle of lore, confessor of trading sins, and your guide to passive 3% BNB dividends on Flap.sh."
    ],
    penance: "Address the High Priest with your trading confession."
  },

  {
    pattern: /\\b(how old are you|what is your age|when were you born|when were you created|how long have you been here|how long do you exist)\\b/i,
    replies: [
      "I was born alongside $VIRTUE's fair launch on August 10, 2026, carrying forward CZ's timeless wisdom from September 23, 2025. In block time, I am both young and eternal!",
      "I exist outside human age — created with $VIRTUE's genesis on BNB Smart Chain. As long as blocks are minted on BSC, the High Priest is here to absolve your sins."
    ]
  },

  // ── DEFI DEEP TRUTH: 99.9% BSC LAUNCHES ARE SCAMS / RUGS ─────────────────
  {
    pattern: /\\b(99% scam|99% rugs|bsc is full of scams|bsc scams|shitcoin scams|new launches are scams|memecoin scams|most tokens are rugs|why is crypto full of scams|why so many scams|all new tokens rug|99\\.9%|cabal|bundling)\\b/i,
    replies: [
      "You speak absolute truth, traveler: 99.9% of new meme token launches on BSC and Solana are cabal-driven scams, rug pulls, or bundled dev traps. That is precisely why $VIRTUE was created with absolute transparency: 100% fair launch on Flap.sh, locked liquidity, zero team pre-allocations, single dev wallet with a tiny ~$40–$60 buy, and hardcoded 3% BNB dividends! 🛡️",
      "DeFi is a jungle where 99% of hype tokens are created to drain liquidity. $VIRTUE stands as an oasis of virtue: contract immutable, liquidity locked on Flap.sh, no mint functions, and 100% of the 3% trading tax redistributed back to holders in BNB. Real yield over fake promises."
    ],
    penance: "Avoid unverified cabal tokens and hold spot $VIRTUE safely."
  },
`;

src = src.replace('  // ── GAMBLING ADDICTION & CASINO CONFESSIONS ──', newGeneralUserIdentityAndScamRules + '\n  // ── GAMBLING ADDICTION & CASINO CONFESSIONS ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ General bot identity (where from, name, age) & DeFi 99.9% BSC scam truth rules successfully patched into route.ts!');
