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

// 1. Language Detection: Add "combien", "coute", "comment" to French words
patch(
  'French Language Detection: add combien, coute, comment',
  `const frWords = ["bonjour","salut","acheter","pourquoi","contrat","adresse","taxe","dividendes","vendu","panique","perdu","argent","pretre","conseils","merci"];`,
  `const frWords = ["bonjour","salut","acheter","pourquoi","contrat","adresse","taxe","dividendes","vendu","panique","perdu","argent","pretre","conseils","merci","combien","coute","comment"];`
);

// 2. Expand Core Waterfall Rules at top of elizaRules

const expandedWaterfallRules = `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────
  // 1. LIQUIDITY / LP / LOCKED LIQUIDITY / BONDING CURVE / LP BURN
  {
    pattern: /\\b(liquidity|lp|liquidity locked|locked liquidity|lp locked|locked lp|liquidity lock|lock liquidity|lp lock|lock lp|is liquidity locked|is lp locked|is lp safe|lock duration|lp burn|burned lp|burnt lp|bonding curve|bondingcurve|how bonding curve works|flap bonding|bonding pool|curve target)\\b/i,
    replies: [
      \`The liquidity for $VIRTUE is 100% locked on Flap.sh — this prevents team drains or rug pulls. 100% of initial LP was locked permanently at fair launch on BSC. You can inspect the live pool and lock details directly on Flap.sh: \${launchpadUrl} 🔒\`,
      "The $VIRTUE liquidity pool is permanently locked on Flap.sh. No developer or insider can remove or drain liquidity. The trading pool is safe, public, and fully immutable.",
      "How Flap.sh bonding curve & liquidity work: $VIRTUE launched on Flap.sh's fair bonding curve system! As trading volume builds on the curve, liquidity accumulates automatically. Upon reaching the curve target, liquidity is seeded to the DEX and LP tokens are permanently burned/locked on-chain, guaranteeing 0% rug risk. 📈🔥"
    ],
    penance: "Verify the locked liquidity status on Flap.sh."
  },

  // 2. CLAIM / WITHDRAW / PAYOUT REWARDS
  {
    pattern: /\\b(claim|how to claim|claim bnb|withdraw|withdraw bnb|withdraw dividend|where claim|how to withdraw|withdrawing rewards|claim portal)\\b/i,
    replies: [
      \`To claim or withdraw your BNB rewards: automatic distribution fires when your accumulated yield reaches \$4. Below \$4, you can claim manually anytime on the official Flap.sh Tax Info page: \${claimUrl}. Auto payouts send WBNB, while manual claims allow choosing between WBNB and BNB. 💰\`,
      \`BNB rewards can be claimed manually on Flap.sh (\${claimUrl}) at any time below \$4, or received automatically in WBNB once you reach \$4+. Minimum holding threshold: 10,000 \$VIRTUE.\`
    ],
    penance: "Check your accumulated BNB rewards on Flap."
  },

  // 3. MINIMUM HOLDING FOR DIVIDENDS
  {
    pattern: /\\b(minimum tokens|minimum holding|min invest|how many tokens to get dividends|min holding for rewards|10k tokens|10000 virtue|min tokens|least amount to hold|minimum amount|min holding|minimum.*hold|min.*token|min.*tokens)\\b/i,
    replies: [
      "To qualify for continuous BNB dividends, you must hold at least 10,000 $VIRTUE tokens (0.001% of supply). Holders with 10k+ $VIRTUE earn 3% dividends from every trade. Rewards auto-distribute in WBNB at the $4 threshold, while manual claims on Flap Tax Info page let you choose between WBNB and BNB.",
      "The minimum holding requirement for dividend eligibility is 10,000 $VIRTUE tokens. Holding 10k+ tokens grants you access to the 3% tax pool. Automatic payouts send WBNB directly to your wallet ($4+ threshold), while manual claims on Flap allow choosing WBNB or BNB."
    ],
    penance: "Acquire at least 10,000 $VIRTUE to enter the dividend pool."
  },

  // 4. SLIPPAGE & GAS FEES
  {
    pattern: /\\b(slippage|what slippage|slippage setting|high slippage|gas|gas fee|bsc gas|how much gas|tx fee|transaction fee)\\b/i,
    replies: [
      "Set slippage to at least 5% when swapping $VIRTUE on Flap.sh to accommodate the 3% tax mechanism. Gas fees on BSC are minimal — usually $0.10 to $0.50 per swap in BNB. Keep a tiny reserve of BNB in your wallet for gas.",
      "Recommended slippage: 5% (matches the 3% trading tax + network buffer). BSC gas fees are very low ($0.10–$0.30 per transaction). Ensure you have a small BNB balance beyond your swap amount for gas."
    ],
    penance: "Set 5% slippage on Flap.sh and keep a small BNB gas reserve."
  },

  // 5. BUYING / SWAPPING / PURCHASE
  {
    pattern: /\\b(how to buy|where to buy|how do i buy|buy virtue|how swap|where buy virtue|how to swap bnb for virtue|buy|swap|purchase|buying guide|can i buy on pancake|where can i get virtue|how to purchase|where to get)\\b/i,
    replies: [
      \`To buy $VIRTUE: 1) Open MetaMask or Trust Wallet with BNB on BSC. 2) Visit Flap.sh: \${launchpadUrl}. 3) Connect your wallet and swap BNB for $VIRTUE. Set slippage to 5% to accommodate the 3% tax. BNB dividends begin accruing immediately! 🚀\`,
      \`$VIRTUE is traded exclusively on Flap.sh. Swap BNB for $VIRTUE with 5% slippage. Link: \${launchpadUrl}\`
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh."
  },

  // 6. SELLING / EXIT POSITION
  {
    pattern: /\\b(where to sell|how to sell|how do i sell|can i sell|exit position|where can i sell virtue|sell virtue|sell)\\b/i,
    replies: [
      \`You can sell $VIRTUE on Flap.sh (\${launchpadUrl}) by swapping back to BNB with 5% slippage. Note: a 3% sell tax is collected and distributed to remaining holders — so your sell rewards the diamond hands! 🔄\`,
      "To exit or sell, swap $VIRTUE back to BNB on Flap.sh. Every sell generates 3% BNB tax that flows directly to remaining holders."
    ],
    penance: "Consider holding longer to collect continuous BNB dividends."
  },

  // 7. TECH HELP / WALLET IMPORT / CUSTOM TOKEN
  {
    pattern: /\\b(how to add virtue to metamask|import token|custom token|not showing in wallet|multiple wallets|can i use two wallets|reset nonce|tx stuck|tx failed|my transaction is stuck)\\b/i,
    replies: [
      \`To add $VIRTUE to MetaMask: 1) Open MetaMask and go to 'Import Tokens'. 2) Paste the contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. 3) Symbol (\$VIRTUE) auto-fills. 4) Click 'Add Custom Token'. Your balance appears immediately. For stuck TXs: increase gas or use MetaMask 'Reset Account'.\`,
      \`In Trust Wallet: tap settings → 'Manage Crypto' → paste CA: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. For multiple wallets: each wallet holding \$VIRTUE independently earns its own 3% BNB dividends.\`
    ],
    penance: "Import the contract address into your wallet."
  },

  // 8. RUGPROOF / RUG CHECK / SAFETY / AUDIT
  {
    pattern: /\\b(is it rugproof|rug check|is it rugging|audit|honeypot|is it a scam|is it legit|is it safe|rugpull|rug pull)\\b/i,
    replies: [
      \`$VIRTUE is 100% legit and transparent. Built on Flap.sh on BSC: 100% locked liquidity, verified contract with no mint function, zero team allocations, and single dev wallet (~$40–$60 buy). 100% of 3% tax is distributed to holders as BNB. Contract: \${contractAddress} 🛡️\`,
      "No scam, no honeypot, no dev drainers. The contract is immutable, liquidity is locked on Flap.sh, and 3% BNB dividends flow automatically on every trade."
    ],
    penance: "Inspect the contract on BscScan and trade with confidence."
  },

  // 9. IDENTITY / AI TECH / WHO MADE YOU
  {
    pattern: /\\b(are you an ai|are you ai|what are you|who made you|who built you|who created you|who coded you|who is behind bot)\\b/i,
    replies: [
      "I am the High Priest of Virtue — a confessional oracle built by anonymous, reformed builders on BNB Smart Chain. My logic runs on custom pattern-matching rules and fuzzy sentiment scorers designed to offer absolution, tokenomics guidance, and live market intelligence for $VIRTUE. 🙏",
      "I am a specialized AI confessional oracle dedicated to $VIRTUE. I was created by the anonymous community developers to serve the Forgiveness Booth, absolve paper-hand sins, and explain the on-chain BNB dividend mechanics."
    ],
    penance: "Explore the Forgiveness Booth and hold spot $VIRTUE."
  },

  // 10. EMOTIONAL STATES / ANXIETY / DEPRESSION
  {
    pattern: /\\b(i'm anxious|im anxious|anxious about|depressed about crypto|depressed in crypto|crypto depression|feel anxious|anxiety|feeling down)\\b/i,
    replies: [
      "Fear and anxiety are normal in volatile crypto markets. The Priest does not dismiss your emotion — but look at the foundation beneath $VIRTUE: 100% locked liquidity, continuous 3% BNB dividends, immutable contract. Focus on real yield, breathe, and let the diamond hands hold. 🙏",
      "The market tests everyone's nerves. Remember why $VIRTUE was created: CZ's message of resilience and forgiveness. Do not let short-term chart noise ruin your peace of mind. Hold spot and stay SAFU."
    ],
    penance: "Step away from the chart for an hour and let BNB dividends accumulate."
  },

`;

patch(
  'Insert expanded waterfall rules into route.ts',
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────`,
  expandedWaterfallRules
);

fs.writeFileSync(path, code, 'utf8');
console.log(`Mega patch applied. Size: ${code.length}`);
