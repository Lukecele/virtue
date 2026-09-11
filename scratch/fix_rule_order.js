const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// The main issue is that generic catch-alls like `what is (.*)`, `tax`, `how to buy` are capturing specific queries before their specific rules.
// Also language detection for spanish `como comprar` gets caught by portuguese `como comprar` because `como comprar` is in ptWords.

// Fix 1: Refine language detection so Spanish `como comprar este` isn't misidentified as Portuguese
src = src.replace(
  'const ptWords = ["comprar","quem","projeto","porque","contrato","endereco","imposto","dividendos","pecado","vendido","perdido","sacerdote","onde","meu","tua","teu","obrigado"];',
  'const ptWords = ["quem","projeto","porque","contrato","endereco","imposto","dividendos","pecado","vendido","perdido","sacerdote","onde","meu","tua","teu","obrigado"];'
);

// Fix 2: Move `what is (.*)`, `why is (.*)`, `why did (.*)`, `do you (.*)`, `are you (.*)`, `i want to (.*)` to the VERY BOTTOM right before `GIBBERISH FILTER`.
const genericGrammarParsersRegex = /\s*\/\/ ── (do you|why did|why is|what is|are you|i want to) \(\.\*\)[\s\S]*?(?=\/\/\s*──\s*GIBBERISH FILTER)/;

// Let's find all the specific ELIZA capture rules at the end of rules list and move them down
const broadGrammarBlockRegex = /  \{[\s\S]*?pattern: \/do you \(\.\*\)\/i,[\s\S]*?pattern: \/i want to \(\.\*\)\/i,[\s\S]*?\},?\n\n/;

const broadGrammarMatch = src.match(broadGrammarBlockRegex);

if (broadGrammarMatch) {
  const block = broadGrammarMatch[0];
  src = src.replace(block, '');
  // Re-insert right before GIBBERISH FILTER
  src = src.replace('  // ── GIBBERISH FILTER ──', block + '  // ── GIBBERISH FILTER ──');
  console.log('✅ Moved broad ELIZA grammar parsers to the bottom!');
}

fs.writeFileSync(ROUTE, src, 'utf8');
