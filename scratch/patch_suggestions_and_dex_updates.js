const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/token/${contractAddress}`;

const newSuggestionsAndDexRules = `
  // ── DEV OPEN TO SUGGESTIONS & COMMUNITY FEEDBACK ON X ──────────────────────
  {
    pattern: /\\b(suggestion|suggestions|feedback|feature request|improve bot|improve priest|ideas for bot|community ideas|dev open|how to suggest|suggest feature)\\b/i,
    replies: [
      "The developer is always open to community suggestions to improve the Forgiveness Booth and the $VIRTUE experience! If you have ideas for new features, dialogue rules, or bot capabilities, post your suggestions on X (Twitter) including our contract address (\`0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777\`) so the community and dev can build together! 🛠️",
      "We believe in community-driven growth! If you have feedback or suggestions to enhance this bot, share them on X with the $VIRTUE contract address. The dev and community review posts to continuously upgrade the experience. 🙏"
    ],
    penance: "Post your bot suggestions on X with $VIRTUE contract address."
  },

  // ── DEX UPDATES & FAST-TRACK LISTINGS (DexScreener, Ave.ai, DEXTools) ─────
  {
    pattern: /\\b(wen dex|when dex|dex paid|pay ave|pay dex|when ave|update dex|dexscreener update|update dexscreener|dexscreener paid|ave paid|ave\\.ai|dextools paid|when dexscreener|update ave)\\b/i,
    replies: [
      "Regarding DexScreener, Ave.ai, and DEX info updates: as $VIRTUE gains momentum and trading volume, the developer and the community will ensure DexScreener and Ave.ai profiles are updated and fast-tracked! Focus on holding spot, spreading the lore, and collecting your 3% BNB dividends as volume grows. 📊",
      "When DEX / Ave update? As volume and community growth build up, the dev or community will handle DexScreener fast-track and Ave.ai updates organic to the project's success. Hold spot $VIRTUE and let the 3% BNB tax build real value!"
    ],
    penance: "Hold spot $VIRTUE and let volume grow organically."
  },
`;

src = src.replace('  // ── HELP & COMMANDS MENU ──', newSuggestionsAndDexRules + '\n  // ── HELP & COMMANDS MENU ──');

fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Community suggestions & DEX fast-track update rules successfully patched into route.ts!');
