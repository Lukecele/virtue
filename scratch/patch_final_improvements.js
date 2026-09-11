const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');

function patch(desc, target, replacement) {
  if (!code.includes(target)) {
    console.error(`❌ PATCH FAILED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

// 1. UPDATE /HELP MENU & CAPABILITIES
const updatedHelpMenu = `  // ── HELP & COMMANDS MENU ──────────────────────────────────────────────────
  {
    pattern: /^\\s*(\\/help|help|\\/commands|commands|\\/menu|menu|options|\\/start|start|what can you do|how to use|capabilities)\\s*[!.?]*\\s*$/i,
    replies: [
      \`📜 HIGH PRIEST OF VIRTUE — ORACLE CAPABILITIES MENU 📜\\n\\n\` +
      \`1️⃣ CONFESS SINS: Type trading regrets ("I panic sold", "liquidated on 50x", "rugged") for divine absolution & penance.\\n\\n\` +
      \`2️⃣ STEP-BY-STEP BUYING GUIDE: Ask "how to buy" or "buying guide" for complete Web3 wallet setup & DEX swapping on Flap.sh.\\n\\n\` +
      \`3️⃣ TOKENOMICS & DIVIDENDS: Ask about "dividends", "min holding" (10k tokens), "tax" (3% BNB), "supply" (1B fixed), or "claim rewards".\\n\\n\` +
      \`4️⃣ CONTRACT & SAFETY AUDIT: Ask for "ca", "dev wallet" (\$40–\$60 buy), "proxy contract", "bonding curve", "lp burn", or "bundle / multiwallet" checks.\\n\\n\` +
      \`5️⃣ LIVE MARKET FEED: Ask for live crypto quotes ("btc price", "bnb price", "sol price") powered by live Binance API.\\n\\n\` +
      \`6️⃣ LIVE LINK & TWEET INSPECTION: Paste any X/Twitter URL or web link directly into the chat for real-time analysis.\\n\\n\` +
      \`7️⃣ CZ LORE & PHILOSOPHY: Type "4", "cz tweet", "safu", "buidl", or ask about "shitcoin vs utility".\\n\\n\` +
      \`8️⃣ CALCULATOR & MODEL IMPROVEMENT: Use the Dividend Calculator (/#calculator) or click "💡 Improve Model" to post suggestions on X!\\n\\n\` +
      \`What would you like to explore today, traveler? 🙏\`
    ],
    penance: "Explore the features and hold spot $VIRTUE."
  },`;

patch('Update /help menu in route.ts', `  // ── HELP & COMMANDS MENU ──────────────────────────────────────────────────
  {
    pattern: /^\\s*(\\/help|help|\\/commands|commands|\\/menu|menu|options|\\/start|start|what can you do|how to use|capabilities)\\s*[!.?]*\\s*$/i,
    replies: [
      \`📜 HIGH PRIEST OF VIRTUE — COMMANDS & CAPABILITIES MENU 📜\\n\\n\` +
      \`1️⃣ CONFESS SINS: Type any trading regret (e.g., "I panic sold my bag", "I was rugged", "I lost on 50x leverage") to receive absolution & penance.\\n\\n\` +
      \`2️⃣ CONTRACT & TOKENOMICS: Ask for "ca", "how to buy", "dividends", "dev wallet", or "roadmap". (Min holding: 10,000 $VIRTUE).\\n\\n\` +
      \`3️⃣ LIVE LINK INSPECTION: Paste any X/Twitter tweet link or web URL directly into the chat for real-time inspection & lore context.\\n\\n\` +
      \`4️⃣ LIVE MARKET FEED: Ask for live prices (e.g., "btc price", "eth price", "sol price") fetched directly from Binance.\\n\\n\` +
      \`5️⃣ CZ LORE & RULES: Type "4", "cz tweet", "safu", or "buidl" to explore the genesis story of $VIRTUE.\\n\\n\` +
      \`What would you like to explore today, traveler? 🙏\`
    ],
    penance: "Explore the features and hold spot $VIRTUE."
  },`, updatedHelpMenu);


// 2. UPDATE BUYING GUIDE & DECENTRALIZED WALLET ONBOARDING
const updatedBuyingGuide = `  // 5. BUYING / SWAPPING / STEP-BY-STEP DEX ONBOARDING
  {
    pattern: /\\b(how to buy|where to buy|how do i buy|buy virtue|how swap|where buy virtue|how to swap bnb for virtue|buy|swap|purchase|buying guide|can i buy on pancake|where can i get virtue|how to purchase|where to get|step by step buy|how to start|new to crypto buy|wallet setup|how to connect wallet)\\b/i,
    replies: [
      \`🛒 COMPLETE STEP-BY-STEP BUYING GUIDE FOR \$VIRTUE:\\n\\n\` +
      \`🔹 STEP 1 — INSTALL A DECENTRALIZED WEB3 WALLET:\\nDownload MetaMask or Trust Wallet (iOS/Android/Chrome). Create a wallet and securely save your 12-word seed phrase.\\n\\n\` +
      \`🔹 STEP 2 — FUND WALLET WITH BNB:\\nAcquire BNB on Binance or any CEX and withdraw it to your wallet address via BNB Smart Chain (BEP-20).\\n\\n\` +
      \`🔹 STEP 3 — CONNECT TO FLAP.SH:\\nOpen the dApp browser in your wallet or visit \${launchpadUrl} and click 'Connect Wallet'.\\n\\n\` +
      \`🔹 STEP 4 — SET 5% SLIPPAGE & SWAP:\\nEnter your BNB amount, set slippage to 5% (covers the 3% tax + network gas buffer), and swap BNB for \$VIRTUE.\\n\\n\` +
      \`🔹 STEP 5 — HOLD 10,000+ \$VIRTUE & EARN BNB DIVIDENDS:\\nHold at least 10,000 \$VIRTUE tokens! 3% BNB dividends from every trade are distributed directly to your wallet automatically (\$4+ threshold) or claimable manually anytime on Flap.sh! 💎⚡\`,

      \`Simple DEX Buy Guide:\\n1️⃣ Install MetaMask or Trust Wallet & load BNB (BEP-20).\\n2️⃣ Visit \${launchpadUrl} and connect your wallet.\\n3️⃣ Swap BNB for \$VIRTUE with 5% slippage.\\n4️⃣ Hold 10k+ \$VIRTUE to collect continuous 3% BNB dividends!\`
    ],
    penance: "Follow the 5-step buying guide on Flap.sh."
  },`;

patch('Update Buying Guide in route.ts', `  // 5. BUYING / SWAPPING / PURCHASE
  {
    pattern: /\\b(how to buy|where to buy|how do i buy|buy virtue|how swap|where buy virtue|how to swap bnb for virtue|buy|swap|purchase|buying guide|can i buy on pancake|where can i get virtue|how to purchase|where to get)\\b/i,
    replies: [
      \`To buy $VIRTUE: 1) Open MetaMask or Trust Wallet with BNB on BSC. 2) Visit Flap.sh: \${launchpadUrl}. 3) Connect your wallet and swap BNB for $VIRTUE. Set slippage to 5% to accommodate the 3% tax. BNB dividends begin accruing immediately! 🚀\`,
      \`$VIRTUE is traded exclusively on Flap.sh. Swap BNB for $VIRTUE with 5% slippage. Link: \${launchpadUrl}\`
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh."
  },`, updatedBuyingGuide);


// 3. UPDATE FALLBACK REPLIES TO INCLUDE "💡 Improve Model" SUGGESTION HINTS
const updatedGenericReplies = `const genericReplies = [
  "Tell me more about your journey in these blocks, traveler. If you'd like to suggest new responses or model improvements, click the '💡 Improve Model' button above! 🙏",
  "Does this weigh heavy on your wallet, or is it a question about $VIRTUE? Speak freely — or click '💡 Improve Model' to post suggestions on X anytime!",
  "A true builder does not linger in doubt. Ask me about $VIRTUE, live prices ('btc price'), contract details ('ca'), or click '💡 Improve Model' to submit feedback!",
  "To be transparent: I am a confessional oracle for $VIRTUE. Ask about dividends, contract safety, live market data, or click '💡 Improve Model' to suggest additions! 🙏",
  "The path of the diamond hand requires clarity. Ask about the contract ('ca'), 3% BNB dividends, how to buy on Flap.sh, or click '💡 Improve Model' to suggest features!",
  "Every traveler in the Forgiveness Booth carries a sin, a memory, or a question. Type /help to see all features, or use the '💡 Improve Model' button to send feedback!",
  "In the silence between blocks, truth becomes clear. I handle confessions, live link analysis, and $VIRTUE tokenomics. Feel free to click '💡 Improve Model' for suggestions!",
  "The High Priest can inspect X/Twitter links, fetch live Binance prices, explain 3% BNB dividends, and absolve trading sins. Have a suggestion? Click '💡 Improve Model'!",
  "Speak freely, traveler. I handle confessions, live crypto prices ('bnb price'), contract details, and CZ lore. Type /help or click '💡 Improve Model' to help us expand the oracle! 🙏",
  "The blocks are patient. If I didn't catch your exact meaning, try rephrasing, type /help, or click the '💡 Improve Model' button to post a template suggestion!",
  "I am always learning from the community! Click the '💡 Improve Model' button in the header to post suggestions for the Priest on X, or type /help for my full menu. 💎"
];`;

patch('Update genericReplies in route.ts', `const genericReplies = [
  "Tell me more about your journey in these blocks, traveler. The ledger is listening.",
  "Does this weigh heavy on your wallet, or is it a question about $VIRTUE? Speak freely — I am listening.",
  "A true builder does not linger in doubt. Ask me about $VIRTUE, live prices ('btc price'), contract details ('ca'), or confess your trade.",
  "To be transparent: I am a confessional oracle for $VIRTUE. If you have a specific question about dividends, contract safety, or live market data, type /help to see my full menu! 🙏",
  "The path of the diamond hand requires clarity. Try asking about: the contract ('ca'), 3% BNB dividends, how to buy on Flap.sh, or live crypto prices.",
  "Every traveler in the Forgiveness Booth carries a sin, a memory, or a question. Which is yours? Type /help to see all my features.",
  "In the silence between blocks, truth becomes clear. I am here for your confessions, live link analysis, and $VIRTUE tokenomics. What is your focus today?",
  "The High Priest can inspect X/Twitter links, fetch live Binance prices, explain 3% BNB dividends, and absolve trading sins. Ask me anything on your mind!",
  "Speak freely, traveler. I handle confessions, live crypto prices ('bnb price'), contract details, and CZ lore. Type /help anytime to see what I can do. 🙏",
  "The blocks are patient. If I didn't catch your meaning, try rephrasing or type /help for a list of topics I can assist you with!",
  "I am always learning from the timeline. For topics outside $VIRTUE and live market data, check BscScan or CoinMarketCap — but for 3% BNB dividends, the Forgiveness Booth is your home. 💎"
];`, updatedGenericReplies);

fs.writeFileSync(path, code, 'utf8');
console.log(`Final improvements patched. File size: ${code.length}`);
