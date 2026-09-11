const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let code = fs.readFileSync(path, 'utf8');

function patch(desc, target, replacement) {
  if (!code.includes(target)) {
    console.error(`❌ PATCH FAILED: ${desc}`);
    return false;
  }
  code = code.replace(target, replacement);
  console.log(`✅ PATCHED: ${desc}`);
  return true;
}

const pastVictimScammersRule = `  // 12. CONFESSION: PAST VICTIM OF SCAMMERS ("cause of scammers", "scammers took my money")
  {
    pattern: /\\b((cause|because|due to|by|from)\\s+scammers?|scammers?\\s+(took|stole|drained|ruined|got me)|(got|was|been)\\s+scammed|lost.*scammers?|scammed by|scammer took|scammer stole|fake dev scam)\\b/i,
    replies: [
      "Falling victim to malicious scammers or rug pulls is a deep wound in Web3. The High Priest hears your pain and offers absolution. $VIRTUE was built precisely as a sanctuary from predatory scammers: 100% locked liquidity on Flap.sh, no dev minting, zero insider pre-allocations, and continuous 3% BNB dividends paid directly to honest spot holders. May your wallet recover in peace. 🙏",
      "Scammers and fake developers are the plague of crypto. If you lost your funds to bad actors in past trades, know that you are welcomed in the Forgiveness Booth. Here on $VIRTUE, code is law: no dev dumps, no hidden team tax, just immutable 3% BNB rewards flowing to holders. Forgive the past and rebuild with verified spot holdings."
    ],
    penance: "Inspect verified contracts on BscScan and avoid unverified links."
  },

`;

patch(
  'Insert Past Victim of Scammers rule before RUGPROOF/SAFETY rule',
  `  // 8. RUGPROOF / RUG CHECK / SAFETY / AUDIT`,
  pastVictimScammersRule + `  // 8. RUGPROOF / RUG CHECK / SAFETY / AUDIT`
);

fs.writeFileSync(path, code, 'utf8');
console.log("Scammer context patched in route.ts");
