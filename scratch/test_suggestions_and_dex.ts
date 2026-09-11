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
  console.log("=== TESTING COMMUNITY SUGGESTIONS & DEX FAST-TRACK RULES ===");
  await testPost("i have suggestions to improve the bot");
  await testPost("how to give feedback to dev");
  await testPost("wen dex update");
  await testPost("pay ave ai when dexscreener update");
  console.log("\n========================================");
}

runTests();
