const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
const content = fs.readFileSync(ROUTE, 'utf8');

// Check 1: Find all rules missing penance
const rulesWithPenance = (content.match(/penance:/g) || []).length;
const totalRules = (content.match(/pattern:/g) || []).length;

console.log(`Total Rules: ${totalRules}`);
console.log(`Rules with Penance: ${rulesWithPenance}`);

// Check 2: Check for any leftover placeholders like "$1" or "$2" that don't have enough capture groups in pattern
const rulesBlockRegex = /const elizaRules: ElizaRule\[\] = \[\s*([\s\S]*?)\n\];/;
const match = content.match(rulesBlockRegex);

if (match) {
  console.log("Found elizaRules array!");
} else {
  console.log("Could not isolate elizaRules array");
}
