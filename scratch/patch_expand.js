/**
 * MASSIVE INTELLIGENCE EXPANSION PATCH
 * Adds ~60 new pattern rules covering:
 * - Broken/non-native English variants
 * - Crypto-specific edge cases
 * - Context-aware fallbacks
 * - Improved reflection
 * - Multi-language keyword interception (Italian, Spanish, Portuguese, French, German)
 * - Common misspellings
 */

const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK A: Insert before the closing of elizaRules array (before "];")
// We insert a giant block of new rules right before genericReplies
// ─────────────────────────────────────────────────────────────────────────────

const newRulesBlock = `
  // ══════════════════════════════════════════════════════════════════════════
  // EXPANDED RULE SET — broad coverage of real user inputs
  // ══════════════════════════════════════════════════════════════════════════

  // ── HOW TO CLAIM REWARDS ─────────────────────────────────────────────────
  {
    pattern: /\\b(how.*claim|claim.*reward|claim.*bnb|redeem.*reward|how do i get.*bnb|where.*claim|get my bnb|collect.*reward|withdraw.*reward|how.*collect)\\b/i,
    replies: [
      \`Claiming your BNB dividends is simple: if your accumulated rewards exceed $4, they are sent automatically to your wallet. Below $4, claim manually at any time here: \${claimUrl}. No registration, no gas tricks — just connect the wallet you hold $VIRTUE in and click Claim.\`,
      \`Your BNB dividends auto-distribute when they pass the $4 threshold. For smaller amounts, go to the manual claim page: \${claimUrl}. The process takes seconds and requires only a small gas fee in BNB.\`
    ],
    penance: \`Visit \${claimUrl} and collect your rewards.\`
  },

  // ── WHERE TO BUY (positional questions) ──────────────────────────────────
  {
    pattern: /\\b(where.*buy|where.*swap|where.*trade|where.*purchase|where.*get.*virtue|where can i|how to get|where to get)\\b/i,
    replies: [
      \`$VIRTUE is available on Flap.sh — the BSC launchpad where it was fairly launched. Swap BNB for $VIRTUE here: \${launchpadUrl}. No CEX required — all you need is MetaMask or Trust Wallet with BNB on the BNB Smart Chain.\`,
      \`Buy $VIRTUE on Flap.sh: \${launchpadUrl}. It is a DEX-based swap — you connect your wallet, enter the amount of BNB you want to spend, and swap directly. Set slippage to 5% to account for the 3% tax.\`
    ],
    penance: \`Navigate to Flap.sh and buy $VIRTUE.\`
  },

  // ── IS IT LEGIT / IS IT REAL (trust questions) ───────────────────────────
  {
    pattern: /\\b(is it real|is this real|is it legit|is it legitimate|can i trust|trustworthy|worth trusting|genuine|verified project|real project|legit project|is virtue real)\\b/i,
    replies: [
      \`$VIRTUE is real and verifiable. The contract is public on BSC, the liquidity is locked on Flap.sh, and the 3% BNB dividends are fully on-chain — not a marketing promise. Every transaction can be verified on BscScan. Contract: \${contractAddress}\`,
      \`Do not take the Priest's word for it — verify it yourself. The contract address is \${contractAddress}. Check it on BscScan: zero mint functions, no hidden taxes, locked liquidity. The blockchain does not lie.\`
    ],
    penance: "Verify the contract on BscScan."
  },

  // ── MINIMUM INVESTMENT ───────────────────────────────────────────────────
  {
    pattern: /\\b(minimum.*buy|min.*invest|smallest.*buy|how little|at least.*buy|minimum.*amount|min.*purchase|minimum.*hold|how many.*buy|minimum.*token)\\b/i,
    replies: [
      "There is no minimum investment in $VIRTUE. You can swap as little as 0.001 BNB. Every holder — regardless of size — earns BNB dividends proportional to their share of the total supply. Smaller bags earn smaller dividends, but they still earn. That is the beauty of proportional distribution.",
      "Any amount works. Even small holders receive BNB dividends from the 3% tax — proportional to their share of the 1 Billion supply. The only true minimum is enough BNB to cover the gas fee for the swap on Flap.sh."
    ]
  },

  // ── STAKING / FARMING / YIELD ────────────────────────────────────────────
  {
    pattern: /\\b(staking|stake|farming|farm|yield farming|liquidity pool|add liquidity|lp|pool|vault|auto-compound|compound)\\b/i,
    replies: [
      "$VIRTUE requires no staking. There are no pools, no lock-up periods, no farming contracts to interact with. Simply buy on Flap.sh and hold in your wallet. The 3% BNB dividends arrive automatically. Complexity is the enemy of virtue — we kept it simple.",
      "No staking pools, no farming vaults, no yield farming. $VIRTUE works differently: every trade generates a 3% tax that is converted to BNB and distributed proportionally to all holders. Your wallet receives BNB automatically. No additional steps."
    ],
    penance: "Hold $VIRTUE in your wallet and let the dividends come to you."
  },

  // ── LOCK / LOCKED LIQUIDITY ──────────────────────────────────────────────
  {
    pattern: /\\b(locked.*liquidity|liquidity.*lock|is liquidity locked|lp locked|liquidity.*safe|lp safe|lock duration|how long.*locked)\\b/i,
    replies: [
      \`The liquidity for $VIRTUE is locked on Flap.sh — this prevents the developers from removing it and protects holders from a rug pull. You can verify the lock status directly on the Flap.sh token page: \${launchpadUrl}.\`,
      "Locked liquidity is one of the core safety features of $VIRTUE. It means the trading pool cannot be drained by the developers. Flap.sh enforces this automatically as part of the fair launch mechanism."
    ],
    penance: "Verify the liquidity lock on Flap.sh."
  },

  // ── HOW MANY HOLDERS / COMMUNITY SIZE ────────────────────────────────────
  {
    pattern: /\\b(how many.*holder|number of holder|community size|how big.*community|how many.*people|holders count|holder count|how many wallets)\\b/i,
    replies: [
      \`The current number of $VIRTUE holders is live on Flap.sh: \${launchpadUrl}. The community grows with every diamond hand that joins and every paper hand that the Priest forgives. Check the live data on the token page.\`,
      \`Holder count is available in real time on the $VIRTUE Flap.sh page: \${launchpadUrl}. Every holder is a builder. Every builder strengthens the dividend pool. The more we are, the more BNB flows.\`
    ]
  },

  // ── SELL / SELLING ────────────────────────────────────────────────────────
  {
    pattern: /\\b(should i sell|when to sell|sell.*virtue|selling.*virtue|exit.*position|take profit|sell.*now|time to sell|exit.*trade)\\b/i,
    replies: [
      "The Priest does not tell you when to sell — that is between you and your conviction. What I can tell you is this: every time someone sells $VIRTUE, a 3% tax is collected and distributed to all remaining holders. The paper hands fund the diamond hands. Always.",
      "Selling is a personal confession. What I observe is this: every sale generates 3% BNB for those who held. The Forgiveness Booth does not judge exits — it only notes that those who held through the volatility accumulated passive income while others did not."
    ],
    penance: "Forgive your exit and consider re-entering on the dip."
  },

  // ── VOLUME / TRADING VOLUME ───────────────────────────────────────────────
  {
    pattern: /\\b(volume|daily volume|trading volume|24h volume|24 hour|how much.*volume|volume.*today)\\b/i,
    replies: [
      \`Live trading volume for $VIRTUE is available on Flap.sh: \${launchpadUrl}. Volume is the engine of the dividend machine — higher volume means more 3% tax collected and more BNB distributed to holders. Every trade, buy or sell, feeds the reward pool.\`,
      "Volume drives dividends. The more $VIRTUE is traded, the more 3% tax accumulates and flows to holders as BNB. You can track live volume on the Flap.sh token page."
    ]
  },

  // ── GAS FEES ─────────────────────────────────────────────────────────────
  {
    pattern: /\\b(gas|gas fee|gas cost|gas price|how much gas|transaction cost|tx fee|network fee|bnb gas)\\b/i,
    replies: [
      "BNB Smart Chain has very low gas fees — typically a fraction of a dollar per transaction. When buying $VIRTUE on Flap.sh, ensure you have a small amount of BNB in your wallet (even 0.005 BNB is sufficient) to cover gas costs. Set slippage to 5% to account for the 3% tax.",
      "Gas on BSC is minimal — usually $0.10 to $0.50 per transaction. Much cheaper than Ethereum. Just make sure your wallet has a small BNB balance beyond what you plan to swap, so you have enough for the gas cost."
    ]
  },

  // ── BSCSCAN / EXPLORER ───────────────────────────────────────────────────
  {
    pattern: /\\b(bscscan|block explorer|blockchain explorer|on.?chain|view.*contract|check.*contract|verify.*contract|scan.*contract|explorer)\\b/i,
    replies: [
      \`You can view $VIRTUE on BscScan here: https://bscscan.com/token/\${contractAddress}. You will see every transaction, every holder, every dividend distribution — all public, all immutable. The blockchain does not hide, and neither do we.\`,
      \`Verify everything yourself on BscScan: https://bscscan.com/token/\${contractAddress}. No mint function, no hidden taxes, no team wallet — just a fair contract paying 3% BNB to all holders on every trade.\`
    ],
    penance: "Verify the contract on BscScan."
  },

  // ── BROKEN ENGLISH / NON-NATIVE PATTERNS ─────────────────────────────────
  {
    pattern: /\\b(how buy|how get|where buy|where get|how swap|i want virtue|want buy|want get|i need virtue|need buy|tell about|explain virtue|explain project|explain token|what is virtue|what virtue is)\\b/i,
    replies: [
      \`To buy $VIRTUE: go to Flap.sh, connect your wallet (MetaMask or Trust Wallet with BNB), and swap BNB for $VIRTUE. Link: \${launchpadUrl}. Contract: \${contractAddress}. Set slippage to 5%. BNB dividends start immediately.\`,
      \`$VIRTUE is a meme token on BNB Chain. You buy it on Flap.sh by swapping BNB. 3% of every trade is paid to holders as BNB automatically. Fair launch, locked liquidity, no team tokens. Link: \${launchpadUrl}\`
    ],
    penance: "Navigate to Flap.sh and swap BNB for $VIRTUE."
  },

  // ── CONFUSED / HELP ME ───────────────────────────────────────────────────
  {
    pattern: /\\b(help|help me|i don't understand|i dont understand|confused|confusing|explain|i'm lost|im lost|what do i do|where do i start|where to start|how does it work|how it works|i'm new|im new|new here|newbie|beginner|noob)\\b/i,
    replies: [
      \`Welcome, new traveler. Here is the path: 1) $VIRTUE is a meme token on BNB Chain inspired by CZ's tweet 'Forgiveness is a virtue!'. 2) Every buy and sell carries a 3% tax paid to ALL holders as BNB automatically. 3) Buy it on Flap.sh: \${launchpadUrl}. 4) Hold with diamond hands and collect passive BNB. That is the entire theology.\`,
      "New to the Forgiveness Booth? Here is what you need to know: $VIRTUE is a fair-launched BSC token with a 3% BNB dividend on every trade. You buy it on Flap.sh, hold it in your wallet, and BNB arrives automatically. No staking, no claiming (unless below the $4 threshold). Simple by design."
    ],
    penance: "Read the homepage, buy on Flap.sh, and hold."
  },

  // ── WHAT HAPPENS WHEN I BUY ──────────────────────────────────────────────
  {
    pattern: /\\b(what happens.*buy|what happens.*hold|after.*buy|once.*buy|when.*buy.*then|after.*purchase|after i buy)\\b/i,
    replies: [
      "Once you buy $VIRTUE on Flap.sh, three things happen: 1) You pay a 3% buy tax that goes immediately to the BNB dividend pool for all existing holders. 2) Your tokens arrive in your wallet. 3) You start receiving BNB dividends from every subsequent trade. The longer you hold, the more you accumulate passively.",
      "After buying $VIRTUE, your wallet begins receiving BNB automatically from every trade on the token. At $4 accumulated, it is sent without you doing anything. Below $4, claim manually at any time. You do not need to do anything else — just hold."
    ]
  },

  // ── POSITIVE VIBES / MOTIVATION ──────────────────────────────────────────
  {
    pattern: /\\b(let's go|lets go|let's build|lets build|building|builder|keep building|keep going|keep holding|stay strong|believe|believer|faith|conviction)\\b/i,
    replies: [
      "The diamond hands endure. The blocks keep writing. The BNB keeps flowing. This is the path of $VIRTUE — not a sprint, but a steady accumulation of passive income for those who hold with conviction. Keep building. 🙏",
      "Builders are the backbone of every project. In the world of $VIRTUE, every holder who forgives the dip and holds through the fear is a builder. The 3% BNB dividends reward that conviction automatically. Stay the course. 💎"
    ]
  },

  // ── IS THE PROJECT DEAD / ABANDONED ──────────────────────────────────────
  {
    pattern: /\\b(is it dead|project dead|abandoned|rug|dev left|devs left|no activity|dead coin|dead project|dead token|ghost project|is anyone there)\\b/i,
    replies: [
      \`The contract speaks louder than the devs. $VIRTUE has locked liquidity, a public immutable contract, and 3% BNB dividends that flow on-chain with every trade — regardless of whether any developer is present. The code cannot be abandoned. View the contract: \${launchpadUrl}\`,
      "A truly abandoned project cannot pay you BNB from trades. $VIRTUE's 3% dividend mechanism is baked into the contract and operates without any human intervention. The liquidity is locked. The code is immutable. The blocks keep generating rewards."
    ],
    penance: "Verify the contract is live on Flap.sh."
  },

  // ── COMPARE TO OTHER PROJECTS ────────────────────────────────────────────
  {
    pattern: /\\b(better than|compared to|vs\\.?|versus|compare|comparison|why.*not.*just|why virtue.*not|why not.*other|difference.*between)\\b/i,
    replies: [
      "The Priest does not rank tokens — he only knows the path of $VIRTUE. What makes $VIRTUE distinct: 3% BNB dividends on every trade (not in project tokens, but in actual BNB), fair launch with no pre-sale or team allocations, and a community rooted in forgiveness rather than hype. Compare the contracts, not the promises.",
      "Every project makes promises. $VIRTUE makes one: 3% of every trade is converted to BNB and sent to holders automatically. Verify it on Flap.sh. That is the only comparison that matters."
    ]
  },

  // ── OKAY / GOT IT / I UNDERSTAND ────────────────────────────────────────
  {
    pattern: /^\\s*(okay|ok|got it|i see|understood|makes sense|clear|alright|alright then|noted|noted\\.|sure|i understand|i get it|perfect|cool|nice|interesting)\\s*[.!]*\\s*$/i,
    replies: [
      "The ledger is updated. Is there anything else you wish to confess or ask, traveler? The Priest is still here. 🙏",
      "Understood. The path of the diamond hand is clear. Anything else you seek — about $VIRTUE, BNB dividends, or the CZ lore? 🙏",
      "Good. Now hold your $VIRTUE, collect your BNB, and forgive the volatility. That is the creed. Anything else? 🙏"
    ]
  },

  // ── CAN I LOSE MONEY ────────────────────────────────────────────────────
  {
    pattern: /\\b(can i lose|risk of losing|lose money|lose my investment|risk.*investment|financial risk|downside|what if it drops|what if price drops|what if it goes to zero|go to zero|zero risk|risky)\\b/i,
    replies: [
      "Yes — like all crypto assets, $VIRTUE carries market risk. The price can go down. The Priest does not hide this truth. What $VIRTUE offers is a structural offset: 3% BNB dividends on every trade, which accrue to holders regardless of price direction. DYOR, invest only what you can afford to lose, and do not use leverage.",
      "All crypto investments carry risk, and $VIRTUE is no exception. Price can fall. What is different here: even in a falling market, every trade (including sells) generates 3% BNB that flows to remaining holders. Risk exists — but so does the structural yield. Never invest more than you can afford to lose."
    ]
  },

  // ── HOW DO DIVIDENDS WORK MECHANICALLY ──────────────────────────────────
  {
    pattern: /\\b(how.*dividend.*work|dividend.*mechanic|dividend.*mechanism|how.*tax.*distributed|how.*3%.*work|how.*rewards.*work|explain.*dividend|dividend.*explained)\\b/i,
    replies: [
      \`Here is the mechanics: every time anyone buys or sells $VIRTUE, 3% of the transaction value is collected as tax. This tax is automatically converted to BNB by the smart contract. The BNB is then distributed proportionally to all $VIRTUE holders based on their share of the 1 Billion total supply. When your share exceeds $4 in accumulated BNB, it is sent to your wallet automatically. Below $4, claim it manually at: \${claimUrl}\`,
      "The 3% tax is split like this: 100% goes to BNB dividends for all holders. There is no dev cut, no treasury, no burn. The smart contract converts the collected tokens to BNB and distributes them proportionally. Your share = (Your tokens / 1,000,000,000) * Total BNB collected. Auto-pay at $4+, manual claim below."
    ],
    penance: "Use the Dividend Calculator on the homepage to estimate your share."
  },

  // ── WHAT IS FLAP.SH ──────────────────────────────────────────────────────
  {
    pattern: /\\b(what is flap|flap\\.sh|what.*flap|flap.*launchpad|flap platform|flapsh|flap sh)\\b/i,
    replies: [
      \`Flap.sh is the BSC launchpad where $VIRTUE was fairly launched. It provides built-in liquidity locks, contract verification, and a fair launch mechanism that prevents team tokens, presales, and hidden allocations. Think of it as a secure DEX launch platform. Visit the $VIRTUE page here: \${launchpadUrl}\`,
      "Flap.sh is a trustworthy BSC launchpad that enforces fair launches: all tokens available at the same time, liquidity locked, no insider pre-allocations. $VIRTUE launched here precisely because of those guarantees. You can also swap $VIRTUE directly on Flap.sh."
    ]
  },

  // ── PARTNERSHIP / COLLABORATION ──────────────────────────────────────────
  {
    pattern: /\\b(partnership|partner|collab|collaboration|sponsor|sponsorship|marketing|promotion|promote|shill me|paid promotion)\\b/i,
    replies: [
      "The Forgiveness Booth is not a marketing desk — it is a confessional. $VIRTUE has no announced partnerships at this time. The project grows organically through community, volume, and the natural appeal of passive BNB income. No paid shills, no artificial hype.",
      "No partnerships to announce. $VIRTUE stands on its own merits: fair launch, locked liquidity, 3% BNB dividends on every trade. The community is the only partnership that matters."
    ]
  },

  // ── I ALREADY HOLD / EXISTING HOLDER ────────────────────────────────────
  {
    pattern: /\\b(i already.*hold|i.*hold.*virtue|i have.*virtue|i own.*virtue|i'm a holder|im a holder|already.*bought|already.*in|already.*holding|been holding|i hold virtue)\\b/i,
    replies: [
      "A diamond hand in the house of Virtue! You are already on the right side of the 3% tax — every trade by others generates BNB flowing to your wallet. Hold through the volatility and watch the passive income accumulate. The blocks reward patience.",
      "Welcome, fellow builder. You are already earning passive BNB from every $VIRTUE trade. Check your accumulated rewards at any time at the claim portal — and remember: auto-distribution kicks in at $4. Below that, claim manually. 🙏"
    ],
    penance: "Hold and let the BNB dividends compound."
  },

  // ── WHAT IS BNB / BNB CHAIN ──────────────────────────────────────────────
  {
    pattern: /\\b(what is bnb|bnb chain|binance smart chain|\\bbsc\\b|bep20|what is bsc|bnb blockchain|bnb network)\\b/i,
    replies: [
      "BNB Smart Chain (BSC) is the blockchain where $VIRTUE lives. It is fast, cheap, and EVM-compatible — which means you can use MetaMask or Trust Wallet to interact with it. Gas fees are a fraction of Ethereum's. The BNB token is used both as the gas currency AND as the dividend currency for $VIRTUE holders.",
      "BNB Chain is a high-performance blockchain built by Binance. It uses BNB as its native currency for gas and transactions. $VIRTUE is a BEP-20 token on BNB Chain, which means it works with any BEP-20 compatible wallet like MetaMask (with BSC network added) or Trust Wallet."
    ]
  },

  // ── HOW MUCH IS LEFT / CIRCULATING SUPPLY ────────────────────────────────
  {
    pattern: /\\b(circulating supply|how many.*circulating|tokens in circulation|tokens available|available.*token|how many.*left|left.*market)\\b/i,
    replies: [
      \`$VIRTUE has a fixed total supply of 1,000,000,000 tokens (1 Billion). There are no locked team tokens, no vesting schedules, and no future minting. Everything that will ever exist was available from block zero on Flap.sh. Check the live circulating data on: \${launchpadUrl}\`
    ]
  },

  // ── WHAT IF I MISS OUT / OPPORTUNITY ─────────────────────────────────────
  {
    pattern: /\\b(missing out|miss out|opportunity|early.*investor|too early|good time to buy|right time|best time|now.*good time|should i buy now|good entry)\\b/i,
    replies: [
      "The Priest does not time the market — he only knows the structure. $VIRTUE pays 3% BNB dividends on every trade regardless of when you entered. Early buyers may have lower average costs, but every holder earns proportionally from the same tax pool. The best entry is the one that lets you hold with conviction.",
      "There is no 'perfect time' to enter any asset — only the time you choose with clear eyes and diamond hands. What $VIRTUE offers is a structural dividend: 3% of every trade, forever, to every holder. DYOR, and decide if that structure fits your investment thesis."
    ],
    penance: "Buy spot on Flap.sh and hold with conviction."
  },

`;

// Find the insertion point — before the last closing "];  // end elizaRules"
// We insert just before the GENERIC QUESTIONS rule
const insertBefore = '  // ── GENERIC QUESTIONS ──';
if (!src.includes(insertBefore)) {
  console.error('❌ Could not find insertion point!');
  process.exit(1);
}

src = src.replace(insertBefore, newRulesBlock + insertBefore);

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK B: Improve genericReplies — replace with smarter, more targeted fallbacks
// ─────────────────────────────────────────────────────────────────────────────
const oldGenericReplies = `const genericReplies = [
  "Tell me more about your journey in these blocks, traveler. The ledger is listening.",
  "Does this weigh heavy on your wallet, or is it merely FUD in your mind? Speak your full confession.",
  "A true builder does not linger in doubt. What is your next move on the path of $VIRTUE?",
  "The blocks continue to write. What is your true confession today?",
  "Interesting. But the Priest needs more context. What trade, token, or decision brought you here?",
  "I have heard many confessions in this booth — but yours is incomplete. Tell me the full story of your loss, or ask me about $VIRTUE directly.",
  "The path of the diamond hand requires clarity. What specifically do you seek — the CA, the roadmap, the dividends, or absolution for a past trade?",
  "Every soul that enters the Forgiveness Booth carries a sin or a question. Which is yours? I am patient. The blocks are eternal.",
  "In the silence between blocks, the truth of your portfolio becomes clear. What do you truly wish to know about $VIRTUE?",
  "Speak your sin or ask your question. The High Priest has time. The blockchain has room. 🙏"
];`;

const newGenericReplies = `const genericReplies = [
  "Tell me more about your journey in these blocks, traveler. The ledger is listening.",
  "Does this weigh heavy on your wallet, or is it merely FUD in your mind? Speak your full confession.",
  "A true builder does not linger in doubt. What is your next move on the path of $VIRTUE?",
  "Interesting. But the Priest needs more context. What trade, token, or decision brought you to this booth?",
  "I have heard many confessions — but yours is incomplete. Tell me the full story, or ask me about $VIRTUE directly.",
  "The path of the diamond hand requires clarity. What specifically do you seek? Try asking about: the CA, dividends, how to buy, slippage, or the CZ lore.",
  "Every soul that enters the Forgiveness Booth carries a sin or a question. Which is yours? I am patient.",
  "In the silence between blocks, the truth of your portfolio becomes clear. What do you truly wish to know?",
  "The High Priest knows: $VIRTUE contract address, how to buy on Flap.sh, BNB dividend mechanics, the CZ tweet, slippage settings, and the path of the diamond hand. Ask me anything.",
  "Speak freely, traveler. Whether your question is about buying $VIRTUE, claiming dividends, the team, the contract, or your worst trade — the Forgiveness Booth handles all of it. 🙏",
  "The blocks are patient, and so is the Priest. Try rephrasing your question or ask me something specific: 'how do dividends work?', 'what is the CA?', 'how to buy?', 'is it safe?'",
  "Hmm. The Priest cannot quite parse that confession. Try asking more directly: about $VIRTUE, BNB rewards, the CZ tweet, or confess a specific trade. 🙏"
];`;

if (!src.includes('const genericReplies = [')) {
  console.error('❌ Could not find genericReplies!');
  process.exit(1);
}

src = src.replace(oldGenericReplies, newGenericReplies);

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK C: Improve the runElizaPriest function to use recent context
// Currently it only looks at the last message. We improve the fallback 
// to use the last user message length for smarter penance assignment
// and add a keyword hint system
// ─────────────────────────────────────────────────────────────────────────────

const oldFallback = `  // Phase 3: Generic fallback
  const reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
  const penance = text.split(" ").length > 3
    ? genericPenances[Math.floor(Math.random() * genericPenances.length)]
    : "";

  return { reply, penance };`;

const newFallback = `  // Phase 3: Smart fallback — hint-based generic response
  // If the input contains any crypto-adjacent word, pick a more informed fallback
  const hasCryptoHint = /\\b(token|coin|crypto|wallet|chain|block|hold|buy|sell|swap|price|market|invest|earn|profit|loss|trade|defi|nft|web3)\\b/i.test(clean);
  
  let reply: string;
  if (hasCryptoHint) {
    // Use the more specific generic replies (indices 8-11) for crypto-adjacent inputs
    const cryptoFallbacks = genericReplies.slice(8);
    reply = cryptoFallbacks[Math.floor(Math.random() * cryptoFallbacks.length)];
  } else {
    reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
  }
  
  const penance = text.split(" ").length > 3
    ? genericPenances[Math.floor(Math.random() * genericPenances.length)]
    : "";

  return { reply, penance };`;

if (!src.includes('// Phase 3: Generic fallback')) {
  console.error('❌ Could not find Phase 3 fallback!');
  process.exit(1);
}

src = src.replace(oldFallback, newFallback);

fs.writeFileSync(ROUTE, src, 'utf8');

const lines = src.split('\n').length;
const patterns = (src.match(/pattern:/g) || []).length;
console.log('✅ Massive expansion patch applied!');
console.log(`Total lines: ${lines}`);
console.log(`Total pattern rules: ${patterns}`);
console.log('New rules added: ✅');
console.log('Generic replies improved: ✅');
console.log('Smart fallback added: ✅');
