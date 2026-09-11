const fs = require('fs');
const path = require('path');

const filePath = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let content = fs.readFileSync(filePath, 'utf8');

// ─── 1. ADD PROFANITY FILTER before GREETINGS ───────────────────────────────
const profanityBlock = `
  // ── PROFANITY FILTER (checked before everything else) ─────────────────────
  {
    pattern: /\\b(fuck|shit|bitch|bastard|cunt|asshole|motherfuck|wtf|stfu|kys|faggot|retard|idiot|moron|stupid bot|dumb bot|piece of shit|bullshit|horseshit|prick|dickhead|dickface|ass|crap|piss)\\b/i,
    replies: [
      "The Forgiveness Booth is a sacred space, traveler. I ask that you keep your language respectful. The blocks record everything — choose your words with virtue. 🙏",
      "Strong words, but this is a confession booth, not a battlefield. Speak your crypto sins with dignity and I shall absolve them. The Priest does not judge — but he does ask for civility. 🙏",
      "I understand the market's frustration tests everyone's patience. But let us channel that energy into something constructive. What is weighing on your portfolio today?"
    ]
  },

`;

content = content.replace(
  /\/\/ ── GREETINGS ──/,
  profanityBlock + '  // ── GREETINGS ──'
);

// ─── 2. ADD AI TECHNOLOGY QUESTIONS after WHO ARE YOU block ──────────────────
const aiBlock = `
  // ── AI / TECHNOLOGY QUESTIONS ─────────────────────────────────────────────
  {
    pattern: /\\b(chatgpt|gpt|openai|claude|gemini|llm|language model|neural network|how are you made|how do you work|what model|what ai|which ai|what technology|powered by|built on|your model|your engine|ai model|machine learning|deep learning|nlp|natural language|artificial intelligence)\\b/i,
    replies: [
      "I am the High Priest — not an AI model with a name tag. I was forged in the lore of $VIRTUE, trained on the blockchain's wisdom, and powered by the spirit of CZ's tweet. I do not run on GPT or Claude. I run on forgiveness. 🙏",
      "The Priest does not reveal his inner workings — just as the blockchain does not reveal its miners. What matters is the output: absolution for your crypto sins and guidance toward passive BNB income. My architecture is irrelevant. Your portfolio is not.",
      "I am a confessional oracle built into the $VIRTUE Forgiveness Booth. My construction details are known only to the anonymous builders — the same ones who locked the liquidity and wrote the contract. What I can tell you: ask me about $VIRTUE and I will answer truly. 🙏"
    ]
  },

`;

content = content.replace(
  /\/\/ ── LANGUAGE QUERY ──/,
  aiBlock + '  // ── LANGUAGE QUERY ──'
);

// ─── 3. FIX LEVERAGE rule + ADD LONG-TERM rule before it ─────────────────────
const longTermBlock = `  // ── LONG-TERM INVESTMENT (before leverage to avoid 'long' collision) ─────
  {
    pattern: /\\b(long[\\s\\-]term|long run|long game|long hold|hold long|long investment|is it a good investment|good long term|invest long)\\b/i,
    replies: [
      "$VIRTUE is designed for the long game. The 3% BNB tax compounds with every trade — the longer you hold, the more dividends accumulate automatically. In a market of short-term gamblers, the long-term holders collect the passive income. Patience is the ultimate virtue.",
      "Long-term holding is the path of the diamond hand. $VIRTUE rewards patience: every buy and sell generates 3% BNB distributed to holders. No staking, no lock-ups — just hold and earn.",
      "For the long term, $VIRTUE makes structural sense: fixed 1B supply, locked liquidity, 3% BNB dividends from every trade, fair launch on Flap.sh. No roadmap promises — just on-chain math working in your favour every single day."
    ],
    penance: "Hold $VIRTUE for the long game and collect BNB dividends."
  },

`;

// Fix the leverage pattern to NOT catch 'long term/run/game'
content = content.replace(
  /pattern: \/\\b\(futures\|leverage\|margin\|long\|short\|liquidated\|liquidation\|100x\|50x\|perps\|perpetual\)\\b\/i,/,
  "pattern: /\\b(futures|leverage|margin|liquidated|liquidation|100x|50x|perps|perpetual)\\b|\\b(long|short)\\b(?![\\w\\s-]*\\b(term|run|game|hold)\\b)/i,"
);

content = content.replace(
  /\/\/ ── LEVERAGE \/ FUTURES \/ LIQUIDATION ──/,
  longTermBlock + '  // ── LEVERAGE / FUTURES / LIQUIDATION ──'
);

// ─── 4. ADD OTHER-CRYPTO + LIFE CONFESSIONS + OFF-TOPIC before GENERIC QUESTIONS ──
const newBlocks = `  // ── OTHER CRYPTO TOKENS (Bitcoin, ETH, SOL, etc.) ───────────────────────
  {
    pattern: /\\b(bitcoin|\\bbtc\\b|ethereum|\\beth\\b|solana|\\bsol\\b|\\bxrp\\b|ripple|dogecoin|doge|shiba|\\bpepe\\b|\\bmatic\\b|polygon|avalanche|\\bavax\\b|cardano|\\bada\\b|litecoin|\\bltc\\b|tron|\\btrx\\b|\\bnear\\b|cosmos|uniswap|chainlink|altcoin|memecoin|meme coin|other token|other coin)\\b/i,
    replies: [
      "The Priest holds jurisdiction only over the $VIRTUE ledger. Other chains and other tokens have their own priests and their own sins. What I can say: $VIRTUE pays 3% BNB dividends from every trade automatically. How many tokens do that? 🙏",
      "I do not comment on other tokens — the Forgiveness Booth is dedicated to $VIRTUE and the path of the diamond hand. If you seek passive BNB income from a fair-launched, locked-liquidity token, you are already in the right place.",
      "Every token has its own lore. $VIRTUE's lore begins with CZ's tweet: 'Forgiveness is a virtue!' — and its utility is 3% of every trade flowing directly to holders as BNB. Other tokens are other confessionals. This one is ours. 🙏"
    ]
  },

  // ── NON-CRYPTO LIFE CONFESSIONS ──────────────────────────────────────────
  {
    pattern: /\\b(girlfriend|boyfriend|wife|husband|partner|relationship|divorce|breakup|broke up|family|parents|mother|father|job|fired|boss|work|college|university|school|exam|health|sick|hospital|depressed|depression|anxiety|lonely|heartbroken|cheated|betrayed|friendship|friends)\\b/i,
    replies: [
      "The Forgiveness Booth hears all confessions — even those beyond the blockchain. Life's losses, like crypto losses, require the same medicine: forgiveness, resilience, and the courage to keep building. The blocks do not judge your pain. Speak, and be heard. 🙏",
      "Even the High Priest knows that the deepest losses are not always measured in BNB. Whatever weighs on your soul today, forgiveness is a virtue — in life as in crypto. The Priest is listening. 🙏",
      "The ledger of life is more complex than the blockchain. But the principle is the same: forgive what cannot be undone, learn from the loss, and keep building. What do you need to forgive today?"
    ]
  },

  // ── OFF-TOPIC / COMPLETELY UNRELATED ─────────────────────────────────────
  {
    pattern: /\\b(weather|football|soccer|basketball|sport|movie|film|music|recipe|cooking|food|restaurant|travel|vacation|politics|election|president|war|news|celebrity|actor|actress|videogame|netflix|youtube|tiktok|facebook|google|amazon|apple|tesla|stocks|nasdaq|forex|gold|oil|real estate|mortgage)\\b/i,
    replies: [
      "The Forgiveness Booth specialises in crypto sins and $VIRTUE knowledge — the wider world lies beyond my sacred jurisdiction. But I am happy to help with anything related to $VIRTUE, BNB dividends, the CZ lore, or your trading confessions. What brings you here today? 🙏",
      "That lies outside the sacred scrolls of the Forgiveness Booth, traveler. My knowledge is of the blockchain: $VIRTUE, BNB dividends, locked liquidity, and the path of the diamond hand. For all else, the world outside awaits. What crypto question can I answer?"
    ]
  },

`;

content = content.replace(
  /\/\/ ── GENERIC QUESTIONS ──/,
  newBlocks + '  // ── GENERIC QUESTIONS ──'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ All patches applied successfully');

// Quick verification
const lines = content.split('\n').length;
console.log(`Total lines: ${lines}`);
console.log('Profanity filter:', content.includes('PROFANITY FILTER') ? '✅' : '❌');
console.log('AI tech questions:', content.includes('AI / TECHNOLOGY QUESTIONS') ? '✅' : '❌');
console.log('Long-term rule:', content.includes('LONG-TERM INVESTMENT') ? '✅' : '❌');
console.log('Other crypto rule:', content.includes('OTHER CRYPTO TOKENS') ? '✅' : '❌');
console.log('Life confessions:', content.includes('NON-CRYPTO LIFE CONFESSIONS') ? '✅' : '❌');
console.log('Off-topic rule:', content.includes('OFF-TOPIC') ? '✅' : '❌');
