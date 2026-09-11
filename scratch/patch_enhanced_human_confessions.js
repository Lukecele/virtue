const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const enhancedHumanRules = `
  // ── MALICIOUS INTENT / WANTING TO SCAM ────────────────────────────────────
  {
    pattern: /\\b(wanna|want to|how to|learn to|teach me to)\\s*(scam|rug|drain|steal|cheat|fake dev)\\b/i,
    replies: [
      "The Forgiveness Booth will never teach deceit. Scamming and rugging destroy communities and poison your own character. True wealth in Web3 is built on integrity, diamond hands, and honest yield like $VIRTUE's 3% BNB dividends. Turn away from the path of scams before it destroys your soul. 🛑",
      "Do not walk down the dark road of scamming. The short-lived ill-gotten gains bring only paranoia and guilt. Build honestly, hold spot $VIRTUE on Flap.sh, and let real 3% BNB distributions compound your wealth with a clean conscience. 🙏"
    ],
    penance: "Renounce all scamming desires and choose the path of honest building."
  },

  // ── THEFT & STOLEN MONEY CONFESSIONS ─────────────────────────────────────
  {
    pattern: /\\b(stole|stolen|robbed|thief|stealing)\\s*(money|funds|crypto|cash|wallet|gold)?\\b|^\\s*(i|we)\\s*(stole|stolen|robbed)\\b/i,
    replies: [
      "Stealing money or taking what belongs to another places a heavy burden on your soul. True absolution requires action: return what you stole where possible, make restitution to the victim, and turn away from dishonest gain forever. Forgiveness begins with honesty. 🙏",
      "Taking another person's property violates the sacred law of trust. Confession is the first step — now take the second: return the stolen funds, seek forgiveness from the victim, and dedicate yourself to earning an honest living."
    ],
    penance: "Return what was stolen, make restitution, and build with honesty."
  },

  // ── PAST HEAVY SINS & DEEP REGRETS ─────────────────────────────────────────
  {
    pattern: /\\b(heavy sin|havy sin|grave sin|deep sin|past sin|great sin|committed a sin|maked a sin|made a sin|major sin)\\b/i,
    replies: [
      "A heavy sin from the past can cast a long shadow, but no shadow is permanent when met with genuine repentance. The past is carved into history — what matters is the virtue of your choices today. Forgive yourself for past stumbles, make amends where you can, and walk forward with integrity. 🙏",
      "Time does not erase a sin, but true remorse and honorable living transform the soul. Whatever heavy burden you carried from the past, let the Forgiveness Booth offer absolution. Learn from your mistakes and build a virtuous future."
    ],
    penance: "Forgive your past sins, make peace with history, and build a virtuous future."
  },

  // ── MARITAL & ROMANTIC BETRAYAL ────────────────────────────────────────────
  {
    pattern: /\\b(betrayed|cheated on|cheated my|unfaithful to)\\s*(my\\s*)?(wife|husband|spouse|partner|girlfriend|boyfriend|family|friend)\\b/i,
    replies: [
      "Betraying a spouse or loved one is one of the deepest heartbreaks a human can cause. The ledger of life cannot undo the breach of trust, but healing starts with raw honesty, genuine remorse, and seeking forgiveness from the one you hurt. Take responsibility, make amends, and choose truth going forward. 🙏",
      "The Forgiveness Booth hears all human heartbreaks — both in crypto and in life. Betrayal causes deep wounds, but genuine repentance, humility, and absolute honesty can begin the slow path toward healing."
    ],
    penance: "Be honest with your partner, seek genuine forgiveness, and rebuild trust step by step."
  },

  // ── TABOO PERSONAL & FAMILY CONFESSIONS ───────────────────────────────────
  {
    pattern: /\\b(fucked|slept with|had sex with)\\s*(my\\s*)?(cousin|relative|sister|brother|aunt|uncle|stepmother|stepfather)\\b|\\b(taboo sin|family betrayal)\\b/i,
    replies: [
      "The Forgiveness Booth hears all human confessions — even those far beyond the blockchain. The ledger of human relationships is complex, fragile, and bound by boundaries. Acknowledge your actions, respect healthy boundaries going forward, and strive to live with honor and self-discipline. 🙏",
      "We all walk complex paths, but true virtue requires self-control and respect for boundaries. Reflect deeply on your choices, make peace with yourself, and commit to walking a path of respect and integrity."
    ],
    penance: "Reflect on your personal actions, respect boundaries, and strive to live honorably."
  },
`;

src = src.replace('  // ── SCAMMER CONFESSION (User confessing past scamming) ──', enhancedHumanRules + '\n  // ── SCAMMER CONFESSION (User confessing past scamming) ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Enhanced human confessions (theft, heavy sins, scams, betrayals, taboos) successfully patched into route.ts!');
