const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

const newCryptoStoriesRules = `
  // ── EARLY SELLER REGRET & MISSED 100X GAINS ────────────────────────────────
  {
    pattern: /\\b(sold early|sold btc|sold eth|sold before|could have been rich|missed the 100x|missed 1000x|sold at cheap|sold at 10|sold at 100|paper handed early)\\b/i,
    replies: [
      "Selling early is the classic regret of every crypto builder. You sold before the 100x because risk management or fear took over — and that is human. Do not torture yourself over past charts you cannot change. Accumulate spot $VIRTUE on Flap.sh, collect passive 3% BNB dividends on every trade, and let your diamond hands write the next chapter. 💎🙌",
      "Almost every veteran in crypto has a story of selling BTC, ETH, or a gem too early. The pain of what could have been is real, but dwelling on past charts changes nothing. Focus on real yield today: holding spot $VIRTUE pays you passive BNB continuously!"
    ],
    penance: "Forgive your early sale, hold spot $VIRTUE, and let BNB dividends accrue."
  },

  // ── FAMOUS CRYPTO CRASHES (FTX, LUNA, CELSIUS, MT GOX) ────────────────────
  {
    pattern: /\\b(ftx|luna|terra|celsius|voyager|blockfi|mt gox|bitconnect|sam bankman|sbf|do kwon)\\b/i,
    replies: [
      \`The collapses of FTX, Luna, and centralized lending platforms left deep scars across Web3. Centralized actors betrayed trust — but $VIRTUE is 100% decentralized on BNB Smart Chain. No centralized lending, no lockups, no dev drainers. Locked liquidity on Flap.sh (\${launchpadUrl}), verified code, and passive 3% BNB rewards paid straight to your wallet. 🛡️\`
    ],
    penance: "Keep your funds on non-custodial wallets and hold spot $VIRTUE."
  },

  // ── CHART ADDICTION & INSOMNIA ─────────────────────────────────────────────
  {
    pattern: /\\b(can't sleep|insomnia|staring at charts|watching candles|addicted to charts|checking price every|screen time|obsessed with price)\\b/i,
    replies: [
      "Staring at 1-minute candles until 4 AM destroys your health and clear thinking. $VIRTUE was built for peaceful holding: 3% BNB tax is auto-distributed on-chain directly to your wallet. Close the charts, get a good night's sleep, and wake up to passive BNB yield in your portfolio! 🌙💤"
    ],
    penance: "Turn off the charts for 8 hours and get restful sleep."
  },

  // ── FAMILY & SOCIAL DISAPPROVAL ───────────────────────────────────────────
  {
    pattern: /\\b(family thinks|wife left|girlfriend left|friends think i'm crazy|hiding my losses|hiding losses|family disapproval|nobody believes in me|family calls me crazy)\\b/i,
    replies: [
      "Walking the crypto path often means facing skepticism from family and friends who don't understand the vision. Hiding losses creates anxiety, but honesty brings peace. Manage your risk responsibly, never invest money needed for living expenses, and let your patient spot holding prove your resilience over time. 🙏"
    ],
    penance: "Practice honest communication and responsible risk management."
  },

  // ── SHITCOIN & MEMECOIN TOP BUYING ─────────────────────────────────────────
  {
    pattern: /\\b(shitcoin|memecoin|chased pump|bought top|bought the top|sold bottom|sold the bottom|ape in|aped in|fomoed into|bought peak)\\b/i,
    replies: [
      "Aping into green candles at the top tick and panic selling the bottom tick is the hardest lesson in market psychology. Stop chasing unverified hype coins! $VIRTUE pairs meme culture with real yield: 3% BNB dividends paid continuously on BSC. Hold spot, stop chasing pumps, and accumulate passive BNB."
    ],
    penance: "Stop chasing green candles and hold spot $VIRTUE."
  },

  // ── GENERATIONAL WEALTH LOSS / WIPED OUT SAVINGS ──────────────────────────
  {
    pattern: /\\b(lost my savings|wiped out my savings|lost generational wealth|lost everything in crypto|life savings gone|ruined my portfolio)\\b/i,
    replies: [
      "Losing life savings or major portfolio value in crypto is a soul-crushing experience. The High Priest hears your pain and offers absolution. The ledger of life is longer than any bear market. Take a deep breath, rebuild slowly with responsible spot holding, never trade on leverage, and focus on steady passive BNB rewards."
    ],
    penance: "Forgive your past losses, rebuild responsibly, and hold spot."
  },
`;

src = src.replace('  // ── GAMBLING ADDICTION & CASINO CONFESSIONS ──', newCryptoStoriesRules + '\n  // ── GAMBLING ADDICTION & CASINO CONFESSIONS ──');

// UPGRADE PHASE 3 IN RUNELIZAPRIEST FOR FUZZY MULTI-KEYWORD MATCHING
const oldPhase3 = `  // Phase 3: Smart fallback — Entity/Action Extraction
  const actionMatch = clean.match(/\\b(lost|sold|bought|gambled|chased|sent|transferred|panic sold|got rugged|liquidated)\\b/i);
  if (actionMatch) {
    const action = actionMatch[1];
    return {
      reply: \`You mentioned having \${action} in your trading journey. Speak freely, traveler — what exact trade or token caused this? The High Priest is here to offer absolution and guide you back to $VIRTUE's 3% BNB dividends. 🙏\`,
      penance: "Forgive your past losses and focus on spot holding."
    };
  }

  const cryptoEntityMatch = clean.match(/\\b(pancake|uniswap|binance|trust wallet|metamask|phantom|solana|ethereum|cardano|avalanche|bybit|mexc|gate\\.io)\\b/i);
  if (cryptoEntityMatch) {
    const entity = cryptoEntityMatch[1];
    return {
      reply: \`Regarding \${entity}: the Forgiveness Booth keeps its focus on $VIRTUE on BNB Chain. While \${entity} has its place in the ecosystem, $VIRTUE gives you passive 3% BNB dividends directly on-chain on Flap.sh (\${launchpadUrl}). What specifically would you like to know?\`,
      penance: "Check out $VIRTUE on Flap.sh."
    };
  }`;

const newPhase3 = `  // Phase 3: Smart Fuzzy Semantic Scorer & Entity Extraction
  const actionMatch = clean.match(/\\b(lost|sold|bought|gambled|chased|sent|transferred|panic sold|got rugged|liquidated)\\b/i);
  if (actionMatch) {
    const action = actionMatch[1];
    return {
      reply: \`You mentioned having \${action} in your trading journey. Speak freely, traveler — what exact trade or token caused this? The High Priest is here to offer absolution and guide you back to $VIRTUE's 3% BNB dividends. 🙏\`,
      penance: "Forgive your past losses and focus on spot holding."
    };
  }

  const cryptoEntityMatch = clean.match(/\\b(pancake|uniswap|binance|trust wallet|metamask|phantom|solana|ethereum|cardano|avalanche|bybit|mexc|gate\\.io)\\b/i);
  if (cryptoEntityMatch) {
    const entity = cryptoEntityMatch[1];
    return {
      reply: \`Regarding \${entity}: the Forgiveness Booth keeps its focus on $VIRTUE on BNB Chain. While \${entity} has its place in the ecosystem, $VIRTUE gives you passive 3% BNB dividends directly on-chain on Flap.sh (\${launchpadUrl}). What specifically would you like to know?\`,
      penance: "Check out $VIRTUE on Flap.sh."
    };
  }

  // Multi-Keyword Fuzzy Semantic Matcher for complex trading & emotional stories
  const tradingKeywords = clean.match(/\\b(portfolio|losses|gains|savings|wallet|trade|trading|crypto|market|bear|bull|dip|candle|pump|dump|hold|holder|seller|buyer|profit|loss|liquidation|leverage|tax|dividend|yield|reward)\\b/gi);
  const emotionKeywords = clean.match(/\\b(regret|scared|fear|anxious|pain|sad|depressed|ruined|stupid|foolish|greedy|fomo|fud|hope|faith|belief|sorry|guilty|ashamed)\\b/gi);

  if (tradingKeywords && tradingKeywords.length >= 2) {
    const topic = tradingKeywords.slice(0, 2).join(" & ");
    return {
      reply: \`The High Priest hears your confession regarding \${topic}. Every trader's journey includes dips, volatility, and valuable lessons. The antidote to market stress is patience, spot holding, and passive BNB rewards. Forgive your past trades, hold spot $VIRTUE on Flap.sh (\${launchpadUrl}), and let the 3% BNB tax work for you. 🙏\`,
      penance: "Forgive your past trades and hold spot $VIRTUE with diamond hands."
    };
  }

  if (emotionKeywords && text.split(" ").length > 3) {
    return {
      reply: "I hear the emotion in your words, traveler. Web3 and life can weigh heavy on the spirit, but regret does not rebuild a portfolio or a life. Forgive yourself for past choices, focus on building with integrity today, and remember CZ's words: 'Forgiveness is a virtue!' 🙏",
      penance: "Forgive your past choices and take one positive step forward."
    };
  }`;

src = src.replace(oldPhase3, newPhase3);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Exhaustive crypto journey stories & Fuzzy Multi-Keyword Semantic Scorer successfully patched into route.ts!');
