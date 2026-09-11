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
  console.log("=== TESTING ALL ADDICTIONS, PERSONAL SINS & COMPLEX CRYPTO KNOWLEDGE ===");
  await testPost("i'm ludopatic");
  await testPost("i lost all in casino");
  await testPost("i fucked my cousin");
  await testPost("i'm drug dipendedent");
  await testPost("i'm tossic");
  await testPost("i always tell lies");
  await testPost("what are bsc gas fees?");
  await testPost("how does flap.sh liquidity lock work?");
  await testPost("i lost on 100x leverage");
  await testPost("what is the market cap and supply?");
  console.log("\n========================================");
}

runTests();
