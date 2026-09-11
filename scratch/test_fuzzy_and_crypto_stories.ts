import { POST } from '../app/api/absolution/route';

async function testPost(input: string) {
  const req = new Request('http://localhost:3000/api/absolution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: input }]
    })
  });

  const res = await POST(req);
  const json = await res.json();
  console.log(`\n----------------------------------------`);
  console.log(`Input: "${input}"`);
  console.log(`Reply:\n${json.reply}`);
  console.log(`Penance: "${json.penance}"`);
}

async function runTests() {
  console.log("=== TESTING EXHAUSTIVE CRYPTO JOURNEYS & FUZZY SEMANTIC MATCHING ===");
  await testPost("i sold btc at 100 dollars back in 2013 and missed 1000x");
  await testPost("i lost all my money in FTX collapse");
  await testPost("i can't sleep because i am staring at charts until 5am");
  await testPost("my family thinks i'm crazy and my wife left");
  await testPost("i aped in a shitcoin and bought the top");
  await testPost("i lost generational wealth and wiped out my savings");
  await testPost("i feel so foolish about my crypto portfolio loss and anxious");
  await testPost("i'm scared about market volatility and loss of profit");
  console.log("\n========================================");
}

runTests();
