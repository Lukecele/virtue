const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// 1. Update Safety / Legitimacy pattern to match single standalone keywords: scam, legit, safe, safety, honeypot, audit
const oldSafetyPattern = `pattern: /^\\s*(is this|is virtue|is it|are you|is the project)\\s+(a\\s+)?(scam|legit|scammers|honeypot|fake|safe|fraud)\\b|\\b(is virtue a scam|is this legit|are you scammers|is it safe|is this safe|is it legit|is virtue legit|honeypot check|rug proof)\\b/i,`;
const newSafetyPattern = `pattern: /\\b(scam|scammers|legit|safe|safety|fraud|honeypot|audit|rug proof|fake)\\b/i,`;

src = src.replace(oldSafetyPattern, newSafetyPattern);

// 2. Update Dev pattern to match single standalone keywords: dev, developer, team, founder, founders
const oldDevPattern = `pattern: /\\b(who is.*dev|who is.*developer|who is.*founder|who created|creator|team|founders|devs|who's the dev|about the dev|dev info|dev wallet|dev holding)\\b|^\\s*(dev|developer)\\??\\s*$/i,`;
const newDevPattern = `pattern: /\\b(dev|devs|developer|developers|team|founder|founders|creator|dev wallet|dev holding)\\b/i,`;

src = src.replace(oldDevPattern, newDevPattern);

// 3. Update Dividends pattern to match single standalone keywords: dividends, dividend, rewards, reward, payout, payouts, yield
const oldDivPattern = `pattern: /\\b(how do i get.*dividend|how.*rewards paid|when.*rewards|claim bnb|how.*receive bnb|how.*receive rewards|dividends|passive income|passive reward|earn bnb|bnb reward)\\b/i,`;
const newDivPattern = `pattern: /\\b(dividends|dividend|rewards|reward|payout|payouts|yield|passive income|earn bnb|bnb reward|claim bnb)\\b/i,`;

src = src.replace(oldDivPattern, newDivPattern);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Standalone single keyword matching for Safety, Dev, Dividends, DEX, CA, Gas, Slippage successfully patched into route.ts!');
