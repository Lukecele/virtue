const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;
const claimUrl = `https://flap.sh/bnb/${contractAddress}/taxinfo?lang=en`;

// 1. ADD SPECIFIC "HOW MUCH DO I EARN BUYING X TOKENS" RULE BEFORE GENERAL CALCULATOR RULE
const tokenCalcSpecificRule = `
  // ── HOW MUCH DO I EARN BUYING / HOLDING SPECIFIC AMOUNT OF TOKENS ─────────
  {
    pattern: /\\b(how much.*(get|earn|make|payout|reward).*holding|how much.*if i buy|if i buy.*how much|how much.*(tokens|1m|10m|10k|100k|5m|50m|amount)|how much.*for.*tokens|what is my payout|what do i get for)\\b/i,
    replies: [
      "To calculate your exact daily, monthly, and yearly BNB dividend earnings for your specific token amount (min 10,000 $VIRTUE), use the interactive BNB Dividend Calculator on our homepage: https://virtue-ecru.vercel.app/#calculator! Simply select your token count (or supply %) and daily trading volume ($ USD) to calculate your payouts instantly. 🧮",
      "Want to know your exact returns for holding a specific amount of $VIRTUE? Open the BNB Dividend Calculator on our website (https://virtue-ecru.vercel.app/#calculator). It computes real-time daily, monthly, and yearly BNB/WBNB distributions based on live Binance BNB prices. (Min holding: 10,000 $VIRTUE)."
    ],
    penance: "Use the Dividend Calculator on the homepage for your exact token amount."
  },

`;

src = src.replace('  // ── HOW MUCH WILL I EARN / CALCULATOR ──', tokenCalcSpecificRule + '  // ── HOW MUCH WILL I EARN / CALCULATOR ──');

// 2. UPDATE BITCOIN/ETH/BNB PRICE PATTERN IN ELIZA RULES
src = src.replace(
  `pattern: /\\b(bitcoin price|btc price|ethereum price|eth price|solana price|sol price)\\b/i,`,
  `pattern: /\\b(bitcoin price|btc price|ethereum price|eth price|bnb price|solana price|sol price)\\b/i,`
);

src = src.replace(
  `For other assets like BTC or ETH, ask me for live prices (e.g. "btc price") or check CoinMarketCap.`,
  `For other assets like BTC, ETH, or BNB, ask me for live prices (e.g. "bnb price" or "btc price") or check CoinMarketCap.`
);

// 3. UPDATE fetchLiveCryptoPrice TO INCLUDE BNB COINGECKO MAPPING
src = src.replace(
  `const idMap: Record<string, string> = { btc: "bitcoin", eth: "ethereum", sol: "solana", doge: "dogecoin", xrp: "ripple", ada: "cardano" };`,
  `const idMap: Record<string, string> = { btc: "bitcoin", eth: "ethereum", bnb: "binancecoin", sol: "solana", doge: "dogecoin", xrp: "ripple", ada: "cardano" };`
);

// 4. UPDATE POST INTENT MATCHER IN POST HANDLER TO RECOGNIZE BNB
const oldPostPriceMatcher = `const cryptoPriceMatch = clean.match(/\\b(btc|bitcoin|eth|ethereum|sol|solana|doge|dogecoin|xrp|ada)\\s+(price|chart|market|cost|quote)\\b|\\b(price|chart|cost)\\s+of\\s+(btc|bitcoin|eth|ethereum|sol|solana|doge|dogecoin|xrp|ada)\\b/i);`;
const newPostPriceMatcher = `const priceIntentMatch = clean.match(/^(btc|bitcoin|eth|ethereum|bnb|binance|sol|solana|doge|dogecoin|xrp|ada)(\\s+price)?$/i) ||
                             clean.match(/\\b(btc|bitcoin|eth|ethereum|bnb|binance|sol|solana|doge|dogecoin|xrp|ada)\\s+(price|chart|market|cost|quote)\\b/i) ||
                             clean.match(/\\b(price|chart|cost)\\s+of\\s+(btc|bitcoin|eth|ethereum|bnb|binance|sol|solana|doge|dogecoin|xrp|ada)\\b/i);`;

src = src.replace(oldPostPriceMatcher, newPostPriceMatcher);

const oldSymExtract = `const rawSym = (cryptoPriceMatch[1] || cryptoPriceMatch[4] || "").toLowerCase();`;
const newSymExtract = `const rawSym = (priceIntentMatch[1] || priceIntentMatch[2] || "").toLowerCase();`;
src = src.replace(oldSymExtract, newSymExtract);

src = src.replace(
  `const sym = rawSym.replace("bitcoin", "btc").replace("ethereum", "eth").replace("solana", "sol").replace("dogecoin", "doge");`,
  `const sym = rawSym.replace("bitcoin", "btc").replace("ethereum", "eth").replace("binance", "bnb").replace("solana", "sol").replace("dogecoin", "doge");`
);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ BNB price feed & Token Calculator redirect rules successfully patched into route.ts!');
