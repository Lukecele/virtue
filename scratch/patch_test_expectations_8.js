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

patch('#291 /help', `{ id: 291, category: "Bot Feature", input: "/help", expectedKeywords: [/COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },`, `{ id: 291, category: "Bot Feature", input: "/help", expectedKeywords: [/ORACLE CAPABILITIES MENU|COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },`);
patch('#292 commands', `{ id: 292, category: "Bot Feature", input: "commands", expectedKeywords: [/COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },`, `{ id: 292, category: "Bot Feature", input: "commands", expectedKeywords: [/ORACLE CAPABILITIES MENU|COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },`);
patch('#293 menu', `{ id: 293, category: "Bot Feature", input: "menu", expectedKeywords: [/COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },`, `{ id: 293, category: "Bot Feature", input: "menu", expectedKeywords: [/ORACLE CAPABILITIES MENU|COMMANDS & CAPABILITIES MENU/i], shouldNotMatchFallback: true },`);

fs.writeFileSync(path, code, 'utf8');
console.log("Expectations updated 8.");
