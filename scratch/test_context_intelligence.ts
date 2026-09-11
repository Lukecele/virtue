import { runElizaPriest } from '../app/api/absolution/route';

console.log("=== TEST 1: REFLECTION GRAMMAR & SANITIZATION ===");
console.log("1. 'I panic sold all my virtue tokens!'");
console.log("   ->", runElizaPriest("I panic sold all my virtue tokens!").reply);

console.log("\n2. 'I bought some random shitcoin because of fomo?'");
console.log("   ->", runElizaPriest("I bought some random shitcoin because of fomo?").reply);

console.log("\n=== TEST 2: CONVERSATIONAL CONTEXT FOLLOW-UP ===");
const history1 = [
  { role: 'user', content: 'How do I buy $VIRTUE?' },
  { role: 'assistant', content: 'You can swap on Flap.sh...' }
];
console.log("User asks: 'where?' following 'How do I buy?'");
console.log("   ->", runElizaPriest("where?", history1).reply);

const history2 = [
  { role: 'user', content: 'Tell me about the contract address' },
  { role: 'assistant', content: 'The contract is 0x0dD...' }
];
console.log("User asks: 'what is it?' following contract discussion");
console.log("   ->", runElizaPriest("what is it?", history2).reply);

console.log("\n=== TEST 3: SMART ENTITY & ACTION EXTRACTION ===");
console.log("1. 'I lost 50 BNB on PancakeSwap last week'");
console.log("   ->", runElizaPriest("I lost 50 BNB on PancakeSwap last week").reply);

console.log("2. 'What about Phantom wallet?'");
console.log("   ->", runElizaPriest("What about Phantom wallet?").reply);
