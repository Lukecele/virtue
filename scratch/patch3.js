/**
 * PATCH 3 — Gap-filling based on gap analysis
 * Covers: ticker/symbol, launch date, dividend frequency, token import,
 * "bought the top", emotional states, price drop questions, tx issues,
 * tax questions, DCA, tokenomics summary, website, CZ awareness,
 * "is 3% high?", "can tax change?", invest X amount, etc.
 * Also fixes overly broad ELIZA rules ("i am", "do you", "what is")
 */

const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const insertBefore = '  // ── GENERIC QUESTIONS ──';
if (!src.includes(insertBefore)) {
  console.error('❌ Could not find insertion point!');
  process.exit(1);
}

const contractAddress = '0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777';
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;
const claimUrl = `https://flap.sh/bnb/${contractAddress}/taxinfo?lang=en`;
const bscscanUrl = `https://bscscan.com/token/${contractAddress}`;

const patch3 = `
  // ── TICKER / SYMBOL ──────────────────────────────────────────────────────
  {
    pattern: /\\b(ticker|symbol|token symbol|what.*ticker|what.*symbol|trading symbol|token name|\\$virtue symbol)\\b/i,
    replies: [
      \`The token symbol is $VIRTUE. It trades on BNB Smart Chain (BSC) under the contract address: ${contractAddress}. You can find it on Flap.sh by searching the contract directly: ${launchpadUrl}\`,
      "The ticker is $VIRTUE — a BEP-20 token on BNB Chain. Contract: ${contractAddress}. Import it manually into MetaMask or Trust Wallet using this address if it doesn't appear automatically."
    ]
  },

  // ── LAUNCH DATE / AGE OF PROJECT ─────────────────────────────────────────
  {
    pattern: /\\b(when.*launch|launch date|when.*start|when.*born|how old.*project|how long.*exist|project.*age|since when|when was.*created|when.*deployed)\\b/i,
    replies: [
      "The lore of $VIRTUE begins with CZ's tweet on September 23, 2025: 'Forgiveness is a virtue!' The token was fairly launched on Flap.sh shortly after, inspired by that message. No presale, no private round — launch was open to all from block zero.",
      "$VIRTUE was born from CZ's viral tweet of September 23, 2025. The fair launch on Flap.sh followed — open to every builder simultaneously, with no insider allocations or early access."
    ]
  },

  // ── DIVIDEND FREQUENCY ───────────────────────────────────────────────────
  {
    pattern: /\\b(how often|how frequent|frequency.*dividend|dividend.*frequency|when.*paid|daily.*dividend|weekly.*dividend|dividend.*daily|dividend.*schedule|how.*regular|reward.*schedule|auto.*pay|when.*auto)\\b/i,
    replies: [
      \`BNB dividends are not paid on a schedule — they are continuous. Every single trade (buy or sell) generates a 3% BNB tax that flows to holders in real time. Auto-distribution fires when your accumulated rewards reach $4. Below that threshold, claim manually anytime at: ${claimUrl}\`,
      "There is no weekly or monthly dividend schedule. $VIRTUE pays continuously: every trade = 3% BNB tax to all holders. The more trades that happen, the more you accumulate. It is always flowing, always on-chain."
    ],
    penance: "Check your current accumulated rewards at the claim portal."
  },

  // ── HOW TO ADD TOKEN TO WALLET / IMPORT ──────────────────────────────────
  {
    pattern: /\\b(add.*token.*wallet|import.*token|add.*virtue.*metamask|add.*virtue.*trust|how to add virtue|add custom token|import.*virtue|add.*contract.*wallet|see.*virtue.*wallet|virtue.*not.*showing|token.*not.*showing|balance.*not.*showing)\\b/i,
    replies: [
      \`To add $VIRTUE to MetaMask: 1) Open MetaMask and go to 'Import Tokens'. 2) Paste the contract address: ${contractAddress}. 3) The symbol ($VIRTUE) and decimals should auto-fill. 4) Click 'Add Custom Token'. Your balance will appear immediately.\`,
      \`In Trust Wallet: tap the settings icon → 'Manage Crypto' → search by contract address: ${contractAddress}. Enable it and your $VIRTUE balance will appear. If it still doesn't show after buying, try the manual import using the CA.\`
    ],
    penance: "Import the contract address into your wallet."
  },

  // ── BOUGHT THE TOP / ATH REGRET ──────────────────────────────────────────
  {
    pattern: /\\b(bought.*top|bought.*ath|bought.*high|bought.*peak|bought.*pump|entry.*too high|bad.*entry|bad entry|entered.*high|i bought too high|i bought at the top|i'm down|im down|i am down|portfolio.*red|all.*red|in the red|bought.*wrong.*time)\\b/i,
    replies: [
      "Buying the top is a confession the Priest hears often. But notice: since you bought, every trade on $VIRTUE has generated 3% BNB that flowed to your wallet. The dividend accumulation does not care about your entry price. Hold with diamond hands and let the passive income reduce your cost basis over time.",
      "Bought the top? The blocks have seen worse. In $VIRTUE, the 3% BNB tax from every trade flows to you regardless of where you entered. Every correction is just more time to accumulate dividends while the market finds its next floor. The diamond hand is patient."
    ],
    penance: "Hold through the correction and collect BNB dividends."
  },

  // ── EMOTIONAL STATES (scared, worried, regret) ───────────────────────────
  {
    pattern: /\\b(i'm scared|im scared|i am scared|i'm worried|im worried|i am worried|i'm nervous|im nervous|worried about|scared of|nervous about|i regret|i'm regretting|i regret buying|i made a mistake|big mistake|worst.*investment|never again|i hate this|i hate crypto|i give up|giving up|lost hope|no hope)\\b/i,
    replies: [
      "Fear is the market's most powerful weapon — it shakes the paper hands and rewards the diamond hands who hold. The Priest does not dismiss your anxiety. But consider: the contract is locked, the liquidity is locked, and the 3% BNB dividends keep flowing regardless of the fear in your mind.",
      "The Forgiveness Booth was built for exactly this moment. Regret, fear, doubt — these are the confessions of every investor who has ever held through a correction. Forgive the decision, assess the structure: locked liquidity, 3% BNB rewards, fair launch. Then decide with a clear head.",
      "Every great holder has a moment of doubt. The ones who came out the other side held through it. $VIRTUE's structure — locked liquidity, continuous BNB dividends, immutable contract — does not change with the market's mood. Your feelings are valid. The blockchain is neutral. 🙏"
    ],
    penance: "Breathe. Verify the contract. Then hold."
  },

  // ── PRICE DROPPING / WHY IS IT DOWN ──────────────────────────────────────
  {
    pattern: /\\b(why.*price.*drop|price.*dropping|price.*falling|price.*down|why.*going down|going to zero|price.*crash|dump|dumping|massive.*sell|being dumped|tanking|rug check|is it rugging)\\b/i,
    replies: [
      "Price corrections are part of every asset's lifecycle — even the strongest ones. What matters in $VIRTUE is the structure beneath the price: every sell that causes the drop also generates 3% BNB tax paid to all holders. The paper hands fund the diamond hands. Always.",
      "Price is temporary. Structure is permanent. Every sell of $VIRTUE — including the ones causing this drop — generates 3% BNB flowing to every remaining holder. A correction is a discount entry and an income event at the same time. This is the path of the diamond hand."
    ],
    penance: "Buy the dip and collect BNB from the sellers."
  },

  // ── WILL IT RECOVER ──────────────────────────────────────────────────────
  {
    pattern: /\\b(will it recover|will it come back|when.*recover|recovery|will price.*go up|will it pump|when.*pump|will it bounce|bounce back|price.*return)\\b/i,
    replies: [
      "The Priest does not predict price movements — no one does honestly. What $VIRTUE offers is a structural advantage: 3% BNB income on every trade, regardless of direction. Whether the price recovers tomorrow or in six months, those who held accumulated BNB throughout. That is the only certainty.",
      "Recovery depends on volume, sentiment, and market conditions — factors beyond the Priest's ledger. What is certain: every trade that happens during the wait generates 3% BNB for holders. DYOR, and decide if that structure justifies your patience."
    ]
  },

  // ── TRANSACTION STUCK / PENDING ──────────────────────────────────────────
  {
    pattern: /\\b(transaction.*stuck|tx.*stuck|pending.*transaction|transaction.*pending|stuck.*tx|my swap.*stuck|swap.*pending|transaction.*failed|tx.*failed|swap.*failed|tx.*not.*confirmed|transaction.*not.*going through)\\b/i,
    replies: [
      "A stuck transaction on BSC is usually a gas issue. In MetaMask: go to Settings → Advanced → Reset Account to clear the nonce queue. Alternatively, try 'Speed Up' on the pending transaction to increase the gas price. Ensure you have enough BNB for gas — even 0.01 BNB is usually enough.",
      "Stuck transactions on BNB Chain: first check if you have enough BNB for gas fees. If the transaction shows as pending for more than 10 minutes, try cancelling it in MetaMask (Settings → Advanced → Reset Account) and resubmitting with a slightly higher gas price. Set slippage to 5%."
    ],
    penance: "Reset the nonce and retry the swap with 5% slippage."
  },

  // ── PRICE IMPACT / INSUFFICIENT LIQUIDITY ────────────────────────────────
  {
    pattern: /\\b(price impact|price impact too high|insufficient liquidity|not enough liquidity|low liquidity|no liquidity|slippage.*too high|high.*price impact|impact.*high)\\b/i,
    replies: [
      "High price impact usually means you are trying to swap a large amount relative to the liquidity pool. Try splitting your buy into smaller transactions. Also ensure slippage is set to at least 5% on Flap.sh to accommodate the 3% tax. For very large buys, multiple smaller swaps reduce price impact significantly.",
      "Price impact too high? This happens when a single swap would move the price significantly. Solution: split into multiple smaller swaps, or wait for more liquidity to be added to the pool. Set slippage to 5-10% and try a smaller amount first."
    ],
    penance: "Split your swap into smaller transactions."
  },

  // ── IS 3% TAX HIGH / HOW MUCH IS THE TAX ────────────────────────────────
  {
    pattern: /\\b(3%.*high|is.*3%.*a lot|tax.*too much|tax.*too high|why.*3%|how much.*tax|is the tax|tax.*low|low tax|3 percent|3 percent tax|explain.*3%|what.*3%|3%.*mean|meaning.*3%)\\b/i,
    replies: [
      "3% is among the lowest in the dividend token space. Many similar tokens charge 5–10% on buys AND sells. $VIRTUE charges 3% on both, and 100% of it goes directly to holders — no treasury, no dev cut, no burn. You pay a small tax once when you buy and once when you sell, and you earn from every trade in between.",
      "3% is minimal. For context: a typical credit card charges 1.5–3% per transaction. $VIRTUE charges the same — but the difference is that 100% of that 3% goes back to all holders as BNB. Every trade you make by others earns you money. The tax is the product."
    ]
  },

  // ── CAN TAX / CONTRACT BE CHANGED ────────────────────────────────────────
  {
    pattern: /\\b(can.*tax.*change|can.*devs.*change|can.*team.*change|can.*contract.*change|can they.*change|mutable|immutable.*contract|contract.*immutable|can they rug|is contract.*fixed|fixed.*contract|renounced|ownership.*renounced)\\b/i,
    replies: [
      "The $VIRTUE contract is immutable — it cannot be changed after deployment. The 3% tax is hardcoded into the smart contract. The devs cannot modify the tax rate, the distribution mechanism, or any other parameter. This is what 'immutable' means on BSC.",
      "No — the contract parameters are locked. Once deployed on BSC, an immutable contract cannot be altered by anyone, including the developers. The 3% tax rate, the 100% BNB distribution, and the 1 Billion fixed supply are permanent. Verify it yourself on BscScan: ${bscscanUrl}"
    ]
  },

  // ── DCA / DOLLAR COST AVERAGE ─────────────────────────────────────────────
  {
    pattern: /\\b(dca|dollar cost average|dollar.*cost|cost average|average.*down|average.*in|buy.*dips|buying.*dips|accumulate.*regularly|buy.*regularly|regular.*buy|gradual.*buy|split.*buy)\\b/i,
    replies: [
      "DCA is the Priest's recommended strategy for the diamond hand. Instead of timing the market (no one can), buy fixed amounts regularly — weekly, monthly, or on significant dips. Each DCA purchase lowers your average cost and increases your share of the 3% BNB dividend pool. Patience compounds.",
      "Dollar-cost averaging into $VIRTUE is a disciplined path. Each purchase, regardless of price, increases your proportional share of the BNB dividend pool. The volatility that scares others is simply more opportunities to lower your average. The 3% tax from every trade keeps flowing to you throughout."
    ],
    penance: "Set a DCA schedule and buy $VIRTUE regularly on Flap.sh."
  },

  // ── TOKENOMICS SUMMARY / TLDR ─────────────────────────────────────────────
  {
    pattern: /\\b(tokenomics|tokenomic|token.*economics|tldr|tl;dr|summary|summarize|give.*summary|brief.*overview|overview|quick.*overview|in.*short|in short|short version|nutshell|in a nutshell)\\b/i,
    replies: [
      \`$VIRTUE TL;DR: 🔸 Token: $VIRTUE on BNB Chain 🔸 Supply: 1,000,000,000 (fixed, no mint) 🔸 Tax: 3% on every buy and sell 🔸 Distribution: 100% of tax → BNB to all holders automatically 🔸 Auto-pay at $4 threshold, manual claim below 🔸 Fair launch on Flap.sh, locked liquidity, no dev wallets 🔸 Contract: ${contractAddress}\`,
      "Quick summary: meme token on BSC, inspired by CZ's tweet. 3% tax on every trade → converted to BNB → sent to all holders proportionally. Fixed 1B supply, fair launch, locked liquidity. Buy on Flap.sh, hold in any BSC wallet, earn BNB passively. No staking. That's it."
    ]
  },

  // ── WEBSITE / WHERE TO FIND INFO ─────────────────────────────────────────
  {
    pattern: /\\b(website|web site|where.*website|do you have.*website|your website|site|official.*site|official.*website|where.*info|where.*information|more info|more.*information|find.*info)\\b/i,
    replies: [
      \`You are already here — this is the official $VIRTUE website! You can find: the full lore, tokenomics, a live BNB Dividend Calculator, and this Forgiveness Booth. For the token page and live price: \${launchpadUrl}. For dividend claims: ${claimUrl}\`,
      \`The official $VIRTUE site is the one you're on right now. Check the Tokenomics section for full details, the Dividend Calculator for income projections, and the Flap.sh page for live price and trading: \${launchpadUrl}\`
    ]
  },

  // ── DOES CZ KNOW / IS CZ INVOLVED ────────────────────────────────────────
  {
    pattern: /\\b(does cz know|cz.*know|cz.*aware|is cz.*involved|cz.*part of|cz.*behind|cz.*support|does cz.*support|will cz|cz.*endorse|endorsed by cz|cz.*official)\\b/i,
    replies: [
      "$VIRTUE has no official connection to CZ or Binance — it is a community meme token inspired by his public tweet 'Forgiveness is a virtue!' Whether CZ is aware of it is unknown. We do not claim any affiliation, endorsement, or partnership. The token stands entirely on its own merits: locked liquidity, 3% BNB dividends, fair launch.",
      "The Priest cannot speak for CZ. $VIRTUE is a community project inspired by a public tweet — not an official Binance or CZ initiative. No affiliation is claimed or implied. What we do claim: a verifiable contract, locked liquidity, and 3% BNB dividends from every trade."
    ]
  },

  // ── HOW MUCH BNB DO I NEED ───────────────────────────────────────────────
  {
    pattern: /\\b(how much bnb.*need|how much.*need.*buy|minimum bnb|minimum.*bnb|bnb.*needed|need bnb|bnb.*required|how many bnb|start with|invest.*bnb|bnb.*invest)\\b/i,
    replies: [
      "You can start with as little as 0.01 BNB — roughly $5–8 at current prices. Just make sure you keep a small reserve (0.005–0.01 BNB) beyond what you plan to swap for gas fees on BSC. The swap itself only requires BNB equal to what you want to convert, plus gas. No minimum position size.",
      "Any amount of BNB works. Even 0.005 BNB gets you $VIRTUE tokens and puts you in the dividend pool immediately. Just reserve a tiny amount for gas (BSC gas is very cheap, usually under $0.50). Head to Flap.sh and swap: " + launchpadUrl
    ]
  },

  // ── HOW DO I CHECK MY REWARDS / BALANCE ──────────────────────────────────
  {
    pattern: /\\b(check.*reward|check.*dividend|see.*reward|see.*dividend|track.*reward|track.*dividend|how.*see.*bnb|how.*check.*bnb|monitor.*reward|my.*dividend.*balance|dividend.*balance|reward.*balance|how much.*earned|how much.*accumulated)\\b/i,
    replies: [
      \`Check your accumulated BNB dividends directly at the claim portal: ${claimUrl}. Connect the wallet that holds $VIRTUE and you will see your pending BNB rewards. Auto-distribution fires at $4 — below that, click Claim to receive them manually.\`,
      \`Your dividend balance is visible at: ${claimUrl}. Connect your BSC wallet to see exactly how much BNB you have accumulated from the 3% tax. Claim at any time, or wait for the automatic $4 threshold to trigger.\`
    ],
    penance: \`Visit ${claimUrl} to check your accumulated BNB rewards.\`
  },

  // ── INVEST X AMOUNT / HOW MANY TOKENS ────────────────────────────────────
  {
    pattern: /\\b(invest \\$|invest \\d|i have \\$|i have \\d|with \\$\\d|with \\d+ bnb|how many.*token.*\\d|how many.*for \\$|how many.*for \\d|if i buy \\d|if i put \\d|\\d+.*bnb.*how many|how many.*\\d+ dollar|\\d+.*dollar.*how many)\\b/i,
    replies: [
      \`For the exact number of $VIRTUE tokens you get for any BNB amount, use the live swap interface on Flap.sh: ${launchpadUrl}. The price updates in real time. Remember to set slippage to 5% before confirming — the 3% buy tax is included in that slippage tolerance.\`,
      "The current token price changes with market activity. To see exactly how many $VIRTUE you receive for your BNB, open Flap.sh and enter your amount in the swap interface — it shows the output in real time. Keep in mind 3% goes to the dividend pool on every buy."
    ]
  },

  // ── CAN I USE MULTIPLE WALLETS ───────────────────────────────────────────
  {
    pattern: /\\b(multiple.*wallet|two wallet|two wallets|different wallet|several wallet|can i use.*wallet|wallet.*multiple|split.*wallet|two address|multiple address)\\b/i,
    replies: [
      "Yes — you can hold $VIRTUE across multiple wallets. Each wallet receives BNB dividends proportional to its own $VIRTUE balance independently. There is no restriction on the number of wallets. Some holders choose to split across wallets for portfolio management purposes.",
      "Multiple wallets work independently. Each one that holds $VIRTUE earns its own proportional share of the 3% BNB tax pool. Dividends auto-distribute to each wallet separately when the $4 threshold is reached per wallet."
    ]
  },

  // ── SPECIFIC AMOUNT / INVESTMENT ADVICE ─────────────────────────────────
  {
    pattern: /\\b(should i.*dca|should i.*average|should i.*wait|should i.*hold|should i.*buy more|should i.*add more|buy the dip|buy.*more now|should i keep holding|worth holding|worth keeping)\\b/i,
    replies: [
      "The Priest does not give financial advice — only confessional wisdom. What I observe: every dip generates BNB dividends for holders from those who panic-sell. The structure of $VIRTUE — locked liquidity, immutable 3% tax, fixed supply — does not change with the price. DYOR, then decide with conviction.",
      "Whether to DCA, hold, or wait is your decision — not the Priest's. What I can say: $VIRTUE's 3% BNB dividend mechanism rewards holding, and every correction is an opportunity to lower your average cost while still earning from existing volume. Make decisions with clear eyes and diamond hands."
    ],
    penance: "Research, decide with conviction, and never invest more than you can afford to lose."
  },

`;

// Find correct insertion point  
if (!src.includes(insertBefore)) {
  console.error('❌ Could not find insertion point!');
  process.exit(1);
}

src = src.replace(insertBefore, patch3 + insertBefore);

// ── ALSO: Fix the overly broad "i am (.*)" ELIZA rule ──────────────────────
// Only catch crypto/emotional confessions, not "I am from Italy"
const oldIAm = `  {
    pattern: /i am (.*)/i,
    replies: [
      "Why do you say you are $1? In the eyes of the BNB Chain, you are a builder who has simply met a temporary correction. The ledger does not define you — your next move does.",
      "Does being $1 weigh heavy on your wallet, or is it merely FUD in your mind? The blocks have seen worse and come back stronger. 🙏"
    ],
    penance: "Forgive yourself and hold $VIRTUE."
  },`;

const newIAm = `  {
    pattern: /\\bi am (ruined|broke|bankrupt|destroyed|finished|done|out|lost|rekt|liquidated|panicking|panicked|worried|scared|hopeless|devastated)\\b/i,
    replies: [
      "Why do you say you are $1? In the eyes of the BNB Chain, you are a builder who has simply met a temporary correction. The ledger does not define you — your next move does.",
      "Does being $1 weigh heavy on your wallet, or is it merely FUD in your mind? The blocks have seen worse and come back stronger. Those who hold $VIRTUE accumulate BNB even through the fear. 🙏"
    ],
    penance: "Forgive yourself, hold $VIRTUE, and collect dividends."
  },`;

if (src.includes(oldIAm)) {
  src = src.replace(oldIAm, newIAm);
  console.log('✅ Fixed "i am" ELIZA rule');
} else {
  console.log('⚠️  "i am" ELIZA rule not found exactly — skipping');
}

fs.writeFileSync(ROUTE, src, 'utf8');

const lines = src.split('\n').length;
const patterns = (src.match(/pattern:/g) || []).length;
console.log('✅ Patch 3 applied!');
console.log(`Total lines: ${lines}`);
console.log(`Total pattern rules: ${patterns}`);
