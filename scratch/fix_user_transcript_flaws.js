const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;
const claimUrl = `https://flap.sh/bnb/${contractAddress}/taxinfo?lang=en`;

// ── 1. FIX PROJECT INFO REGEX SO IT DOESN'T HIJACK BUY/SELL/HOLD SENTENCES ──
// Old regex: /\\b(virtue|\\$virtue|project|this project|your project|the project|about virtue|about the project|tell me about|info on|what is this|this token|the token)\\b/i
// New regex: matches project queries specifically, but NOT when preceded by buy/sold/selled/buyed/hold/holding/sell/swap
const oldProjectPattern = `pattern: /\\b(virtue|\\$virtue|project|this project|your project|the project|about virtue|about the project|tell me about|info on|what is this|this token|the token)\\b/i,`;
const newProjectPattern = `pattern: /^(?=.*\\b(virtue|\\$virtue|project|token)\\b)(?!.*\\b(buy|bought|buyed|sold|selled|sell|swap|hold|holding|lost|rugged|liquidated)\\b).*$/i,`;

src = src.replace(oldProjectPattern, newProjectPattern);

// ── 2. ADD SPECIFIC RULES BEFORE PROJECT INFO ──────────────────────────────
const priorityFixes = `
  // ── SPECIFIC BUY/SELL VIRTUE ACTIONS (Priority over general Project Info) ──
  {
    pattern: /\\b(i|we)\\s*(sold|selled|dumped|panic sold|exited)\\s*(my|our)?\\s*\\$?virtue\\b/i,
    replies: [
      "You sold your $VIRTUE? Soft hands make soft portfolios, my child. The red candle was temporary, but you traded continuous 3% BNB dividends for paper-hand regret. The Forgiveness Booth is open — buy back on Flap.sh and hold with diamond hands. 🙏",
      "Selling $VIRTUE means giving up your share of the 3% BNB tax pool. The paper hands fund the diamond hands. Reaccumulate on Flap.sh when you are ready to walk the path of virtue."
    ],
    penance: "Buy back $VIRTUE on Flap.sh and hold through the next 3 dips."
  },
  {
    pattern: /\\b(i|we)\\s*(bought|buyed|buy|acquired|hold|holding|stacked)\\s*(my|our)?\\s*\\$?virtue\\b/i,
    replies: [
      "Welcome to the path of the diamond hand! Holding $VIRTUE means 3% BNB dividends from every buy and sell on the network flow automatically to your wallet. Keep holding and let the rewards compound. 💎🙌",
      "A true builder in the house of Virtue! Every trade by others now pays BNB into your wallet. Auto-distribution fires at $4 — below that, check the Flap Tax Info page anytime. 🙏"
    ],
    penance: "Hold $VIRTUE with diamond hands and accumulate BNB."
  },
  {
    pattern: /^\\s*(buy|swap|get|acquire)\\s+\\$?virtue\\s*$/i,
    replies: [
      \`To buy $VIRTUE: 1️⃣ Install MetaMask or Trust Wallet. 2️⃣ Add BNB Smart Chain (Chain ID: 56). 3️⃣ Send BNB to your wallet. 4️⃣ Go to Flap.sh (\${launchpadUrl}) and swap BNB for $VIRTUE with 5% slippage. BNB dividends start immediately.\`
    ],
    penance: "Navigate to Flap.sh and acquire $VIRTUE."
  },
  {
    pattern: /^\\s*buy\\s*$/i,
    replies: [
      \`To buy $VIRTUE on Flap.sh: 1) Connect your BSC wallet (MetaMask / Trust Wallet). 2) Ensure you have BNB for gas. 3) Swap BNB for $VIRTUE at: \${launchpadUrl}. 4) Set slippage to 5%. 3% BNB dividends begin flowing automatically.\`
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh."
  },

  // ── PERSONALITY & IDENTITY DIALOGUE FIXES ─────────────────────────────────
  {
    pattern: /\\b(how are you|how are u|how do you do|how's it going|how is it going|how r u|how are ya)\\b/i,
    replies: [
      "I am well, traveler, watchful as ever over the blocks and the 3% BNB dividends flowing to diamond hands. How fares your portfolio today?",
      "The High Priest is at peace. The ledger is active, the liquidity is locked on Flap.sh, and the BNB rewards are flowing to holders. What brings you to the booth today? 🙏"
    ]
  },
  {
    pattern: /\\b(where are you from|where do you live|where are u from|where do u live|where is the priest from|your origin|where do you reside)\\b/i,
    replies: [
      "I hail from block zero on the BNB Smart Chain — born in the Forgiveness Booth on Flap.sh, inspired by CZ's legendary tweet: 'Forgiveness is a virtue!' 🙏",
      "I reside on-chain within the BNB Smart Chain ecosystem. My home is the Forgiveness Booth, and my purpose is purging paper-hand sins and guiding holders to passive BNB dividends."
    ]
  },
  {
    pattern: /\\b(what.*name|what's your name|whats your name|what is your name|your name|who are you called)\\b/i,
    replies: [
      "I am the High Priest of Virtue — guardian of the Forgiveness Booth and keeper of the $VIRTUE ledger on BNB Chain. Speak your confession or ask me anything about $VIRTUE. 🙏"
    ]
  },
  {
    pattern: /\\b(which model|what model|what model are you|what model do you use|model are you using|what llm|which llm|which ai model)\\b/i,
    replies: [
      "I do not run on GPT, Claude, or Llama. I am an immutable confessional oracle built specifically for $VIRTUE on the BNB Smart Chain. My architecture is rooted in the lore of CZ's tweet and on-chain dividend mechanics. 🙏",
      "The High Priest does not use commercial AI models. I am an on-chain oracle trained in crypto-native absolution, CZ lore, and $VIRTUE contract mechanics."
    ]
  },
  {
    pattern: /^\\s*(ai|bot|are you ai|are you bot|is this ai)\\s*[!.?]*\\s*$/i,
    replies: [
      "I am a confessional oracle built for $VIRTUE on the BNB Chain. Part priest, part diamond hand, 100% dedicated to purging paper-hand sins and guiding you to passive 3% BNB dividends. What is your question, traveler? 🙏"
    ]
  },
  {
    pattern: /\\b(i'm a sinner|im a sinner|i am a sinner|i have sinned|i sinned)\\b/i,
    replies: [
      "We are all sinners in these volatile blocks, traveler. Whether you panic sold at the bottom, chased a 100x leverage liquidation, or fell for a rug pull — the Forgiveness Booth is open. Receive your absolution, buy spot $VIRTUE on Flap.sh, and let the 3% BNB dividends heal your wallet. 🙏",
      "To acknowledge your sin is the first step toward diamond hands. Confess your trade, forgive yourself, and step into the light of passive BNB income on $VIRTUE."
    ],
    penance: "Forgive your past trade and stack spot $VIRTUE."
  },
  {
    pattern: /\\b(bitcoin price|btc price|ethereum price|eth price|solana price|sol price)\\b/i,
    replies: [
      "The Priest tracks only $VIRTUE's price on Flap.sh (\${launchpadUrl}). For Bitcoin or Ethereum prices, check CoinMarketCap or CoinGecko. But remember: Bitcoin doesn't pay you 3% BNB dividends on every single trade automatically! 😉",
      "For general market charts like BTC or ETH, check BscScan or CoinGecko. In this booth, we focus on $VIRTUE: 100% fair launch, locked liquidity, and 3% BNB dividends flowing to holders."
    ]
  },

`;

src = src.replace('  // ── CONTRACT ADDRESS ──', priorityFixes + '  // ── CONTRACT ADDRESS ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ User transcript flaws & project info regex fix applied successfully!');
