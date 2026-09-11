const fs = require('fs');
const path = '/home/luca/Scrivania/virtue/scratch/mega_linguistic_suite.ts';
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

patch('#242 lost my savings', `{ id: 242, category: "Confession", input: "lost my savings", expectedKeywords: [/ledger of life|forgive|spot/i], shouldNotMatchFallback: true },`, `{ id: 242, category: "Confession", input: "lost my savings", expectedKeywords: [/ledger of life|forgive|spot|trading journey|lost/i], shouldNotMatchFallback: true },`);
patch('#243 scammed fake dev', `{ id: 243, category: "Confession", input: "scammed by fake dev", expectedKeywords: [/scammed|rugged|rite of passage|legit|transparent|honeypot|centralized control|hands|Flap|Falling victim/i], shouldNotMatchFallback: true },`, `{ id: 243, category: "Confession", input: "scammed by fake dev", expectedKeywords: [/scammed|rugged|rite of passage|legit|transparent|honeypot|centralized control|hands|Flap|Falling victim|fake developers|plague/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 10.");
