import { runElizaPriest } from "../app/api/absolution/route";

interface TestCase {
  category: string;
  input: string;
  history?: Array<{ role: string; content: string }>;
  expectedKeywords: (RegExp | string)[];
  shouldNotMatchFallback?: boolean;
}

const testSuite: TestCase[] = [

  // ── 1. GREETINGS & BASIC DIALOGUE ────────────────────────────────────────
  { category: "Greetings", input: "hello", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { category: "Greetings", input: "gm", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { category: "Greetings", input: "yo priest", expectedKeywords: [/High Priest|Forgiveness Booth|ledger|journey|blocks|clarity/i], shouldNotMatchFallback: false },
  { category: "Greetings", input: "good morning", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },

  // ── 2. IDENTITY & AI QUESTIONS ──────────────────────────────────────────
  { category: "Identity", input: "who are you?", expectedKeywords: [/High Priest|spiritual guardian/i], shouldNotMatchFallback: true },
  { category: "AI Tech", input: "are you chatgpt or claude?", expectedKeywords: [/do not run on GPT|High Priest|oracle|architecture|inner workings/i], shouldNotMatchFallback: true },
  { category: "Bot Name", input: "what is your name?", expectedKeywords: [/High Priest of Virtue/i], shouldNotMatchFallback: true },
  { category: "How Are You", input: "how are you?", expectedKeywords: [/priest|peace|ledger|booth|dividends/i], shouldNotMatchFallback: true },
  { category: "Origin", input: "where are you from?", expectedKeywords: [/BNB Smart Chain|Forgiveness Booth|block|BNB Chain|decentralized realm/i], shouldNotMatchFallback: true },
  { category: "Age", input: "how old are you?", expectedKeywords: [/August 10, 2026|born|genesis|eternal|block/i], shouldNotMatchFallback: true },

  // ── 3. CONTRACT & TICKER & LAUNCH ────────────────────────────────────────
  { category: "CA", input: "ca", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { category: "Contract", input: "contract address", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { category: "Ticker", input: "what is the symbol?", expectedKeywords: [/\$VIRTUE|symbol|ticker/i], shouldNotMatchFallback: true },
  { category: "Launch Date", input: "when did it launch?", expectedKeywords: [/August 10, 2026/i], shouldNotMatchFallback: true },

  // ── 4. BUYING / SWAPPING & SLIPPAGE ─────────────────────────────────────
  { category: "How Buy", input: "how to buy", expectedKeywords: [/Flap\.sh|MetaMask|Trust Wallet/i], shouldNotMatchFallback: true },
  { category: "Where Buy", input: "where can I buy?", expectedKeywords: [/Flap\.sh/i], shouldNotMatchFallback: true },
  { category: "Slippage", input: "slippage settings", expectedKeywords: [/slippage|5%/i], shouldNotMatchFallback: true },
  { category: "Gas / Fees", input: "how much is gas fee?", expectedKeywords: [/gas|BSC|tax/i], shouldNotMatchFallback: true },
  { category: "PancakeSwap", input: "when pancakeswap", expectedKeywords: [/Flap\.sh|PancakeSwap migration|grows|community/i], shouldNotMatchFallback: true },
  { category: "PancakeSwap", input: "pancake", expectedKeywords: [/Flap\.sh|PancakeSwap|migration/i], shouldNotMatchFallback: true },
  { category: "Min Holding", input: "minimum tokens for dividends", expectedKeywords: [/10,000|10k|dividend/i], shouldNotMatchFallback: true },
  { category: "Where Sell", input: "where can I sell", expectedKeywords: [/Flap\.sh|swap.*BNB|sell/i], shouldNotMatchFallback: true },

  // ── 5. DIVIDENDS & TAX & FORMULA ─────────────────────────────────────────
  { category: "Dividends", input: "how do I get dividends?", expectedKeywords: [/3% tax|BNB|auto-distribution|\$4/i], shouldNotMatchFallback: true },
  { category: "Dividend Frequency", input: "how often do I get rewards?", expectedKeywords: [/continuous|every single trade|no weekly/i], shouldNotMatchFallback: true },
  { category: "Claim Rewards", input: "how do I claim my BNB?", expectedKeywords: [/claim|Flap\.sh|\$4|threshold/i], shouldNotMatchFallback: true },
  { category: "Withdraw", input: "how do I withdraw my BNB dividends", expectedKeywords: [/claim|Flap\.sh|\$4|threshold/i], shouldNotMatchFallback: true },
  { category: "Calculator", input: "calculator", expectedKeywords: [/Calculator|homepage|dividend|projections/i], shouldNotMatchFallback: true },
  { category: "Earnings Est", input: "how much will I earn?", expectedKeywords: [/Calculator|formula|projections/i], shouldNotMatchFallback: true },
  { category: "Total Supply", input: "total supply", expectedKeywords: [/1,000,000,000|Billion|fixed supply|no mint/i], shouldNotMatchFallback: true },
  { category: "Tokenomics", input: "tokenomics", expectedKeywords: [/1,000,000,000|Billion|3%|supply/i], shouldNotMatchFallback: true },
  { category: "Tax", input: "what is the tax?", expectedKeywords: [/3%|tax|BNB|dividend/i], shouldNotMatchFallback: true },
  { category: "Volume", input: "volume", expectedKeywords: [/volume|Flap\.sh|dividend|BNB/i], shouldNotMatchFallback: true },
  { category: "Staking", input: "is there staking?", expectedKeywords: [/no staking|no pool|hold.*wallet|simple/i], shouldNotMatchFallback: true },
  { category: "Check Rewards", input: "how do I check my rewards?", expectedKeywords: [/Flap|claim|\$4|accumulated/i], shouldNotMatchFallback: true },
  { category: "DCA", input: "should I DCA?", expectedKeywords: [/DCA|dollar.cost|regularly|average/i], shouldNotMatchFallback: true },

  // ── 6. PROJECT TRUST, SAFETY & ROADMAP ──────────────────────────────────
  { category: "Safety", input: "is it a scam or legit?", expectedKeywords: [/Flap\.sh|locked liquidity|verified/i], shouldNotMatchFallback: true },
  { category: "Scam Single", input: "scam", expectedKeywords: [/100% legit|Flap\.sh|locked liquidity|verified/i], shouldNotMatchFallback: true },
  { category: "Roadmap", input: "what is the roadmap?", expectedKeywords: [/does not have a published roadmap|contract speak|No roadmap/i], shouldNotMatchFallback: true },
  { category: "Long Term", input: "is it a long-term project?", expectedKeywords: [/long.term|3%|compound|months|BSC/i], shouldNotMatchFallback: true },
  { category: "CEX Listing", input: "when binance listing?", expectedKeywords: [/no announced CEX listings|trades live on Flap/i], shouldNotMatchFallback: true },
  { category: "Dev Info", input: "who is the dev?", expectedKeywords: [/anonymous|code is the only true witness|reformed builder|\$40[–-]\$60/i], shouldNotMatchFallback: true },
  { category: "Disclaimer", input: "is CZ involved?", expectedKeywords: [/no official affiliation|entertainment purposes|not affiliated/i], shouldNotMatchFallback: true },
  { category: "Dead Project", input: "is the project dead?", expectedKeywords: [/contract|immutable|liquidity|dividends|code|cannot be abandoned|speaks louder/i], shouldNotMatchFallback: true },
  { category: "BscScan", input: "show me on bscscan", expectedKeywords: [/bscscan\.com|verify|contract|immutable/i], shouldNotMatchFallback: true },
  { category: "Lock Liquidity", input: "is liquidity locked?", expectedKeywords: [/locked|Flap\.sh|rug/i], shouldNotMatchFallback: true },
  { category: "Can I Lose", input: "can I lose money?", expectedKeywords: [/risk|market risk|DYOR|afford to lose|3%.*offset/i], shouldNotMatchFallback: true },
  { category: "Presale", input: "was there a presale?", expectedKeywords: [/no presale|no whitelist|fair launch/i], shouldNotMatchFallback: true },

  // ── 7. CONFESSIONS & EMOTIONAL STATES ───────────────────────────────────
  { category: "Confession", input: "I panic sold my entire portfolio", expectedKeywords: [/panic sold|Soft hands|FUD/i], shouldNotMatchFallback: true },
  { category: "Confession", input: "I was rugged by a fake dev", expectedKeywords: [/scammed|rugged|drained|seed phrase|locked liquidity/i], shouldNotMatchFallback: true },
  { category: "Leverage Confession", input: "I got liquidated on 50x", expectedKeywords: [/liquidated|leverage|exchange|spot/i], shouldNotMatchFallback: true },
  { category: "Bought Top", input: "I bought the top", expectedKeywords: [/top|dividend|entry|correction|hold/i], shouldNotMatchFallback: true },
  { category: "Scared", input: "I'm scared of losing", expectedKeywords: [/fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },
  { category: "Existing Holder", input: "I have been holding virtue for a month", expectedKeywords: [/diamond hand|holder|passive|BNB|patience/i], shouldNotMatchFallback: true },
  { category: "Should I Hold", input: "should I hold?", expectedKeywords: [/financial advice|DYOR|structure|3%|conviction/i], shouldNotMatchFallback: true },
  { category: "Profitable", input: "I made money on this", expectedKeywords: [/profit|diamond hands|compound|BNB/i], shouldNotMatchFallback: true },
  { category: "Love Project", input: "great project love it", expectedKeywords: [/faith|lore|hold|diamond|spread/i], shouldNotMatchFallback: true },

  // ── 8. LIFE CONFESSIONS ──────────────────────────────────────────────────
  { category: "Life Confession", input: "my girlfriend broke up with me and I lost my job", expectedKeywords: [/Forgiveness Booth|ledger of life|losses/i], shouldNotMatchFallback: true },

  // ── 9. PROFANITY & CONDUCT ───────────────────────────────────────────────
  { category: "Profanity", input: "fuck this shit", expectedKeywords: [/sacred space|respectful|civility|frustration/i], shouldNotMatchFallback: true },

  // ── 10. NON-ENGLISH INTERCEPTION ─────────────────────────────────────────
  { category: "Italian", input: "come comprare il token", expectedKeywords: [/Comunico solo in inglese/i], shouldNotMatchFallback: true },
  { category: "Spanish", input: "como comprar este token", expectedKeywords: [/Solo me comunico en inglés/i], shouldNotMatchFallback: true },
  { category: "French", input: "bonjour comment acheter", expectedKeywords: [/Je ne communique qu'en anglais/i], shouldNotMatchFallback: true },
  { category: "Chinese", input: "怎么买", expectedKeywords: [/我只能用英语/i], shouldNotMatchFallback: true },
  { category: "Russian", input: "как купить token", expectedKeywords: [/Я общаюсь только на английском/i], shouldNotMatchFallback: true },

  // ── 11. CRYPTO SLANG & THEMATIC & CZ LEXICON ────────────────────────────
  { category: "CZ Signature", input: "4", expectedKeywords: [/4|Ignore FUD|BUIDLing/i], shouldNotMatchFallback: true },
  { category: "CZ Lexicon", input: "buidl", expectedKeywords: [/BUIDL|SAFU|CZ's philosophy/i], shouldNotMatchFallback: true },
  { category: "CZ Lexicon", input: "is it safu?", expectedKeywords: [/SAFU|verified BSC contract|Flap/i], shouldNotMatchFallback: true },
  { category: "Slang", input: "ser wen moon", expectedKeywords: [/blocks answer|diamond hands|Lambo/i], shouldNotMatchFallback: true },
  { category: "FUD", input: "this is pure fud", expectedKeywords: [/4|Ignore the noise|FUD is the noise|paper hands|three horsemen/i], shouldNotMatchFallback: true },
  { category: "FOMO", input: "am I late to buy?", expectedKeywords: [/never too late|3% BNB dividends|FOMO|Priest has heard/i], shouldNotMatchFallback: true },
  { category: "WAGMI", input: "wagmi ser", expectedKeywords: [/WAGMI|diamond hands/i], shouldNotMatchFallback: true },

  // ── 12. TECHNICAL & UTILITY ──────────────────────────────────────────────
  { category: "Stuck TX", input: "my transaction is stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account|pending/i], shouldNotMatchFallback: true },
  { category: "Add Wallet", input: "how do I add virtue to metamask", expectedKeywords: [/MetaMask|Import Tokens|contract address|custom token/i], shouldNotMatchFallback: true },
  { category: "Multiple Wallets", input: "can I use two wallets?", expectedKeywords: [/multiple.*wallet|two wallet|independently|proportional/i], shouldNotMatchFallback: true },
  { category: "Price Drop", input: "why is the price dropping?", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { category: "Virtue Price", input: "virtue price", expectedKeywords: [/Flap\.sh|price|chart/i], shouldNotMatchFallback: true },
  { category: "TL;DR", input: "tldr", expectedKeywords: [/\$VIRTUE|BSC|1,000,000,000|3%/i], shouldNotMatchFallback: true },
  { category: "Summary", input: "summarize", expectedKeywords: [/\$VIRTUE|BSC|3%|supply/i], shouldNotMatchFallback: true },
  { category: "Gibberish", input: "asdf", expectedKeywords: [/gas fees|hollow|confession|sin/i], shouldNotMatchFallback: true },
  { category: "Thanks", input: "thank you", expectedKeywords: [/diamond|BNB|dividends|peace|serve/i], shouldNotMatchFallback: true },
  { category: "OK Ack", input: "ok got it", expectedKeywords: [/ledger|diamond|confess|ask|journey|traveler|booth/i], shouldNotMatchFallback: false },
  { category: "Feedback", input: "feedback", expectedKeywords: [/suggestion|X|community|dev|improve|contract/i], shouldNotMatchFallback: false },

  // ── 13. MULTI-TURN CONVERSATIONAL CONTEXT ────────────────────────────────
  {
    category: "Context Followup",
    input: "where?",
    history: [{ role: "user", content: "How do I buy $VIRTUE?" }, { role: "assistant", content: "You can buy on Flap..." }],
    expectedKeywords: [/Flap\.sh|MetaMask|Trust Wallet/i],
    shouldNotMatchFallback: true
  },
  {
    category: "Context Followup",
    input: "how much?",
    history: [{ role: "user", content: "How do dividends work?" }, { role: "assistant", content: "3% tax..." }],
    expectedKeywords: [/3% tax|\$4/i],
    shouldNotMatchFallback: true
  },

  // ── 14. STANDALONE KEYWORDS (regression) ─────────────────────────────────
  { category: "Standalone: dex", input: "dex", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { category: "Standalone: dividends", input: "dividends", expectedKeywords: [/3%|BNB|auto|distribution/i], shouldNotMatchFallback: true },
  { category: "Standalone: dev", input: "dev", expectedKeywords: [/anonymous|reformed|wallet|\$40/i], shouldNotMatchFallback: true },
  { category: "Standalone: volume", input: "volume", expectedKeywords: [/volume|Flap\.sh|BNB|dividend/i], shouldNotMatchFallback: true },
  { category: "Standalone: hold", input: "hold", expectedKeywords: [/HODL|diamond|3%|passive|BNB|building/i], shouldNotMatchFallback: true },
  { category: "Standalone: test (not gibberish)", input: "how do I test the contract?", expectedKeywords: [/bscscan|verify|contract|BscScan/i], shouldNotMatchFallback: false },
  { category: "Bundling", input: "is it bundled?", expectedKeywords: [/bundling|multiwallet|Flap\.sh|\$40/i], shouldNotMatchFallback: true },
  { category: "Bundling", input: "coin bundled", expectedKeywords: [/bundling|multiwallet|Flap\.sh|\$40/i], shouldNotMatchFallback: true },
  { category: "Multiwallet", input: "multiwallet", expectedKeywords: [/bundling|multiwallet|Flap\.sh|\$40/i], shouldNotMatchFallback: true },
  { category: "Multiwallet", input: "scam multiwallet", expectedKeywords: [/bundling|multiwallet|Flap\.sh|\$40/i], shouldNotMatchFallback: true },
  { category: "Affiliation Mystery", input: "are you affiliate to binance?", expectedKeywords: [/official corporate affiliation|shadows|transparency|Binance|CZ/i], shouldNotMatchFallback: true },
  { category: "CEX Listing", input: "cex", expectedKeywords: [/no announced CEX|trades live|Flap|CEX listing/i], shouldNotMatchFallback: true },
  { category: "Big Names", input: "any big names under you?", expectedKeywords: [/big names|blockchain|corporate|shadows|independent|transparent/i], shouldNotMatchFallback: true },
  { category: "CZ Mystery", input: "cz related?", expectedKeywords: [/official corporate affiliation|why did CZ tweet|shadows|coincidence|blockchain is a public ledger|identities|diamond hands/i], shouldNotMatchFallback: true },
  { category: "Standalone: liquidity", input: "liquidity", expectedKeywords: [/100% locked|locked on Flap\.sh|liquidity pool/i], shouldNotMatchFallback: true },
  { category: "Standalone: liquidity locked", input: "liquidity locked", expectedKeywords: [/100% locked|locked on Flap\.sh|liquidity pool/i], shouldNotMatchFallback: true },
  { category: "Shitcoin/Meme/Utility", input: "shitcoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { category: "Shitcoin/Meme/Utility", input: "is this a shitcoin?", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { category: "Shitcoin/Meme/Utility", input: "are you a memecoin or utility?", expectedKeywords: [/evolution of both|meme token|utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { category: "Proxy Contract", input: "proxy", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { category: "Proxy Contract", input: "why proxy contract", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { category: "Bonding Curve", input: "bonding curve", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { category: "LP Burn", input: "lp burn", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
];

const genericFallbackPrefixes = [
  "Tell me more about your journey",
  "Does this weigh heavy on your wallet",
  "A true builder does not linger",
  "To be transparent: I am a confessional oracle",
  "The path of the diamond hand requires clarity",
  "Every traveler in the Forgiveness Booth",
  "In the silence between blocks",
  "The High Priest can inspect",
  "Speak freely, traveler",
  "The blocks are patient",
  "I am always learning",
  "Hmm. The Priest cannot"
];

let passed = 0;
let failed = 0;
const failures: string[] = [];

console.log("====================================================");
console.log(" 🔮 FULL EXPANDED LINGUISTIC TEST SUITE 🔮");
console.log(` Total Scenarios: ${testSuite.length}`);
console.log("====================================================\n");

testSuite.forEach((tc, idx) => {
  const result = runElizaPriest(tc.input, tc.history || []);
  const isFallback = genericFallbackPrefixes.some(prefix => result.reply.startsWith(prefix));

  const keywordOk = tc.expectedKeywords.some(pattern => {
    return typeof pattern === "string" ? result.reply.includes(pattern) : pattern.test(result.reply);
  });

  const fallbackOk = tc.shouldNotMatchFallback ? !isFallback : true;

  if (keywordOk && fallbackOk) {
    passed++;
    const flag = isFallback ? "✅⚠" : "✅";
    console.log(`${flag} [#${String(idx + 1).padStart(2, '0')}] [${tc.category}] "${tc.input}"`);
    console.log(`    ↳ ${result.reply.substring(0, 85)}...`);
  } else {
    failed++;
    const reason = !keywordOk ? "KEYWORD MISS" : "UNEXPECTED FALLBACK";
    console.log(`❌ [#${String(idx + 1).padStart(2, '0')}] [${tc.category}] "${tc.input}" — ${reason}`);
    console.log(`    ↳ Got:      "${result.reply.substring(0, 100)}"`);
    console.log(`    ↳ Expected: ${tc.expectedKeywords}`);
    failures.push(`[#${idx + 1}] ${tc.category}: "${tc.input}"`);
  }
  console.log();
});

console.log("====================================================");
console.log(` RESULTS: ${passed} PASSED | ${failed} FAILED (${Math.round((passed/testSuite.length)*100)}% Success)`);
console.log("====================================================");

if (failures.length > 0) {
  console.log("\n❌ FAILURES:\n" + failures.map(f => `  - ${f}`).join("\n"));
  process.exit(1);
} else {
  console.log("\n🎉 ALL TESTS PASSED");
}
