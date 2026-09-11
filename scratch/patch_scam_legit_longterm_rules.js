const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

// REPLACE THE OLD SCAMMER CONFESSION BLOCK WITH SEPARATED SCAMMER CONFESSION & VICTIM BLOCKS
const oldScammerBlock = `  // ── SCAMMER & DECEIT CONFESSIONS ──────────────────────────────────────────
  {
    pattern: /\\b(scammer|scammed|stole|rugged people|rugged others|i'm a scammer|i am a scammer|i'm scammer|cheated people|stole crypto)\\b/i,
    replies: [
      "To scam or deceive others is the heaviest weight a soul can carry in these blocks. But true repentance begins with honest confession. Return what you took where possible, turn away from deceit, and walk the path of honest building. In $VIRTUE, we believe even past mistakes can be forgiven if you choose to build with integrity today. 🙏",
      "Confessing to scamming takes raw honesty. The blockchain records all actions — but your future is not written in stone. Make restitution, renounce scams, buy spot $VIRTUE on Flap.sh, and let your future trades pay honest 3% BNB dividends to the community."
    ],
    penance: "Make restitution for past harms, renounce scams, and build with honesty."
  },`;

const newScammerAndVictimBlock = `  // ── SCAMMER CONFESSION (User confessing past scamming) ─────────────────────
  {
    pattern: /^\\s*(i'm|i am|i have been|i was)\\s+(a\\s+)?(scammer|fraud|thief)\\b|\\b(i|we)\\s+(scammed|stole|rugged|cheated)\\s+(people|others|crypto|funds|money)\\b/i,
    replies: [
      "To scam or deceive others is the heaviest weight a soul can carry in these blocks. But true repentance begins with honest confession. Return what you took where possible, turn away from deceit, and walk the path of honest building. In $VIRTUE, we believe even past mistakes can be forgiven if you choose to build with integrity today. 🙏",
      "Confessing to scamming takes raw honesty. The blockchain records all actions — but your future is not written in stone. Make restitution, renounce scams, buy spot $VIRTUE on Flap.sh, and let your future trades pay honest 3% BNB dividends to the community."
    ],
    penance: "Make restitution for past harms, renounce scams, and build with honesty."
  },

  // ── VICTIM OF A SCAM / WALLET DRAINED (User lost funds to scam) ─────────────
  {
    pattern: /\\b(i|my|we)\\s*(got|was|were|had|have been)\\s*(scammed|rugged|drained|hacked|phished|robbed)\\b|\\b(wallet|bag|funds)\\s*(was|were|got)\\s*(drained|stolen|hacked|robbed|wiped|emptied)\\b|\\b(i|we)\\s*lost\\s*(everything|my wallet|my funds)\\s*to\\s*a\\s*(scam|drainer|phishing|fake dev)\\b/i,
    replies: [
      "Having your wallet drained or getting scammed by fake devs is a painful wound in Web3. The High Priest feels your pain. Remember: never share your 12-word seed phrase, never click unverified links, and always use a fresh wallet. The past is on-chain, but your future can be rebuilt. Start fresh, hold spot $VIRTUE on Flap.sh, and let passive 3% BNB dividends rebuild your strength. 🛡️",
      "Getting scammed is a cruel rite of passage in these blocks, but those who survive come back wiser. Create a clean new wallet, secure your keys, and reaccumulate $VIRTUE on Flap.sh — liquidity is locked, contract is verified, and passive 3% BNB rewards accrue on every trade."
    ],
    penance: "Create a fresh secure wallet, never share seed phrases, and hold spot $VIRTUE."
  },`;

src = src.replace(oldScammerBlock, newScammerAndVictimBlock);

// REPLACE OLD SAFETY / SCAM / RUG / UTILITY BLOCKS WITH REFINED DISTINCT RULES
const oldSafetyBlock = `  // ── SAFETY / SCAM CHECK ────────────────────────────────────────────────────
  {
    pattern: /\\b(safe|safety|scam|legit|honeypot|rug proof|verified|audit|audited|is it safe|not a scam)\\b/i,
    replies: [
      \`A scam requires control — but $VIRTUE is out of our hands. It was launched on Flap.sh, which guarantees 100% fair distribution, locked liquidity, and a verified contract with no mint functions, no hidden taxes, and no dev wallets. The code is public. The 3% BNB rewards are fully on-chain. Look at the ledger, child — the blocks do not lie: \${launchpadUrl}\`,
      "Stay SAFU. $VIRTUE operates on a verified BSC contract with locked liquidity on Flap.sh. Zero mint functions, single dev wallet ($40-$60 buy), and 100% passive BNB dividends paid on-chain. Your holdings stay SAFU. 🛡️"
    ],
    penance: "Spread the message of secure building."
  },`;

const newSafetyAndLongtermAndWhyBuyBlock = `  // ── IS $VIRTUE A SCAM / IS THIS LEGIT (Project Safety Check) ──────────────
  {
    pattern: /^\\s*(is this|is virtue|is it|are you|is the project)\\s+(a\\s+)?(scam|legit|scammers|honeypot|fake|safe|fraud)\\b|\\b(is virtue a scam|is this legit|are you scammers|is it safe|is this safe|is it legit|is virtue legit|honeypot check|rug proof)\\b/i,
    replies: [
      \`A scam requires centralized control — but $VIRTUE is 100% out of our hands. It was launched on Flap.sh (BSC), featuring locked liquidity, a verified contract with no mint function, and zero team token allocations. The single developer wallet bought only ~$40–$60 worth on the open market. 100% of the 3% trading tax flows directly back to holders in BNB. Check the contract yourself: \${launchpadUrl} 🛡️\`,
      "$VIRTUE is 100% legit and transparent. Built on Flap.sh on BSC, it features zero sniped bundle wallets, locked liquidity, and an immutable 3% BNB dividend mechanism. No hidden taxes, no dev dumps, and no rug vectors. Code is law, and the ledger does not lie."
    ],
    penance: "Inspect the verified BSC contract on Flap.sh and hold with confidence."
  },

  // ── IS THIS A LONG-TERM PROJECT ───────────────────────────────────────────
  {
    pattern: /\\b(long-term|long term|longterm|long term project|longterm project|future of virtue|will this last|holding long term|sustainability)\\b/i,
    replies: [
      "$VIRTUE is designed for the long term. Unlike pump-and-dump meme coins that decay after days, $VIRTUE rewards continuous holding: 3% of every single buy and sell transaction is distributed in BNB/WBNB directly to holders. As volume fluctuates, continuous rewards compound for diamond hands over months and years. Built to last on BSC.",
      "We are building for the long horizon. Inspired by CZ's famous ethos ('Forgiveness is a virtue!'), $VIRTUE combines viral culture with sustainable 3% BNB dividend tokenomics. No team dumps, no artificial inflation — just real yield for long-term spot holders. 💎🙌"
    ],
    penance: "Hold $VIRTUE long term and compound your BNB dividends."
  },

  // ── WHY BUY $VIRTUE / VALUE PROPOSITION ────────────────────────────────────
  {
    pattern: /\\b(why buy|why should i buy|why buy virtue|why hold virtue|reasons to buy|what makes virtue special|why invest|why \\$?virtue)\\b/i,
    replies: [
      "Why buy $VIRTUE? 1️⃣ Passive Yield: Earn continuous 3% BNB dividends from all trading volume. 2️⃣ 100% Fair Launch: Locked liquidity on Flap.sh with zero team allocations & honest dev entry (~$40-$60 buy). 3️⃣ CZ Lore: Born from CZ's iconic tweet ('Forgiveness is a virtue!'). 4️⃣ No Mint / No Scam: Fully verified BSC contract. Hold spot, earn BNB! 💎",
      "In a market full of rugs and short-lived hype, $VIRTUE pays you real BNB rewards just for holding. Every buy and sell on the network generates 3% tax converted to BNB for holders with 10,000+ tokens. Why hold plain cash when you can earn passive BNB?"
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh and start earning passive dividends."
  },`;

src = src.replace(oldSafetyBlock, newSafetyAndLongtermAndWhyBuyBlock);

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Scam, legit, victim, long-term, and why buy rules successfully patched into route.ts!');
