const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');
const orig = code.length;

function patch(desc, target, replacement) {
  if (!code.includes(target)) {
    console.error(`❌ PATCH FAILED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

const proxyAndBondingRules = `  // 5. PROXY CONTRACT EXPLANATION (Flap.sh Tax & Dividend Infrastructure)
  {
    pattern: /\\b(proxy|proxy contract|why proxy|is proxy safe|proxy warning|proxy scanner|upgradable|upgradeable|proxy tax|flap proxy|why is it a proxy)\\b/i,
    replies: [
      "Why does DexScreener or BscScan flag a Proxy Contract? On Flap.sh, $VIRTUE uses Flap's standardized launchpad proxy architecture specifically to handle the automated 3% tax collection and continuous BNB dividend distribution on-chain. This proxy is NOT a dev backdoor — it is Flap's verified, audited infrastructure that guarantees 100% tax routing to holders. 100% safe and verified on Flap.sh! 🛡️",
      "Proxy contract explained: Flap.sh utilizes a proxy model to implement the tax & dividend mechanics natively on BSC. The proxy parameters are locked into Flap's launchpad protocol, ensuring 100% of the 3% tax is converted to BNB and distributed to holders without any developer intervention or admin privilege to drain funds. Fully safe and transparent on Flap.sh. 🔒"
    ],
    penance: "Inspect the verified Flap.sh tax info page."
  },

  // 6. BONDING CURVE & FLAP MECHANICS & LP BURN
  {
    pattern: /\\b(bonding curve|bondingcurve|how flap works|flap mechanics|bonding pool|curve target|lp burn|burned lp|burnt lp|curve migration|flap bonding|how does bonding curve work)\\b/i,
    replies: [
      "How Flap.sh bonding curve & liquidity work: $VIRTUE launched on Flap.sh's fair bonding curve system! As trading volume builds on the curve, liquidity accumulates automatically. Upon reaching the curve target, liquidity is seeded to the DEX and LP tokens are permanently burned/locked on-chain, guaranteeing 0% rug risk and 100% safe trading for all holders. 📈🔥",
      "Flap.sh bonding curve mechanics: 1) Fair launch open to everyone simultaneously from block zero. 2) Bonding curve accumulates organic liquidity from trades. 3) LP tokens are automatically burned/locked, ensuring no one (including devs) can ever remove liquidity. 4) 3% BNB dividends flow continuously throughout! 💎"
    ],
    penance: "Verify the bonding curve liquidity lock on Flap.sh."
  },

`;

patch(
  'Insert Proxy and Bonding Curve rules into Core Waterfall',
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────`,
  `  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────\n` + proxyAndBondingRules
);

fs.writeFileSync(path, code, 'utf8');
console.log(`Updated. Size: ${code.length}`);
