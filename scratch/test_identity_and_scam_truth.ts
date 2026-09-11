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
  console.log("=== TESTING GENERAL USER QUESTIONS & DEFI SCAM TRUTH ===");
  await testPost("where are you from?");
  await testPost("what is your name?");
  await testPost("how old are you?");
  await testPost("why BSC is full of scams and 99% tokens rug?");
  await testPost("most new launches are scams");
  console.log("\n========================================");
}

runTests();
