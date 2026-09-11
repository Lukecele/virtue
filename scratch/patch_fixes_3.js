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

// 1. Move ADD WALLET rule before PROJECT INFO
const addWalletRule = `  // ── HOW TO ADD TOKEN TO WALLET / IMPORT ──────────────────────────────────
  {
    pattern: /\\b(add.*token.*wallet|import.*token|add.*virtue.*metamask|add.*virtue.*trust|how to add virtue|add custom token|import.*virtue|add.*contract.*wallet|see.*virtue.*wallet|virtue.*not.*showing|token.*not.*showing|balance.*not.*showing|add.*metamask|add.*virtue|import.*metamask)\\b/i,
    replies: [
      \`To add $VIRTUE to MetaMask: 1) Open MetaMask and go to 'Import Tokens'. 2) Paste the contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. 3) The symbol ($VIRTUE) and decimals should auto-fill. 4) Click 'Add Custom Token'. Your balance will appear immediately.\`,
      \`In Trust Wallet: tap the settings icon → 'Manage Crypto' → search by contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. Enable it and your $VIRTUE balance will appear. If it still doesn't show after buying, try the manual import using the CA.\`
    ],
    penance: "Import the contract address into your wallet."
  },

`;

// Insert addWalletRule before PROJECT INFO
patch(
  'Move Add Wallet rule before Project Info',
  `  // ── PROJECT INFO ───────────────────────────────────────────────────────────`,
  addWalletRule + `  // ── PROJECT INFO ───────────────────────────────────────────────────────────`
);

// 2. Move MIN HOLDING rule before DIVIDENDS / REWARDS
const minHoldingRule = `  // ── MINIMUM HOLDING FOR DIVIDENDS ──────────────────────────────────────────
  {
    pattern: /\\b(minimum.*buy|min.*invest|smallest.*buy|how little|at least.*buy|minimum.*amount|min.*purchase|minimum.*hold|how many.*buy|minimum.*token|minimum.*tokens|minimum.*for dividend|minimum.*for reward|minimum.*to earn|min.*to get|minimum.*quantity)\\b/i,
    replies: [
      "To qualify for continuous BNB dividends, you must hold at least 10,000 $VIRTUE tokens (0.001% of supply). Holders with 10k+ $VIRTUE earn 3% dividends from every trade. Rewards auto-distribute in WBNB at the $4 threshold, while manual claims on Flap Tax Info page let you choose between WBNB and BNB.",
      "The minimum holding requirement for dividend eligibility is 10,000 $VIRTUE tokens. Holding 10k+ tokens grants you access to the 3% tax pool. Automatic payouts send WBNB directly to your wallet ($4+ threshold), while manual claims on Flap allow choosing WBNB or BNB."
    ]
  },

`;

// Insert minHoldingRule before DIVIDENDS / REWARDS
patch(
  'Move Min Holding rule before Dividends',
  `  // ── DIVIDENDS / REWARDS ────────────────────────────────────────────────────`,
  minHoldingRule + `  // ── DIVIDENDS / REWARDS ────────────────────────────────────────────────────`
);

// 3. Move PRICE DROP rule before PRICE / CHART / MARKET CAP
const priceDropRule = `  // ── PRICE DROP / CORRECTION ────────────────────────────────────────────────
  {
    pattern: /\\b(why.*price.*drop|price.*dropping|price.*falling|price.*down|why.*going down|going to zero|price.*crash|dump|dumping|being dumped|tanking|correction|rug check|is it rugging|red candle|in the red|candle.*red|red.*chart)\\b/i,
    replies: [
      "Price corrections are part of every asset's lifecycle — even the strongest ones. What matters in $VIRTUE is the structure beneath the price: every sell that causes the drop also generates 3% BNB tax paid to all holders. The paper hands fund the diamond hands. Always. 💎",
      "Price is temporary. Structure is permanent. Every sell of $VIRTUE — including the ones causing this drop — generates 3% BNB flowing to every remaining holder. A correction is a discount entry and an income event at the same time. This is the path of the diamond hand. 🙏"
    ],
    penance: "Buy the dip and collect BNB from the sellers."
  },

`;

// Insert priceDropRule before PRICE / CHART / MARKET CAP
patch(
  'Move Price Drop rule before Price / Chart / Market Cap',
  `  // ── PRICE / CHART / MARKET CAP ────────────────────────────────────────────`,
  priceDropRule + `  // ── PRICE / CHART / MARKET CAP ────────────────────────────────────────────`
);

fs.writeFileSync(path, code, 'utf8');
console.log(`Done. Size: ${code.length}`);
