const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

const oldPhase3Fuzzy = `  // Multi-Keyword Fuzzy Semantic Matcher for complex trading & emotional stories
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

const newGlobalDomainFuzzy = `  // Domain 1: Tokenomics, Contract & Safety Fuzzy Concept Scorer
  const tokenomicsKeywords = clean.match(/\\b(contract|address|ca|safe|scam|legit|audit|liquidity|dev|tax|payout|rewards|wbnb|bnb|threshold|holding|percentage|volume)\\b/gi);
  if (tokenomicsKeywords && tokenomicsKeywords.length >= 2) {
    return {
      reply: \`Regarding \${tokenomicsKeywords.slice(0, 2).join(" & ")}: $VIRTUE operates on a verified BSC contract (\${contractAddress}) with 100% locked liquidity on Flap.sh. 100% of the 3% trading tax is distributed to holders with 10,000+ tokens as BNB dividends. Auto-payouts send WBNB at $4+, and manual claims below $4 let you choose WBNB or BNB! 🛡️\`,
      penance: "Inspect the contract on Flap.sh and run dividend projections on our calculator."
    };
  }

  // Domain 2: CZ Lore & Philosophy Fuzzy Concept Scorer
  const czKeywords = clean.match(/\\b(cz|tweet|binance|september|forgive|virtue|buidl|safu|rule 4|lore)\\b/gi);
  if (czKeywords && czKeywords.length >= 2) {
    return {
      reply: 'The ethos of $VIRTUE stems directly from CZ\\'s iconic tweet on September 23, 2025: "Forgiveness is a virtue!" 🙏. In a market full of FUD and paper hands, we forgive the dip, hold spot, and collect passive 3% BNB rewards. Stay SAFU and keep BUIDLing!',
      penance: "Share the CZ tweet lore on X."
    };
  }

  // Domain 3: Multi-Keyword Fuzzy Semantic Matcher for complex trading & emotional stories
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

src = src.replace(oldPhase3Fuzzy, newGlobalDomainFuzzy);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Global Domain Fuzzy Concept Scorers (Tokenomics, CZ Lore, Trading Stories) successfully patched into route.ts!');
