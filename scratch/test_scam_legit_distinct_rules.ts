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
  console.log("=== TESTING PROJECT SAFETY, SCAMMER CONFESSION & VICTIM SCENARIOS ===");
  await testPost("is virtue a scam?");
  await testPost("are you scammers?");
  await testPost("is this legit?");
  await testPost("is this a long term project?");
  await testPost("why buy virtue?");
  await testPost("i'm scammer");
  await testPost("i'm a scammer");
  await testPost("i got scammed by a fake dev");
  await testPost("my wallet was drained");
  console.log("\n========================================");
}

runTests();
