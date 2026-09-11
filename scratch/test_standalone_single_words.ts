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
  console.log("=== TESTING ALL STANDALONE SINGLE KEYWORDS ===");
  await testPost("scam");
  await testPost("legit");
  await testPost("safe");
  await testPost("dev");
  await testPost("team");
  await testPost("ca");
  await testPost("dividends");
  await testPost("rewards");
  await testPost("roadmap");
  await testPost("dex");
  await testPost("dexscreener");
  await testPost("slippage");
  await testPost("gas");
  await testPost("ludopathy");
  await testPost("i'm a scammer");
  await testPost("my wallet was drained");
  console.log("\n========================================");
}

runTests();
