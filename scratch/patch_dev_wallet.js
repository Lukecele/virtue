const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
let src = fs.readFileSync(ROUTE, 'utf8');

// 1. Update WHO IS THE DEV rule
const oldDevRule = `  // ── WHO IS THE DEV ─────────────────────────────────────────────────────────
  {
    pattern: /\\b(who is.*dev|who is.*developer|who is.*founder|who created|creator|team|founders|devs|who's the dev|about the dev|dev info)\\b|^\\s*(dev|developer)\\??\\s*$/i,
    replies: [
      "The developers are silent, reformed builders of the blockchain who choose to remain anonymous. In a space of false promises and rugged dreams, code is the only true witness. $VIRTUE was launched fairly on Flap.sh — locked liquidity, locked contract, zero mint functions. We do not trust names; we trust the blockchain.",
      "Anonymous by choice, verified by code. The team behind $VIRTUE launched fairly on Flap.sh with no pre-minting, no dev wallets, and no hidden taxes. The contract is public. The liquidity is locked. The Priest is watching. 👁️"
    ]
  },`;

const newDevRule = `  // ── WHO IS THE DEV ─────────────────────────────────────────────────────────
  {
    pattern: /\\b(who is.*dev|who is.*developer|who is.*founder|who created|creator|team|founders|devs|who's the dev|about the dev|dev info|dev wallet|dev holding)\\b|^\\s*(dev|developer)\\??\\s*$/i,
    replies: [
      "The developer behind $VIRTUE is an anonymous, reformed builder. There are NO team token allocations and NO pre-mined bags. The single dev wallet bought only ~$40–$60 worth of tokens on the open market at launch — exactly like any regular community member. Zero bundling, zero insider snipers, zero scam vectors. Code is the contract.",
      "Anonymous by choice, verified on-chain. The developer holds only a single wallet with a tiny ~$40–$60 entry bought on Flap.sh at launch. There are no pre-allocated team tokens, no sniped bundle wallets, and no reserved scam/phishing allocations. The dev holds spot and earns the same 3% BNB dividends as the community. 👁️"
    ]
  },`;

src = src.replace(oldDevRule, newDevRule);

// 2. Update SAFETY / SCAM CHECK rule
const oldSafetyRule = `  // ── SAFETY / SCAM CHECK ───────────────────────────────────────────────────
  {
    pattern: /\\b(safe|safety|scam|legit|honeypot|rug proof|verified|audit|audited|is it safe|not a scam)\\b/i,
    replies: [
      \`A scam requires control — but $VIRTUE is out of our hands. It was launched on Flap.sh, which guarantees 100% fair distribution, locked liquidity, and a verified contract with no mint functions, no hidden taxes, and no dev wallets. The code is public. The 3% BNB rewards are fully on-chain. Look at the ledger, child — the blocks do not lie: \${launchpadUrl}\`,
      "Flap.sh is a secure BSC launchpad with built-in liquidity locks and contract verification. No team tokens, no presale, no rug vectors. The contract is immutable and the Priest is watching. 👁️"
    ],
    penance: "Spread the message of secure building."
  },`;

const newSafetyRule = `  // ── SAFETY / SCAM CHECK ───────────────────────────────────────────────────
  {
    pattern: /\\b(safe|safety|scam|legit|honeypot|rug proof|verified|audit|audited|is it safe|not a scam|bundle|sniper|phishing)\\b/i,
    replies: [
      \`$VIRTUE was built to eliminate scam vectors: 1) 100% fair launch on Flap.sh with locked liquidity. 2) Zero pre-mine & zero team allocations. 3) The single dev wallet holds only a tiny ~$40–$60 open-market buy. 4) Zero bundling and zero insider snipers. 5) Immutable contract on BSC with 3% BNB dividends. Check the ledger yourself: \${launchpadUrl}\`,
      "A scam requires insider control — but $VIRTUE has none. No pre-allocated team tokens, no sniped bundle wallets, and no phishing vectors. The single dev wallet bought ~$40–$60 on the open market at launch like everyone else. The liquidity is locked and the contract is immutable. 👁️"
    ],
    penance: "Spread the message of secure building."
  },`;

src = src.replace(oldSafetyRule, newSafetyRule);

// 3. Update TL;DR rule
const oldTldr = `      \`$VIRTUE TL;DR: 🔸 Token: $VIRTUE on BNB Chain 🔸 Supply: 1,000,000,000 (fixed, no mint) 🔸 Tax: 3% on every buy and sell 🔸 Distribution: 100% of tax → BNB to all holders automatically 🔸 Auto-pay at $4 threshold, manual claim below 🔸 Fair launch on Flap.sh, locked liquidity, no dev wallets 🔸 Contract: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777\`,`;

const newTldr = `      \`$VIRTUE TL;DR: 🔸 Token: $VIRTUE on BNB Chain 🔸 Supply: 1,000,000,000 (fixed, no mint) 🔸 Tax: 3% on buy/sell → 100% converted to BNB dividends 🔸 Distribution: Auto-pay at $4 threshold, manual claim on Flap Tax Info page 🔸 Safety: Fair launch on Flap.sh, locked liquidity, zero bundling, single dev wallet with tiny ~$40–$60 buy 🔸 Contract: ${contractAddress}\`,`;

src = src.replace(oldTldr, newTldr);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Dev wallet & positive project security patch applied successfully!');
