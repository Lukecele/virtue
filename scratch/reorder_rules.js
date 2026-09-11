const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// 1. We want to move the Grammar / Confession capture group rules UP above the broad keyword rules!
// Capture group patterns to move up:
// - i panic sold (.*)
// - i sold (.*)
// - i bought (.*)
// - i was rugged by (.*)
// - i lost (.*) because (.*)
// - i got liquidated on (.*)
// - i lost (.*) on leverage
// - i am (ruined|broke|...)

// Let's locate the confession rules section in route.ts
const confessionSectionRegex = /\/\/\s*──\s*COMPLEX ELIZA GRAMMAR PARSERS[\s\S]*?(?=\/\/\s*──\s*GIBBERISH FILTER)/;
const confessionSectionMatch = src.match(confessionSectionRegex);

if (confessionSectionMatch) {
  const confessionBlock = confessionSectionMatch[0];
  // Remove confession block from its old position
  src = src.replace(confessionBlock, '');

  // Insert confession block right after PROFANITY FILTER
  const profanityEndRegex = /\/\/\s*──\s*PROFANITY FILTER[\s\S]*?\},?\n\n/;
  src = src.replace(profanityEndRegex, (match) => match + confessionBlock + '\n');

  console.log('✅ Successfully prioritized Confession/Capture-group rules over generic keyword rules!');
} else {
  console.log('⚠️ Could not match COMPLEX ELIZA GRAMMAR PARSERS section');
}

fs.writeFileSync(ROUTE, src, 'utf8');
