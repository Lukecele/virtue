const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
const code = fs.readFileSync(path, 'utf8');

// Extract all rules from elizaRules
const elizaMatch = code.match(/const elizaRules: ElizaRule\[\] = \[([\s\S]*?)\];/);
if (!elizaMatch) {
  console.error("Could not find elizaRules array");
  process.exit(1);
}

const elizaContent = elizaMatch[1];
const ruleRegex = /pattern:\s*(\/.*?\/[gimsuy]*)/g;

let match;
const patterns = [];
while ((match = ruleRegex.exec(elizaContent)) !== null) {
  patterns.push(match[1]);
}

console.log(`Found ${patterns.length} Eliza rules in waterfall.`);

// Check for test samples across all patterns
const sampleInputs = [
  "proxy",
  "proxy contract",
  "why proxy",
  "bonding curve",
  "lp burn",
  "shitcoin",
  "is this a shitcoin",
  "are you a memecoin or utility?",
  "liquidity",
  "liquidity locked",
  "supply",
  "total supply",
  "tax",
  "buy tax",
  "sell tax",
  "ca",
  "contract address",
  "dev",
  "who is dev",
  "bundle",
  "is it bundled",
  "multiwallet",
  "dividends",
  "how do dividends work",
  "scam",
  "is it legit",
  "dex",
  "when dex",
  "are you affiliate to binance?",
  "any big names under you?",
  "cz related?",
  "how to buy",
  "where can I sell",
  "slippage",
  "gas fee",
  "pancakeswap",
  "calculator",
  "i made money",
  "fuck this shit",
  "come comprare",
  "4",
  "buidl",
  "safu",
  "asdf",
  "thank you",
  "ok got it",
  "feedback"
];

const { runElizaPriest } = require('/home/luca/Scrivania/virtue/app/api/absolution/route.ts');

console.log("\n--- SAMPLE INPUT AUDIT ---");
let overlaps = 0;
sampleInputs.forEach(input => {
  const res = runElizaPriest(input);
  if (res.reply.startsWith("Tell me more about your journey") || res.reply.startsWith("Does this weigh heavy")) {
    console.log(`⚠️ FALLBACK FOR: "${input}"`);
    overlaps++;
  } else {
    console.log(`✅ MATCHED: "${input}" -> "${res.reply.substring(0, 60)}..."`);
  }
});

console.log(`\nAudit finished. Total fallbacks in core samples: ${overlaps}`);
