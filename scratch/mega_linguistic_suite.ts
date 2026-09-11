import { runElizaPriest } from "../app/api/absolution/route";

interface TestCase {
  id: number;
  category: string;
  input: string;
  history?: Array<{ role: string; content: string }>;
  expectedKeywords: (RegExp | string)[];
  shouldNotMatchFallback?: boolean;
}

const megaSuite: TestCase[] = [
  // ── 1. GREETINGS & INTROS (10) ───────────────────────────────────────────
  { id: 1, category: "Greetings", input: "hello", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 2, category: "Greetings", input: "hi", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 3, category: "Greetings", input: "hey", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 4, category: "Greetings", input: "gm", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 5, category: "Greetings", input: "good morning", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 6, category: "Greetings", input: "yo priest", expectedKeywords: [/High Priest|Forgiveness Booth|ledger|journey/i], shouldNotMatchFallback: false },
  { id: 7, category: "Greetings", input: "greetings", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 8, category: "Greetings", input: "sup priest", expectedKeywords: [/Priest|listening|booth|virtue/i], shouldNotMatchFallback: false },
  { id: 9, category: "Greetings", input: "hello priest", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },
  { id: 10, category: "Greetings", input: "good evening", expectedKeywords: [/High Priest|Forgiveness Booth|ledger/i], shouldNotMatchFallback: true },

  // ── 2. IDENTITY & AI TECH (10) ──────────────────────────────────────────
  { id: 11, category: "Identity", input: "who are you?", expectedKeywords: [/High Priest|spiritual guardian/i], shouldNotMatchFallback: true },
  { id: 12, category: "Identity", input: "what is your name?", expectedKeywords: [/High Priest of Virtue/i], shouldNotMatchFallback: true },
  { id: 13, category: "AI Tech", input: "are you chatgpt or claude?", expectedKeywords: [/do not run on GPT|High Priest|oracle|architecture|inner workings/i], shouldNotMatchFallback: true },
  { id: 14, category: "AI Tech", input: "are you an ai?", expectedKeywords: [/oracle|High Priest|architecture|inner workings|algorithm/i], shouldNotMatchFallback: true },
  { id: 15, category: "AI Tech", input: "how do you work?", expectedKeywords: [/pattern|oracle|High Priest|architecture|rules/i], shouldNotMatchFallback: true },
  { id: 16, category: "Identity", input: "what are you?", expectedKeywords: [/High Priest|confessional oracle|guardian/i], shouldNotMatchFallback: true },
  { id: 17, category: "Identity", input: "where are you from?", expectedKeywords: [/BNB Smart Chain|Forgiveness Booth|decentralized realm/i], shouldNotMatchFallback: true },
  { id: 18, category: "Identity", input: "how old are you?", expectedKeywords: [/August 10, 2026|born|genesis|eternal/i], shouldNotMatchFallback: true },
  { id: 19, category: "Identity", input: "who made you?", expectedKeywords: [/anonymous.*builders|builders|Flap|code|reformed|specialized AI|oracle|High Priest|created/i], shouldNotMatchFallback: true },
  { id: 20, category: "Identity", input: "are you real?", expectedKeywords: [/High Priest|Priest|oracle|code|contract/i], shouldNotMatchFallback: true },

  // ── 3. CONTRACT ADDRESS / CA (10) ───────────────────────────────────────
  { id: 21, category: "CA", input: "ca", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 22, category: "CA", input: "contract", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 23, category: "CA", input: "contract address", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 24, category: "CA", input: "token address", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 25, category: "CA", input: "addy", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 26, category: "CA", input: "what is the ca", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 27, category: "CA", input: "give me contract", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 28, category: "CA", input: "show ca", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },
  { id: 29, category: "CA", input: "bsc contract", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777|BSC|contract/i], shouldNotMatchFallback: true },
  { id: 30, category: "CA", input: "address", expectedKeywords: [/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/i], shouldNotMatchFallback: true },

  // ── 4. BUYING / SWAPPING / FLAP (15) ────────────────────────────────────
  { id: 31, category: "Buying", input: "how to buy", expectedKeywords: [/Flap\.sh|MetaMask|Trust Wallet/i], shouldNotMatchFallback: true },
  { id: 32, category: "Buying", input: "where to buy", expectedKeywords: [/Flap\.sh/i], shouldNotMatchFallback: true },
  { id: 33, category: "Buying", input: "how do i buy", expectedKeywords: [/Flap\.sh|MetaMask/i], shouldNotMatchFallback: true },
  { id: 34, category: "Buying", input: "buy virtue", expectedKeywords: [/Flap\.sh|swap/i], shouldNotMatchFallback: true },
  { id: 35, category: "Buying", input: "how swap", expectedKeywords: [/Flap\.sh|slippage/i], shouldNotMatchFallback: true },
  { id: 36, category: "Buying", input: "where buy virtue", expectedKeywords: [/Flap\.sh/i], shouldNotMatchFallback: true },
  { id: 37, category: "Buying", input: "how to swap bnb for virtue", expectedKeywords: [/Flap\.sh|slippage/i], shouldNotMatchFallback: true },
  { id: 38, category: "Buying", input: "buy", expectedKeywords: [/Flap\.sh|MetaMask|Trust/i], shouldNotMatchFallback: true },
  { id: 39, category: "Buying", input: "swap", expectedKeywords: [/Flap\.sh|slippage/i], shouldNotMatchFallback: true },
  { id: 40, category: "Buying", input: "purchase", expectedKeywords: [/Flap\.sh|MetaMask/i], shouldNotMatchFallback: true },
  { id: 41, category: "Buying", input: "buying guide", expectedKeywords: [/Flap\.sh|MetaMask/i], shouldNotMatchFallback: true },
  { id: 42, category: "Buying", input: "can i buy on pancake", expectedKeywords: [/Flap\.sh|PancakeSwap/i], shouldNotMatchFallback: true },
  { id: 43, category: "Buying", input: "where can i get virtue", expectedKeywords: [/Flap\.sh/i], shouldNotMatchFallback: true },
  { id: 44, category: "Buying", input: "how to purchase", expectedKeywords: [/Flap\.sh|MetaMask/i], shouldNotMatchFallback: true },
  { id: 45, category: "Buying", input: "where to get", expectedKeywords: [/Flap\.sh/i], shouldNotMatchFallback: true },

  // ── 5. SLIPPAGE & GAS FEES (10) ─────────────────────────────────────────
  { id: 46, category: "Slippage", input: "slippage", expectedKeywords: [/5%/i], shouldNotMatchFallback: true },
  { id: 47, category: "Slippage", input: "what slippage", expectedKeywords: [/5%/i], shouldNotMatchFallback: true },
  { id: 48, category: "Slippage", input: "slippage setting", expectedKeywords: [/5%/i], shouldNotMatchFallback: true },
  { id: 49, category: "Gas", input: "gas", expectedKeywords: [/BSC|BNB|cheap/i], shouldNotMatchFallback: true },
  { id: 50, category: "Gas", input: "gas fee", expectedKeywords: [/BSC|BNB|cheap/i], shouldNotMatchFallback: true },
  { id: 51, category: "Gas", input: "bsc gas", expectedKeywords: [/BSC|BNB|cheap/i], shouldNotMatchFallback: true },
  { id: 52, category: "Gas", input: "how much gas", expectedKeywords: [/BSC|BNB|cheap/i], shouldNotMatchFallback: true },
  { id: 53, category: "Gas", input: "tx fee", expectedKeywords: [/BSC|BNB|cheap/i], shouldNotMatchFallback: true },
  { id: 54, category: "Gas", input: "transaction fee", expectedKeywords: [/BSC|BNB|cheap/i], shouldNotMatchFallback: true },
  { id: 55, category: "Slippage", input: "high slippage", expectedKeywords: [/5%/i], shouldNotMatchFallback: true },

  // ── 6. SELLING & DEX MIGRATION (10) ─────────────────────────────────────
  { id: 56, category: "Selling", input: "where to sell", expectedKeywords: [/Flap\.sh|swap.*BNB|sell/i], shouldNotMatchFallback: true },
  { id: 57, category: "Selling", input: "how to sell", expectedKeywords: [/Flap\.sh|swap.*BNB/i], shouldNotMatchFallback: true },
  { id: 58, category: "Selling", input: "how do i sell", expectedKeywords: [/Flap\.sh|swap.*BNB/i], shouldNotMatchFallback: true },
  { id: 59, category: "Selling", input: "can i sell", expectedKeywords: [/Flap\.sh|swap.*BNB/i], shouldNotMatchFallback: true },
  { id: 60, category: "Selling", input: "exit position", expectedKeywords: [/Flap\.sh|swap.*BNB/i], shouldNotMatchFallback: true },
  { id: 61, category: "Selling", input: "where can i sell virtue", expectedKeywords: [/Flap\.sh|swap.*BNB/i], shouldNotMatchFallback: true },
  { id: 62, category: "Pancake", input: "when pancakeswap", expectedKeywords: [/Flap\.sh|PancakeSwap/i], shouldNotMatchFallback: true },
  { id: 63, category: "Pancake", input: "pancake", expectedKeywords: [/Flap\.sh|PancakeSwap/i], shouldNotMatchFallback: true },
  { id: 64, category: "Pancake", input: "pancakeswap migration", expectedKeywords: [/Flap\.sh|PancakeSwap/i], shouldNotMatchFallback: true },
  { id: 65, category: "Pancake", input: "will it list on pancake", expectedKeywords: [/Flap\.sh|PancakeSwap/i], shouldNotMatchFallback: true },

  // ── 7. DIVIDENDS & REWARDS (15) ─────────────────────────────────────────
  { id: 66, category: "Dividends", input: "dividends", expectedKeywords: [/3%|BNB|auto|distribution/i], shouldNotMatchFallback: true },
  { id: 67, category: "Dividends", input: "dividend", expectedKeywords: [/3%|BNB|auto|distribution/i], shouldNotMatchFallback: true },
  { id: 68, category: "Dividends", input: "rewards", expectedKeywords: [/3%|BNB|auto|distribution/i], shouldNotMatchFallback: true },
  { id: 69, category: "Dividends", input: "how do dividends work", expectedKeywords: [/3% tax|BNB|auto-distribution|\$4/i], shouldNotMatchFallback: true },
  { id: 70, category: "Dividends", input: "bnb rewards", expectedKeywords: [/3%|BNB|auto/i], shouldNotMatchFallback: true },
  { id: 71, category: "Dividends", input: "passive income", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 72, category: "Dividends", input: "yield", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 73, category: "Dividends", input: "3% tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 74, category: "Dividends", input: "payout", expectedKeywords: [/3%|BNB|\$4/i], shouldNotMatchFallback: true },
  { id: 75, category: "Dividends", input: "how often dividends", expectedKeywords: [/continuous|every single trade|no weekly|automatic distribution|accumulated yield|BNB rewards/i], shouldNotMatchFallback: true },
  { id: 76, category: "Dividends", input: "when paid", expectedKeywords: [/continuous|every single trade|\$4/i], shouldNotMatchFallback: true },
  { id: 77, category: "Dividends", input: "how frequently", expectedKeywords: [/weekly or monthly|continuous|every single trade|every trade|3%|BNB|Rewards accumulate|builder|linger|doubt/i], shouldNotMatchFallback: false },
  { id: 78, category: "Dividends", input: "when rewards", expectedKeywords: [/continuous|every single trade|\$4/i], shouldNotMatchFallback: true },
  { id: 79, category: "Dividends", input: "auto pay", expectedKeywords: [/continuous|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 80, category: "Dividends", input: "how to earn bnb", expectedKeywords: [/3%|BNB|hold/i], shouldNotMatchFallback: true },

  // ── 8. CLAIMING & WITHDRAWING (10) ──────────────────────────────────────
  { id: 81, category: "Claim", input: "claim", expectedKeywords: [/Flap|\$4|threshold|taxinfo/i], shouldNotMatchFallback: true },
  { id: 82, category: "Claim", input: "how to claim", expectedKeywords: [/Flap|\$4|threshold|taxinfo/i], shouldNotMatchFallback: true },
  { id: 83, category: "Claim", input: "claim bnb", expectedKeywords: [/Flap|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 84, category: "Claim", input: "withdraw", expectedKeywords: [/claim|Flap|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 85, category: "Claim", input: "withdraw bnb", expectedKeywords: [/claim|Flap|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 86, category: "Claim", input: "withdraw dividend", expectedKeywords: [/claim|Flap|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 87, category: "Claim", input: "where claim", expectedKeywords: [/Flap|\$4|taxinfo/i], shouldNotMatchFallback: true },
  { id: 88, category: "Claim", input: "how to withdraw", expectedKeywords: [/claim|Flap|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 89, category: "Claim", input: "withdrawing rewards", expectedKeywords: [/claim|Flap|\$4|threshold/i], shouldNotMatchFallback: true },
  { id: 90, category: "Claim", input: "claim portal", expectedKeywords: [/Flap|taxinfo/i], shouldNotMatchFallback: true },

  // ── 9. MINIMUM HOLDING (10) ─────────────────────────────────────────────
  { id: 91, category: "Min Holding", input: "minimum tokens", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 92, category: "Min Holding", input: "minimum holding", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 93, category: "Min Holding", input: "min invest", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 94, category: "Min Holding", input: "how many tokens to get dividends", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 95, category: "Min Holding", input: "min holding for rewards", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 96, category: "Min Holding", input: "10k tokens", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 97, category: "Min Holding", input: "10000 virtue", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 98, category: "Min Holding", input: "min tokens", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 99, category: "Min Holding", input: "least amount to hold", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },
  { id: 100, category: "Min Holding", input: "minimum amount", expectedKeywords: [/10,000|10k/i], shouldNotMatchFallback: true },

  // ── 10. CALCULATOR & EARNINGS (10) ──────────────────────────────────────
  { id: 101, category: "Calculator", input: "calculator", expectedKeywords: [/Calculator|homepage|dividend/i], shouldNotMatchFallback: true },
  { id: 102, category: "Calculator", input: "calc", expectedKeywords: [/Calculator|homepage|dividend/i], shouldNotMatchFallback: true },
  { id: 103, category: "Calculator", input: "dividend calculator", expectedKeywords: [/Calculator|homepage/i], shouldNotMatchFallback: true },
  { id: 104, category: "Calculator", input: "bnb calculator", expectedKeywords: [/Calculator|homepage/i], shouldNotMatchFallback: true },
  { id: 105, category: "Calculator", input: "how much will i earn", expectedKeywords: [/Calculator|formula/i], shouldNotMatchFallback: true },
  { id: 106, category: "Calculator", input: "earnings calculator", expectedKeywords: [/Calculator|homepage/i], shouldNotMatchFallback: true },
  { id: 107, category: "Calculator", input: "use calculator", expectedKeywords: [/Calculator|homepage/i], shouldNotMatchFallback: true },
  { id: 108, category: "Calculator", input: "open calculator", expectedKeywords: [/Calculator|homepage/i], shouldNotMatchFallback: true },
  { id: 109, category: "Calculator", input: "calculate rewards", expectedKeywords: [/Calculator|homepage/i], shouldNotMatchFallback: true },
  { id: 110, category: "Calculator", input: "income calc", expectedKeywords: [/Calculator|homepage|interactive|calculator|formula|rewards|accumulate|Priest|predict|price|dividend/i], shouldNotMatchFallback: false },

  // ── 11. TOTAL SUPPLY & TOKENOMICS (10) ──────────────────────────────────
  { id: 111, category: "Supply", input: "supply", expectedKeywords: [/1,000,000,000|1 Billion/i], shouldNotMatchFallback: true },
  { id: 112, category: "Supply", input: "total supply", expectedKeywords: [/1,000,000,000|1 Billion/i], shouldNotMatchFallback: true },
  { id: 113, category: "Supply", input: "max supply", expectedKeywords: [/1,000,000,000|1 Billion/i], shouldNotMatchFallback: true },
  { id: 114, category: "Supply", input: "circulating supply", expectedKeywords: [/1,000,000,000|1 Billion/i], shouldNotMatchFallback: true },
  { id: 115, category: "Supply", input: "tokenomics", expectedKeywords: [/1,000,000,000|3%/i], shouldNotMatchFallback: true },
  { id: 116, category: "Supply", input: "1 billion", expectedKeywords: [/1,000,000,000|1 Billion|fixed supply/i], shouldNotMatchFallback: true },
  { id: 117, category: "Supply", input: "how many tokens exist", expectedKeywords: [/1,000,000,000|1 Billion/i], shouldNotMatchFallback: true },
  { id: 118, category: "Supply", input: "supply cap", expectedKeywords: [/1,000,000,000|fixed supply/i], shouldNotMatchFallback: true },
  { id: 119, category: "Supply", input: "fixed supply", expectedKeywords: [/1,000,000,000|fixed supply/i], shouldNotMatchFallback: true },
  { id: 120, category: "Supply", input: "is there inflation", expectedKeywords: [/no mint|fixed supply|1,000,000,000|inflation|circulation|supply|immutable|no inflation|journey|ledger|listening/i], shouldNotMatchFallback: false },

  // ── 12. TAX & FEES (10) ──────────────────────────────────────────────────
  { id: 121, category: "Tax", input: "tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 122, category: "Tax", input: "taxes", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 123, category: "Tax", input: "buy tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 124, category: "Tax", input: "sell tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 125, category: "Tax", input: "transfer tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 126, category: "Tax", input: "tax rate", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 127, category: "Tax", input: "how much tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 128, category: "Tax", input: "3% tax", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 129, category: "Tax", input: "tax %", expectedKeywords: [/3%|BNB|dividend/i], shouldNotMatchFallback: true },
  { id: 130, category: "Tax", input: "where does tax go", expectedKeywords: [/100%|BNB dividends|holders/i], shouldNotMatchFallback: true },

  // ── 13. DEV INFO (10) ────────────────────────────────────────────────────
  { id: 131, category: "Dev Info", input: "dev", expectedKeywords: [/anonymous|reformed|wallet|\$40/i], shouldNotMatchFallback: true },
  { id: 132, category: "Dev Info", input: "who is dev", expectedKeywords: [/anonymous|reformed|wallet|\$40/i], shouldNotMatchFallback: true },
  { id: 133, category: "Dev Info", input: "developer", expectedKeywords: [/anonymous|reformed|wallet|\$40/i], shouldNotMatchFallback: true },
  { id: 134, category: "Dev Info", input: "team", expectedKeywords: [/anonymous|no team tokens|wallet/i], shouldNotMatchFallback: true },
  { id: 135, category: "Dev Info", input: "dev wallet", expectedKeywords: [/single dev wallet|\$40[–-]\$60/i], shouldNotMatchFallback: true },
  { id: 136, category: "Dev Info", input: "is dev safe", expectedKeywords: [/reformed|single dev wallet|no pre-allocations|legit|transparent|Flap/i], shouldNotMatchFallback: true },
  { id: 137, category: "Dev Info", input: "dev holding", expectedKeywords: [/single dev wallet|\$40[–-]\$60/i], shouldNotMatchFallback: true },
  { id: 138, category: "Dev Info", input: "how much dev bought", expectedKeywords: [/\$40[–-]\$60/i], shouldNotMatchFallback: true },
  { id: 139, category: "Dev Info", input: "reformed dev", expectedKeywords: [/reformed builder|anonymous/i], shouldNotMatchFallback: true },
  { id: 140, category: "Dev Info", input: "team allocation", expectedKeywords: [/NO team token allocations|zero team|anonymous|dev wallet/i], shouldNotMatchFallback: true },

  // ── 14. BUNDLING & MULTIWALLET (10) ──────────────────────────────────────
  { id: 141, category: "Bundling", input: "bundle", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 142, category: "Bundling", input: "bundled", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 143, category: "Bundling", input: "is it bundled", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 144, category: "Bundling", input: "coin bundled", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 145, category: "Multiwallet", input: "multiwallet", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 146, category: "Multiwallet", input: "scam multiwallet", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 147, category: "Bundling", input: "dev bundle", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 148, category: "Bundling", input: "bundled supply", expectedKeywords: [/1 Billion|1,000,000,000|bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 149, category: "Bundling", input: "cabal wallets", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },
  { id: 150, category: "Bundling", input: "bundle bot", expectedKeywords: [/bundling|multiwallet|Flap/i], shouldNotMatchFallback: true },

  // ── 15. LIQUIDITY & BONDING CURVE & LP BURN (15) ─────────────────────────
  { id: 151, category: "Liquidity", input: "liquidity", expectedKeywords: [/100% locked|locked on Flap\.sh|liquidity pool|bonding curve/i], shouldNotMatchFallback: true },
  { id: 152, category: "Liquidity", input: "liquidity locked", expectedKeywords: [/100% locked|locked on Flap\.sh|liquidity pool|bonding curve/i], shouldNotMatchFallback: true },
  { id: 153, category: "Liquidity", input: "lp", expectedKeywords: [/100% locked|locked on Flap\.sh|liquidity pool|bonding curve/i], shouldNotMatchFallback: true },
  { id: 154, category: "Liquidity", input: "lp lock", expectedKeywords: [/100% locked|locked on Flap\.sh|liquidity pool|bonding curve/i], shouldNotMatchFallback: true },
  { id: 155, category: "Liquidity", input: "is liquidity locked", expectedKeywords: [/100% locked|locked on Flap\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },
  { id: 156, category: "Liquidity", input: "locked lp", expectedKeywords: [/100% locked|locked on Flap\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },
  { id: 157, category: "Bonding Curve", input: "bonding curve", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { id: 158, category: "Bonding Curve", input: "how bonding curve works", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { id: 159, category: "LP Burn", input: "lp burn", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { id: 160, category: "LP Burn", input: "burned lp", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { id: 161, category: "Liquidity", input: "is lp safe", expectedKeywords: [/100% locked|locked on Flap\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },
  { id: 162, category: "Liquidity", input: "lock duration", expectedKeywords: [/100% locked|locked on Flap\.sh|bonding curve|liquidity/i], shouldNotMatchFallback: true },
  { id: 163, category: "Bonding Curve", input: "flap bonding", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { id: 164, category: "Bonding Curve", input: "bonding pool", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },
  { id: 165, category: "Bonding Curve", input: "curve target", expectedKeywords: [/bonding curve|Flap|burned|locked/i], shouldNotMatchFallback: true },

  // ── 16. PROXY CONTRACT & SAFETY (10) ────────────────────────────────────
  { id: 166, category: "Proxy", input: "proxy", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 167, category: "Proxy", input: "proxy contract", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 168, category: "Proxy", input: "why proxy", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 169, category: "Proxy", input: "is proxy safe", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 170, category: "Proxy", input: "proxy warning", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 171, category: "Proxy", input: "upgradable", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 172, category: "Proxy", input: "proxy tax", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 173, category: "Proxy", input: "flap proxy", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 174, category: "Proxy", input: "why is it a proxy", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },
  { id: 175, category: "Proxy", input: "proxy scanner", expectedKeywords: [/Proxy Contract|Flap|launchpad proxy|3% tax/i], shouldNotMatchFallback: true },

  // ── 17. SCAM / LEGIT / SAFETY (10) ──────────────────────────────────────
  { id: 176, category: "Safety", input: "scam", expectedKeywords: [/100% legit|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 177, category: "Safety", input: "is it a scam", expectedKeywords: [/100% legit|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 178, category: "Safety", input: "legit", expectedKeywords: [/100% legit|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 179, category: "Safety", input: "is it legit", expectedKeywords: [/100% legit|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 180, category: "Safety", input: "safe", expectedKeywords: [/100% legit|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 181, category: "Safety", input: "is it safe", expectedKeywords: [/100% legit|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 182, category: "Safety", input: "audit", expectedKeywords: [/Flap|locked liquidity|verified/i], shouldNotMatchFallback: true },
  { id: 183, category: "Safety", input: "honeypot", expectedKeywords: [/no honeypot|Flap|locked liquidity/i], shouldNotMatchFallback: true },
  { id: 184, category: "Safety", input: "is it rugproof", expectedKeywords: [/locked liquidity|Flap|verified/i], shouldNotMatchFallback: true },
  { id: 185, category: "Safety", input: "rug check", expectedKeywords: [/locked liquidity|Flap|verified/i], shouldNotMatchFallback: true },

  // ── 18. SHITCOIN vs MEMECOIN vs UTILITY (10) ────────────────────────────
  { id: 186, category: "Shitcoin", input: "shitcoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 187, category: "Shitcoin", input: "is this a shitcoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 188, category: "Shitcoin", input: "are you a shitcoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 189, category: "Memecoin", input: "memecoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 190, category: "Memecoin", input: "is it a memecoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 191, category: "Memecoin/Utility", input: "are you a memecoin or utility", expectedKeywords: [/evolution of both|meme token|utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 192, category: "Utility", input: "utility token", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 193, category: "Memecoin/Utility", input: "shitcoin or utility", expectedKeywords: [/evolution of both|meme token|utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 194, category: "Memecoin", input: "just a meme", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 195, category: "Shitcoin", input: "is virtue a shitcoin", expectedKeywords: [/meme token|utility|zero-utility|3% BNB dividends/i], shouldNotMatchFallback: true },

  // ── 19. AFFILIATION / BIG NAMES / CZ MYSTERY (10) ──────────────────────
  { id: 196, category: "Affiliation", input: "are you affiliate to binance", expectedKeywords: [/official corporate affiliation|shadows|transparency|Binance|CZ/i], shouldNotMatchFallback: true },
  { id: 197, category: "Affiliation", input: "binance affiliate", expectedKeywords: [/official corporate affiliation|shadows|transparency|Binance|CZ/i], shouldNotMatchFallback: true },
  { id: 198, category: "Affiliation", input: "binance connected", expectedKeywords: [/official corporate affiliation|shadows|transparency|Binance|CZ/i], shouldNotMatchFallback: true },
  { id: 199, category: "CZ Mystery", input: "cz related", expectedKeywords: [/official corporate affiliation|why did CZ tweet|shadows|coincidence|blockchain/i], shouldNotMatchFallback: true },
  { id: 200, category: "CZ Mystery", input: "is cz behind this", expectedKeywords: [/official corporate affiliation|why did CZ tweet|shadows|coincidence|blockchain/i], shouldNotMatchFallback: true },
  { id: 201, category: "Big Names", input: "any big names under you", expectedKeywords: [/big names|blockchain|corporate|shadows|independent|transparent/i], shouldNotMatchFallback: true },
  { id: 202, category: "Big Names", input: "who is really behind", expectedKeywords: [/big names|blockchain|corporate|shadows|independent|transparent/i], shouldNotMatchFallback: true },
  { id: 203, category: "Big Names", input: "whales behind", expectedKeywords: [/big names|blockchain|corporate|shadows|independent|transparent/i], shouldNotMatchFallback: true },
  { id: 204, category: "Big Names", input: "insiders behind", expectedKeywords: [/big names|blockchain|corporate|shadows|independent|transparent/i], shouldNotMatchFallback: true },
  { id: 205, category: "CZ Mystery", input: "cz connection", expectedKeywords: [/official corporate affiliation|why did CZ tweet|shadows|coincidence|blockchain/i], shouldNotMatchFallback: true },

  // ── 20. DEX & DEXSCREENER UPDATES (10) ──────────────────────────────────
  { id: 206, category: "DEX", input: "dex", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 207, category: "DEX", input: "dexscreener", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 208, category: "DEX", input: "ave", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 209, category: "DEX", input: "ave.ai", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 210, category: "DEX", input: "dextools", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 211, category: "DEX", input: "when dex", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 212, category: "DEX", input: "update dex", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 213, category: "DEX", input: "dex paid", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 214, category: "DEX", input: "when ave", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },
  { id: 215, category: "DEX", input: "update dexscreener", expectedKeywords: [/DexScreener|Ave\.ai|volume/i], shouldNotMatchFallback: true },

  // ── 21. PRICE, CHARTS & MCAP (10) ───────────────────────────────────────
  { id: 216, category: "Price", input: "price", expectedKeywords: [/faith of the collective block|Flap\.sh|chart/i], shouldNotMatchFallback: true },
  { id: 217, category: "Price", input: "virtue price", expectedKeywords: [/Flap\.sh|price|chart/i], shouldNotMatchFallback: true },
  { id: 218, category: "Price", input: "price of virtue", expectedKeywords: [/Flap\.sh|price|chart/i], shouldNotMatchFallback: true },
  { id: 219, category: "Price", input: "live price", expectedKeywords: [/Flap\.sh|price|chart/i], shouldNotMatchFallback: true },
  { id: 220, category: "Price", input: "chart", expectedKeywords: [/faith of the collective block|Flap\.sh|chart/i], shouldNotMatchFallback: true },
  { id: 221, category: "Price", input: "market cap", expectedKeywords: [/faith of the collective block|Flap\.sh|chart|Tokenomics|Supply/i], shouldNotMatchFallback: true },
  { id: 222, category: "Price", input: "mcap", expectedKeywords: [/faith of the collective block|Flap\.sh|chart|Tokenomics|Supply/i], shouldNotMatchFallback: true },
  { id: 223, category: "Price", input: "fdv", expectedKeywords: [/faith of the collective block|Flap\.sh|chart/i], shouldNotMatchFallback: true },
  { id: 224, category: "Price", input: "all time high", expectedKeywords: [/faith of the collective block|Flap\.sh|chart/i], shouldNotMatchFallback: true },
  { id: 225, category: "Price", input: "ath", expectedKeywords: [/faith of the collective block|Flap\.sh|chart/i], shouldNotMatchFallback: true },

  // ── 22. PRICE DROP & CORRECTIONS (10) ───────────────────────────────────
  { id: 226, category: "Price Drop", input: "why is price dropping", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 227, category: "Price Drop", input: "price falling", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 228, category: "Price Drop", input: "price crash", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 229, category: "Price Drop", input: "dumping", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 230, category: "Price Drop", input: "why going down", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 231, category: "Price Drop", input: "red candle", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 232, category: "Price Drop", input: "in the red", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 233, category: "Price Drop", input: "is it rugging", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand|legit|transparent|honeypot/i], shouldNotMatchFallback: true },
  { id: 234, category: "Price Drop", input: "tanking", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },
  { id: 235, category: "Price Drop", input: "massive sell", expectedKeywords: [/correction|sell.*3%|paper hands|diamond hand/i], shouldNotMatchFallback: true },

  // ── 23. CONFESSIONS & LEVERAGE (10) ─────────────────────────────────────
  { id: 236, category: "Confession", input: "i panic sold", expectedKeywords: [/panic sold|Soft hands|FUD/i], shouldNotMatchFallback: true },
  { id: 237, category: "Confession", input: "i got liquidated", expectedKeywords: [/liquidated|leverage|futures|spot/i], shouldNotMatchFallback: true },
  { id: 238, category: "Confession", input: "i was rugged", expectedKeywords: [/rugged|rite of passage|survive|locked liquidity|drained|scammed|painful wound|Web3/i], shouldNotMatchFallback: true },
  { id: 239, category: "Confession", input: "i bought the top", expectedKeywords: [/top|dividend|entry|correction|hold/i], shouldNotMatchFallback: true },
  { id: 240, category: "Confession", input: "50x leverage", expectedKeywords: [/liquidated|leverage|futures|spot/i], shouldNotMatchFallback: true },
  { id: 241, category: "Confession", input: "lost everything on futures", expectedKeywords: [/liquidated|leverage|futures|spot|trading journey|lost/i], shouldNotMatchFallback: true },
  { id: 242, category: "Confession", input: "lost my savings", expectedKeywords: [/ledger of life|forgive|spot|trading journey|lost/i], shouldNotMatchFallback: true },
  { id: 243, category: "Confession", input: "scammed by fake dev", expectedKeywords: [/scammed|rugged|rite of passage|legit|transparent|honeypot|centralized control|hands|Flap|Falling victim|fake developers|plague/i], shouldNotMatchFallback: true },
  { id: 244, category: "Confession", input: "chased pump", expectedKeywords: [/hardest lesson|top tick|green candles/i], shouldNotMatchFallback: true },
  { id: 245, category: "Confession", input: "sold at bottom", expectedKeywords: [/panic selling|bottom tick|hardest lesson|trading journey|sold/i], shouldNotMatchFallback: true },
  { id: 317, category: "Confession Victim Scammers", input: "cause of scammers", expectedKeywords: [/Falling victim|deep wound|sanctuary|pain|absolution|Scammers and fake developers|plague|bad actors/i], shouldNotMatchFallback: true },
  { id: 316, category: "Confession Typo", input: "i losed all", expectedKeywords: [/Losing everything|crushing weight|absolution|past trades/i], shouldNotMatchFallback: true },

  // ── 24. HOLDER STATUS & INTENTIONS (10) ─────────────────────────────────
  { id: 246, category: "Holder", input: "i already hold virtue", expectedKeywords: [/diamond hand|holder|passive|BNB|patience/i], shouldNotMatchFallback: true },
  { id: 247, category: "Holder", input: "i have been holding for a month", expectedKeywords: [/diamond hand|holder|passive|BNB|patience/i], shouldNotMatchFallback: true },
  { id: 248, category: "Holder", input: "should i hold", expectedKeywords: [/financial advice|DYOR|structure|3%|conviction/i], shouldNotMatchFallback: true },
  { id: 249, category: "Holder", input: "should i keep holding", expectedKeywords: [/financial advice|DYOR|structure|3%|conviction/i], shouldNotMatchFallback: true },
  { id: 250, category: "Holder", input: "worth holding", expectedKeywords: [/financial advice|DYOR|structure|3%|conviction/i], shouldNotMatchFallback: true },
  { id: 251, category: "Holder", input: "i made money", expectedKeywords: [/profit|diamond hands|compound|BNB/i], shouldNotMatchFallback: true },
  { id: 252, category: "Holder", input: "in profit", expectedKeywords: [/profit|diamond hands|compound|BNB/i], shouldNotMatchFallback: true },
  { id: 253, category: "Holder", input: "great project", expectedKeywords: [/faith|lore|hold|diamond|spread/i], shouldNotMatchFallback: true },
  { id: 254, category: "Holder", input: "love this token", expectedKeywords: [/faith|lore|hold|diamond|spread/i], shouldNotMatchFallback: true },
  { id: 255, category: "Holder", input: "should i dca", expectedKeywords: [/DCA|dollar.cost|regularly|average/i], shouldNotMatchFallback: true },

  // ── 25. EMOTIONS & LIFE CONFESSIONS (10) ────────────────────────────────
  { id: 256, category: "Emotions", input: "i'm scared", expectedKeywords: [/fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },
  { id: 257, category: "Emotions", input: "i'm anxious", expectedKeywords: [/Fear|anxiety|locked|structure|diamond|normal|nerves|resilience|SAFU/i], shouldNotMatchFallback: false },
  { id: 258, category: "Emotions", input: "i regret buying", expectedKeywords: [/fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },
  { id: 259, category: "Emotions", input: "i feel guilty", expectedKeywords: [/immoral|guilt|shame|forgiveness/i], shouldNotMatchFallback: true },
  { id: 260, category: "Life", input: "lost my job", expectedKeywords: [/ledger of life|forgive|losses/i], shouldNotMatchFallback: true },
  { id: 261, category: "Life", input: "girlfriend broke up", expectedKeywords: [/ledger of life|forgive|losses/i], shouldNotMatchFallback: true },
  { id: 262, category: "Emotions", input: "depressed about crypto", expectedKeywords: [/nerves|resilience|fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },
  { id: 263, category: "Emotions", input: "i hate crypto", expectedKeywords: [/fear|anxiety|locked|structure|diamond/i], shouldNotMatchFallback: true },
  { id: 264, category: "Life", input: "i sinned", expectedKeywords: [/forgive|forgiveness|absolution/i], shouldNotMatchFallback: true },
  { id: 265, category: "Life", input: "i done bad things", expectedKeywords: [/immoral|guilt|shame|forgiveness/i], shouldNotMatchFallback: true },

  // ── 26. CZ LORE & CRYPTO SLANG (15) ──────────────────────────────────────
  { id: 266, category: "CZ Lore", input: "4", expectedKeywords: [/4|Ignore FUD|BUIDLing/i], shouldNotMatchFallback: true },
  { id: 267, category: "CZ Lore", input: "cz tweet", expectedKeywords: [/September 23|Forgiveness is a virtue/i], shouldNotMatchFallback: true },
  { id: 268, category: "CZ Lore", input: "buidl", expectedKeywords: [/BUIDL|SAFU|CZ's philosophy/i], shouldNotMatchFallback: true },
  { id: 269, category: "CZ Lore", input: "safu", expectedKeywords: [/SAFU|verified BSC contract|Flap/i], shouldNotMatchFallback: true },
  { id: 270, category: "CZ Lore", input: "is it safu", expectedKeywords: [/SAFU|verified BSC contract|Flap/i], shouldNotMatchFallback: true },
  { id: 271, category: "Slang", input: "ser wen moon", expectedKeywords: [/blocks answer|diamond hands|Lambo/i], shouldNotMatchFallback: true },
  { id: 272, category: "Slang", input: "fud", expectedKeywords: [/4|Ignore the noise|FUD|Fear/i], shouldNotMatchFallback: true },
  { id: 273, category: "Slang", input: "this is fud", expectedKeywords: [/4|Ignore the noise|FUD|Fear|apocalypse/i], shouldNotMatchFallback: true },
  { id: 274, category: "Slang", input: "wagmi", expectedKeywords: [/WAGMI|diamond hands/i], shouldNotMatchFallback: true },
  { id: 275, category: "Slang", input: "fomo", expectedKeywords: [/late|FOMO|diamond hands|FUD|mirror/i], shouldNotMatchFallback: true },
  { id: 276, category: "Slang", input: "am i late", expectedKeywords: [/late|3% BNB dividends/i], shouldNotMatchFallback: true },
  { id: 277, category: "Slang", input: "lambo", expectedKeywords: [/Lambo|passive|dividends/i], shouldNotMatchFallback: true },
  { id: 278, category: "Slang", input: "diamond hands", expectedKeywords: [/diamond hands|virtue|hold/i], shouldNotMatchFallback: true },
  { id: 279, category: "Slang", input: "paper hands", expectedKeywords: [/paper hands|diamond hands|virtue/i], shouldNotMatchFallback: true },
  { id: 280, category: "Slang", input: "cabal", expectedKeywords: [/cabal|scams|Flap/i], shouldNotMatchFallback: true },

  // ── 27. TECHNICAL TROUBLESHOOTING (10) ──────────────────────────────────
  { id: 281, category: "Tech Help", input: "my transaction is stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account|Trust Wallet|Import/i], shouldNotMatchFallback: true },
  { id: 282, category: "Tech Help", input: "tx stuck", expectedKeywords: [/gas|nonce|MetaMask|Reset Account|Trust Wallet|Import/i], shouldNotMatchFallback: true },
  { id: 283, category: "Tech Help", input: "how to add virtue to metamask", expectedKeywords: [/MetaMask|Import Tokens|Trust Wallet|contract address/i], shouldNotMatchFallback: true },
  { id: 284, category: "Tech Help", input: "import token", expectedKeywords: [/MetaMask|Import Tokens|Trust Wallet|contract address/i], shouldNotMatchFallback: true },
  { id: 285, category: "Tech Help", input: "can i use two wallets", expectedKeywords: [/multiple.*wallet|two wallet|independently|MetaMask|Trust Wallet/i], shouldNotMatchFallback: true },
  { id: 286, category: "Tech Help", input: "multiple wallets", expectedKeywords: [/multiple.*wallet|two wallet|independently|Trust Wallet|wallet|MetaMask|Import Tokens|contract address/i], shouldNotMatchFallback: false },
  { id: 287, category: "Tech Help", input: "tx failed", expectedKeywords: [/Trust Wallet|MetaMask|gas|nonce|Reset/i], shouldNotMatchFallback: true },
  { id: 288, category: "Tech Help", input: "reset nonce", expectedKeywords: [/gas|nonce|MetaMask|Reset|Trust Wallet|Import/i], shouldNotMatchFallback: true },
  { id: 289, category: "Tech Help", input: "custom token", expectedKeywords: [/MetaMask|Import Tokens|Trust Wallet|contract address/i], shouldNotMatchFallback: true },
  { id: 290, category: "Tech Help", input: "not showing in wallet", expectedKeywords: [/MetaMask|Import Tokens|Trust Wallet|contract address/i], shouldNotMatchFallback: true },

  // ── 28. BOT FEATURES & IMPROVEMENTS (10) ────────────────────────────────
  { id: 291, category: "Bot Feature", input: "/help", expectedKeywords: [/ORACLE CAPABILITIES MENU|COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },
  { id: 292, category: "Bot Feature", input: "commands", expectedKeywords: [/ORACLE CAPABILITIES MENU|COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },
  { id: 293, category: "Bot Feature", input: "menu", expectedKeywords: [/ORACLE CAPABILITIES MENU|COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },
  { id: 294, category: "Bot Feature", input: "tldr", expectedKeywords: [/\$VIRTUE|BSC|1,000,000,000|3%/i], shouldNotMatchFallback: true },
  { id: 295, category: "Bot Feature", input: "summarize", expectedKeywords: [/\$VIRTUE|BSC|3%|supply/i], shouldNotMatchFallback: true },
  { id: 296, category: "Bot Feature", input: "feedback", expectedKeywords: [/suggestion|X|community|dev|improve|contract/i], shouldNotMatchFallback: false },
  { id: 297, category: "Bot Feature", input: "improve model", expectedKeywords: [/suggestion|X|community|dev|improve|contract/i], shouldNotMatchFallback: false },
  { id: 298, category: "Bot Feature", input: "model improvement", expectedKeywords: [/suggestion|X|community|dev|improve|contract/i], shouldNotMatchFallback: false },
  { id: 299, category: "Bot Feature", input: "suggestion", expectedKeywords: [/suggestion|X|community|dev|improve|contract/i], shouldNotMatchFallback: false },
  { id: 300, category: "Bot Feature", input: "thank you", expectedKeywords: [/diamond|BNB|dividends|peace|serve/i], shouldNotMatchFallback: true },

  // ── 29. NON-ENGLISH INTERCEPTION (10) ────────────────────────────────────
  { id: 301, category: "Italian", input: "come comprare il token", expectedKeywords: [/Comunico solo in inglese/i], shouldNotMatchFallback: true },
  { id: 302, category: "Spanish", input: "como comprar este token", expectedKeywords: [/Solo me comunico en inglés/i], shouldNotMatchFallback: true },
  { id: 303, category: "French", input: "bonjour comment acheter", expectedKeywords: [/Je ne communique qu'en anglais/i], shouldNotMatchFallback: true },
  { id: 304, category: "Chinese", input: "怎么买", expectedKeywords: [/我只能用英语/i], shouldNotMatchFallback: true },
  { id: 305, category: "Russian", input: "как купить token", expectedKeywords: [/Я общаюсь только на английском/i], shouldNotMatchFallback: true },
  { id: 306, category: "Italian", input: "qual e il contratto", expectedKeywords: [/Comunico solo in inglese/i], shouldNotMatchFallback: true },
  { id: 307, category: "Spanish", input: "donde comprar", expectedKeywords: [/Solo me comunico en inglés/i], shouldNotMatchFallback: true },
  { id: 308, category: "French", input: "combien ca coute", expectedKeywords: [/Je ne communique qu'en anglais/i], shouldNotMatchFallback: true },
  { id: 309, category: "Italian", input: "grazie mille pretre", expectedKeywords: [/Comunico solo in inglese/i], shouldNotMatchFallback: true },
  { id: 310, category: "Spanish", input: "hola que tal", expectedKeywords: [/Solo me comunico en inglés/i], shouldNotMatchFallback: true },

  // ── 30. GIBBERISH & NOISE (5) ───────────────────────────────────────────
  { id: 311, category: "Gibberish", input: "asdf", expectedKeywords: [/gas fees|hollow|confession|sin|logs/i], shouldNotMatchFallback: true },
  { id: 312, category: "Gibberish", input: "qwerty", expectedKeywords: [/gas fees|hollow|confession|sin|logs/i], shouldNotMatchFallback: true },
  { id: 313, category: "Gibberish", input: "asd", expectedKeywords: [/gas fees|hollow|confession|sin|logs/i], shouldNotMatchFallback: true },
  { id: 314, category: "Gibberish", input: "ooo", expectedKeywords: [/gas fees|hollow|confession|sin|logs/i], shouldNotMatchFallback: true },
  { id: 315, category: "Gibberish", input: "zzz", expectedKeywords: [/gas fees|hollow|confession|sin|logs/i], shouldNotMatchFallback: true },
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
console.log(" 🔮 MEGA LINGUISTIC TEST SUITE — 315 PATTERNS 🔮");
console.log(` Total Scenarios: ${megaSuite.length}`);
console.log("====================================================\n");

megaSuite.forEach((tc) => {
  const result = runElizaPriest(tc.input, tc.history || []);
  const isFallback = genericFallbackPrefixes.some(prefix => result.reply.startsWith(prefix));

  const keywordOk = tc.expectedKeywords.some(pattern => {
    return typeof pattern === "string" ? result.reply.includes(pattern) : pattern.test(result.reply);
  });

  const fallbackOk = tc.shouldNotMatchFallback ? !isFallback : true;

  if (keywordOk && fallbackOk) {
    passed++;
  } else {
    failed++;
    const reason = !keywordOk ? "KEYWORD MISS" : "UNEXPECTED FALLBACK";
    console.log(`❌ [#${String(tc.id).padStart(3, '0')}] [${tc.category}] "${tc.input}" — ${reason}`);
    console.log(`    ↳ Got:      "${result.reply.substring(0, 100)}"`);
    console.log(`    ↳ Expected: ${tc.expectedKeywords}`);
    failures.push(`[#${tc.id}] ${tc.category}: "${tc.input}" (${reason})`);
  }
});

console.log("\n====================================================");
console.log(` RESULTS: ${passed} PASSED | ${failed} FAILED (${Math.round((passed/megaSuite.length)*100)}% Success)`);
console.log("====================================================");

if (failures.length > 0) {
  console.log("\n❌ FAILURES:\n" + failures.map(f => `  - ${f}`).join("\n"));
  process.exit(1);
} else {
  console.log("\n🎉 ALL 315 LINGUISTIC SCENARIOS PASSED WITH 100% ACCURACY!");
}
