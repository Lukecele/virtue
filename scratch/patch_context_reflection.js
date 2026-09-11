const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// 1. Upgrade reflection map and function
const oldReflect = `// Pronoun reflection map
const reflections: Record<string, string> = {
  "am": "are", "was": "were", "i": "you", "i'd": "you would",
  "i've": "you have", "i'll": "you will", "my": "your",
  "are": "am", "you've": "I have", "you'll": "I will",
  "your": "my", "yours": "mine", "you": "me", "me": "you",
  "myself": "yourself", "yourself": "myself"
};

function reflect(text: string): string {
  return text.split(/\\b/).map(word => reflections[word.toLowerCase()] || word).join("");
}`;

const newReflect = `// Enhanced Pronoun & Grammar Reflection Map
const reflections: Record<string, string> = {
  "am": "are", "was": "were", "i": "you", "i'd": "you would",
  "i've": "you have", "i'll": "you will", "my": "your",
  "are": "am", "you've": "I have", "you'll": "I will",
  "your": "my", "yours": "mine", "you": "me", "me": "you",
  "myself": "yourself", "yourself": "myself", "we": "you",
  "our": "your", "ours": "yours", "us": "you"
};

function reflect(text: string): string {
  if (!text) return "that trade";
  // Clean trailing punctuation and leading fillers
  let cleaned = text.trim()
    .replace(/[?.!;,]+$/g, "")
    .replace(/^(that|because|and|so|that i|to|when i|after i)\\s+/i, "");

  const words = cleaned.split(/\\b/).map(word => {
    const lower = word.toLowerCase();
    return reflections[lower] !== undefined ? reflections[lower] : word;
  }).join("");

  const finalStr = words.trim();
  return finalStr.length > 0 ? finalStr : "that position";
}`;

src = src.replace(oldReflect, newReflect);

// 2. Update runElizaPriest signature and POST to handle full message history
const oldRunEliza = `export function runElizaPriest(userInput: string): { reply: string; penance: string } {
  const text = userInput.trim();
  const clean = text.toLowerCase();

  // Phase 1: Match specific intents FIRST (ordered by priority)
  for (const rule of elizaRules) {
    const match = text.match(rule.pattern);
    if (match) {
      let replyTemplate = rule.replies[Math.floor(Math.random() * rule.replies.length)];
      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          replyTemplate = replyTemplate.replace(\`$\${i}\`, reflect(match[i].trim()));
        }
      }
      return { reply: replyTemplate, penance: rule.penance || "" };
    }
  }

  // Phase 2: Language detection
  const warning = getLanguageWarning(clean);
  if (warning) return warning;

  // Phase 3: Smart fallback — hint-based generic response
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

  return { reply, penance };
}`;

const newRunEliza = `export function runElizaPriest(userInput: string, history: Array<{role: string; content: string}> = []): { reply: string; penance: string } {
  const text = userInput.trim();
  const clean = text.toLowerCase();

  // Context-aware disambiguation for short/ambiguous follow-ups
  const isShortFollowUp = /^\\s*(why|why\\?|how|how\\?|where|where\\?|when|when\\?|how much|how much\\?|is it|is it\\?|tell me more|what about it|and then|what else)\\s*$/i.test(clean);
  
  if (isShortFollowUp && history.length > 1) {
    const recentHistoryText = history.slice(-4).map(m => m.content).join(" ").toLowerCase();
    
    if (/\\b(buy|swap|purchase|flap|how to buy)\\b/i.test(recentHistoryText)) {
      return {
        reply: \`To swap $VIRTUE, go to Flap.sh (\${launchpadUrl}), connect your BSC wallet (MetaMask or Trust Wallet), and swap BNB for $VIRTUE. Ensure slippage is set to 5%.\`,
        penance: "Navigate to Flap.sh and complete your swap."
      };
    }
    if (/\\b(dividend|reward|bnb|tax|3%|claim)\\b/i.test(recentHistoryText)) {
      return {
        reply: \`Every trade carries a 3% tax converted to BNB and distributed to holders. Rewards auto-distribute at $4. Below $4, claim manually at \${claimUrl}.\`,
        penance: "Check your projected dividends on the homepage calculator."
      };
    }
    if (/\\b(contract|ca|address|bep20)\\b/i.test(recentHistoryText)) {
      return {
        reply: \`The official $VIRTUE contract on BSC is: \${contractAddress}. Locked liquidity on Flap.sh, 100% fair launch.\`,
        penance: "Copy the CA and load it into your wallet."
      };
    }
  }

  // Phase 1: Match specific intents FIRST (ordered by priority)
  for (const rule of elizaRules) {
    const match = text.match(rule.pattern);
    if (match) {
      let replyTemplate = rule.replies[Math.floor(Math.random() * rule.replies.length)];
      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          replyTemplate = replyTemplate.replace(\`$\${i}\`, reflect(match[i].trim()));
        }
      }
      return { reply: replyTemplate, penance: rule.penance || "" };
    }
  }

  // Phase 2: Language detection
  const warning = getLanguageWarning(clean);
  if (warning) return warning;

  // Phase 3: Smart fallback — Entity/Action Extraction
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

  const hasCryptoHint = /\\b(token|coin|crypto|wallet|chain|block|hold|buy|sell|swap|price|market|invest|earn|profit|loss|trade|defi|nft|web3)\\b/i.test(clean);
  let reply: string;
  if (hasCryptoHint) {
    const cryptoFallbacks = genericReplies.slice(8);
    reply = cryptoFallbacks[Math.floor(Math.random() * cryptoFallbacks.length)];
  } else {
    reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
  }
  
  const penance = text.split(" ").length > 3
    ? genericPenances[Math.floor(Math.random() * genericPenances.length)]
    : "";

  return { reply, penance };
}`;

src = src.replace(oldRunEliza, newRunEliza);

// 3. Update POST function to pass messages array to runElizaPriest
const oldPost = `export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const userMessages = messages.filter((m: any) => m.role === "user");
    const latestUserConfession = userMessages[userMessages.length - 1]?.content || "";
    const result = runElizaPriest(latestUserConfession);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in NLP route:", error);
    return NextResponse.json({
      reply: "The High Priest is currently meditating in the blocks. Speak again, my child. 🙏",
      penance: "Wait a moment and try again."
    });
  }
}`;

const newPost = `export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const history = Array.isArray(messages) ? messages : [];
    const userMessages = history.filter((m: any) => m.role === "user");
    const latestUserConfession = userMessages[userMessages.length - 1]?.content || "";
    const result = runElizaPriest(latestUserConfession, history);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in NLP route:", error);
    return NextResponse.json({
      reply: "The High Priest is currently meditating in the blocks. Speak again, my child. 🙏",
      penance: "Wait a moment and try again."
    });
  }
}`;

src = src.replace(oldPost, newPost);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Reflected grammar, conversational context & smart fallback patch applied successfully!');
