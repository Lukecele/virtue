import { POST } from '../app/api/absolution/route';

async function t(input: string) {
  const req = new Request('http://localhost/api/absolution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
  });
  const json = await (await POST(req)).json();
  const reply = json.reply?.slice(0, 80) ?? '(no reply)';
  const isFallback = /tell me more|speak freely|what exactly|you mentioned|ledger is listening/i.test(json.reply ?? '');
  const flag = isFallback ? '⚠️  FALLBACK' : '✅';
  console.log(`${flag} "${input}"\n    ↳ ${reply}`);
}

async function run() {
  console.log("=== BUG FIX VERIFICATION ===\n");

  console.log("--- Bug 1: Profanity must fire BEFORE other rules ---");
  await t("fuck this scam");        // profanity rule should beat scam rule
  await t("shit this is bullshit"); // pure profanity
  await t("fuck bnb dividends");    // profanity + dividend keyword

  console.log("\n--- Bug 2: Project info exclusion list ---");
  await t("is virtue a scam");      // should hit scam rule, NOT project info
  await t("virtue is legit");       // should hit scam/legit rule
  await t("virtue pump it");        // has 'pump' - should NOT hit project info
  await t("tell me about virtue");  // should hit project info (no exclusion word)

  console.log("\n--- Bug 3: Total supply has dedicated rule now ---");
  await t("total supply");
  await t("how many tokens exist");
  await t("tokenomics");
  await t("max supply");

  console.log("\n--- what is X for specific topics (should NOT get generic reply) ---");
  await t("what is the contract address");
  await t("what is the total supply");
  await t("what is the tax");
  await t("what is the roadmap");

  console.log("\n--- Regression: standalone keywords still work ---");
  await t("scam");
  await t("dividends");
  await t("ca");
  await t("dev");
  await t("dex");
}

run();
