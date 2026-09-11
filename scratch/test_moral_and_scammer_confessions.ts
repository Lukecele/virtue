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
  console.log("=== TESTING MORAL SINS, SCAMMERS & BNB ACTIONS ===");
  await testPost("i'm scammer");
  await testPost("i'm a scammer");
  await testPost("i panic sold virtue");
  await testPost("i sold all my bnb");
  await testPost("i buyed bnb");
  await testPost("i buyed virtue");
  await testPost("i done immoral things");
  await testPost("my life journey has been hard");
  console.log("\n========================================");
}

runTests();
