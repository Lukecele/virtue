// Test POST endpoint handlers
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
  console.log(`Reply: "${json.reply}"`);
  console.log(`Penance: "${json.penance}"`);
}

async function runAllLiveTests() {
  console.log("=== TESTING LIVE WEB, TWITTER & BINANCE API HANDLERS ===");
  await testPost("https://x.com/cz_binance/status/1970358398760952106");
  await testPost("https://bscscan.com/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777");
  await testPost("btc price");
  await testPost("ethereum price");
  await testPost("solana price");
  console.log("\n=== ALL LIVE TESTS COMPLETE ===");
}

runAllLiveTests();
