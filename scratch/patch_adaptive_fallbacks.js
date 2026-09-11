const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

// ENHANCED UNHANDLED / UNKNOWN CAPABILITY INTENT RULES
const capabilityAndHonestFallbackRules = `
  // ── UNKNOWN CAPABILITIES / IMPOSSIBLE REQUESTS (AI Honest & Adaptive Fallback) ────────
  {
    pattern: /\\b(can you|are you able to|do you have|could you|will you|have you)\\s+(trade for me|buy for me|sell for me|connect my wallet|execute swap|predict the future|predict price|hack|mine|send bnb|give me bnb|transfer tokens|predict exact price|guarantee profit)\\b/i,
    replies: [
      "As the High Priest of the Forgiveness Booth, I am an oracle of lore, guidance, live market prices, and contract wisdom. I cannot execute trades for you, connect to your wallet directly, or guarantee future token prices. To buy $VIRTUE safely, visit Flap.sh (\${launchpadUrl}), connect your own BSC wallet, and swap BNB with 5% slippage! 🛡️",
      "I must be honest with you, traveler: I cannot manage funds, execute transactions on your behalf, or predict exact future price movements. What I can do is inspect live links, fetch live crypto prices, explain $VIRTUE's 3% BNB tax mechanics, and absolve your trading sins. You hold full control over your wallet on Flap.sh!"
    ],
    penance: "Always manage your own wallet and trade safely on Flap.sh."
  },

  // ── GENERAL UNRECOGNIZED ACTION OR QUESTION (Adaptive Intelligent Fallback Rule) ──────
  {
    pattern: /\\b(what about|how come|can i|should i|is there a way|is it possible to)\\b/i,
    replies: [
      "The blocks move forward, and so does wisdom. While I focus primarily on $VIRTUE contract info, BNB dividend mechanics, CZ lore, live links, and absolution — what specific detail can I clarify for your journey today?",
      "Every question in these blocks brings us closer to clarity. I can help with live prices (e.g. 'btc price'), contract details ('ca'), dividend mechanics, or link analysis. What part of your $VIRTUE journey would you like to explore?"
    ],
    penance: "Explore the /help menu for full capabilities."
  },
`;

src = src.replace('  // ── UNKNOWN CAPABILITIES', capabilityAndHonestFallbackRules + '\n  // ── UNKNOWN CAPABILITIES');

// UPGRADE GENERIC FALLBACK REPLIES IN ROUTE.TS FOR HIGH VARIABILITY AND HONESTITY
const oldGenericReplies = `const genericReplies = [
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

const newGenericReplies = `const genericReplies = [
  "Tell me more about your journey in these blocks, traveler. The ledger is listening.",
  "Does this weigh heavy on your wallet, or is it a question about $VIRTUE? Speak freely — I am listening.",
  "A true builder does not linger in doubt. Ask me about $VIRTUE, live prices ('btc price'), contract details ('ca'), or confess your trade.",
  "To be transparent: I am a confessional oracle for $VIRTUE. If you have a specific question about dividends, contract safety, or live market data, type /help to see my full menu! 🙏",
  "The path of the diamond hand requires clarity. Try asking about: the contract ('ca'), 3% BNB dividends, how to buy on Flap.sh, or live crypto prices.",
  "Every traveler in the Forgiveness Booth carries a sin, a memory, or a question. Which is yours? Type /help to see all my features.",
  "In the silence between blocks, truth becomes clear. I am here for your confessions, live link analysis, and $VIRTUE tokenomics. What is your focus today?",
  "The High Priest can inspect X/Twitter links, fetch live Binance prices, explain 3% BNB dividends, and absolve trading sins. Ask me anything on your mind!",
  "Speak freely, traveler. I handle confessions, live crypto prices ('bnb price'), contract details, and CZ lore. Type /help anytime to see what I can do. 🙏",
  "The blocks are patient. If I didn't quite catch your meaning, try rephrasing or type /help for a list of topics I can assist you with!",
  "I am always learning from the timeline. For topics outside $VIRTUE and live market data, check BscScan or CoinMarketCap — but for 3% BNB dividends, the Forgiveness Booth is your home. 💎"
];`;

src = src.replace(oldGenericReplies, newGenericReplies);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Adaptive fallback rules and honest capability responses successfully patched into route.ts!');
