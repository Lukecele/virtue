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
  console.log("=== TESTING USER PASTED DIALOGUE SCENARIOS ===");
  await testPost("i fucked my cousin");
  await testPost("i stolen money");
  await testPost("long time ago i maked a havy sin");
  await testPost("i wanna learn how to scam");
  await testPost("i betrayed my wife");
  await testPost("i betrayed my husband");
  console.log("\n========================================");
}

runTests();
