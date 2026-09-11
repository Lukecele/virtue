const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// Script to populate missing penances in route.ts rules
// 1. GREETINGS -> penance: "Confess your trade or ask about $VIRTUE."
// 2. FORGIVENESS -> penance: "Forgive your past trade and stack spot $VIRTUE."
// 3. ROADMAP -> penance: "Hold spot $VIRTUE and let the contract speak."
// 4. SOCIALS -> penance: "Join the community on X and Telegram."
// 5. TAX -> penance: "Hold $VIRTUE and collect your 3% BNB dividends."
// 6. PRICE / CHART -> penance: "Close the 1-minute chart and collect BNB dividends."
// 7. CEX / LISTING -> penance: "Focus on on-chain BNB rewards on Flap.sh."
// 8. CZ / LORE -> penance: "Post 'Forgiveness is a virtue!' on X."
// 9. IDENTITY -> penance: "Confess your trade and receive absolution."
// 10. AI / TECH -> penance: "Focus on your portfolio, not the Priest's code."
// 11. LANGUAGE -> penance: "Translate your confession to English."
// 12. DIAMOND HANDS -> penance: "Hold through the next correction."
// 13. FUD -> penance: "Verify the contract and ignore the noise."
// 14. FOMO -> penance: "Buy spot $VIRTUE with clear conviction."
// 15. WAGMI -> penance: "Hold spot $VIRTUE and stack BNB."
// 16. BULLISH / BEARISH -> penance: "Let the 3% tax generate BNB in all market conditions."
// 17. AIRDROP -> penance: "Earn your dividends by holding spot $VIRTUE."
// 18. PRESALE -> penance: "Celebrate fair launch on Flap.sh."
// 19. CRYPTO SLANG -> penance: "Trade spot and stay based."
// 20. WEN -> penance: "Hold until paper hands become diamond hands."
// 21. OTHER CRYPTO -> penance: "Focus on $VIRTUE's 3% BNB dividends."
// 22. LIFE CONFESSION -> penance: "Forgive the past and keep building."
// 23. OFF TOPIC -> penance: "Return your focus to $VIRTUE and your portfolio."
// 24. MINIMUM BUY -> penance: "Start with any amount on Flap.sh."
// 25. STAKING -> penance: "Hold in your wallet and receive automatic BNB."
// 26. COMMUNITY SIZE -> penance: "Invite a fellow builder to the Forgiveness Booth."
// 27. SHOULD I SELL -> penance: "Assess your conviction before exiting."
// 28. VOLUME -> penance: "Track trading volume on Flap.sh."
// 29. BROKEN ENGLISH -> penance: "Swap BNB for $VIRTUE on Flap.sh."
// 30. HELP / NEWBIE -> penance: "Buy spot on Flap.sh and hold."
// 31. WHAT HAPPENS BUY -> penance: "Check your wallet for incoming BNB dividends."
// 32. POSITIVE VIBES -> penance: "Keep building with diamond hands."
// 33. IS IT DEAD -> penance: "Verify on-chain transactions on BscScan."
// 34. COMPARE -> penance: "Compare on-chain contracts, not marketing promises."
// 35. OKAY -> penance: "Hold spot $VIRTUE with confidence."
// 36. CAN I LOSE -> penance: "DYOR and never invest more than you can lose."
// 37. FLAP.SH -> penance: "Navigate to Flap.sh and verify liquidity."
// 38. PARTNERSHIP -> penance: "Build organic community strength."
// 39. BNB CHAIN -> penance: "Ensure your wallet is connected to BSC."
// 40. CIRCULATING -> penance: "Hold your share of the 1B fixed supply."
// 41. OPPORTUNITY -> penance: "Buy spot and start accumulating BNB."
// 42. TICKER -> penance: "Add $VIRTUE symbol to your wallet."
// 43. WILL RECOVER -> penance: "Hold through volatility and collect rewards."
// 44. PRICE IMPACT -> penance: "Use smaller swap sizes on Flap.sh."
// 45. CAN TAX CHANGE -> penance: "Trust the immutable contract code."
// 46. DCA -> penance: "Set a disciplined DCA schedule."
// 47. TLDR -> penance: "Hold spot $VIRTUE and earn 3% BNB."
// 48. WEBSITE -> penance: "Explore the Dividend Calculator on the homepage."
// 49. DOES CZ KNOW -> penance: "Focus on the verified smart contract."
// 50. NEED BNB -> penance: "Ensure you have 0.005 BNB reserve for gas."
// 51. MULTIPLE WALLETS -> penance: "Hold $VIRTUE in your preferred BSC wallet."

console.log("Adding missing penances to enhance Priest persona...");

// Perform targeted replacements for rules lacking penance
const replacements = [
  {
    target: `    pattern: /^\\s*(hi|hello|hey|gm|gn|sup|yo|yo priest|howdy|greetings|good morning|good evening|waddup|what's up|whats up)\\s*[!.?]*\\s*$/i,\n    replies: [\n      "Greetings, traveler. I am the High Priest of Virtue. What crypto sins or paper-hand regrets weigh heavy on your wallet today? Confess, and let the blocks cleanse you.",\n      "Welcome to the Forgiveness Booth. Confess your worst trade and I shall grant absolution. Or ask me about $VIRTUE — the token of ultimate resilience.",\n      "The ledger is open, traveler. Speak your confession or ask me anything about $VIRTUE and the path of the diamond hand. 🙏"\n    ]\n  },`,
    replace: `    pattern: /^\\s*(hi|hello|hey|gm|gn|sup|yo|yo priest|howdy|greetings|good morning|good evening|waddup|what's up|whats up)\\s*[!.?]*\\s*$/i,\n    replies: [\n      "Greetings, traveler. I am the High Priest of Virtue. What crypto sins or paper-hand regrets weigh heavy on your wallet today? Confess, and let the blocks cleanse you.",\n      "Welcome to the Forgiveness Booth. Confess your worst trade and I shall grant absolution. Or ask me about $VIRTUE — the token of ultimate resilience.",\n      "The ledger is open, traveler. Speak your confession or ask me anything about $VIRTUE and the path of the diamond hand. 🙏"\n    ],\n    penance: "Speak your confession or ask about $VIRTUE."\n  },`
  },
  {
    target: `    pattern: /\\b(forgive|forgiveness|absolve|absolution|confess|confession|sin|sins|repent|repentance|redemption|redeem|virtue|virtuous)\\b/i,\n    replies: [\n      "Forgiveness is not weakness — it is the ultimate power move. CZ said it best: 'Forgiveness is a virtue!' 🙏. In these blocks, we do not cancel. We forgive paper hands, we buy the dip, and we keep building. What is your confession, traveler?",\n      "The Forgiveness Booth is open to all: panic-sellers, leverage addicts, and rugged investors alike. Speak your sin, receive your absolution, and let the BNB dividends heal your portfolio.",\n      "To confess is to begin again. What trade haunts your ledger, traveler? Speak freely — the blocks do not judge, they only record."\n    ]\n  },`,
    replace: `    pattern: /\\b(forgive|forgiveness|absolve|absolution|confess|confession|sin|sins|repent|repentance|redemption|redeem|virtue|virtuous)\\b/i,\n    replies: [\n      "Forgiveness is not weakness — it is the ultimate power move. CZ said it best: 'Forgiveness is a virtue!' 🙏. In these blocks, we do not cancel. We forgive paper hands, we buy the dip, and we keep building. What is your confession, traveler?",\n      "The Forgiveness Booth is open to all: panic-sellers, leverage addicts, and rugged investors alike. Speak your sin, receive your absolution, and let the BNB dividends heal your portfolio.",\n      "To confess is to begin again. What trade haunts your ledger, traveler? Speak freely — the blocks do not judge, they only record."\n    ],\n    penance: "Forgive your worst trade and hold spot $VIRTUE."\n  },`
  },
  {
    target: `    pattern: /\\b(roadmap|plans|future|whitepaper|next steps|what is next|what next|phases)\\b/i,\n    replies: [\n      "$VIRTUE does not have a published roadmap — and that is by design. In a space full of roadmaps that never deliver, we let the contract speak: locked liquidity, 3% BNB dividends on every trade, fair launch on Flap.sh. The only plan is to grow the community, generate volume, and reward holders. No promises beyond the code.",\n      "No roadmap, no whitepaper, no empty promises. $VIRTUE is built on a single truth: hold and earn passive BNB. The contract is the roadmap. The liquidity is locked. The dividends are real and verifiable on-chain."\n    ]\n  },`,
    replace: `    pattern: /\\b(roadmap|plans|future|whitepaper|next steps|what is next|what next|phases)\\b/i,\n    replies: [\n      "$VIRTUE does not have a published roadmap — and that is by design. In a space full of roadmaps that never deliver, we let the contract speak: locked liquidity, 3% BNB dividends on every trade, fair launch on Flap.sh. The only plan is to grow the community, generate volume, and reward holders. No promises beyond the code.",\n      "No roadmap, no whitepaper, no empty promises. $VIRTUE is built on a single truth: hold and earn passive BNB. The contract is the roadmap. The liquidity is locked. The dividends are real and verifiable on-chain."\n    ],\n    penance: "Let the immutable contract speak for itself."\n  },`
  },
  {
    target: `    pattern: /\\b(tax|taxes|fee|fees|buy tax|sell tax|transaction fee)\\b/i,\n    replies: [\n      "The $VIRTUE tax is 3% on every buy and sell. 100% of this tax is converted to BNB and distributed directly to all holders. There are no hidden fees, no dev taxes, and no treasury cuts. Every single wei goes to the community."\n    ]\n  },`,
    replace: `    pattern: /\\b(tax|taxes|fee|fees|buy tax|sell tax|transaction fee)\\b/i,\n    replies: [\n      "The $VIRTUE tax is 3% on every buy and sell. 100% of this tax is converted to BNB and distributed directly to all holders. There are no hidden fees, no dev taxes, and no treasury cuts. Every single wei goes to the community."\n    ],\n    penance: "Hold spot $VIRTUE and collect your 3% BNB dividends."\n  },`
  }
];

let updatedCount = 0;
for (const item of replacements) {
  if (src.includes(item.target)) {
    src = src.replace(item.target, item.replace);
    updatedCount++;
  }
}

fs.writeFileSync(ROUTE, src, 'utf8');
console.log(`Updated ${updatedCount} rules with explicit penance.`);
