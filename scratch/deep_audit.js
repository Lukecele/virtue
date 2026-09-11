const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
const src = fs.readFileSync(ROUTE, 'utf8');

// Parse rules conceptually
const ruleMatches = [...src.matchAll(/\{\s*pattern:\s*(\/[^\n]+\/[gi]*),\s*replies:\s*\[([\s\S]*?)\](?:,\s*penance:\s*(["'`][^\n]+["'`]))?\s*\}/g)];

console.log(`Parsed ${ruleMatches.length} rules.`);

let dollarMismatchCount = 0;
let missingPenanceCount = 0;

ruleMatches.forEach((m, idx) => {
  const patternStr = m[1];
  const repliesStr = m[2];
  const penance = m[3];

  if (!penance) {
    missingPenanceCount++;
  }

  // Check capture group placeholders $1, $2
  if (/\$1|\$2|\$3/.test(repliesStr)) {
    // Check if pattern has parentheses ()
    const hasGroup = /\([^?][^)]*\)/.test(patternStr);
    if (!hasGroup) {
      console.log(`⚠️ RULE #${idx + 1} has $1/$2 placeholder but pattern has no capture groups! Pattern: ${patternStr}`);
      dollarMismatchCount++;
    }
  }
});

console.log(`\nMissing Penance Count: ${missingPenanceCount}`);
console.log(`Dollar Mismatch Count: ${dollarMismatchCount}`);
