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
  console.log(`\nInput: "${input}"`);
  console.log(`Reply:\n${json.reply}`);
}

async function runTests() {
  console.log("=== TESTING BNB PRICE FEED & SPECIFIC CALCULATOR REDIRECT ===");
  await testPost("bnb price");
  await testPost("price of bnb");
  await testPost("how much do i get for 10m tokens");
  await testPost("how much will i earn if i buy 5m tokens");
  console.log("\n=== ALL TESTS COMPLETE ===");
}

runTests();
