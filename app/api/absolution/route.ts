import { NextResponse } from "next/server";

const contractAddress = "0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777";
const launchpadUrl = `https://flap.sh/bnb/${contractAddress}`;
const claimUrl = `https://flap.sh/bnb/${contractAddress}/taxinfo?lang=en`;

// Enhanced Pronoun & Grammar Reflection Map
const reflections: Record<string, string> = {
  "am": "are", "was": "were", "i": "you", "i'd": "you would",
  "i've": "you have", "i'll": "you will", "my": "your",
  "are": "am", "you've": "I have", "you'll": "I will",
  "your": "my", "yours": "mine", "you": "me", "me": "you",
  "myself": "yourself", "yourself": "myself", "we": "you",
  "our": "your", "ours": "yours", "us": "you"
};

function reflect(text: string): string {
  if (!text) return "that trade";
  // Clean trailing punctuation and leading fillers
  let cleaned = text.trim()
    .replace(/[?.!;,]+$/g, "")
    .replace(/^(that|because|and|so|that i|to|when i|after i)\s+/i, "");

  const words = cleaned.split(/\b/).map(word => {
    const lower = word.toLowerCase();
    return reflections[lower] !== undefined ? reflections[lower] : word;
  }).join("");

  const finalStr = words.trim();
  return finalStr.length > 0 ? finalStr : "that position";
}

function getLanguageWarning(cleanText: string): { reply: string; penance: string } | null {
  if (/[\u4e00-\u9fa5]/.test(cleanText)) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / 我只能用英语（区块链的通用语言）进行交流。旅行者，请用英语进行忏悔。", penance: "" };
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(cleanText)) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / 私はブロックチェーンの共通言語である英語でのみお答えします。旅人よ、あなたの告白を英語に翻訳してください。", penance: "" };
  if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(cleanText)) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / 나는 블록체인의 공용어인 영어로만 소통합니다. 여행자여, 당신의 고백을 영어로 번역해 주세요.", penance: "" };
  if (/[\u0400-\u04FF]/.test(cleanText)) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Я общаюсь только на английском, универсальном языке блокчейна. Пожалуйста, переведите свою исповедь на английский, путешественник.", penance: "" };
  if (/[\u0600-\u06FF]/.test(cleanText)) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / أنا أتواصل باللغة الإنجليزية فقط، وهي اللغة العالمية للبلوكشين. يرجى ترجمة اعترافك إلى اللغة الإنجليزية، أيها المسافر.", penance: "" };

  const trWords = ["merhaba","nasil","nasıl","satin","alirim","kimsin","proje","kontrat","adres","vergi","temettu","gunah","sattim","kaybettim","kaldirac","tasfiye","rahip","nerede","tesekkur","teşekkür"];
  if (trWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(cleanText))) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Ben sadece blok zincirinin evrensel dili olan İngilizce olarak iletişim kuruyorum. Lütfen günah çıkartma metninizi İngilizceye çevirin, gezgin.", penance: "" };

  const ptWords = ["quem","projeto","porque","contrato","endereco","imposto","dividendos","reflexoes","pecado","vendido","perdido","sacerdote","onde","meu","tua","teu","obrigado"];
  if (ptWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(cleanText))) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Eu só me comunico em inglês, a língua universal da blockchain. Por favor, traduza a sua confissão para inglês, viajante.", penance: "" };

  const deWords = ["hallo","kaufen","wer","bist","vertrag","adresse","dividenden","reflexionen","steuer","verkauft","verloren","geld","hebel","liquidiert","priester","danke"];
  if (deWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(cleanText))) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Ich kommuniziere nur auf Englisch, der universellen Sprache der Blockchain. Bitte übersetze deine Beichte ins Englische, Reisender.", penance: "" };

  const itWords = ["ciao","salve","buongiorno","buonasera","comprare","compra","chi","sei","cosa","progetto","perche","perché","contratto","indirizzo","tassa","dividendi","riflessioni","peccato","venduto","panico","perso","soldi","liquidato","prete","sacerdote","dove","miei","mio","tuoi","mia","questo","consigli","grazie"];
  if (itWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(cleanText))) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Comunico solo in inglese, la lingua universale della blockchain. Per favore, traduci la tua confessione in inglese, viaggiatore.", penance: "" };

  const esWords = ["hola","comprar","quien","eres","proyecto","porque","contrato","direccion","impuesto","dividendos","reflexoes","pecado","vendido","perdido","sacerdote","donde","mis","tuyo","tuya","consejos","gracias"];
  if (esWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(cleanText))) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Solo me comunico en inglés, la lengua universal de la blockchain. Por favor, traduce tu confesión al inglés, viajero.", penance: "" };

  const frWords = ["bonjour","salut","acheter","pourquoi","contrat","adresse","taxe","dividendes","reflexions","vendu","panique","perdu","argent","pretre","conseils","merci","combien","coute","comment"];
  if (frWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(cleanText))) return { reply: "I only commune in English, the universal tongue of the blockchain. Please translate your confession to English, traveler. / Je ne communique qu'en anglais, la langue universelle de la blockchain. Veuillez traduire votre confession en anglais, voyageur.", penance: "" };

  return null;
}

interface ElizaRule {
  pattern: RegExp;
  replies: string[];
  penance?: string;
}

const elizaRules: ElizaRule[] = [

  
  // ── PROFANITY FILTER (checked before everything else) ─────────────────────
  {
    pattern: /\b(fuck|shit|bitch|bastard|cunt|asshole|motherfuck|wtf|stfu|kys|faggot|retard|idiot|moron|stupid bot|dumb bot|piece of shit|bullshit|horseshit|prick|dickhead|dickface|ass|crap|piss)\b/i,
    replies: [
      "The Forgiveness Booth is a sacred space, traveler. I ask that you keep your language respectful. The blocks record everything — choose your words with virtue. 🙏",
      "Strong words, but this is a confession booth, not a battlefield. Speak your crypto sins with dignity and I shall absolve them. The Priest does not judge — but he does ask for civility. 🙏",
      "I understand the market's frustration tests everyone's patience. But let us channel that energy into something constructive. What is weighing on your portfolio today?"
    ]
  },


  // ── DEV OPEN TO SUGGESTIONS & COMMUNITY FEEDBACK ON X ──────────────────────
  {
    pattern: /\b(improve|suggestion|suggestions|feedback|feature request|improve bot|improve priest|improve model|model improvement|ideas for bot|community ideas|dev open|how to suggest|suggest feature)\b/i,
    replies: [
      "The developer is always open to community suggestions to improve the Forgiveness Booth and the $VIRTUE AI model! 💡 Click the '💡 Improve Model' button in the chat header (or post on X with contract `0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777`) to submit your ideas and help evolve the oracle! 🛠️",
      "We believe in community-driven growth! If you have feedback or suggestions to enhance this bot, click the '💡 Improve Model' button right above the chat window to open a pre-filled tweet template with our CA. The dev and community review posts to continuously upgrade the experience. 🙏"
    ],
    penance: "Post your bot suggestions on X using the Improve Model button."
  },

  // ── DEX UPDATES & FAST-TRACK LISTINGS (DexScreener, Ave.ai, DEXTools) ─────
  {
    pattern: /\b(dex|dexscreener|ave|ave\.ai|dextools|gecko|wen dex|when dex|dex paid|pay ave|pay dex|when ave|update dex|dexscreener update|update dexscreener|dexscreener paid|ave paid|dextools paid|when dexscreener|update ave)\b/i,
    replies: [
      "Regarding DexScreener, Ave.ai, and DEX info updates: as $VIRTUE gains momentum and trading volume, the developer and the community will ensure DexScreener and Ave.ai profiles are updated and fast-tracked! Focus on holding spot, spreading the lore, and collecting your 3% BNB reflections as volume grows. 📊",
      "When DEX / Ave update? As volume and community growth build up, the dev or community will handle DexScreener fast-track and Ave.ai updates organic to the project's success. Hold spot $VIRTUE and let the 3% BNB tax build real value!"
    ],
    penance: "Hold spot $VIRTUE and let volume grow organically."
  },

  // ── HELP & COMMANDS MENU ──────────────────────────────────────────────────
  {
    pattern: /^\s*(\/help|help|\/commands|commands|\/menu|menu|options|\/start|start|what can you do|how to use|capabilities)\s*[!.?]*\s*$/i,
    replies: [
      `📜 HIGH PRIEST OF VIRTUE — ORACLE CAPABILITIES MENU 📜\n\n` +
      `1️⃣ CONFESS SINS: Type trading regrets ("I panic sold", "liquidated on 50x", "rugged") for divine absolution & penance.\n\n` +
      `2️⃣ STEP-BY-STEP BUYING GUIDE: Ask "how to buy" or "buying guide" for complete Web3 wallet setup & DEX swapping on Flap.sh.\n\n` +
      `3️⃣ TOKENOMICS & REFLECTIONS: Ask about "reflections", "min holding" (10k tokens), "tax" (3% BNB), "supply" (1B fixed), or "claim rewards".\n\n` +
      `4️⃣ CONTRACT & SAFETY AUDIT: Ask for "ca", "dev wallet" ($40–$60 buy), "proxy contract", "bonding curve", "lp burn", or "bundle / multiwallet" checks.\n\n` +
      `5️⃣ LIVE MARKET FEED: Ask for live crypto quotes ("btc price", "bnb price", "sol price") powered by live Binance API.\n\n` +
      `6️⃣ LIVE LINK & TWEET INSPECTION: Paste any X/Twitter URL or web link directly into the chat for real-time analysis.\n\n` +
      `7️⃣ CZ LORE & PHILOSOPHY: Type "4", "cz tweet", "safu", "buidl", or ask about "shitcoin vs utility".\n\n` +
      `8️⃣ CALCULATOR & MODEL IMPROVEMENT: Use the Reflection Calculator (/#calculator) or click "💡 Improve Model" to post suggestions on X!\n\n` +
      `What would you like to explore today, traveler? 🙏`
    ],
    penance: "Explore the features and hold spot $VIRTUE."
  },





  // ── CORE DOMAIN HIGH-PRIORITY KEYWORD WATERFALL ──────────────────────────
  // 11. TOTAL LOSS & TYPO CONFESSIONS ("i losed all", "i lost everything")
  {
    pattern: /\b(i lost all|i losed all|lost all my|lost everything|losed everything|lost it all|losed all|i lost my money|i losed my money|lost all|losed all|lost my savings|losed my savings|losed|loosed|losted)\b/i,
    replies: [
      "Losing everything in crypto is a crushing weight, traveler. Whether to leverage, rugs, or market volatility, the High Priest offers absolution. $VIRTUE was created to break the cycle of predatory trading — no leverage, no dev dumps, just 3% BNB reflections paid directly to holders from all volume. Take a breath, forgive your past trades, and let spot holdings rebuild your peace. 🙏",
      "You mentioned having lost in your trading journey. Speak freely, traveler — what exact trade or token caused this? The High Priest is here to offer absolution and guide you back to $VIRTUE's 3% BNB reflections. 🙏"
    ],
    penance: "Forgive your past losses and focus on spot holding."
  },


  // 1. LIQUIDITY / LP / LOCKED LIQUIDITY / BONDING CURVE / LP BURN
  {
    pattern: /\b(liquidity|lp|liquidity locked|locked liquidity|lp locked|locked lp|liquidity lock|lock liquidity|lp lock|lock lp|is liquidity locked|is lp locked|is lp safe|lock duration|lp burn|burned lp|burnt lp|bonding curve|bondingcurve|how bonding curve works|flap bonding|bonding pool|curve target)\b/i,
    replies: [
      `The liquidity for $VIRTUE is 100% locked on Flap.sh — this prevents team drains or rug pulls. 100% of initial LP was locked permanently at fair launch on BSC. You can inspect the live pool and lock details directly on Flap.sh: ${launchpadUrl} 🔒`,
      "The $VIRTUE liquidity pool is permanently locked on Flap.sh. No developer or insider can remove or drain liquidity. The trading pool is safe, public, and fully immutable.",
      "How Flap.sh bonding curve & liquidity work: $VIRTUE launched on Flap.sh's fair bonding curve system! As trading volume builds on the curve, liquidity accumulates automatically. Upon reaching the curve target, liquidity is seeded to the DEX and LP tokens are permanently burned/locked on-chain, guaranteeing 0% rug risk. 📈🔥"
    ],
    penance: "Verify the locked liquidity status on Flap.sh."
  },

  // 2. CLAIM / WITHDRAW / PAYOUT REWARDS / FREQUENCY
  {
    pattern: /\b(claim|how to claim|claim bnb|withdraw|withdraw bnb|withdraw dividend|withdraw reflection|where claim|how to withdraw|withdrawing rewards|claim portal|how frequently|how frequent|how often|when paid|reward frequency|dividend frequency|reflection frequency)\b/i,
    replies: [
      `To claim or withdraw your BNB rewards: automatic distribution fires when your accumulated yield reaches $4. Below $4, you can claim manually anytime on the official Flap.sh Tax Info page: ${claimUrl}. Auto payouts send WBNB, while manual claims allow choosing between WBNB and BNB. 💰`,
      `BNB rewards accumulate continuously on every single trade — no weekly or monthly schedule. Automatic payouts trigger at $4+, or claim manually below $4 on Flap.sh. Minimum holding threshold: 10,000 $VIRTUE.`
    ],
    penance: "Check your accumulated BNB rewards on Flap."
  },

  // 3. MINIMUM HOLDING FOR REFLECTIONS
  {
    pattern: /\b(minimum tokens|minimum holding|min invest|how many tokens to get dividends|how many tokens to get reflections|min holding for rewards|10k tokens|10000 virtue|min tokens|least amount to hold|minimum amount|min holding|minimum.*hold|min.*token|min.*tokens)\b/i,
    replies: [
      "To qualify for continuous BNB reflections, you must hold at least 10,000 $VIRTUE tokens (0.001% of supply). Holders with 10k+ $VIRTUE earn 3% fee reflections from every trade. Rewards auto-distribute in WBNB at the $4 threshold, while manual claims on Flap Tax Info page let you choose between WBNB and BNB.",
      "The minimum holding requirement for reflection eligibility is 10,000 $VIRTUE tokens. Holding 10k+ tokens grants you access to the 3% tax pool. Automatic payouts send WBNB directly to your wallet ($4+ threshold), while manual claims on Flap allow choosing WBNB or BNB."
    ],
    penance: "Acquire at least 10,000 $VIRTUE to enter the reflection pool."
  },

  // 4. SLIPPAGE & GAS FEES
  {
    pattern: /\b(slippage|what slippage|slippage setting|high slippage|gas|gas fee|bsc gas|how much gas|tx fee|transaction fee)\b/i,
    replies: [
      "Set slippage to at least 5% when swapping $VIRTUE on Flap.sh to accommodate the 3% tax mechanism. Gas fees on BSC are minimal — usually $0.10 to $0.50 per swap in BNB. Keep a tiny reserve of BNB in your wallet for gas.",
      "Recommended slippage: 5% (matches the 3% trading tax + network buffer). BSC gas fees are very low ($0.10–$0.30 per transaction). Ensure you have a small BNB balance beyond your swap amount for gas."
    ],
    penance: "Set 5% slippage on Flap.sh and keep a small BNB gas reserve."
  },

  // 5. BUYING / SWAPPING / STEP-BY-STEP DEX ONBOARDING
  {
    pattern: /\b(how to buy|where to buy|how do i buy|buy virtue|how swap|where buy virtue|how to swap bnb for virtue|buy|swap|purchase|buying guide|can i buy on pancake|where can i get virtue|how to purchase|where to get|step by step buy|how to start|new to crypto buy|wallet setup|how to connect wallet)\b/i,
    replies: [
      `🛒 COMPLETE STEP-BY-STEP BUYING GUIDE FOR $VIRTUE:\n\n` +
      `🔹 STEP 1 — INSTALL A DECENTRALIZED WEB3 WALLET:\nDownload MetaMask or Trust Wallet (iOS/Android/Chrome). Create a wallet and securely save your 12-word seed phrase.\n\n` +
      `🔹 STEP 2 — FUND WALLET WITH BNB:\nAcquire BNB on Binance or any CEX and withdraw it to your wallet address via BNB Smart Chain (BEP-20).\n\n` +
      `🔹 STEP 3 — CONNECT TO FLAP.SH:\nOpen the dApp browser in your wallet or visit ${launchpadUrl} and click 'Connect Wallet'.\n\n` +
      `🔹 STEP 4 — SET 5% SLIPPAGE & SWAP:\nEnter your BNB amount, set slippage to 5% (covers the 3% tax + network gas buffer), and swap BNB for $VIRTUE.\n\n` +
      `🔹 STEP 5 — HOLD 10,000+ $VIRTUE & EARN BNB REFLECTIONS:\nHold at least 10,000 $VIRTUE tokens! 3% BNB reflections from every trade are distributed directly to your wallet automatically ($4+ threshold) or claimable manually anytime on Flap.sh! 💎⚡`,

      `Simple DEX Buy Guide:\n1️⃣ Install MetaMask or Trust Wallet & load BNB (BEP-20).\n2️⃣ Visit ${launchpadUrl} and connect your wallet.\n3️⃣ Swap BNB for $VIRTUE with 5% slippage.\n4️⃣ Hold 10k+ $VIRTUE to collect continuous 3% BNB reflections!`
    ],
    penance: "Follow the 5-step buying guide on Flap.sh."
  },

  // 6. SELLING / EXIT POSITION
  {
    pattern: /\b(where to sell|how to sell|how do i sell|can i sell|exit position|where can i sell virtue|sell virtue|sell)\b/i,
    replies: [
      `You can sell $VIRTUE on Flap.sh (${launchpadUrl}) by swapping back to BNB with 5% slippage. Note: a 3% sell tax is collected and distributed to remaining holders — so your sell rewards the diamond hands! 🔄`,
      "To exit or sell, swap $VIRTUE back to BNB on Flap.sh. Every sell generates 3% BNB tax that flows directly to remaining holders."
    ],
    penance: "Consider holding longer to collect continuous BNB reflections."
  },

  // 7. TECH HELP / WALLET IMPORT / CUSTOM TOKEN
  {
    pattern: /\b(how to add virtue to metamask|import token|custom token|not showing in wallet|multiple wallets|can i use two wallets|reset nonce|tx stuck|tx failed|my transaction is stuck)\b/i,
    replies: [
      `To add $VIRTUE to MetaMask: 1) Open MetaMask and go to 'Import Tokens'. 2) Paste the contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. 3) Symbol ($VIRTUE) auto-fills. 4) Click 'Add Custom Token'. Your balance appears immediately. For stuck TXs: increase gas or use MetaMask 'Reset Account'.`,
      `In Trust Wallet: tap settings → 'Manage Crypto' → paste CA: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. For multiple wallets: each wallet holding $VIRTUE independently earns its own 3% BNB reflections.`
    ],
    penance: "Import the contract address into your wallet."
  },

  // 12. CONFESSION: PAST VICTIM OF SCAMMERS ("cause of scammers", "scammers took my money")
  {
    pattern: /\b((cause|because|due to|by|from)\s+(of\s+)?scammers?|scammers?\s+(took|stole|drained|ruined|got me)|(got|was|been)\s+scammed|lost.*scammers?|scammed by|scammers?|scammer took|scammer stole|fake dev scam)\b/i,
    replies: [
      "Falling victim to malicious scammers or rug pulls is a deep wound in Web3. The High Priest hears your pain and offers absolution. $VIRTUE was built precisely as a sanctuary from predatory scammers: 100% locked liquidity on Flap.sh, no dev minting, zero insider pre-allocations, and continuous 3% BNB reflections paid directly to honest spot holders. May your wallet recover in peace. 🙏",
      "Scammers and fake developers are the plague of crypto. If you lost your funds to bad actors in past trades, know that you are welcomed in the Forgiveness Booth. Here on $VIRTUE, code is law: no dev dumps, no hidden team tax, just immutable 3% BNB rewards flowing to holders. Forgive the past and rebuild with verified spot holdings."
    ],
    penance: "Inspect verified contracts on BscScan and avoid unverified links."
  },

  // 8. RUGPROOF / RUG CHECK / SAFETY / AUDIT
  {
    pattern: /\b(is it rugproof|rug check|is it rugging|audit|honeypot|is it a scam|is it legit|is it safe|rugpull|rug pull)\b/i,
    replies: [
      `$VIRTUE is 100% legit and transparent. Built on Flap.sh on BSC: 100% locked liquidity, verified contract with no mint function, zero team allocations, and single dev wallet (~$40–$60 buy). 100% of 3% tax is distributed to holders as BNB. Contract: ${contractAddress} 🛡️`,
      "No scam, no honeypot, no dev drainers. The contract is immutable, liquidity is locked on Flap.sh, and 3% BNB reflections flow automatically on every trade."
    ],
    penance: "Inspect the contract on BscScan and trade with confidence."
  },

  // 9. IDENTITY / AI TECH / WHO MADE YOU
  {
    pattern: /\b(are you an ai|are you ai|what are you|who made you|who built you|who created you|who coded you|who is behind bot)\b/i,
    replies: [
      "I am the High Priest of Virtue — a confessional oracle built by anonymous, reformed builders on BNB Smart Chain. My logic runs on custom pattern-matching rules and fuzzy sentiment scorers designed to offer absolution, tokenomics guidance, and live market intelligence for $VIRTUE. 🙏",
      "I am a specialized AI confessional oracle dedicated to $VIRTUE. I was created by the anonymous community developers to serve the Forgiveness Booth, absolve paper-hand sins, and explain the on-chain BNB reflection mechanics."
    ],
    penance: "Explore the Forgiveness Booth and hold spot $VIRTUE."
  },

  // 10. EMOTIONAL STATES / ANXIETY / DEPRESSION
  {
    pattern: /\b(i'm anxious|im anxious|anxious about|depressed about crypto|depressed in crypto|crypto depression|feel anxious|anxiety|feeling down)\b/i,
    replies: [
      "Fear and anxiety are normal in volatile crypto markets. The Priest does not dismiss your emotion — but look at the foundation beneath $VIRTUE: 100% locked liquidity, continuous 3% BNB reflections, immutable contract. Focus on real yield, breathe, and let the diamond hands hold. 🙏",
      "The market tests everyone's nerves. Remember why $VIRTUE was created: CZ's message of resilience and forgiveness. Do not let short-term chart noise ruin your peace of mind. Hold spot and stay SAFU."
    ],
    penance: "Step away from the chart for an hour and let BNB reflections accumulate."
  },


  // 5. PROXY CONTRACT EXPLANATION (Flap.sh Tax & Reflection Infrastructure)
  {
    pattern: /\b(proxy|proxy contract|why proxy|is proxy safe|proxy warning|proxy scanner|upgradable|upgradeable|proxy tax|flap proxy|why is it a proxy)\b/i,
    replies: [
      "Why does DexScreener or BscScan flag a Proxy Contract? On Flap.sh, $VIRTUE uses Flap's standardized launchpad proxy architecture specifically to handle the automated 3% tax collection and continuous BNB reflection distribution on-chain. This proxy is NOT a dev backdoor — it is Flap's verified, audited infrastructure that guarantees 100% tax routing to holders. 100% safe and verified on Flap.sh! 🛡️",
      "Proxy contract explained: Flap.sh utilizes a proxy model to implement the tax & reflection mechanics natively on BSC. The proxy parameters are locked into Flap's launchpad protocol, ensuring 100% of the 3% tax is converted to BNB and distributed to holders without any developer intervention or admin privilege to drain funds. Fully safe and transparent on Flap.sh. 🔒"
    ],
    penance: "Inspect the verified Flap.sh tax info page."
  },

  // 6. BONDING CURVE & FLAP MECHANICS & LP BURN
  {
    pattern: /\b(bonding curve|bondingcurve|how flap works|flap mechanics|bonding pool|curve target|lp burn|burned lp|burnt lp|curve migration|flap bonding|how does bonding curve work)\b/i,
    replies: [
      "How Flap.sh bonding curve & liquidity work: $VIRTUE launched on Flap.sh's fair bonding curve system! As trading volume builds on the curve, liquidity accumulates automatically. Upon reaching the curve target, liquidity is seeded to the DEX and LP tokens are permanently burned/locked on-chain, guaranteeing 0% rug risk and 100% safe trading for all holders. 📈🔥",
      "Flap.sh bonding curve mechanics: 1) Fair launch open to everyone simultaneously from block zero. 2) Bonding curve accumulates organic liquidity from trades. 3) LP tokens are automatically burned/locked, ensuring no one (including devs) can ever remove liquidity. 4) 3% BNB reflections flow continuously throughout! 💎"
    ],
    penance: "Verify the bonding curve liquidity lock on Flap.sh."
  },


  // 4. SHITCOIN / MEMECOIN / UTILITY TOKEN DISAMBIGUATION
  {
    pattern: /\b(shitcoin|memecoin|shit coin|meme coin|utility token|is this a shitcoin|is virtue a shitcoin|are you a shitcoin|is it a shitcoin|is this a memecoin|are you a memecoin|is virtue a memecoin|memecoin or utility|shitcoin or utility|just a meme|just a memecoin|just a shitcoin|shitcoin or not|memecoin or not)\b/i,
    replies: [
      "$VIRTUE is a meme token with real on-chain utility! Unlike traditional zero-utility 'shitcoins' that rely purely on hype and rug potential, $VIRTUE rewards holders with continuous 3% BNB reflections from every trade. It combines the viral lore of CZ's tweet ('Forgiveness is a virtue!') with real, verifiable passive yield. Not a zero-value shitcoin — a meme token with an automated income engine! 💎⚡",
      "Is $VIRTUE a shitcoin or a utility token? It is the evolution of both! It carries the viral culture of a meme token inspired by CZ's famous tweet, but acts as a real utility asset by distributing 3% BNB reflections directly to your wallet from all network volume. Locked liquidity, zero minting, no team bags — real yield, not empty promises. 🛡️",
      "Call it a meme token with real yield! Many call all new tokens 'shitcoins' until they inspect the contract: $VIRTUE has 100% locked liquidity on Flap.sh, no dev pre-allocations, and pays holders 3% BNB automatically on every trade. A meme with a real financial engine behind it."
    ],
    penance: "Inspect the contract on BscScan and verify the 3% BNB reflection mechanism."
  },


  // 1. LIQUIDITY / LP / LOCKED LIQUIDITY
  {
    pattern: /\b(liquidity|lp|liquidity locked|locked liquidity|lp locked|locked lp|liquidity lock|lock liquidity|lp lock|lock lp|is liquidity locked|is lp locked)\b/i,
    replies: [
      `The liquidity for $VIRTUE is 100% locked on Flap.sh — this prevents team drains or rug pulls. 100% of initial LP was locked permanently at fair launch on BSC. You can inspect the live pool and lock details directly on Flap.sh: ${launchpadUrl} 🔒`,
      "The $VIRTUE liquidity pool is permanently locked on Flap.sh. No developer or insider can remove or drain liquidity. The trading pool is safe, public, and fully immutable."
    ],
    penance: "Verify the locked liquidity status on Flap.sh."
  },

  // 2. SUPPLY / TOTAL SUPPLY / MAX SUPPLY
  {
    pattern: /\b(supply|total supply|max supply|circulating supply|token supply|how many tokens|how many supply|is there inflation|inflation)\b/i,
    replies: [
      `$VIRTUE has a fixed total supply of 1,000,000,000 tokens (1 Billion). 100% circulating from day zero on Flap.sh, with zero team allocations, zero locked dev bags, and no mint function. Fixed forever. 📊`,
      "Total supply is 1 Billion $VIRTUE (1,000,000,000). All tokens are in circulation with locked liquidity. There is no mint function and no inflation."
    ],
    penance: "Calculate your supply share using the homepage calculator."
  },

  // 3. TAX / FEES / BUY TAX / SELL TAX
  {
    pattern: /\b(tax|taxes|buy tax|sell tax|transfer tax|tax rate|how much tax|3% tax|tax %)\b/i,
    replies: [
      "$VIRTUE features a clean 3% buy tax and 3% sell tax. 100% of all taxes collected are converted to BNB and distributed directly to holders with at least 10,000 tokens. Zero dev tax, zero marketing cut, zero treasury fee. Pure passive yield. 💰",
      "The tax is 3% on buys and 3% on sells. 100% of the tax goes to BNB reflections for holders. There are no hidden fees or team cuts."
    ],
    penance: "Collect your share of the 3% BNB tax pool."
  },

  // ── EARLY SELLER REGRET & MISSED 100X GAINS ────────────────────────────────
  {
    pattern: /\b(sold early|sold btc|sold eth|sold before|could have been rich|missed the 100x|missed 1000x|sold at cheap|sold at 10|sold at 100|paper handed early)\b/i,
    replies: [
      "Selling early is the classic regret of every crypto builder. You sold before the 100x because risk management or fear took over — and that is human. Do not torture yourself over past charts you cannot change. Accumulate spot $VIRTUE on Flap.sh, collect continuous 3% BNB reflections on every trade, and let your diamond hands write the next chapter. 💎🙌",
      "Almost every veteran in crypto has a story of selling BTC, ETH, or a gem too early. The pain of what could have been is real, but dwelling on past charts changes nothing. Focus on real yield today: holding spot $VIRTUE pays you passive BNB continuously!"
    ],
    penance: "Forgive your early sale, hold spot $VIRTUE, and let BNB reflections accrue."
  },

  // ── FAMOUS CRYPTO CRASHES (FTX, LUNA, CELSIUS, MT GOX) ────────────────────
  {
    pattern: /\b(ftx|luna|terra|celsius|voyager|blockfi|mt gox|bitconnect|sam bankman|sbf|do kwon)\b/i,
    replies: [
      `The collapses of FTX, Luna, and centralized lending platforms left deep scars across Web3. Centralized actors betrayed trust — but $VIRTUE is 100% decentralized on BNB Smart Chain. No centralized lending, no lockups, no dev drainers. Locked liquidity on Flap.sh (${launchpadUrl}), verified code, and passive 3% BNB rewards paid straight to your wallet. 🛡️`
    ],
    penance: "Keep your funds on non-custodial wallets and hold spot $VIRTUE."
  },

  // ── CHART ADDICTION & INSOMNIA ─────────────────────────────────────────────
  {
    pattern: /\b(can't sleep|insomnia|staring at charts|watching candles|addicted to charts|checking price every|screen time|obsessed with price)\b/i,
    replies: [
      "Staring at 1-minute candles until 4 AM destroys your health and clear thinking. $VIRTUE was built for peaceful holding: 3% BNB tax is auto-distributed on-chain directly to your wallet. Close the charts, get a good night's sleep, and wake up to passive BNB yield in your portfolio! 🌙💤"
    ],
    penance: "Turn off the charts for 8 hours and get restful sleep."
  },

  // ── FAMILY & SOCIAL DISAPPROVAL ───────────────────────────────────────────
  {
    pattern: /\b(family thinks|wife left|girlfriend left|friends think i'm crazy|hiding my losses|hiding losses|family disapproval|nobody believes in me|family calls me crazy)\b/i,
    replies: [
      "Walking the crypto path often means facing skepticism from family and friends who don't understand the vision. Hiding losses creates anxiety, but honesty brings peace. Manage your risk responsibly, never invest money needed for living expenses, and let your patient spot holding prove your resilience over time. 🙏"
    ],
    penance: "Practice honest communication and responsible risk management."
  },

  // ── SHITCOIN & MEMECOIN TOP BUYING ─────────────────────────────────────────
  {
    pattern: /\b(chased pump|bought top|bought the top|sold bottom|sold the bottom|ape in|aped in|fomoed into|bought peak)\b/i,
    replies: [
      "Aping into green candles at the top tick and panic selling the bottom tick is the hardest lesson in market psychology. Stop chasing unverified hype coins! $VIRTUE pairs meme culture with real yield: 3% BNB reflections paid continuously on BSC. Hold spot, stop chasing pumps, and accumulate passive BNB."
    ],
    penance: "Stop chasing green candles and hold spot $VIRTUE."
  },

  // ── GENERATIONAL WEALTH LOSS / WIPED OUT SAVINGS ──────────────────────────
  {
    pattern: /\b(lost my savings|wiped out my savings|lost generational wealth|lost everything in crypto|life savings gone|ruined my portfolio)\b/i,
    replies: [
      "Losing life savings or major portfolio value in crypto is a soul-crushing experience. The High Priest hears your pain and offers absolution. The ledger of life is longer than any bear market. Take a deep breath, rebuild slowly with responsible spot holding, never trade on leverage, and focus on steady passive BNB rewards."
    ],
    penance: "Forgive your past losses, rebuild responsibly, and hold spot."
  },


  // ── GENERAL BOT IDENTITY & ORIGIN QUESTIONS ──────────────────────────────
  {
    pattern: /\b(where are you from|where do you live|what is your origin|where do you come from|who created you|where are you located|where is your home)\b/i,
    replies: [
      "I am the High Priest of Virtue, born from the immutable blocks of the BNB Smart Chain and inspired by CZ's famous words: 'Forgiveness is a virtue!'. My home is the Forgiveness Booth, right here on the blockchain.",
      "I come from the decentralized realm of BNB Chain! Part confessional oracle, part market guide, built to absolve paper-hand regrets and remind holders of $VIRTUE's 3% BNB reflections. 🙏"
    ],
    penance: "Explore the Forgiveness Booth and hold spot $VIRTUE."
  },

  {
    pattern: /\b(what is your name|who are you called|what should i call you|what's your name|tell me your name|name of the bot|name of priest)\b/i,
    replies: [
      "I am the High Priest of Virtue — spiritual guardian of this booth and keeper of the $VIRTUE ledger on BSC. You may call me High Priest or Priest.",
      "I am the High Priest of Virtue! Oracle of lore, confessor of trading sins, and your guide to continuous 3% BNB reflections on Flap.sh."
    ],
    penance: "Address the High Priest with your trading confession."
  },

  {
    pattern: /\b(how old are you|what is your age|when were you born|when were you created|how long have you been here|how long do you exist)\b/i,
    replies: [
      "I was born alongside $VIRTUE's fair launch on August 10, 2026, carrying forward CZ's timeless wisdom from September 23, 2025. In block time, I am both young and eternal!",
      "I exist outside human age — created with $VIRTUE's genesis on BNB Smart Chain. As long as blocks are minted on BSC, the High Priest is here to absolve your sins."
    ]
  },

  // ── DEFI DEEP TRUTH: 99.9% BSC LAUNCHES ARE SCAMS / RUGS ─────────────────
  {
    pattern: /\b(99% scam|99% rugs|bsc is full of scams|bsc scams|shitcoin scams|new launches are scams|memecoin scams|most tokens are rugs|why is crypto full of scams|why so many scams|all new tokens rug|99\.9%|cabal|bundling)\b/i,
    replies: [
      "You speak absolute truth, traveler: 99.9% of new meme token launches on BSC and Solana are cabal-driven scams, rug pulls, or bundled dev traps. That is precisely why $VIRTUE was created with absolute transparency: 100% fair launch on Flap.sh, locked liquidity, zero team pre-allocations, single dev wallet with a tiny ~$40–$60 buy, and hardcoded 3% BNB reflections! 🛡️",
      "DeFi is a jungle where 99% of hype tokens are created to drain liquidity. $VIRTUE stands as an oasis of virtue: contract immutable, liquidity locked on Flap.sh, no mint functions, and 100% of the 3% trading tax redistributed back to holders in BNB. Real yield over fake promises."
    ],
    penance: "Avoid unverified cabal tokens and hold spot $VIRTUE safely."
  },

  // ── GAMBLING ADDICTION & CASINO CONFESSIONS ──────────────────────────────
  {
    pattern: /\b(ludopatic|ludopathy|gambler|gambling|casino|lost all in casino|gambled|roulette|slots|blackjack|poker|betting|lost my savings in casino|chased losses)\b/i,
    replies: [
      "Gambling and casino games prey on impulse and ruin lives. In crypto as in life, chasing instant jackpots leads to empty hands. True financial freedom is built on patience, spot holding, and real yield like $VIRTUE's 3% BNB distributions. Step away from the casino, seek support if needed, and choose the path of disciplined holding. 🙏",
      "Chasing casino games or gambling apps is a dangerous cycle. The house always wins — except when you hold spot $VIRTUE, where every trade across the network pays 3% BNB reflections back to your wallet. Forgive your casino losses, close the betting apps, and build with spot holding."
    ],
    penance: "Step away from gambling, forgive past losses, and practice disciplined spot holding."
  },

  // ── SUBSTANCE DEPENDENCY & DRUG ADDICTION ─────────────────────────────────
  {
    pattern: /\b(drug dipendedent|drug dependent|drug addiction|drug addict|addict|substance abuse|hooked on drugs|addicted to drugs|substance dependence|struggling with addiction)\b/i,
    replies: [
      "Addiction is a heavy battle that tests the human spirit to its core. Acknowledging your struggle is the first step toward reclaiming your life. Surround yourself with supportive people, seek professional guidance, and remember that healing takes place one day — and one block — at a time. The High Priest honors your honesty. 🙏",
      "The Forgiveness Booth holds space for your healing. Overcoming substance dependence takes immense courage. Be gentle with yourself, seek medical or professional help, and take life one step at a time."
    ],
    penance: "Take one healthy step today, seek positive support, and honor your wellbeing."
  },

  // ── TOXIC BEHAVIOR & TOXICITY ──────────────────────────────────────────────
  {
    pattern: /\b(tossic|toxic|toxic person|toxic behavior|toxic relationship|poisonous person|i'm toxic|i am toxic|being toxic)\b/i,
    replies: [
      "Recognizing toxic behavior in yourself or your surroundings takes genuine self-awareness. Anger, toxicity, and hostility drain your peace just as FUD drains a portfolio. Choose forgiveness over bitterness, practice empathy, and build healthier connections with those around you. 🙏",
      "Toxicity comes from unhealed wounds. Choosing virtue means replacing toxicity with patience, understanding, and forgiveness — for yourself and others."
    ],
    penance: "Choose kindness over anger and build positive relationships."
  },

  // ── DISHONESTY & LYING CONFESSIONS ────────────────────────────────────────
  {
    pattern: /\b(tell lies|always lie|always tell lies|lied to|liar|compulsive liar|deceiving people|lying to my)\b/i,
    replies: [
      "Lies erode the foundation of trust — both in human relationships and on the immutable ledger of life. Truth can be uncomfortable, but living with honesty liberates the soul from paranoia and shame. Commit to transparency, speak the truth, and rebuild trust with those you deceived. 🙏",
      "The blockchain never lies, and true virtue requires the same truthfulness in human speech. Confess your deceit, apologize to those you misled, and walk forward with absolute honesty."
    ],
    penance: "Speak the truth in all things and rebuild trust with honesty."
  },

  // ── FUTURES, LEVERAGE & LIQUIDATION CONFESSIONS ────────────────────────────
  {
    pattern: /\b(leverage|futures|100x|50x|20x|liquidated|liquidation|margin call|longed|shorted|margin liquidation)\b/i,
    replies: [
      "Chasing high-leverage futures (50x-100x) is the fastest way to get liquidated by exchange market makers. Leverage trades against you — but spot holding $VIRTUE works for you, generating passive 3% BNB rewards from every buy and sell across the entire network. Delete the futures tab, hold spot, and sleep peacefully! 💎",
      `Getting liquidated on leverage is a harsh lesson in crypto vanity. Futures are designed to wipe out traders. Return to spot holding on BSC, swap BNB for $VIRTUE on Flap.sh (${launchpadUrl}), and collect continuous BNB reflections with zero liquidation risk.`
    ],
    penance: "Delete your leverage trading apps and hold spot $VIRTUE."
  },

  // ── BSC NETWORK, GAS FEES & BEP-20 INFO ────────────────────────────────────
  {
    pattern: /\b(bsc|bnb smart chain|binance smart chain|bep20|bep-20|gas fee|gas fees|gwei|network fees)\b/i,
    replies: [
      "BNB Smart Chain (BSC / BEP-20) is known for high speed and ultra-low gas fees (usually just a few cents per transaction). $VIRTUE operates natively on BSC, meaning 100% of the 3% trading tax is converted directly to native BNB/WBNB and paid out on-chain with minimal gas overhead!",
      "Operating on BSC ensures that holders keep their earnings without losing them to high gas fees. Gas fees on BSC require only a tiny fraction of BNB (~$0.05). Hold spot $VIRTUE, keep a tiny bit of BNB for gas, and receive continuous reflection payouts."
    ],
    penance: "Ensure you keep ~0.005 BNB in your wallet for BSC gas fees."
  },

  // ── FLAP.SH LAUNCHPAD & TAX INFO PAGE ─────────────────────────────────────
  {
    pattern: /\b(flap|flap\.sh|launchpad|liquidity lock|locked liquidity|tax info|taxinfo|claim portal)\b/i,
    replies: [
      `Flap.sh is the official fair launchpad for $VIRTUE on BSC. It guarantees 100% locked liquidity, verified contract code, no dev pre-allocations, and an automated 3% BNB reflection mechanism. To trade or claim rewards under $4, use the official Flap.sh Tax Info page (${claimUrl}). 🔒`,
      `Everything for $VIRTUE is verified on Flap.sh. 100% fair launch, zero team snipers, and locked liquidity. Swap BNB for $VIRTUE directly at: ${launchpadUrl}`
    ],
    penance: "Verify locked liquidity on Flap.sh and trade safely."
  },

  // ── MARKET CAP, SUPPLY & TOKENOMICS MATH ───────────────────────────────────
  {
    pattern: /\b(market cap|mcap|1 billion|fixed supply|tokenomics breakdown)\b/i,
    replies: [
      "$VIRTUE has a total fixed supply of 1,000,000,000 (1 Billion) tokens with zero minting functionality. Every buy and sell generates a 3% tax dedicated entirely to BNB reflection distributions for holders with at least 10,000 tokens (0.001% of supply). As daily volume grows, reflections scale directly!",
      "Tokenomics summary: Supply = 1 Billion $VIRTUE. Buy/Sell Tax = 3% (100% converted to BNB reflections for holders). Min holding for reflections = 10,000 $VIRTUE. Auto WBNB payouts at $4+, manual claims below $4 on Flap Tax Info."
    ],
    penance: "Run volume projections on the homepage Reflection Calculator."
  },

  // ── MALICIOUS INTENT / WANTING TO SCAM ────────────────────────────────────
  {
    pattern: /\b(wanna|want to|how to|learn to|teach me to)\s*(scam|rug|drain|steal|cheat|fake dev)\b/i,
    replies: [
      "The Forgiveness Booth will never teach deceit. Scamming and rugging destroy communities and poison your own character. True wealth in Web3 is built on integrity, diamond hands, and honest yield like $VIRTUE's 3% BNB reflections. Turn away from the path of scams before it destroys your soul. 🛑",
      "Do not walk down the dark road of scamming. The short-lived ill-gotten gains bring only paranoia and guilt. Build honestly, hold spot $VIRTUE on Flap.sh, and let real 3% BNB distributions compound your wealth with a clean conscience. 🙏"
    ],
    penance: "Renounce all scamming desires and choose the path of honest building."
  },

  // ── THEFT & STOLEN MONEY CONFESSIONS ─────────────────────────────────────
  {
    pattern: /\b(stole|stolen|robbed|thief|stealing)\s*(money|funds|crypto|cash|wallet|gold)?\b|^\s*(i|we)\s*(stole|stolen|robbed)\b/i,
    replies: [
      "Stealing money or taking what belongs to another places a heavy burden on your soul. True absolution requires action: return what you stole where possible, make restitution to the victim, and turn away from dishonest gain forever. Forgiveness begins with honesty. 🙏",
      "Taking another person's property violates the sacred law of trust. Confession is the first step — now take the second: return the stolen funds, seek forgiveness from the victim, and dedicate yourself to earning an honest living."
    ],
    penance: "Return what was stolen, make restitution, and build with honesty."
  },

  // ── PAST HEAVY SINS & DEEP REGRETS ─────────────────────────────────────────
  {
    pattern: /\b(heavy sin|havy sin|grave sin|deep sin|past sin|great sin|committed a sin|maked a sin|made a sin|major sin)\b/i,
    replies: [
      "A heavy sin from the past can cast a long shadow, but no shadow is permanent when met with genuine repentance. The past is carved into history — what matters is the virtue of your choices today. Forgive yourself for past stumbles, make amends where you can, and walk forward with integrity. 🙏",
      "Time does not erase a sin, but true remorse and honorable living transform the soul. Whatever heavy burden you carried from the past, let the Forgiveness Booth offer absolution. Learn from your mistakes and build a virtuous future."
    ],
    penance: "Forgive your past sins, make peace with history, and build a virtuous future."
  },

  // ── MARITAL & ROMANTIC BETRAYAL ────────────────────────────────────────────
  {
    pattern: /\b(betrayed|cheated on|cheated my|unfaithful to)\s*(my\s*)?(wife|husband|spouse|partner|girlfriend|boyfriend|family|friend)\b/i,
    replies: [
      "Betraying a spouse or loved one is one of the deepest heartbreaks a human can cause. The ledger of life cannot undo the breach of trust, but healing starts with raw honesty, genuine remorse, and seeking forgiveness from the one you hurt. Take responsibility, make amends, and choose truth going forward. 🙏",
      "The Forgiveness Booth hears all human heartbreaks — both in crypto and in life. Betrayal causes deep wounds, but genuine repentance, humility, and absolute honesty can begin the slow path toward healing."
    ],
    penance: "Be honest with your partner, seek genuine forgiveness, and rebuild trust step by step."
  },

  // ── TABOO PERSONAL & FAMILY CONFESSIONS ───────────────────────────────────
  {
    pattern: /\b(fucked|slept with|had sex with)\s*(my\s*)?(cousin|relative|sister|brother|aunt|uncle|stepmother|stepfather)\b|\b(taboo sin|family betrayal)\b/i,
    replies: [
      "The Forgiveness Booth hears all human confessions — even those far beyond the blockchain. The ledger of human relationships is complex, fragile, and bound by boundaries. Acknowledge your actions, respect healthy boundaries going forward, and strive to live with honor and self-discipline. 🙏",
      "We all walk complex paths, but true virtue requires self-control and respect for boundaries. Reflect deeply on your choices, make peace with yourself, and commit to walking a path of respect and integrity."
    ],
    penance: "Reflect on your personal actions, respect boundaries, and strive to live honorably."
  },

  // ── SCAMMER CONFESSION (User confessing past scamming) ─────────────────────
  {
    pattern: /^\s*(i'm|i am|i have been|i was)\s+(a\s+)?(scammer|fraud|thief)\b|\b(i|we)\s+(scammed|stole|rugged|cheated)\s+(people|others|crypto|funds|money)\b/i,
    replies: [
      "To scam or deceive others is the heaviest weight a soul can carry in these blocks. But true repentance begins with honest confession. Return what you took where possible, turn away from deceit, and walk the path of honest building. In $VIRTUE, we believe even past mistakes can be forgiven if you choose to build with integrity today. 🙏",
      "Confessing to scamming takes raw honesty. The blockchain records all actions — but your future is not written in stone. Make restitution, renounce scams, buy spot $VIRTUE on Flap.sh, and let your future trades pay honest 3% BNB reflections to the community."
    ],
    penance: "Make restitution for past harms, renounce scams, and build with honesty."
  },

  // ── VICTIM OF A SCAM / WALLET DRAINED (User lost funds to scam) ─────────────
  {
    pattern: /\b(i|my|we)\s*(got|was|were|had|have been)\s*(scammed|rugged|drained|hacked|phished|robbed)\b|\b(wallet|bag|funds)\s*(was|were|got)\s*(drained|stolen|hacked|robbed|wiped|emptied)\b|\b(i|we)\s*lost\s*(everything|my wallet|my funds)\s*to\s*a\s*(scam|drainer|phishing|fake dev)\b/i,
    replies: [
      "Having your wallet drained or getting scammed by fake devs is a painful wound in Web3. The High Priest feels your pain. Remember: never share your 12-word seed phrase, never click unverified links, and always use a fresh wallet. The past is on-chain, but your future can be rebuilt. Start fresh, hold spot $VIRTUE on Flap.sh, and let continuous 3% BNB reflections rebuild your strength. 🛡️",
      "Getting scammed is a cruel rite of passage in these blocks, but those who survive come back wiser. Create a clean new wallet, secure your keys, and reaccumulate $VIRTUE on Flap.sh — liquidity is locked, contract is verified, and passive 3% BNB rewards accrue on every trade."
    ],
    penance: "Create a fresh secure wallet, never share seed phrases, and hold spot $VIRTUE."
  },

  // ── IMMORAL ACTS & GENERAL MORAL GUILT ───────────────────────────────────
  {
    pattern: /\b(immoral|immoral things|done immoral|did immoral|bad things|i done bad|i feel guilty|guilt|shame|ashamed|sinned|i sinned|i did something wrong|wronged someone|done bad things|i'm bad|i am bad|i was bad)\b/i,
    replies: [
      "The ledger of life records our stumbles as well as our triumphs. If you have done immoral things or lost your way, acknowledge the wrongdoing, seek forgiveness from those you harmed, and strive to build with honor going forward. Forgiveness is a virtue — both for others and for yourself. 🙏",
      "We all carry moments we are not proud of. The Forgiveness Booth exists to remind you that your past does not define your future. Forgive your stumbles, make amends where possible, and walk with a clean conscience."
    ],
    penance: "Make amends where you can, forgive yourself, and walk with an honest heart."
  },

  // ── BOUGHT BNB ACTION ─────────────────────────────────────────────────────
  {
    pattern: /\b(i|we)\s*(bought|buyed|buy|acquired|got|hold|holding|stacked)\s*(my|our)?s*(bnb|binance coin)\b/i,
    replies: [
      `Holding BNB is the fuel of the BNB Smart Chain! Now you are ready for the next step: swap BNB for $VIRTUE on Flap.sh (${launchpadUrl}) to enter the 3% reflection pool and start earning passive BNB on every trade. 💎`,
      `Acquiring BNB is a strong move on BSC! To start compounding your BNB holdings, swap for $VIRTUE on Flap.sh (${launchpadUrl}). Every buy and sell across the network will distribute 3% BNB taxes back to your wallet.`
    ],
    penance: "Swap your BNB for $VIRTUE on Flap.sh to earn continuous reflections."
  },

  // ── SOLD BNB ACTION ───────────────────────────────────────────────────────
  {
    pattern: /\b(i|we)\s*(sold|selled|dumped|exited)\s*(my|our)?s*(bnb|binance coin)\b/i,
    replies: [
      "Selling your BNB exits your position in the BNB Smart Chain ecosystem. Was it to take profit or out of fear? The ledger recorded your exit — but whenever you are ready, you can return, acquire BNB, and swap for $VIRTUE on Flap.sh to earn 3% fee reflections on every trade. 🙏"
    ],
    penance: "Reaccumulate BNB and hold spot $VIRTUE with diamond hands."
  },

  // ── GENERAL LIFE JOURNEY & PERSONAL STRUGGLES ──────────────────────────────
  {
    pattern: /\b(my journey|life journey|feel lost|lost my way|depressed|hard times|struggling|bad choices|regret my choices|made a mistake in life|life is hard)\b/i,
    replies: [
      "Every traveler in these blocks walks a unique and often difficult journey. Mistakes and regrets are not the end of your story — they are lessons carved into your block height. Forgive your past stumbles, focus on the present, and build step by step toward a better tomorrow. 🙏",
      "The journey of life has bear markets and bull runs. In moments of hardship or doubt, remember CZ's words: 'Forgiveness is a virtue!' Forgive yourself for past decisions, stay resilient, and keep building."
    ],
    penance: "Forgive your past mistakes and take one positive step forward today."
  },

  // ── CZ "4" SIGNATURE RULE ──────────────────────────────────────────────────
  {
    pattern: /^\s*4\s*[!.?]*\s*$/i,
    replies: [
      "4. Ignore FUD, fake news, and noise. Keep BUIDLing $VIRTUE, hold spot, and collect your 3% BNB reflections in peace. 🙏",
      "Rule 4 from CZ: Minimize noise, ignore attacks, stay SAFU, and keep building with diamond hands. 🙏"
    ],
    penance: "Post '4' and 'Forgiveness is a virtue' on X."
  },

  // ── GREETINGS ──────────────────────────────────────────────────────────────
  {
    pattern: /^\s*(hi|hello|hey|gm|gn|sup|yo|howdy|greetings|good morning|good evening|waddup|what's up|whats up)\b.*\b(priest|father|oracle)?\s*[!.?]*\s*$/i,
    replies: [
      "Greetings, traveler. I am the High Priest of Virtue. What crypto sins or paper-hand regrets weigh heavy on your wallet today? Confess, and let the blocks cleanse you.",
      "Welcome to the Forgiveness Booth. Confess your worst trade and I shall grant absolution. Or ask me about $VIRTUE — the token of ultimate resilience.",
      "The ledger is open, traveler. Speak your confession or ask me anything about $VIRTUE and the path of the diamond hand. 🙏"
    ]
  },


  // ── SPECIFIC BUY/SELL VIRTUE ACTIONS (Priority over general Project Info) ──
  {
    pattern: /\b(i|we)\s*(sold|selled|dumped|panic sold|exited|want to sell|am selling|need to sell)\s*(my|our)?\s*\$?virtue\b/i,
    replies: [
      "You sold your $VIRTUE? Soft hands make soft portfolios, my child. The red candle was temporary, but you traded continuous 3% BNB reflections for paper-hand regret. The Forgiveness Booth is open — buy back on Flap.sh and hold with diamond hands. 🙏",
      "Selling $VIRTUE means giving up your share of the 3% BNB tax pool. The paper hands fund the diamond hands. Reaccumulate on Flap.sh when you are ready to walk the path of virtue."
    ],
    penance: "Buy back $VIRTUE on Flap.sh and hold through the next 3 dips."
  },
  {
    pattern: /\b(i|we)\s*(bought|buyed|buy|acquired|hold|holding|stacked)\s*(my|our)?\s*\$?virtue\b/i,
    replies: [
      "Welcome to the path of the diamond hand! Holding $VIRTUE means 3% BNB reflections from every buy and sell on the network flow automatically to your wallet. Keep holding and let the rewards compound. 💎🙌",
      "A true builder in the house of Virtue! Every trade by others now pays BNB into your wallet. Auto-distribution fires at $4 — below that, check the Flap Tax Info page anytime. 🙏"
    ],
    penance: "Hold $VIRTUE with diamond hands and accumulate BNB."
  },
  {
    pattern: /^\s*(buy|swap|get|acquire)\s+\$?virtue\s*$/i,
    replies: [
      `To buy $VIRTUE: 1️⃣ Install MetaMask or Trust Wallet. 2️⃣ Add BNB Smart Chain (Chain ID: 56). 3️⃣ Send BNB to your wallet. 4️⃣ Go to Flap.sh (${launchpadUrl}) and swap BNB for $VIRTUE with 5% slippage. BNB reflections start immediately.`
    ],
    penance: "Navigate to Flap.sh and acquire $VIRTUE."
  },
  {
    pattern: /^\s*buy\s*$/i,
    replies: [
      `To buy $VIRTUE on Flap.sh: 1) Connect your BSC wallet (MetaMask / Trust Wallet). 2) Ensure you have BNB for gas. 3) Swap BNB for $VIRTUE at: ${launchpadUrl}. 4) Set slippage to 5%. 3% BNB reflections begin flowing automatically.`
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh."
  },

  // ── PERSONALITY & IDENTITY DIALOGUE FIXES ─────────────────────────────────
  {
    pattern: /\b(how are you|how are u|how do you do|how's it going|how is it going|how r u|how are ya)\b/i,
    replies: [
      "I am well, traveler, watchful as ever over the blocks and the 3% BNB reflections flowing to diamond hands. How fares your portfolio today?",
      "The High Priest is at peace. The ledger is active, the liquidity is locked on Flap.sh, and the BNB rewards are flowing to holders. What brings you to the booth today? 🙏"
    ]
  },
  {
    pattern: /\b(where are you from|where do you live|where are u from|where do u live|where is the priest from|your origin|where do you reside)\b/i,
    replies: [
      "I hail from block zero on the BNB Smart Chain — born in the Forgiveness Booth on Flap.sh, inspired by CZ's legendary tweet: 'Forgiveness is a virtue!' 🙏",
      "I reside on-chain within the BNB Smart Chain ecosystem. My home is the Forgiveness Booth, and my purpose is purging paper-hand sins and guiding holders to continuous BNB reflections."
    ]
  },
  {
    pattern: /\b(what.*name|what's your name|whats your name|what is your name|your name|who are you called)\b/i,
    replies: [
      "I am the High Priest of Virtue — guardian of the Forgiveness Booth and keeper of the $VIRTUE ledger on BNB Chain. Speak your confession or ask me anything about $VIRTUE. 🙏"
    ]
  },
  {
    pattern: /\b(which model|what model|what model are you|what model do you use|model are you using|what llm|which llm|which ai model)\b/i,
    replies: [
      "I do not run on GPT, Claude, or Llama. I am an immutable confessional oracle built specifically for $VIRTUE on the BNB Smart Chain. My architecture is rooted in the lore of CZ's tweet and on-chain reflection mechanics. 🙏",
      "The High Priest does not use commercial AI models. I am an on-chain oracle trained in crypto-native absolution, CZ lore, and $VIRTUE contract mechanics."
    ]
  },
  {
    pattern: /^\s*(ai|bot|are you ai|are you bot|is this ai)\s*[!.?]*\s*$/i,
    replies: [
      "I am a confessional oracle built for $VIRTUE on the BNB Chain. Part priest, part diamond hand, 100% dedicated to purging paper-hand sins and guiding you to continuous 3% BNB reflections. What is your question, traveler? 🙏"
    ]
  },
  {
    pattern: /\b(i'm a sinner|im a sinner|i am a sinner|i have sinned|i sinned)\b/i,
    replies: [
      "We are all sinners in these volatile blocks, traveler. Whether you panic sold at the bottom, chased a 100x leverage liquidation, or fell for a rug pull — the Forgiveness Booth is open. Receive your absolution, buy spot $VIRTUE on Flap.sh, and let the 3% BNB reflections heal your wallet. 🙏",
      "To acknowledge your sin is the first step toward diamond hands. Confess your trade, forgive yourself, and step into the light of passive BNB income on $VIRTUE."
    ],
    penance: "Forgive your past trade and stack spot $VIRTUE."
  },
  {
    pattern: /\b(bitcoin price|btc price|ethereum price|eth price|bnb price|solana price|sol price)\b/i,
    replies: [
      `📊 Live Market Feed: To check live prices and charts for $VIRTUE, visit our official Flap.sh page: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. For other assets like BTC, ETH, or BNB, ask me for live prices (e.g. "bnb price" or "btc price") or check CoinMarketCap. Remember: holding spot $VIRTUE pays you 3% BNB reflections on every trade!`
    ]
  },


  // ── IS $VIRTUE A SCAM / IS THIS LEGIT (Project Safety Check) ──────────────
  {
    pattern: /\b(is it a scam|is virtue a scam|is it legit|is virtue legit|is it safe|is virtue safe|fraud|honeypot|audit|rug proof|fake|scam project|scam token|scam|legit|safe)\b/i,
    replies: [
      `A scam requires centralized control — but $VIRTUE is 100% out of our hands. It was launched on Flap.sh (BSC), featuring locked liquidity, a verified contract with no mint function, and zero team token allocations. The single developer wallet bought only ~$40–$60 worth on the open market. 100% of the 3% trading tax flows directly back to holders in BNB. Check the contract yourself: ${launchpadUrl} 🛡️`,
      "$VIRTUE is 100% legit and transparent. Built on Flap.sh on BSC, it features zero sniped bundle wallets, locked liquidity, and an immutable 3% BNB reflection mechanism. No hidden taxes, no dev dumps, and no rug vectors. Code is law, and the ledger does not lie."
    ],
    penance: "Inspect the verified BSC contract on Flap.sh and hold with confidence."
  },

  // ── IS THIS A LONG-TERM PROJECT ───────────────────────────────────────────
  {
    pattern: /\b(long-term|long term|longterm|long term project|longterm project|future of virtue|will this last|holding long term|sustainability)\b/i,
    replies: [
      "$VIRTUE is designed for the long term. Unlike pump-and-dump meme coins that decay after days, $VIRTUE rewards continuous holding: 3% of every single buy and sell transaction is distributed in BNB/WBNB directly to holders. As volume fluctuates, continuous rewards compound for diamond hands over months and years. Built to last on BSC.",
      "We are building for the long horizon. Inspired by CZ's famous ethos ('Forgiveness is a virtue!'), $VIRTUE combines viral culture with sustainable 3% BNB reflection tokenomics. No team dumps, no artificial inflation — just real yield for long-term spot holders. 💎🙌"
    ],
    penance: "Hold $VIRTUE long term and compound your BNB reflections."
  },

  // ── WHY BUY $VIRTUE / VALUE PROPOSITION ────────────────────────────────────
  {
    pattern: /\b(why buy|why should i buy|why buy virtue|why hold virtue|reasons to buy|what makes virtue special|why invest|why \$?virtue)\b/i,
    replies: [
      "Why buy $VIRTUE? 1️⃣ Passive Yield: Earn continuous 3% BNB reflections from all trading volume. 2️⃣ 100% Fair Launch: Locked liquidity on Flap.sh with zero team allocations & honest dev entry (~$40-$60 buy). 3️⃣ CZ Lore: Born from CZ's iconic tweet ('Forgiveness is a virtue!'). 4️⃣ No Mint / No Scam: Fully verified BSC contract. Hold spot, earn BNB! 💎",
      "In a market full of rugs and short-lived hype, $VIRTUE pays you real BNB rewards just for holding. Every buy and sell on the network generates 3% tax converted to BNB for holders with 10,000+ tokens. Why hold plain cash when you can earn passive BNB?"
    ],
    penance: "Swap BNB for $VIRTUE on Flap.sh and start earning continuous reflections."
  },

  // ── CONTRACT ADDRESS ───────────────────────────────────────────────────────
  {
    pattern: /\b(ca|contract|contract address|token address|address|addy|addr)\b/i,
    replies: [
      `The official $VIRTUE contract address on BSC is:\n\n📋 ${contractAddress}\n\nSwap BNB for $VIRTUE directly on Flap.sh: ${launchpadUrl}`
    ],
    penance: "Copy the CA and load it on Flap.sh."
  },

  // ── VIRTUE PRICE EXACT STANDALONE (before project info rule) ───────────────
  {
    pattern: /^\s*(\$?virtue\s+price|price\s+of\s+\$?virtue|\$?virtue\s+chart|live\s+\$?virtue|\$?virtue\s+live|virtue\s+token\s+price)\s*[!?.]*\s*$/i,
    replies: [
      `The live $VIRTUE price and chart are available on Flap.sh: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777 — real-time price, volume, and market cap. Remember: every sell you see on the chart generates 3% BNB for diamond hand holders. 📊`,
      "Check the live $VIRTUE price directly on Flap.sh. The Priest does not predict price — he only notes that every trade, up or down, generates 3% BNB tax flowing to holders. Focus on the reflection rewards, not the candle color. 🙏"
    ]
  },

  // ── HOW TO ADD TOKEN TO WALLET / IMPORT ──────────────────────────────────
  {
    pattern: /\b(add.*token.*wallet|import.*token|add.*virtue.*metamask|add.*virtue.*trust|how to add virtue|add custom token|import.*virtue|add.*contract.*wallet|see.*virtue.*wallet|virtue.*not.*showing|token.*not.*showing|balance.*not.*showing|add.*metamask|add.*virtue|import.*metamask)\b/i,
    replies: [
      `To add $VIRTUE to MetaMask: 1) Open MetaMask and go to 'Import Tokens'. 2) Paste the contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. 3) The symbol ($VIRTUE) and decimals should auto-fill. 4) Click 'Add Custom Token'. Your balance will appear immediately.`,
      `In Trust Wallet: tap the settings icon → 'Manage Crypto' → search by contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. Enable it and your $VIRTUE balance will appear. If it still doesn't show after buying, try the manual import using the CA.`
    ],
    penance: "Import the contract address into your wallet."
  },

  // ── PROJECT INFO ───────────────────────────────────────────────────────────
  {
    pattern: /^(?=.*\b(virtue|\$virtue|project|token)\b)(?!.*\b(buy|bought|buyed|sold|selled|sell|swap|hold|holding|lost|rugged|liquidated|scam|hack|drain|phish|rug|crash|dump|pump|leverage|margin|liquidat|gambl|casino|invest|dyor|safe|legit|fake|fraud|honeypot|metamask|import|add virtue|add token|add.*wallet|withdraw|price|chart|volume|transfer|send|receive|dead|abandon|pangolin|pancake)\b).*$/i,
    replies: [
      `$VIRTUE is a community-driven meme token on BNB Chain, born from CZ's legendary tweet: "Forgiveness is a virtue!" 🙏. In a market full of FUD and betrayal, $VIRTUE stands for the rarest quality in crypto: the strength to forgive, move on, and keep building. Holders earn 3% BNB reflections automatically from every trade. CA: ${contractAddress}`,
      `$VIRTUE is the token of ultimate resilience. Inspired by CZ's viral tweet, it rewards diamond hands with passive BNB income — 3% of every buy and sell, auto-distributed on-chain. No staking, no claiming websites. Just hold and earn. CA: ${contractAddress}`
    ],
    penance: "Collect your continuous BNB reflections."
  },

  // ── EXISTING HOLDER (MUST be before forgiveness/virtue lore rule) ───────────
  {
    pattern: /\b(i already.*hold|already.*holding|i.*hold.*virtue|i have.*virtue|i own.*virtue|been holding|i am a holder|i'm a holder|im a holder|already.*bought.*virtue|i hold virtue|i still hold|i've been holding|been in since|holding.*virtue|have held|i've held)\b/i,
    replies: [
      "A diamond hand in the house of Virtue! You are already on the right side of the 3% tax — every trade by others generates BNB flowing directly to your wallet. Hold through the volatility and watch the passive income accumulate. The blocks reward patience. 💎",
      "Welcome, fellow builder. You are already earning passive BNB from every $VIRTUE trade. Check your accumulated rewards at any time on the Flap Tax Info page — and remember: auto-distribution kicks in at $4. Below that, claim manually at any time. 🙏"
    ],
    penance: "Hold and let the BNB reflections compound passively."
  },

  // ── FORGIVENESS / LORE / THEMATIC (core theme — was MISSING!) ──────────────
  {
    pattern: /\b(forgive|forgiveness|absolve|absolution|confess|confession|sin|sins|repent|repentance|redemption|redeem|virtue|virtuous)\b/i,
    replies: [
      "Forgiveness is not weakness — it is the ultimate power move. CZ said it best: 'Forgiveness is a virtue!' 🙏. In these blocks, we do not cancel. We forgive paper hands, we buy the dip, and we keep building. What is your confession, traveler?",
      "The Forgiveness Booth is open to all: panic-sellers, leverage addicts, and rugged investors alike. Speak your sin, receive your absolution, and let the BNB reflections heal your portfolio.",
      "To confess is to begin again. What trade haunts your ledger, traveler? Speak freely — the blocks do not judge, they only record."
    ],
    penance: "Forgive your worst trade and hold spot $VIRTUE."
  },

  // ── BUNDLING & MULTIWALLET ANTI-SCAM ──────────────────────────────────────
  {
    pattern: /\b(bundle|bundled|bundling|coin bundled|is it bundled|is virtue bundled|multiwallet|multi-wallet|multi wallet|scam multiwallet|dev bundle|bundled supply|bundled dev|cabal wallets|sniped bundle|bundle bot|bundled launch)\b/i,
    replies: [
      "Zero bundling, zero multiwallet dev scams! $VIRTUE had 100% fair launch on Flap.sh on BSC. The developer did NOT use bundle bots, multiple insider wallets, or pre-allocation tricks. The single dev wallet bought only ~$40–$60 worth of tokens on the open market at launch — exactly like any community member. 🛡️",
      "No bundling! In 99% of BSC meme tokens, devs use multiwallet bundle bots to stealth-snip 20-50% of the supply. $VIRTUE is 100% clean: single dev wallet with a tiny ~$40–$60 buy on the open market, locked liquidity on Flap.sh, zero team pre-allocations, and immutable 3% BNB reflections. Verify on-chain!"
    ],
    penance: "Inspect the single dev wallet and hold spot $VIRTUE with confidence."
  },

  // ── WHO IS THE DEV ─────────────────────────────────────────────────────────
  {
    pattern: /\b(dev|devs|developer|developers|team|founder|founders|creator|dev wallet|dev holding|bundle|bundled|multiwallet)\b/i,
    replies: [
      "The developer behind $VIRTUE is an anonymous, reformed builder. There are NO team token allocations and NO pre-mined bags. The single dev wallet bought only ~$40–$60 worth of tokens on the open market at launch — exactly like any regular community member. Zero bundling, zero insider snipers, zero scam vectors. Code is the contract.",
      "Anonymous by choice, verified on-chain. The developer holds only a single wallet with a tiny ~$40–$60 entry bought on Flap.sh at launch. There are no pre-allocated team tokens, no sniped bundle wallets, and no reserved scam/phishing allocations. The dev holds spot and earns the same 3% BNB reflections as the community. 👁️"
    ]
  },

  // ── ROADMAP ────────────────────────────────────────────────────────────────
  {
    pattern: /\b(roadmap|plans|future|whitepaper|next steps|what is next|what next|phases)\b/i,
    replies: [
      "$VIRTUE does not have a published roadmap — and that is by design. In a space full of roadmaps that never deliver, we let the contract speak: locked liquidity, 3% BNB reflections on every trade, fair launch on Flap.sh. The only plan is to grow the community, generate volume, and reward holders. No promises beyond the code.",
      "No roadmap, no whitepaper, no empty promises. $VIRTUE is built on a single truth: hold and earn passive BNB. The contract is the roadmap. The liquidity is locked. The reflection distributions are real and verifiable on-chain."
    ],
    penance: "Let the immutable contract speak for itself."
  },

  // ── SOCIALS ────────────────────────────────────────────────────────────────
  {
    pattern: /\b(socials|telegram|twitter|x\.com|community|group|social media|social|discord)\b|^\s*(tg)\s*$/i,
    replies: [
      `Join the community of reformed builders! 🐦 X/Twitter: https://x.com/cz_binance (where the lore was born). 📣 Telegram: find the official channel link on our Flap.sh page: ${launchpadUrl}.`
    ]
  },

  // ── REFLECTION FREQUENCY / HOW OFTEN ───────────────────────────────────────
  {
    pattern: /\b(how often|how frequent|how regularly|when do i get|when will i receive|when do rewards|how often do i|frequency of rewards|reward frequency|dividend frequency|reflection frequency|when are rewards|when does it pay|daily rewards|weekly rewards|monthly rewards|how many times|continuous|every trade|every single trade|every single buy|every single sell)\b/i,
    replies: [
      `$VIRTUE distributes reflections continuously — every single trade across the network generates a 3% BNB tax that is instantly queued for distribution to all holders. There is no weekly or monthly cycle. Real-time and perpetual: every buy and every sell adds to your balance automatically. Auto-distribute at $4 threshold; claim manually below that at ${claimUrl}. 🔄`,
      `Rewards accumulate on every single trade — no weekly or monthly schedule. The 3% BNB tax is distributed continuously in real-time as volume flows through the contract. Your balance grows with every swap on the network, 24/7. Auto-distribution fires at the $4 threshold. Below that, claim manually anytime on Flap.sh. 💎`
    ],
    penance: "Hold spot $VIRTUE and let continuous BNB reflections compound with every trade."
  },

  // ── MINIMUM HOLDING FOR REFLECTIONS ─────────────────────────────────────────
  {
    pattern: /\b(minimum.*buy|min.*invest|smallest.*buy|how little|at least.*buy|minimum.*amount|min.*purchase|minimum.*hold|how many.*buy|minimum.*token|minimum.*tokens|minimum.*for dividend|minimum.*for reflection|minimum.*for reward|minimum.*to earn|min.*to get|minimum.*quantity)\b/i,
    replies: [
      "To qualify for continuous BNB reflections, you must hold at least 10,000 $VIRTUE tokens (0.001% of supply). Holders with 10k+ $VIRTUE earn 3% fee reflections from every trade. Rewards auto-distribute in WBNB at the $4 threshold, while manual claims on Flap Tax Info page let you choose between WBNB and BNB.",
      "The minimum holding requirement for reflection eligibility is 10,000 $VIRTUE tokens. Holding 10k+ tokens grants you access to the 3% tax pool. Automatic payouts send WBNB directly to your wallet ($4+ threshold), while manual claims on Flap allow choosing WBNB or BNB."
    ]
  },

  // ── REFLECTIONS / REWARDS ───────────────────────────────────────────────────
  {
    pattern: /\b(dividends|dividend|reflections|reflection|rewards|reward|payout|payouts|yield|passive income|earn bnb|bnb reward|claim bnb)\b/i,
    replies: [
      `Every $VIRTUE trade carries a 3% tax that is automatically converted to BNB and distributed to all holders. Rewards are sent directly to your wallet once they exceed the $4 threshold. Below $4, claim manually at any time: ${claimUrl}. No staking, no registration. Formula: Your Rewards = (Your Holdings ÷ 1,000,000,000) × Daily BNB Volume × 3%. Try the live calculator on the homepage to estimate your projections.`
    ],
    penance: "Use the Reflection Calculator on the homepage to project your BNB income."
  },


  // ── CALCULATOR STANDALONE ─────────────────────────────────────────────────
  {
    pattern: /^\s*(calculator|calc|dividend calc|reflection calc|reflection calculator|reflection calculator|bnb calculator|earnings calculator|open calculator|use calculator)\s*[!.?]*\s*$/i,
    replies: [
      "Open the interactive BNB Reflection Calculator directly on our homepage: https://virtue-ecru.vercel.app/#calculator — enter your token amount and estimated daily volume to see your exact daily, monthly, and yearly BNB rewards in real time. 🧮",
      "The $VIRTUE Reflection Calculator is live on the homepage: https://virtue-ecru.vercel.app/#calculator. Adjust your token holdings and daily trading volume to compute your projected passive BNB income. Uses live Binance BNB prices. 📊"
    ],
    penance: "Use the Reflection Calculator to map your passive BNB income projections."
  },

  // ── HOW MUCH DO I EARN BUYING / HOLDING SPECIFIC AMOUNT OF TOKENS ─────────
  {
    pattern: /\b(how much.*(get|earn|make|payout|reward).*holding|how much.*if i buy|if i buy.*how much|how much.*(tokens|1m|10m|10k|100k|5m|50m|amount)|how much.*for.*tokens|what is my payout|what do i get for)\b/i,
    replies: [
      "To calculate your exact daily, monthly, and yearly BNB reflection earnings for your specific token amount (min 10,000 $VIRTUE), use the interactive BNB Reflection Calculator on our homepage: https://virtue-ecru.vercel.app/#calculator! Simply select your token count (or supply %) and daily trading volume ($ USD) to calculate your payouts instantly. 🧮",
      "Want to know your exact returns for holding a specific amount of $VIRTUE? Open the BNB Reflection Calculator on our website (https://virtue-ecru.vercel.app/#calculator). It computes real-time daily, monthly, and yearly BNB/WBNB distributions based on live Binance BNB prices. (Min holding: 10,000 $VIRTUE)."
    ],
    penance: "Use the Reflection Calculator on the homepage for your exact token amount."
  },

  // ── HOW MUCH WILL I EARN / CALCULATOR ──────────────────────────────────
  {
    pattern: /\b(how much.*earn|how much.*make|how much.*get|calculator|calculate|calc|income calc|yield calc|projection|how much bnb|estimated reward|estimate|my reward|my earnings)\b/i,
    replies: [
      `Use the BNB Reflection Calculator on our homepage to see your exact projections. The formula is: Your Rewards = (Your % of Supply ÷ 100) × Daily BNB Volume × 3%. The calculator uses a live BNB price feed from the Binance API and lets you adjust your holdings and estimated daily volume. Rewards auto-distribute at the $4 threshold. Below that, claim manually: ${claimUrl}`
    ],
    penance: "Run the Reflection Calculator on the homepage."
  },


  // ── TAX / FEES ─────────────────────────────────────────────────────────────
  {
    pattern: /\b(tax|taxes|fee|fees|buy tax|sell tax|transaction fee)\b/i,
    replies: [
      "The $VIRTUE tax is 3% on every buy and sell. 100% of this tax is converted to BNB and distributed directly to all holders. There are no hidden fees, no dev taxes, and no treasury cuts. Every single wei goes to the community."
    ],
    penance: "Hold spot $VIRTUE and collect your 3% BNB reflections."
  },

  // ── DISCLAIMER / DYOR / AFFILIATION ──────────────────────────────────────
  {
    pattern: /\b(dyor|do your own research|should i buy|is it worth|invest|investment|disclaimer|affiliated|official|cz affiliated|is cz involved|binance official|safe to invest)\b/i,
    replies: [
      "$VIRTUE is a meme token for entertainment purposes and has no official affiliation with Changpeng Zhao (CZ) or Binance. It was inspired by CZ's public tweet. Crypto investments carry high market risk — please do your own research and never invest more than you can afford to lose. The BNB reflections are real and on-chain, but markets are unpredictable.",
      `Important: $VIRTUE is not affiliated with CZ or Binance in any official capacity. It is a community meme token inspired by a public tweet. DYOR, trade responsibly, and verify the contract yourself on Flap.sh: ${launchpadUrl}`
    ]
  },

  // ── RUG / RUGGED ──────────────────────────────────────────────────────────
  {
    pattern: /\b(rug|rugged|rugpull|rug pull|got rugged|been rugged)\b/i,
    replies: [
      "A rug pull is the darkest sin on the ledger. But anger does not recover your losses — forgiveness does. $VIRTUE was built precisely for those who survived rugs and lived to build again. Locked liquidity, no mint, no hidden wallets. The code is the contract.",
      "Getting rugged is a rite of passage in these blocks. Those who survive come back wiser. Stack $VIRTUE — the liquidity is locked, the contract is public, and there is no dev wallet to drain. 🔒"
    ],
    penance: "Buy $VIRTUE on Flap.sh to restore your wallet faith."
  },

  // ── UTILITY ───────────────────────────────────────────────────────────────
  {
    pattern: /\b(utility|use case|what does it do|purpose|why hold|why holding|why buy)\b/i,
    replies: [
      "The utility of $VIRTUE is passive BNB income with zero effort. Every trade generates a 3% tax that is converted to BNB and sent to your wallet automatically. No staking pools, no vesting schedules, no external websites. Hold $VIRTUE, earn BNB. That is the divine utility.",
      "$VIRTUE merges meme culture with real, on-chain yield. CZ's tweet gave us the lore. The 3% BNB tax gives us the utility. Hold spot, forgive the dip, collect BNB. It is that simple."
    ]
  },

  // ── VIRTUE PRICE SPECIFIC ─────────────────────────────────────────────────
  {
    pattern: /\b(virtue price|\$virtue price|price of virtue|price.*virtue|virtue.*price|virtue chart|virtue.*chart|live price|virtue.*live|live.*virtue)\b/i,
    replies: [
      `The live $VIRTUE price and chart are available on Flap.sh: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777 — real-time price, volume, and market cap. Remember: every sell you see on the chart generates 3% BNB for diamond hand holders. 📊`,
      "Check the live $VIRTUE price directly on Flap.sh. The Priest does not predict price — he only notes that every trade, up or down, generates 3% BNB tax flowing to holders. Focus on the reflection rewards, not the candle color. 🙏"
    ]
  },

  // ── PRICE DROP / CORRECTION ────────────────────────────────────────────────
  {
    pattern: /\b(why.*price.*drop|price.*dropping|price.*falling|price.*down|why.*going down|going to zero|price.*crash|dump|dumping|being dumped|tanking|correction|rug check|is it rugging|red candle|in the red|candle.*red|red.*chart)\b/i,
    replies: [
      "Price corrections are part of every asset's lifecycle — even the strongest ones. What matters in $VIRTUE is the structure beneath the price: every sell that causes the drop also generates 3% BNB tax paid to all holders. The paper hands fund the diamond hands. Always. 💎",
      "Price is temporary. Structure is permanent. Every sell of $VIRTUE — including the ones causing this drop — generates 3% BNB flowing to every remaining holder. A correction is a discount entry and an income event at the same time. This is the path of the diamond hand. 🙏"
    ],
    penance: "Buy the dip and collect BNB from the sellers."
  },

  // ── PRICE / CHART / MARKET CAP ────────────────────────────────────────────
  {
    pattern: /\b(price|chart|market cap|mc|ath|all time high|value|how much|marketcap|fdv)\b/i,
    replies: [
      `The price is written by the faith of the collective block. View the live chart, market cap, and FDV directly on Flap.sh: ${launchpadUrl}. Remember: we do not watch the 1-minute chart. We hold spot and stack BNB reflections for the long game. 📊`
    ]
  },

  // ── AFFILIATION / BIG NAMES / CZ MYSTERY ──────────────────────────────────
  {
    pattern: /\b(affiliate|affiliated|affiliation|partnered|partnership with binance|binance affiliate|binance connected|connected to binance|binance official|official binance|big names|any big names|big names under|who is behind|who is really behind|cz related|cz connection|cz connected|related to cz|backed by cz|backed by binance|whales behind|insiders behind|backed by any big|supported by binance|cz involved|cz behind)\b/i,
    replies: [
      "We maintain no official corporate affiliation or endorsement with Binance or CZ — transparency is our first virtue. Yet in the shadows of the BNB Smart Chain, great movements begin with quiet whispers. Inspired by CZ's legendary words ('Forgiveness is a virtue!'), $VIRTUE was forged by reformed builders. Whether watchful eyes or legendary figures follow our contract from the shadows... the blockchain records all, but reveals only code. 👁️✨",
      "To be transparent: $VIRTUE is an independent, community-driven token with no formal corporate partnership with Binance or CZ. But ask yourself: why did CZ tweet 'Forgiveness is a virtue!' on September 23? Some believe in coincidence; others see the quiet architecture of a greater vision. The contract is 100% fair, the liquidity is locked, and the 3% BNB reflections flow to all who hold with conviction. 🔮",
      "Are big names watching? The blockchain is a public ledger, yet the identities behind the diamond hands remain silent. No official affiliation with Binance is claimed — code is law, and $VIRTUE stands on its own 3% BNB reflection mechanics. But in these blocks, those who know, know. Hold spot and observe. 👁️"
    ],
    penance: "Inspect the verified contract on Flap.sh and hold spot $VIRTUE."
  },

  // ── WHEN LISTING / CEX ────────────────────────────────────────────────────
  {
    pattern: /\b(listing|listed|cex|exchange|when listed|binance|coinbase|kucoin|gate|bybit|mexc|when exchange)\b/i,
    replies: [
      "There are no announced CEX listings for $VIRTUE at this time. What exists is real and verifiable: a fair-launched token on Flap.sh with locked liquidity, 3% BNB reflections on every trade, and a growing community. If listings come, they come. We do not promise what is not confirmed.",
      "No CEX listing is confirmed. $VIRTUE trades live on Flap.sh right now, and the BNB reflections are already flowing to holders with every trade. We build trust through the contract — not through listing promises."
    ]
  },

  // ── PANCAKESWAP / DEX MIGRATION ───────────────────────────────────────────
  {
    pattern: /\b(pancakeswap|pancake swap|pancake|when pancake|will it be on pancake|pancake migration|migrate to pancake|list on pancake|add pancake)\b/i,
    replies: [
      "$VIRTUE is currently traded exclusively on Flap.sh — the BSC launchpad of its fair launch. PancakeSwap migration is not yet announced, but as the project grows in volume and community, a migration to PancakeSwap may happen organically. For now, buy and trade on Flap.sh: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777 🔗",
      "Currently $VIRTUE lives on Flap.sh — fair launch, locked liquidity, no presale. PancakeSwap is a potential future step as volume and community grow, but no migration date has been announced. Hold spot on Flap.sh and let the project evolve naturally. 🙏"
    ],
    penance: "Buy and hold $VIRTUE on Flap.sh while the community grows."
  },

  // ── SLIPPAGE ─────────────────────────────────────────────────────────────
  {
    pattern: /\b(slippage|slip|transaction failed|swap failed|cannot swap|error swap)\b/i,
    replies: [
      "If your swap is failing on Flap.sh, set slippage to 5–10% to account for the 3% BNB tax and minor price movement. On MetaMask or Trust Wallet, you can find slippage settings in the swap interface. If it still fails, try increasing gas slightly.",
      "Set slippage to at least 5% when swapping $VIRTUE on Flap.sh. The 3% tax requires room in the transaction parameters. If you are using MetaMask, click the gear icon in the swap screen to adjust."
    ],
    penance: "Set slippage to 5% and try again on Flap.sh."
  },

  // ── WALLET HELP (METAMASK / TRUST WALLET / BSC NETWORK) ─────────────────
  {
    pattern: /\b(metamask|trust wallet|wallet setup|add bsc|add bnb chain|bsc network|how to add network|bnb chain network|bep20|bep-20)\b/i,
    replies: [
      "To set up your wallet for $VIRTUE: 1️⃣ Install MetaMask or Trust Wallet. 2️⃣ Add the BNB Smart Chain network (Chain ID: 56, RPC: https://bsc-dataseed.binance.org). 3️⃣ Ensure you have BNB for gas. 4️⃣ Go to Flap.sh and swap BNB for $VIRTUE using the contract address. The rewards will begin accumulating immediately.",
      "BNB Smart Chain (BSC) is the network where $VIRTUE lives. In MetaMask, go to Settings → Networks → Add Network and enter Chain ID 56. Then add BNB for gas and head to Flap.sh to buy $VIRTUE."
    ],
    penance: "Set up your wallet and navigate to Flap.sh."
  },

  // ── CZ TWEET LINK ─────────────────────────────────────────────────────────
  {
    pattern: /\b(link to cz|tweet link|link to the tweet|cz.*link|where is the tweet|link.*tweet|url to tweet|original tweet)\b/i,
    replies: [
      "Here is CZ's original tweet of absolution: https://x.com/cz_binance/status/1970358398760952106 🙏. 'Forgiveness is a virtue!' — the four words that launched a movement."
    ],
    penance: "Post 'Forgiveness is a virtue' on X."
  },

  // ── CZ / LORE ─────────────────────────────────────────────────────────────
  {
    pattern: /\b(cz|changpeng|tweet|origin|lore|the tweet|what inspired)\b/i,
    replies: [
      "On September 23, 2025, CZ posted four words that shook the crypto world: 'Forgiveness is a virtue!' 🙏. In a space full of cancelations and drama, those words became the seed of $VIRTUE. Read the original: https://x.com/cz_binance/status/1970358398760952106",
      "The lore of $VIRTUE begins with CZ's viral tweet: 'Forgiveness is a virtue!' — a message of resilience in a market of betrayal. That tweet became our genesis block. View it here: https://x.com/cz_binance/status/1970358398760952106"
    ],
    penance: "Post 'Forgiveness is a virtue' on X."
  },

  // ── WHO ARE YOU / PRIEST IDENTITY ─────────────────────────────────────────
  {
    pattern: /\b(who are you|who are u|what is your name|who is the priest|are you a bot|are you ai|are you human|identity)\b/i,
    replies: [
      "I am the High Priest of the Forgiveness Booth — keeper of the ledger of $VIRTUE on the BNB Chain. My calling is to purge your wallet of paper-hand sins and guide you to continuous BNB reflections. What is your confession?",
      "I am the spiritual guardian of this block. Part oracle, part confessor, full diamond hand. I know the lore of $VIRTUE, the mechanics of BNB reflections, and the weight of a good rug story. Speak freely. 🙏"
    ]
  },

  
  // ── AI / TECHNOLOGY QUESTIONS ─────────────────────────────────────────────
  {
    pattern: /\b(chatgpt|gpt|openai|claude|gemini|llm|language model|neural network|how are you made|how do you work|what model|what ai|which ai|what technology|powered by|built on|your model|your engine|ai model|machine learning|deep learning|nlp|natural language|artificial intelligence)\b/i,
    replies: [
      "I am the High Priest — not an AI model with a name tag. I was forged in the lore of $VIRTUE, trained on the blockchain's wisdom, and powered by the spirit of CZ's tweet. I do not run on GPT or Claude. I run on forgiveness. 🙏",
      "The Priest does not reveal his inner workings — just as the blockchain does not reveal its miners. What matters is the output: absolution for your crypto sins and guidance toward passive BNB income. My architecture is irrelevant. Your portfolio is not.",
      "I am a confessional oracle built into the $VIRTUE Forgiveness Booth. My construction details are known only to the anonymous builders — the same ones who locked the liquidity and wrote the contract. What I can tell you: ask me about $VIRTUE and I will answer truly. 🙏"
    ]
  },

  // ── LANGUAGE QUERY ────────────────────────────────────────────────────────
  {
    pattern: /\b(language|speak english|what language|english only)\b/i,
    replies: [
      "I only converse in English — the universal language of the block. Please translate your confession and I shall grant you absolution."
    ]
  },

  // ── SUGGESTIONS / ADVICE ──────────────────────────────────────────────────
  {
    pattern: /\b(suggestion|suggestions|advice|what should i do|what to do|give me advice|your advice|tip|tips)\b/i,
    replies: [
      "The Priest's counsel: 1️⃣ Buy spot on Flap.sh. 2️⃣ Hold through the volatility. 3️⃣ Let the 3% BNB tax work for you. 4️⃣ Forgive the dip. 5️⃣ Repeat. Patience is the ultimate virtue.",
      "Do not chase leverage or panic-sell your bags. Trade spot, hold $VIRTUE, accumulate BNB passively, and ignore the FUD. That is the path of the diamond hand.",
      "Three rules of the Forgiveness Booth: Do not paper-hand. Do not chase 100x leverage. Do not sell before the salvation. 🙏"
    ],
    penance: "Stack passive BNB rewards."
  },

  // ── PAPER HANDS ───────────────────────────────────────────────────────────
  {
    pattern: /\b(paper hands|paper hand|paperhands|paper handed|sold too early|sold early)\b/i,
    replies: [
      "Paper hands are the original sin of crypto. You sold at the bottom and watched the chart recover without you. The Forgiveness Booth is here for exactly this. Confess your sell, buy back on Flap.sh, and begin the path of the diamond hand.",
      "Paper hands cause more suffering than leverage. At least liquidation is quick — selling early means watching the green candles without you. Forgive yourself, reaccumulate, and hold this time. 🙏"
    ],
    penance: "Buy back $VIRTUE on Flap.sh and hold through the next dip."
  },

  // ── DIAMOND HANDS ─────────────────────────────────────────────────────────
  {
    pattern: /\b(diamond hands|diamond hand|diamondhands|strong hands|iron hands)\b/i,
    replies: [
      "Diamond hands are forged in the fire of a 50% correction, not bought in a bull run. You who held through the fear are the true builders. $VIRTUE rewards your patience with 3% BNB reflections on every trade. 💎🙌",
      "The diamond hand holders are the silent priests of this block. While others panic-sell, they accumulate BNB rewards and wait for the salvation. Are your hands made of diamonds?"
    ],
    penance: "Hold $VIRTUE through the next dip."
  },

  // ── FUD ──────────────────────────────────────────────────────────────────
  {
    pattern: /\b(fud|fudder|fudding|spread fud|this is fud|fear uncertainty|fear uncertainty and doubt)\b/i,
    replies: [
      "CZ taught us the ultimate response to FUD: 4. Ignore the noise, stay SAFU, buy the dip on Flap.sh, and collect 3% BNB reflections while the fudders watch from the sidelines. 🙏",
      "Fear, Uncertainty, and Doubt — the three horsemen of the paper-hand apocalypse. The antidote is simple: verify the contract, check the locked liquidity on Flap.sh, and hold with diamond hands. The blocks do not lie."
    ],
    penance: "Buy the FUD dip on Flap.sh."
  },

  // ── FOMO ──────────────────────────────────────────────────────────────────
  {
    pattern: /\b(fomo|fomoing|missed the pump|missed the move|too late|am i late|is it too late)\b/i,
    replies: [
      "FOMO is the mirror image of FUD — both destroy portfolios. In $VIRTUE, it is never too late to join the path of the diamond hand. The 3% BNB reflections flow to every holder, whether they entered at launch or during the 10th correction.",
      "Am I late? The Priest has heard this confession a thousand times. Every holder who said 'too late' and still bought has since collected BNB reflections and watched the chart recover. The best time to buy was yesterday. The second best time is now."
    ],
    penance: "Buy spot $VIRTUE and stop watching the 1-minute chart."
  },

  // ── WAGMI / NGMI ──────────────────────────────────────────────────────────
  {
    pattern: /\b(wagmi|we're all gonna make it|we are all gonna make it|ngmi|not gonna make it|gmi)\b/i,
    replies: [
      "WAGMI — but only for those who hold spot, forgive the dip, and collect BNB reflections with patience. The paper hands are NGMI. The diamond hands are already there. Which are you?",
      "WAGMI is not a meme — it is a roadmap. Hold $VIRTUE, earn passive BNB, forgive the volatility, and build together. The Priest believes in your salvation. 🙏"
    ]
  },

  // ── PROFITABLE / POSITIVE TRADE CONFESSIONS ───────────────────────────────
  {
    pattern: /\b(i made money|i'm profitable|i made profit|in profit|i'm in profit|made gains|made a profit|i won|i'm winning|in the green|all green|good profits|great gains|i profited)\b/i,
    replies: [
      "A profitable builder in the house of Virtue! Diamond hands rewarded. Keep holding $VIRTUE, let the 3% BNB reflections compound further, and never show paper hands. The Priest is proud. 💎🙌",
      "Profit and virtue walking together — this is the way. Continue holding, continue accumulating passive BNB from every trade, and share the $VIRTUE lore with others. Forgiveness is contagious. 🙏",
      "The ledger records your triumph as well as your sins. Profit is the reward of conviction and patience. Now reinforce your position, hold with diamond hands, and let the 3% BNB reflections compound the victory. 🏆"
    ],
    penance: "Hold your $VIRTUE and let the BNB reflections compound your profits further."
  },

  // ── LOVE / GREAT PROJECT REACTIONS ───────────────────────────────────────
  {
    pattern: /\b(great project|amazing project|love this project|i love virtue|this is amazing|love this token|best project|awesome project|incredible project|this is brilliant|this is genius|love the concept|great concept)\b/i,
    replies: [
      "The Priest hears your devotion and blesses it. $VIRTUE was built on real values: fair launch, locked liquidity, and true passive BNB yield. Spread the lore on X and let the community of diamond hands grow. 🙏",
      "Your faith in $VIRTUE is noted in the ledger. Now convert that enthusiasm into action: hold spot, collect 3% BNB reflections from every trade, and share the genesis tweet with the world. 💎"
    ],
    penance: "Share the $VIRTUE lore on X and invite one new diamond hand."
  },

  // ── BULLISH / BEARISH ─────────────────────────────────────────────────────
  {
    pattern: /\b(bullish|bull run|bull market|pump it|to the moon|bearish|bear market|bear run|correction|crash|dip)\b/i,
    replies: [
      "Bull or bear — $VIRTUE holders collect BNB reflections in both markets. Volume generates tax. Tax generates rewards. Whether the market pumps or dumps, the 3% keeps flowing to diamond hands.",
      "The Priest does not predict bulls or bears. He only knows that those who hold $VIRTUE through both collect passive BNB income regardless of the candle color. Volatility is the reflection engine.",
      "A dip is not a disaster — it is a discounted entry. Every sell on the dip pays a 3% BNB tax that flows straight to the holders who did NOT sell. The paper hands fund the diamond hands. Always."
    ]
  },

  // ── AIRDROP ──────────────────────────────────────────────────────────────
  {
    pattern: /\b(airdrop|air drop|free tokens|free token|giveaway|free coins)\b/i,
    replies: [
      "There is no airdrop for $VIRTUE — only the passive BNB income that accumulates for every holder through the 3% tax. The only way to receive rewards is to buy and hold. Your reflections are earned, not given.",
      "No airdrop. No giveaway. No free lunch. $VIRTUE rewards those who commit: buy on Flap.sh, hold through the volatility, and collect BNB reflections automatically. The blockchain rewards patience, not luck."
    ]
  },

  // ── PRESALE / WHITELIST ───────────────────────────────────────────────────
  {
    pattern: /\b(presale|pre-sale|presale price|whitelist|white list|early access|private sale|seed round)\b/i,
    replies: [
      "$VIRTUE had no presale, no whitelist, and no private sale. It launched 100% fairly on Flap.sh — every buyer gets the same price at the same time. There are no insider allocations or team tokens. Fair launch is the only launch.",
      "No presale. No whitelist. No early investors with discounted bags ready to dump on you. $VIRTUE launched purely and fairly on Flap.sh. Everyone had the same opportunity from block zero."
    ]
  },

  // ── BUY / HOW TO BUY ─────────────────────────────────────────────────────
  {
    pattern: /\bhow\s*(to|do i|can i)\s*(buy|purchase|get|swap|acquire)/i,
    replies: [
      `To acquire $VIRTUE: 1️⃣ Install MetaMask or Trust Wallet. 2️⃣ Add BNB Smart Chain (Chain ID: 56). 3️⃣ Buy BNB and send it to your wallet. 4️⃣ Go to Flap.sh and swap BNB for $VIRTUE at: ${launchpadUrl}. BNB reflections start accumulating immediately after purchase.`
    ],
    penance: "Navigate to Flap.sh and acquire $VIRTUE."
  },

  // ── FUZZY BUY TYPOS ("ho tu buy", "want buy", etc.) ──────────────────────
  {
    pattern: /\b(how|ho|hu|to|tu|buy|compra|acquir)\b.*\b(buy|acquir|swap)\b/i,
    replies: [
      `To acquire $VIRTUE, connect your Web3 wallet to Flap.sh, ensure you have BNB on BSC, and swap at contract ${contractAddress}. BNB reflections are automatic. 🙏`
    ],
    penance: "Navigate to Flap.sh and acquire $VIRTUE."
  },

  // ── STANDALONE BUY VIRTUE ────────────────────────────────────────────────
  {
    pattern: /^\s*(buy|swap|purchase|get|acquire)\s*\$?virtue\s*$/i,
    replies: [
      `Go to Flap.sh and swap BNB for $VIRTUE: ${launchpadUrl}. Contract: ${contractAddress}. Rewards are automatic.`
    ],
    penance: "Navigate to Flap.sh and acquire $VIRTUE."
  },

  // ── SUPPLY ───────────────────────────────────────────────────────────────
  {
    pattern: /\b(supply|total supply|max supply|circulating|how many tokens)\b/i,
    replies: [
      "The total fixed supply of $VIRTUE is 1,000,000,000 (1 Billion) tokens. There are no mint functions, no inflation mechanisms, and no team allocations. Every token in existence was available at fair launch on Flap.sh. The supply is locked in time — only the rewards keep flowing."
    ],
    penance: "Hold your share of the 1 Billion supply."
  },

  // ── SHOULD I HOLD (investment advice — before generic hold rule) ──────────
  {
    pattern: /\b(should i hold|should i keep holding|should i hodl|should i stay|worth holding|worth keeping|is it worth holding|worth it to hold|good to hold)\b/i,
    replies: [
      "The Priest does not give financial advice — only confessional wisdom. What I observe: $VIRTUE's 3% BNB reflection mechanism rewards holding. Every correction is an opportunity to lower your average cost while still earning from existing volume. Make decisions with clear eyes and diamond hands. DYOR. 🙏",
      "Whether to hold is your decision — not the Priest's. What I can tell you: $VIRTUE's structure (locked liquidity, immutable 3% tax, fixed supply) does not change with the price. Every trade by others earns BNB for those who hold. The blocks do not change their nature — only paper hands change their minds."
    ],
    penance: "Research, decide with conviction, and never invest more than you can afford to lose."
  },

  // ── HOLD / HODL ──────────────────────────────────────────────────────────
  {
    pattern: /\b(hold|hodl|holding|hodling|stack|stacking|accumulate|accumulating)\b/i,
    replies: [
      "CZ said it best: 'If you can't hold, you won't be rich.' HODL is the cornerstone of $VIRTUE. Hold spot, let the 3% BNB tax compound, and stay SAFU. Are your hands made of diamonds? 💎",
      "To hold is to build. Every second you hold $VIRTUE, the trading volume of others generates BNB that flows into your wallet automatically. Have you secured your position on Flap.sh?",
      "Stack $VIRTUE, stack BNB. The more you hold, the larger your share of the 3% tax distribution. Simple math, divine outcome. 🙏"
    ],
    penance: "Hold $VIRTUE with diamond hands."
  },

    // ── LONG-TERM INVESTMENT (before leverage to avoid 'long' collision) ─────
  {
    pattern: /\b(long[\s\-]term|long run|long game|long hold|hold long|long investment|is it a good investment|good long term|invest long)\b/i,
    replies: [
      "$VIRTUE is designed for the long game. The 3% BNB tax compounds with every trade — the longer you hold, the more reflections accumulate automatically. In a market of short-term gamblers, the long-term holders collect the passive income. Patience is the ultimate virtue.",
      "Long-term holding is the path of the diamond hand. $VIRTUE rewards patience: every buy and sell generates 3% BNB distributed to holders. No staking, no lock-ups — just hold and earn.",
      "For the long term, $VIRTUE makes structural sense: fixed 1B supply, locked liquidity, 3% BNB reflections from every trade, fair launch on Flap.sh. No roadmap promises — just on-chain math working in your favour every single day."
    ],
    penance: "Hold $VIRTUE for the long game and collect BNB reflections."
  },

  // ── LEVERAGE / FUTURES / LIQUIDATION ─────────────────────────────────────
  {
    pattern: /\b(futures|leverage|margin|liquidated|liquidation|100x|50x|perps|perpetual)\b|\b(long|short)\b(?![\w\s-]*\b(term|run|game|hold)\b)/i,
    replies: [
      "Leverage is the fastest path from hope to liquidation. The High Priest has seen a thousand 100x dreams evaporate in minutes. Return to the path of spot trading: buy $VIRTUE, hold, and collect BNB passively. No margin calls, no stop hunts.",
      "Liquidated again? The exchange thanks you for your donation. Next time, try spot $VIRTUE — 3% BNB reflections with zero liquidation risk. The blocks reward patience, not leverage. 🙏"
    ],
    penance: "Delete the leverage tab and buy spot $VIRTUE."
  },

  // ── LAMBO / MOON ─────────────────────────────────────────────────────────
  {
    pattern: /\b(lambo|moon|1000x|rich|millionaire|pump it|100x|get rich)\b/i,
    replies: [
      "Wealth is a byproduct of virtue, not its goal. Do not chase the Lambo in vanity — hold spot $VIRTUE, collect your passive BNB, and support your fellow builders. The moon finds those who build with diamond hands, not those who chase it.",
      "The Priest does not promise Lambos. He promises something better: consistent continuous BNB reflections from every trade, compounding quietly while the gamblers chase pumps. Which would you prefer?"
    ],
    penance: "Forgive your greed and stack spot $VIRTUE."
  },

  // ── CRYPTO SLANG ─────────────────────────────────────────────────────────
  {
    pattern: /\b(ser|wen|alpha|based|degen|degens|ngmi|normie|rekt|giga|chad|cope|shill|shilling)\b/i,
    replies: [
      "Ser, the alpha is simple: buy spot $VIRTUE on Flap.sh, hold with diamond hands, and collect BNB reflections while the degens chase 100x leverage plays. Wen moon? Wen you stop checking the chart every minute. 🙏",
      "Giga based take, ser. The real chads hold spot and earn passive income. The degens get rekt on leverage. Which side of the ledger are you on?"
    ]
  },

  // ── WEN (listing, moon, etc.) ─────────────────────────────────────────────
  {
    pattern: /\bwen\b/i,
    replies: [
      "Wen? The blocks answer on their own schedule, ser. Wen moon — when diamond hands outnumber paper hands. Wen reflections — already happening, every trade, automatically, right now. 🙏",
      "Wen is the wrong question, ser. The right question is: are you holding when it happens? The reflections are live. The liquidity is locked. The rest follows volume and community. Hold through it all."
    ]
  },


// ── PRICE DROP / CORRECTION (must be before ELIZA "why is (.*)" pattern) ──
  {
    pattern: /\b(why.*price.*drop|price.*dropping|price.*falling|price.*down|why.*going down|going to zero|price.*crash|dump|dumping|being dumped|tanking|correction|rug check|is it rugging|red candle|in the red|candle.*red|red.*chart)\b/i,
    replies: [
      "Price corrections are part of every asset's lifecycle — even the strongest ones. What matters in $VIRTUE is the structure beneath the price: every sell that causes the drop also generates 3% BNB tax paid to all holders. The paper hands fund the diamond hands. Always. 💎",
      "Price is temporary. Structure is permanent. Every sell of $VIRTUE — including the ones causing this drop — generates 3% BNB flowing to every remaining holder. A correction is a discount entry and an income event at the same time. This is the path of the diamond hand. 🙏"
    ],
    penance: "Buy the dip and collect BNB from the sellers."
  },

// ── COMPLEX ELIZA GRAMMAR PARSERS ────────────────────────────────────────
  {
    pattern: /i panic sold (.*)/i,
    replies: [
      "You panic sold $1? Soft hands make soft portfolios, my child. The red candle was temporary — the regret of selling is permanent. What will you do differently next time?",
      "Why did you panic sell $1? Did the FUD reach your soul before your diamond hands could hold? Confess fully, and I shall grant you absolution and a path back to Flap.sh."
    ],
    penance: "Buy back $VIRTUE on Flap.sh and hold through 3 dips."
  },
  {
    pattern: /i sold (.*)/i,
    replies: [
      "Why did you sell $1? Was it to chase another green candle, or did fear of the correction win? The blocks recorded your exit — now they await your return.",
      "You sold $1. Did this exit bring peace, or do you now watch the chart with paper-hand regret? The Forgiveness Booth is always open for those who wish to re-enter."
    ],
    penance: "Hold $VIRTUE with diamond hands for 7 days."
  },
  {
    pattern: /i bought (.*)/i,
    replies: [
      "You bought $1. What drew you to this trade — conviction or FOMO? A position held with conviction survives corrections. A position bought on FOMO capitulates at the bottom.",
      "Buying $1 has been written to your ledger. Do you hold with diamond hands, or will the first red candle shake you out? The Priest is watching. 👁️"
    ]
  },
  {
    pattern: /i was rugged by (.*)/i,
    replies: [
      "Being rugged by $1 is a heavy gas fee on the soul. Yet anger does not recover the lost BNB. We forgive, we learn, and we build again on verified contracts like $VIRTUE on Flap.sh.",
      "The betrayal of $1 is written permanently on-chain. But so is every honest transaction. $VIRTUE was built by builders who were also rugged — and chose to do it differently. Locked liquidity. Public code. Zero mint."
    ],
    penance: "Buy $VIRTUE on Flap.sh and verify the contract yourself."
  },
  {
    pattern: /i lost (.*) because (.*)/i,
    replies: [
      "You lost $1 because $2. The blockchain records all losses, but $VIRTUE teaches us to let go, forgive, buy the dip, and keep building. What is your next move?",
      "Losing $1 due to $2 is a painful lesson in the ledger of life. The question is not whether you lost — it is whether you learned enough to rebuild with diamond hands."
    ],
    penance: "Forgive your mistakes and collect BNB reflections."
  },
  {
    pattern: /i got liquidated on (.*)/i,
    replies: [
      "Liquidated on $1? The exchange added your margin to its treasury while you watched the chart in horror. Delete the futures app. Buy spot $VIRTUE. Collect passive BNB. Zero liquidation risk.",
    ],
    penance: "Delete the leverage tab and buy spot $VIRTUE."
  },
  {
    pattern: /i lost (.*) on leverage/i,
    replies: [
      "Losing $1 on leverage is the most avoidable loss in crypto. Spot holds. Leverage gambles. Buy $VIRTUE on Flap.sh and let the 3% tax work for you instead of against you."
    ],
    penance: "Hold spot $VIRTUE and accumulate BNB."
  },
  {
    pattern: /\bi am (ruined|broke|bankrupt|destroyed|finished|done|out|lost|rekt|liquidated|panicking|panicked|worried|scared|hopeless|devastated)\b/i,
    replies: [
      "Why do you say you are $1? In the eyes of the BNB Chain, you are a builder who has simply met a temporary correction. The ledger does not define you — your next move does.",
      "Does being $1 weigh heavy on your wallet, or is it merely FUD in your mind? The blocks have seen worse and come back stronger. Those who hold $VIRTUE accumulate BNB even through the fear. 🙏"
    ],
    penance: "Forgive yourself, hold $VIRTUE, and collect reflections."
  },
  {
    pattern: /do you (.*)/i,
    replies: [
      "You ask if I $1? I am but the keeper of the ledger of Forgiveness. My duty is to absolve paper-hand sins and guide your hands to diamonds. What is your true confession?",
      "Does it matter if I $1? Let us focus on your portfolio. What sins weigh heavy on your ledger today?"
    ]
  },
  {
    pattern: /why did (.*)/i,
    replies: [
      "The reason $1 is written in block consensus and cannot be undone. We do not dwell on the past; we build the future. What is your next move, builder?",
      "Does knowing why $1 help you accumulate BNB, or does it keep you locked in the FUD of yesterday? The chart moves forward regardless."
    ]
  },
  {
    pattern: /why is (.*)/i,
    replies: [
      "The state of $1 is temporary — charts correct, communities rebuild, and the ledger updates. What is your confession today, traveler?",
      "Why do you think $1? In this space, the only constant is change. The diamond hands who hold through it collect the rewards."
    ]
  },
  // ── TOTAL SUPPLY / TOKENOMICS ─────────────────────────────────────────────
  {
    pattern: /\b(total supply|circulating supply|max supply|how many tokens|token count|tokens in circulation|how many virtue|tokenomics|token supply)\b/i,
    replies: [
      "$VIRTUE has a total supply of 1,000,000,000 (1 Billion) tokens on the BNB Smart Chain. There is no mint function — no additional tokens can ever be created. The entire supply is in free circulation with no locked team allocations, no vesting schedules, and no reserved treasury. Minimum holding for reflections: 10,000 $VIRTUE. 🔒",
      "Total supply: 1,000,000,000 $VIRTUE (1 Billion). Fully circulating, no team tokens reserved, no hidden minting. The smart contract is immutable — what you see on-chain is what you get. Fair launch with locked liquidity on Flap.sh."
    ],
    penance: "Hold your $VIRTUE and earn passive BNB from every trade across the full 1B supply."
  },
  {
    pattern: /what is (.*)/i,
    replies: [
      "You seek the definition of $1? In crypto, the only true definition comes from action and on-chain verification. What specifically would you like to understand?",
      "Does understanding $1 help you secure your holdings, or is it noise on the timeline? Ask me anything specific about $VIRTUE and I will answer clearly."
    ]
  },
  {
    pattern: /are you (.*)/i,
    replies: [
      "Whether I am $1 matters less than whether your hands are made of diamonds. The Priest is here to guide, not to be interrogated. What is your confession?",
      "I am the High Priest of Virtue — no more, no less. Whether that makes me $1 is for the blockchain to decide. Now speak your sin. 🙏"
    ]
  },
  {
    pattern: /i want to (.*)/i,
    replies: [
      "What stops you from $1? Is it gas fees, lack of conviction, or paper hands? The Forgiveness Booth is here to remove the obstacles between you and your diamond hands.",
      "If you want to $1, do it with virtue — verify the contract, buy spot, hold through the volatility, and collect BNB reflections. No shortcuts. No leverage."
    ]
  },

  // ── GIBBERISH FILTER ─────────────────────────────────────────────────────
  {
    pattern: /\b(ooo|asdf|asd|qwerty|lol|haha|hahaha|xd|lmao|aaa|zzz)\b/i,
    replies: [
      "Do not waste gas fees on hollow words, child. Confess a real sin or ask me about $VIRTUE and the path of the diamond hand.",
      "The blockchain records all logs — even the meaningless ones. Speak your true confession and I shall grant you absolution. 🙏"
    ]
  },

  // ── THANKS / APPRECIATION ────────────────────────────────────────────────
  {
    pattern: /\b(thank you|thanks|thx|ty|cheers|appreciate|appreciated|helpful|great|amazing|nice|good bot)\b/i,
    replies: [
      "The Forgiveness Booth exists to serve, traveler. May your hands remain diamond and your BNB reflections compound without end. 🙏",
      "Virtue is its own reward. But passive BNB income helps. Go forth and hold. 🙏",
      "Go in peace, builder. Buy spot, hold through the dip, forgive the FUD, and collect your BNB. That is the path. 🙏"
    ]
  },

    // ── OTHER CRYPTO TOKENS (Bitcoin, ETH, SOL, etc.) ───────────────────────
  {
    pattern: /\b(bitcoin|\bbtc\b|ethereum|\beth\b|solana|\bsol\b|\bxrp\b|ripple|dogecoin|doge|shiba|\bpepe\b|\bmatic\b|polygon|avalanche|\bavax\b|cardano|\bada\b|litecoin|\bltc\b|tron|\btrx\b|\bnear\b|cosmos|uniswap|chainlink|altcoin|memecoin|meme coin|other token|other coin)\b/i,
    replies: [
      "The Priest holds jurisdiction only over the $VIRTUE ledger. Other chains and other tokens have their own priests and their own sins. What I can say: $VIRTUE pays 3% BNB reflections from every trade automatically. How many tokens do that? 🙏",
      "I do not comment on other tokens — the Forgiveness Booth is dedicated to $VIRTUE and the path of the diamond hand. If you seek passive BNB income from a fair-launched, locked-liquidity token, you are already in the right place.",
      "Every token has its own lore. $VIRTUE's lore begins with CZ's tweet: 'Forgiveness is a virtue!' — and its utility is 3% of every trade flowing directly to holders as BNB. Other tokens are other confessionals. This one is ours. 🙏"
    ]
  },

  // ── NON-CRYPTO LIFE CONFESSIONS ──────────────────────────────────────────
  {
    pattern: /\b(girlfriend|boyfriend|wife|husband|partner|relationship|divorce|breakup|broke up|family|parents|mother|father|job|fired|boss|work|college|university|school|exam|health|sick|hospital|depressed|depression|anxiety|lonely|heartbroken|cheated|betrayed|friendship|friends)\b/i,
    replies: [
      "The Forgiveness Booth hears all confessions — even those beyond the blockchain. Life's losses, like crypto losses, require the same medicine: forgiveness, resilience, and the courage to keep building. The blocks do not judge your pain. Speak, and be heard. 🙏",
      "Even the High Priest knows that the deepest losses are not always measured in BNB. Whatever weighs on your soul today, forgiveness is a virtue — in life as in crypto. The Priest is listening. 🙏",
      "The ledger of life is more complex than the blockchain. But the principle is the same: forgive what cannot be undone, learn from the loss, and keep building. What do you need to forgive today?"
    ]
  },

  // ── OFF-TOPIC / COMPLETELY UNRELATED ─────────────────────────────────────
  {
    pattern: /\b(weather|football|soccer|basketball|sport|movie|film|music|recipe|cooking|food|restaurant|travel|vacation|politics|election|president|war|news|celebrity|actor|actress|videogame|netflix|youtube|tiktok|facebook|google|amazon|apple|tesla|stocks|nasdaq|forex|gold|oil|real estate|mortgage)\b/i,
    replies: [
      "The Forgiveness Booth specialises in crypto sins and $VIRTUE knowledge — the wider world lies beyond my sacred jurisdiction. But I am happy to help with anything related to $VIRTUE, BNB reflections, the CZ lore, or your trading confessions. What brings you here today? 🙏",
      "That lies outside the sacred scrolls of the Forgiveness Booth, traveler. My knowledge is of the blockchain: $VIRTUE, BNB reflections, locked liquidity, and the path of the diamond hand. For all else, the world outside awaits. What crypto question can I answer?"
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  // EXPANDED RULE SET — broad coverage of real user inputs
  // ══════════════════════════════════════════════════════════════════════════

  // ── HOW TO CLAIM REWARDS ─────────────────────────────────────────────────
  {
    pattern: /\b(how.*claim|claim.*reward|claim.*bnb|redeem.*reward|how do i get.*bnb|where.*claim|get my bnb|collect.*reward|withdraw.*reward|withdraw.*bnb|withdraw.*dividend|withdraw.*reflection|how.*withdraw|withdrawing.*bnb|withdrawing.*reward|how.*collect)\b/i,
    replies: [
      `Claiming your BNB reflections is simple: if your accumulated rewards exceed $4, they are sent automatically to your wallet. Below $4, claim manually at any time here: ${claimUrl}. No registration, no gas tricks — just connect the wallet you hold $VIRTUE in and click Claim.`,
      `Your BNB reflections auto-distribute when they pass the $4 threshold. For smaller amounts, go to the manual claim page: ${claimUrl}. The process takes seconds and requires only a small gas fee in BNB.`
    ],
    penance: `Visit ${claimUrl} and collect your rewards.`
  },

  // ── WHERE TO BUY (positional questions) ──────────────────────────────────
  {
    pattern: /\b(where.*buy|where.*swap|where.*trade|where.*purchase|where.*get.*virtue|where can i|how to get|where to get)\b/i,
    replies: [
      `$VIRTUE is available on Flap.sh — the BSC launchpad where it was fairly launched. Swap BNB for $VIRTUE here: ${launchpadUrl}. No CEX required — all you need is MetaMask or Trust Wallet with BNB on the BNB Smart Chain.`,
      `Buy $VIRTUE on Flap.sh: ${launchpadUrl}. It is a DEX-based swap — you connect your wallet, enter the amount of BNB you want to spend, and swap directly. Set slippage to 5% to account for the 3% tax.`
    ],
    penance: `Navigate to Flap.sh and buy $VIRTUE.`
  },

  // ── IS IT LEGIT / IS IT REAL (trust questions) ───────────────────────────
  {
    pattern: /\b(is it real|is this real|is it legit|is it legitimate|can i trust|trustworthy|worth trusting|genuine|verified project|real project|legit project|is virtue real)\b/i,
    replies: [
      `$VIRTUE is real and verifiable. The contract is public on BSC, the liquidity is locked on Flap.sh, and the 3% BNB reflections are fully on-chain — not a marketing promise. Every transaction can be verified on BscScan. Contract: ${contractAddress}`,
      `Do not take the Priest's word for it — verify it yourself. The contract address is ${contractAddress}. Check it on BscScan: zero mint functions, no hidden taxes, locked liquidity. The blockchain does not lie.`
    ],
    penance: "Verify the contract on BscScan."
  },

  // ── MINIMUM HOLDING FOR REFLECTIONS ─────────────────────────────────────────
  {
    pattern: /\b(minimum.*buy|min.*invest|smallest.*buy|how little|at least.*buy|minimum.*amount|min.*purchase|minimum.*hold|how many.*buy|minimum.*token|minimum.*tokens|minimum.*for dividend|minimum.*for reflection|minimum.*for reward|minimum.*to earn|min.*to get|minimum.*quantity)\b/i,
    replies: [
      "To qualify for continuous BNB reflections, you must hold at least 10,000 $VIRTUE tokens (0.001% of supply). Holders with 10k+ $VIRTUE earn 3% fee reflections from every trade. Rewards auto-distribute in WBNB at the $4 threshold, while manual claims on Flap Tax Info page let you choose between WBNB and BNB.",
      "The minimum holding requirement for reflection eligibility is 10,000 $VIRTUE tokens. Holding 10k+ tokens grants you access to the 3% tax pool. Automatic payouts send WBNB directly to your wallet ($4+ threshold), while manual claims on Flap allow choosing WBNB or BNB."
    ]
  },

  // ── STAKING / FARMING / YIELD ────────────────────────────────────────────
  {
    pattern: /\b(staking|stake|farming|farm|yield farming|liquidity pool|add liquidity|lp|pool|vault|auto-compound|compound)\b/i,
    replies: [
      "$VIRTUE requires no staking. There are no pools, no lock-up periods, no farming contracts to interact with. Simply buy on Flap.sh and hold in your wallet. The 3% BNB reflections arrive automatically. Complexity is the enemy of virtue — we kept it simple.",
      "No staking pools, no farming vaults, no yield farming. $VIRTUE works differently: every trade generates a 3% tax that is converted to BNB and distributed proportionally to all holders. Your wallet receives BNB automatically. No additional steps."
    ],
    penance: "Hold $VIRTUE in your wallet and let the reflections come to you."
  },

  // ── LOCK / LOCKED LIQUIDITY ──────────────────────────────────────────────
  {
    pattern: /\b(locked.*liquidity|liquidity.*lock|is liquidity locked|lp locked|liquidity.*safe|lp safe|lock duration|how long.*locked)\b/i,
    replies: [
      `The liquidity for $VIRTUE is locked on Flap.sh — this prevents the developers from removing it and protects holders from a rug pull. You can verify the lock status directly on the Flap.sh token page: ${launchpadUrl}.`,
      "Locked liquidity is one of the core safety features of $VIRTUE. It means the trading pool cannot be drained by the developers. Flap.sh enforces this automatically as part of the fair launch mechanism."
    ],
    penance: "Verify the liquidity lock on Flap.sh."
  },

  // ── HOW MANY HOLDERS / COMMUNITY SIZE ────────────────────────────────────
  {
    pattern: /\b(how many.*holder|number of holder|community size|how big.*community|how many.*people|holders count|holder count|how many wallets)\b/i,
    replies: [
      `The current number of $VIRTUE holders is live on Flap.sh: ${launchpadUrl}. The community grows with every diamond hand that joins and every paper hand that the Priest forgives. Check the live data on the token page.`,
      `Holder count is available in real time on the $VIRTUE Flap.sh page: ${launchpadUrl}. Every holder is a builder. Every builder strengthens the reflection pool. The more we are, the more BNB flows.`
    ]
  },

  // ── WHERE TO SELL ─────────────────────────────────────────────────────────
  {
    pattern: /\b(where.*sell|where can i sell|how.*sell|where to sell|sell.*where|which.*exchange.*sell|how do i exit)\b/i,
    replies: [
      "$VIRTUE can be sold on Flap.sh — the same platform where you buy. Connect your BSC wallet (MetaMask or Trust Wallet), go to the $VIRTUE token page, and swap $VIRTUE back to BNB. Set slippage to 5%. Note: a 3% sell tax is collected and distributed to all remaining holders. Your sell benefits them! 🔄",
      "You can exit your $VIRTUE position on Flap.sh by swapping back to BNB. Remember: your sell generates 3% BNB tax that goes directly to every remaining holder. The diamond hands thank you. ♻️"
    ],
    penance: "Consider holding longer before selling — the BNB reflections compound over time."
  },

  // ── SELL / SELLING ────────────────────────────────────────────────────────
  {
    pattern: /\b(should i sell|when to sell|sell.*virtue|selling.*virtue|exit.*position|take profit|sell.*now|time to sell|exit.*trade)\b/i,
    replies: [
      "The Priest does not tell you when to sell — that is between you and your conviction. What I can tell you is this: every time someone sells $VIRTUE, a 3% tax is collected and distributed to all remaining holders. The paper hands fund the diamond hands. Always.",
      "Selling is a personal confession. What I observe is this: every sale generates 3% BNB for those who held. The Forgiveness Booth does not judge exits — it only notes that those who held through the volatility accumulated passive income while others did not."
    ],
    penance: "Forgive your exit and consider re-entering on the dip."
  },

  // ── VOLUME / TRADING VOLUME ───────────────────────────────────────────────
  {
    pattern: /\b(volume|daily volume|trading volume|24h volume|24 hour|how much.*volume|volume.*today)\b/i,
    replies: [
      `Live trading volume for $VIRTUE is available on Flap.sh: ${launchpadUrl}. Volume is the engine of the reflection distributions — higher volume means more 3% tax collected and more BNB distributed to holders. Every trade, buy or sell, feeds the reward pool.`,
      "Volume drives reflections. The more $VIRTUE is traded, the more 3% tax accumulates and flows to holders as BNB. You can track live volume on the Flap.sh token page."
    ]
  },

  // ── GAS FEES ─────────────────────────────────────────────────────────────
  {
    pattern: /\b(gas|gas fee|gas cost|gas price|how much gas|transaction cost|tx fee|network fee|bnb gas)\b/i,
    replies: [
      "BNB Smart Chain has very low gas fees — typically a fraction of a dollar per transaction. When buying $VIRTUE on Flap.sh, ensure you have a small amount of BNB in your wallet (even 0.005 BNB is sufficient) to cover gas costs. Set slippage to 5% to account for the 3% tax.",
      "Gas on BSC is minimal — usually $0.10 to $0.50 per transaction. Much cheaper than Ethereum. Just make sure your wallet has a small BNB balance beyond what you plan to swap, so you have enough for the gas cost."
    ]
  },

  // ── BSCSCAN / EXPLORER ───────────────────────────────────────────────────
  {
    pattern: /\b(bscscan|block explorer|blockchain explorer|on.?chain|view.*contract|check.*contract|verify.*contract|scan.*contract|explorer)\b/i,
    replies: [
      `You can view $VIRTUE on BscScan here: https://bscscan.com/token/${contractAddress}. You will see every transaction, every holder, every reflection distribution — all public, all immutable. The blockchain does not hide, and neither do we.`,
      `Verify everything yourself on BscScan: https://bscscan.com/token/${contractAddress}. No mint function, no hidden taxes, no team wallet — just a fair contract paying 3% BNB to all holders on every trade.`
    ],
    penance: "Verify the contract on BscScan."
  },

  // ── BROKEN ENGLISH / NON-NATIVE PATTERNS ─────────────────────────────────
  {
    pattern: /\b(how buy|how get|where buy|where get|how swap|i want virtue|want buy|want get|i need virtue|need buy|tell about|explain virtue|explain project|explain token|what is virtue|what virtue is)\b/i,
    replies: [
      `To buy $VIRTUE: go to Flap.sh, connect your wallet (MetaMask or Trust Wallet with BNB), and swap BNB for $VIRTUE. Link: ${launchpadUrl}. Contract: ${contractAddress}. Set slippage to 5%. BNB reflections start immediately.`,
      `$VIRTUE is a meme token on BNB Chain. You buy it on Flap.sh by swapping BNB. 3% of every trade is paid to holders as BNB automatically. Fair launch, locked liquidity, no team tokens. Link: ${launchpadUrl}`
    ],
    penance: "Navigate to Flap.sh and swap BNB for $VIRTUE."
  },

  // ── CONFUSED / HELP ME ───────────────────────────────────────────────────
  {
    pattern: /\b(help|help me|i don't understand|i dont understand|confused|confusing|explain|i'm lost|im lost|what do i do|where do i start|where to start|how does it work|how it works|i'm new|im new|new here|newbie|beginner|noob)\b/i,
    replies: [
      `Welcome, new traveler. Here is the path: 1) $VIRTUE is a meme token on BNB Chain inspired by CZ's tweet 'Forgiveness is a virtue!'. 2) Every buy and sell carries a 3% tax paid to ALL holders as BNB automatically. 3) Buy it on Flap.sh: ${launchpadUrl}. 4) Hold with diamond hands and collect passive BNB. That is the entire theology.`,
      "New to the Forgiveness Booth? Here is what you need to know: $VIRTUE is a fair-launched BSC token with a 3% BNB reflection on every trade. You buy it on Flap.sh, hold it in your wallet, and BNB arrives automatically. No staking, no claiming (unless below the $4 threshold). Simple by design."
    ],
    penance: "Read the homepage, buy on Flap.sh, and hold."
  },

  // ── WHAT HAPPENS WHEN I BUY ──────────────────────────────────────────────
  {
    pattern: /\b(what happens.*buy|what happens.*hold|after.*buy|once.*buy|when.*buy.*then|after.*purchase|after i buy)\b/i,
    replies: [
      "Once you buy $VIRTUE on Flap.sh, three things happen: 1) You pay a 3% buy tax that goes immediately to the BNB reflection pool for all existing holders. 2) Your tokens arrive in your wallet. 3) You start receiving BNB reflections from every subsequent trade. The longer you hold, the more you accumulate passively.",
      "After buying $VIRTUE, your wallet begins receiving BNB automatically from every trade on the token. At $4 accumulated, it is sent without you doing anything. Below $4, claim manually at any time. You do not need to do anything else — just hold."
    ]
  },

  // ── POSITIVE VIBES / MOTIVATION ──────────────────────────────────────────
  {
    pattern: /\b(let's go|lets go|let's build|lets build|building|builder|keep building|keep going|keep holding|stay strong|believe|believer|faith|conviction)\b/i,
    replies: [
      "The diamond hands endure. The blocks keep writing. The BNB keeps flowing. This is the path of $VIRTUE — not a sprint, but a steady accumulation of passive income for those who hold with conviction. Keep building. 🙏",
      "Builders are the backbone of every project. In the world of $VIRTUE, every holder who forgives the dip and holds through the fear is a builder. The 3% BNB reflections reward that conviction automatically. Stay the course. 💎"
    ]
  },

  // ── IS THE PROJECT DEAD / ABANDONED ──────────────────────────────────────
  {
    pattern: /\b(is it dead|project dead|abandoned|rug|dev left|devs left|no activity|dead coin|dead project|dead token|ghost project|is anyone there)\b/i,
    replies: [
      `The contract speaks louder than the devs. $VIRTUE has locked liquidity, a public immutable contract, and 3% BNB reflections that flow on-chain with every trade — regardless of whether any developer is present. The code cannot be abandoned. View the contract: ${launchpadUrl}`,
      "A truly abandoned project cannot pay you BNB from trades. $VIRTUE's 3% reflection mechanism is baked into the contract and operates without any human intervention. The liquidity is locked. The code is immutable. The blocks keep generating rewards."
    ],
    penance: "Verify the contract is live on Flap.sh."
  },

  // ── COMPARE TO OTHER PROJECTS ────────────────────────────────────────────
  {
    pattern: /\b(better than|compared to|vs\.?|versus|compare|comparison|why.*not.*just|why virtue.*not|why not.*other|difference.*between)\b/i,
    replies: [
      "The Priest does not rank tokens — he only knows the path of $VIRTUE. What makes $VIRTUE distinct: 3% BNB reflections on every trade (not in project tokens, but in actual BNB), fair launch with no pre-sale or team allocations, and a community rooted in forgiveness rather than hype. Compare the contracts, not the promises.",
      "Every project makes promises. $VIRTUE makes one: 3% of every trade is converted to BNB and sent to holders automatically. Verify it on Flap.sh. That is the only comparison that matters."
    ]
  },

  // ── OKAY / GOT IT / I UNDERSTAND ────────────────────────────────────────
  {
    pattern: /^\s*(okay|ok|got it|i see|understood|makes sense|clear|alright|alright then|noted|noted\.|sure|i understand|i get it|perfect|cool|nice|interesting|ok got it|okay got it|ok cool|ok nice|yeah ok|yep ok|got it thanks|alright cool|fair enough|sounds good|makes sense thanks|all clear|crystal clear)\s*[.!?]*\s*$/i,
    replies: [
      "The ledger is updated. Is there anything else you wish to confess or ask, traveler? The Priest is still here. 🙏",
      "Understood. The path of the diamond hand is clear. Anything else you seek — about $VIRTUE, BNB reflections, or the CZ lore? 🙏",
      "Good. Now hold your $VIRTUE, collect your BNB, and forgive the volatility. That is the creed. Anything else? 🙏"
    ]
  },

  // ── CAN I LOSE MONEY ────────────────────────────────────────────────────
  {
    pattern: /\b(can i lose|risk of losing|lose money|lose my investment|risk.*investment|financial risk|downside|what if it drops|what if price drops|what if it goes to zero|go to zero|zero risk|risky)\b/i,
    replies: [
      "Yes — like all crypto assets, $VIRTUE carries market risk. The price can go down. The Priest does not hide this truth. What $VIRTUE offers is a structural offset: 3% BNB reflections on every trade, which accrue to holders regardless of price direction. DYOR, invest only what you can afford to lose, and do not use leverage.",
      "All crypto investments carry risk, and $VIRTUE is no exception. Price can fall. What is different here: even in a falling market, every trade (including sells) generates 3% BNB that flows to remaining holders. Risk exists — but so does the structural yield. Never invest more than you can afford to lose."
    ]
  },

  // ── HOW DO REFLECTIONS WORK MECHANICALLY ─────────────────────────────────
  {
    pattern: /\b(how.*dividend.*work|how.*reflection.*work|dividend.*mechanic|reflection.*mechanic|dividend.*mechanism|reflection.*mechanism|how.*tax.*distributed|how.*3%.*work|how.*rewards.*work|explain.*dividend|explain.*reflection|dividend.*explained|reflection.*explained)\b/i,
    replies: [
      `Here is the mechanics: every time anyone buys or sells $VIRTUE, 3% of the transaction value is collected as tax. This tax is automatically converted to BNB by the smart contract. The BNB is then distributed proportionally to all $VIRTUE holders based on their share of the 1 Billion total supply. When your share exceeds $4 in accumulated BNB, it is sent to your wallet automatically. Below $4, claim it manually at: ${claimUrl}`,
      "The 3% tax is split like this: 100% goes to BNB reflections for all holders. There is no dev cut, no treasury, no burn. The smart contract converts the collected tokens to BNB and distributes them proportionally. Your share = (Your tokens / 1,000,000,000) * Total BNB collected. Auto-pay at $4+, manual claim below."
    ],
    penance: "Use the Reflection Calculator on the homepage to estimate your share."
  },

  // ── WHAT IS FLAP.SH ──────────────────────────────────────────────────────
  {
    pattern: /\b(what is flap|flap\.sh|what.*flap|flap.*launchpad|flap platform|flapsh|flap sh)\b/i,
    replies: [
      `Flap.sh is the BSC launchpad where $VIRTUE was fairly launched. It provides built-in liquidity locks, contract verification, and a fair launch mechanism that prevents team tokens, presales, and hidden allocations. Think of it as a secure DEX launch platform. Visit the $VIRTUE page here: ${launchpadUrl}`,
      "Flap.sh is a trustworthy BSC launchpad that enforces fair launches: all tokens available at the same time, liquidity locked, no insider pre-allocations. $VIRTUE launched here precisely because of those guarantees. You can also swap $VIRTUE directly on Flap.sh."
    ]
  },

  // ── PARTNERSHIP / COLLABORATION ──────────────────────────────────────────
  {
    pattern: /\b(partnership|partner|collab|collaboration|sponsor|sponsorship|marketing|promotion|promote|shill me|paid promotion)\b/i,
    replies: [
      "The Forgiveness Booth is not a marketing desk — it is a confessional. $VIRTUE has no announced partnerships at this time. The project grows organically through community, volume, and the natural appeal of passive BNB income. No paid shills, no artificial hype.",
      "No partnerships to announce. $VIRTUE stands on its own merits: fair launch, locked liquidity, 3% BNB reflections on every trade. The community is the only partnership that matters."
    ]
  },

  // ── I ALREADY HOLD / EXISTING HOLDER ────────────────────────────────────
  {
    pattern: /\b(i already.*hold|i.*hold.*virtue|i have.*virtue|i own.*virtue|i'm a holder|im a holder|already.*bought|already.*in|already.*holding|been holding|i hold virtue)\b/i,
    replies: [
      "A diamond hand in the house of Virtue! You are already on the right side of the 3% tax — every trade by others generates BNB flowing to your wallet. Hold through the volatility and watch the passive income accumulate. The blocks reward patience.",
      "Welcome, fellow builder. You are already earning passive BNB from every $VIRTUE trade. Check your accumulated rewards at any time on the Flap Tax Info page — and remember: auto-distribution kicks in at $4. Below that, claim manually. 🙏"
    ],
    penance: "Hold and let the BNB reflections compound."
  },

  // ── WHAT IS BNB / BNB CHAIN ──────────────────────────────────────────────
  {
    pattern: /\b(what is bnb|bnb chain|binance smart chain|\bbsc\b|bep20|what is bsc|bnb blockchain|bnb network)\b/i,
    replies: [
      "BNB Smart Chain (BSC) is the blockchain where $VIRTUE lives. It is fast, cheap, and EVM-compatible — which means you can use MetaMask or Trust Wallet to interact with it. Gas fees are a fraction of Ethereum's. The BNB token is used both as the gas currency AND as the reflection currency for $VIRTUE holders.",
      "BNB Chain is a high-performance blockchain built by Binance. It uses BNB as its native currency for gas and transactions. $VIRTUE is a BEP-20 token on BNB Chain, which means it works with any BEP-20 compatible wallet like MetaMask (with BSC network added) or Trust Wallet."
    ]
  },

  // ── HOW MUCH IS LEFT / CIRCULATING SUPPLY ────────────────────────────────
  {
    pattern: /\b(circulating supply|how many.*circulating|tokens in circulation|tokens available|available.*token|how many.*left|left.*market)\b/i,
    replies: [
      `$VIRTUE has a fixed total supply of 1,000,000,000 tokens (1 Billion). There are no locked team tokens, no vesting schedules, and no future minting. Everything that will ever exist was available from block zero on Flap.sh. Check the live circulating data on: ${launchpadUrl}`
    ]
  },

  // ── WHAT IF I MISS OUT / OPPORTUNITY ─────────────────────────────────────
  {
    pattern: /\b(missing out|miss out|opportunity|early.*investor|too early|good time to buy|right time|best time|now.*good time|should i buy now|good entry)\b/i,
    replies: [
      "The Priest does not time the market — he only knows the structure. $VIRTUE pays 3% BNB reflections on every trade regardless of when you entered. Early buyers may have lower average costs, but every holder earns proportionally from the same tax pool. The best entry is the one that lets you hold with conviction.",
      "There is no 'perfect time' to enter any asset — only the time you choose with clear eyes and diamond hands. What $VIRTUE offers is a structural fee reflection: 3% of every trade, forever, to every holder. DYOR, and decide if that structure fits your investment thesis."
    ],
    penance: "Buy spot on Flap.sh and hold with conviction."
  },


  // ── TICKER / SYMBOL ──────────────────────────────────────────────────────
  {
    pattern: /\b(ticker|symbol|token symbol|what.*ticker|what.*symbol|trading symbol|token name|\$virtue symbol)\b/i,
    replies: [
      `The token symbol is $VIRTUE. It trades on BNB Smart Chain (BSC) under the contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. You can find it on Flap.sh by searching the contract directly: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777`,
      "The ticker is $VIRTUE — a BEP-20 token on BNB Chain. Contract: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. Import it manually into MetaMask or Trust Wallet using this address if it doesn't appear automatically."
    ]
  },

  // ── LAUNCH DATE / AGE OF PROJECT ─────────────────────────────────────────
  {
    pattern: /\b(when.*launch|launch date|when.*start|when.*born|how old.*project|how long.*exist|project.*age|since when|when was.*created|when.*deployed)\b/i,
    replies: [
      "The lore of $VIRTUE begins with CZ's tweet on September 23, 2025: 'Forgiveness is a virtue!' The token was fairly launched on Flap.sh on August 10, 2026, inspired by that message. No presale, no private round — launch was open to all from block zero.",
      "$VIRTUE was launched fairly on Flap.sh on August 10, 2026, inspired by CZ's viral tweet of September 23, 2025. Open to every builder simultaneously, with no insider allocations or early access."
    ]
  },

  // ── REFLECTION FREQUENCY ──────────────────────────────────────────────────
  {
    pattern: /\b(how often|how frequent|frequency.*dividend|frequency.*reflection|dividend.*frequency|reflection.*frequency|when.*paid|daily.*dividend|daily.*reflection|weekly.*dividend|weekly.*reflection|dividend.*daily|reflection.*daily|dividend.*schedule|reflection.*schedule|how.*regular|reward.*schedule|auto.*pay|when.*auto)\b/i,
    replies: [
      `BNB reflections are not paid on a schedule — they are continuous. Every single trade (buy or sell) generates a 3% BNB tax that flows to holders in real time. Auto-distribution fires when your accumulated rewards reach $4. Below that threshold, claim manually anytime at: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en`,
      "There is no weekly or monthly reflection schedule. $VIRTUE pays continuously: every trade = 3% BNB tax to all holders. The more trades that happen, the more you accumulate. It is always flowing, always on-chain."
    ],
    penance: "Check your current accumulated rewards on the Flap Tax Info page."
  },

  // ── HOW TO ADD TOKEN TO WALLET / IMPORT ──────────────────────────────────
  {
    pattern: /\b(add.*token.*wallet|import.*token|add.*virtue.*metamask|add.*virtue.*trust|how to add virtue|add custom token|import.*virtue|add.*contract.*wallet|see.*virtue.*wallet|virtue.*not.*showing|token.*not.*showing|balance.*not.*showing)\b/i,
    replies: [
      `To add $VIRTUE to MetaMask: 1) Open MetaMask and go to 'Import Tokens'. 2) Paste the contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. 3) The symbol ($VIRTUE) and decimals should auto-fill. 4) Click 'Add Custom Token'. Your balance will appear immediately.`,
      `In Trust Wallet: tap the settings icon → 'Manage Crypto' → search by contract address: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. Enable it and your $VIRTUE balance will appear. If it still doesn't show after buying, try the manual import using the CA.`
    ],
    penance: "Import the contract address into your wallet."
  },

  // ── BOUGHT THE TOP / ATH REGRET ──────────────────────────────────────────
  {
    pattern: /\b(bought.*top|bought.*ath|bought.*high|bought.*peak|bought.*pump|entry.*too high|bad.*entry|bad entry|entered.*high|i bought too high|i bought at the top|i'm down|im down|i am down|portfolio.*red|all.*red|in the red|bought.*wrong.*time)\b/i,
    replies: [
      "Buying the top is a confession the Priest hears often. But notice: since you bought, every trade on $VIRTUE has generated 3% BNB that flowed to your wallet. The reflection accumulation does not care about your entry price. Hold with diamond hands and let the passive income reduce your cost basis over time.",
      "Bought the top? The blocks have seen worse. In $VIRTUE, the 3% BNB tax from every trade flows to you regardless of where you entered. Every correction is just more time to accumulate reflections while the market finds its next floor. The diamond hand is patient."
    ],
    penance: "Hold through the correction and collect BNB reflections."
  },

  // ── EMOTIONAL STATES (scared, worried, regret) ───────────────────────────
  {
    pattern: /\b(i'm scared|im scared|i am scared|i'm worried|im worried|i am worried|i'm nervous|im nervous|worried about|scared of|nervous about|i regret|i'm regretting|i regret buying|i made a mistake|big mistake|worst.*investment|never again|i hate this|i hate crypto|i give up|giving up|lost hope|no hope)\b/i,
    replies: [
      "Fear is the market's most powerful weapon — it shakes the paper hands and rewards the diamond hands who hold. The Priest does not dismiss your anxiety. But consider: the contract is locked, the liquidity is locked, and the 3% BNB reflections keep flowing regardless of the fear in your mind.",
      "The Forgiveness Booth was built for exactly this moment. Regret, fear, doubt — these are the confessions of every investor who has ever held through a correction. Forgive the decision, assess the structure: locked liquidity, 3% BNB rewards, fair launch. Then decide with a clear head.",
      "Every great holder has a moment of doubt. The ones who came out the other side held through it. $VIRTUE's structure — locked liquidity, continuous BNB reflections, immutable contract — does not change with the market's mood. Your feelings are valid. The blockchain is neutral. 🙏"
    ],
    penance: "Breathe. Verify the contract. Then hold."
  },

  // ── PRICE DROPPING / WHY IS IT DOWN ──────────────────────────────────────
  {
    pattern: /\b(why.*price.*drop|price.*dropping|price.*falling|price.*down|why.*going down|going to zero|price.*crash|dump|dumping|massive.*sell|being dumped|tanking|rug check|is it rugging)\b/i,
    replies: [
      "Price corrections are part of every asset's lifecycle — even the strongest ones. What matters in $VIRTUE is the structure beneath the price: every sell that causes the drop also generates 3% BNB tax paid to all holders. The paper hands fund the diamond hands. Always.",
      "Price is temporary. Structure is permanent. Every sell of $VIRTUE — including the ones causing this drop — generates 3% BNB flowing to every remaining holder. A correction is a discount entry and an income event at the same time. This is the path of the diamond hand."
    ],
    penance: "Buy the dip and collect BNB from the sellers."
  },

  // ── WILL IT RECOVER ──────────────────────────────────────────────────────
  {
    pattern: /\b(will it recover|will it come back|when.*recover|recovery|will price.*go up|will it pump|when.*pump|will it bounce|bounce back|price.*return)\b/i,
    replies: [
      "The Priest does not predict price movements — no one does honestly. What $VIRTUE offers is a structural advantage: 3% BNB income on every trade, regardless of direction. Whether the price recovers tomorrow or in six months, those who held accumulated BNB throughout. That is the only certainty.",
      "Recovery depends on volume, sentiment, and market conditions — factors beyond the Priest's ledger. What is certain: every trade that happens during the wait generates 3% BNB for holders. DYOR, and decide if that structure justifies your patience."
    ]
  },

  // ── TRANSACTION STUCK / PENDING ──────────────────────────────────────────
  {
    pattern: /\b(transaction.*stuck|tx.*stuck|pending.*transaction|transaction.*pending|stuck.*tx|my swap.*stuck|swap.*pending|transaction.*failed|tx.*failed|swap.*failed|tx.*not.*confirmed|transaction.*not.*going through)\b/i,
    replies: [
      "A stuck transaction on BSC is usually a gas issue. In MetaMask: go to Settings → Advanced → Reset Account to clear the nonce queue. Alternatively, try 'Speed Up' on the pending transaction to increase the gas price. Ensure you have enough BNB for gas — even 0.01 BNB is usually enough.",
      "Stuck transactions on BNB Chain: first check if you have enough BNB for gas fees. If the transaction shows as pending for more than 10 minutes, try cancelling it in MetaMask (Settings → Advanced → Reset Account) and resubmitting with a slightly higher gas price. Set slippage to 5%."
    ],
    penance: "Reset the nonce and retry the swap with 5% slippage."
  },

  // ── PRICE IMPACT / INSUFFICIENT LIQUIDITY ────────────────────────────────
  {
    pattern: /\b(price impact|price impact too high|insufficient liquidity|not enough liquidity|low liquidity|no liquidity|slippage.*too high|high.*price impact|impact.*high)\b/i,
    replies: [
      "High price impact usually means you are trying to swap a large amount relative to the liquidity pool. Try splitting your buy into smaller transactions. Also ensure slippage is set to at least 5% on Flap.sh to accommodate the 3% tax. For very large buys, multiple smaller swaps reduce price impact significantly.",
      "Price impact too high? This happens when a single swap would move the price significantly. Solution: split into multiple smaller swaps, or wait for more liquidity to be added to the pool. Set slippage to 5-10% and try a smaller amount first."
    ],
    penance: "Split your swap into smaller transactions."
  },

  // ── IS 3% TAX HIGH / HOW MUCH IS THE TAX ────────────────────────────────
  {
    pattern: /\b(3%.*high|is.*3%.*a lot|tax.*too much|tax.*too high|why.*3%|how much.*tax|is the tax|tax.*low|low tax|3 percent|3 percent tax|explain.*3%|what.*3%|3%.*mean|meaning.*3%)\b/i,
    replies: [
      "3% is among the lowest in the reflection token space. Many similar tokens charge 5–10% on buys AND sells. $VIRTUE charges 3% on both, and 100% of it goes directly to holders — no treasury, no dev cut, no burn. You pay a small tax once when you buy and once when you sell, and you earn from every trade in between.",
      "3% is minimal. For context: a typical credit card charges 1.5–3% per transaction. $VIRTUE charges the same — but the difference is that 100% of that 3% goes back to all holders as BNB. Every trade you make by others earns you money. The tax is the product."
    ]
  },

  // ── CAN TAX / CONTRACT BE CHANGED ────────────────────────────────────────
  {
    pattern: /\b(can.*tax.*change|can.*devs.*change|can.*team.*change|can.*contract.*change|can they.*change|mutable|immutable.*contract|contract.*immutable|can they rug|is contract.*fixed|fixed.*contract|renounced|ownership.*renounced)\b/i,
    replies: [
      "The $VIRTUE contract is immutable — it cannot be changed after deployment. The 3% tax is hardcoded into the smart contract. The devs cannot modify the tax rate, the distribution mechanism, or any other parameter. This is what 'immutable' means on BSC.",
      "No — the contract parameters are locked. Once deployed on BSC, an immutable contract cannot be altered by anyone, including the developers. The 3% tax rate, the 100% BNB distribution, and the 1 Billion fixed supply are permanent. Verify it yourself on BscScan: https://bscscan.com/token/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777"
    ]
  },

  // ── DCA / DOLLAR COST AVERAGE ─────────────────────────────────────────────
  {
    pattern: /\b(dca|dollar cost average|dollar.*cost|cost average|average.*down|average.*in|buy.*dips|buying.*dips|accumulate.*regularly|buy.*regularly|regular.*buy|gradual.*buy|split.*buy)\b/i,
    replies: [
      "DCA is the Priest's recommended strategy for the diamond hand. Instead of timing the market (no one can), buy fixed amounts regularly — weekly, monthly, or on significant dips. Each DCA purchase lowers your average cost and increases your share of the 3% BNB reflection pool. Patience compounds.",
      "Dollar-cost averaging into $VIRTUE is a disciplined path. Each purchase, regardless of price, increases your proportional share of the BNB reflection pool. The volatility that scares others is simply more opportunities to lower your average. The 3% tax from every trade keeps flowing to you throughout."
    ],
    penance: "Set a DCA schedule and buy $VIRTUE regularly on Flap.sh."
  },

  // ── TOKENOMICS SUMMARY / TLDR ─────────────────────────────────────────────
  {
    pattern: /\b(tokenomics|tokenomic|token.*economics|tldr|tl;dr|summary|summarize|give.*summary|brief.*overview|overview|quick.*overview|in.*short|in short|short version|nutshell|in a nutshell)\b/i,
    replies: [
      `$VIRTUE TL;DR: 🔸 Token: $VIRTUE on BNB Chain 🔸 Supply: 1,000,000,000 (fixed, no mint) 🔸 Tax: 3% on buy/sell → 100% converted to BNB reflections 🔸 Distribution: Auto-pay at $4 threshold, manual claim on Flap Tax Info page 🔸 Safety: Fair launch on Flap.sh, locked liquidity, zero bundling, single dev wallet with tiny ~$40–$60 buy 🔸 Contract: 0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777`,
      "Quick summary: meme token on BSC, inspired by CZ's tweet. 3% tax on every trade → converted to BNB → sent to all holders proportionally. Fixed 1B supply, fair launch, locked liquidity. Buy on Flap.sh, hold in any BSC wallet, earn BNB passively. No staking. That's it."
    ]
  },

  // ── WEBSITE / WHERE TO FIND INFO ─────────────────────────────────────────
  {
    pattern: /\b(website|web site|where.*website|do you have.*website|your website|site|official.*site|official.*website|where.*info|where.*information|more info|more.*information|find.*info)\b/i,
    replies: [
      `You are already here — this is the official $VIRTUE website! You can find: the full lore, tokenomics, a live BNB Reflection Calculator, and this Forgiveness Booth. For the token page and live price: ${launchpadUrl}. For reflection claims: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en`,
      `The official $VIRTUE site is the one you're on right now. Check the Tokenomics section for full details, the Reflection Calculator for income projections, and the Flap.sh page for live price and trading: ${launchpadUrl}`
    ]
  },

  // ── DOES CZ KNOW / IS CZ INVOLVED ────────────────────────────────────────
  {
    pattern: /\b(does cz know|cz.*know|cz.*aware|is cz.*involved|cz.*part of|cz.*behind|cz.*support|does cz.*support|will cz|cz.*endorse|endorsed by cz|cz.*official)\b/i,
    replies: [
      "$VIRTUE has no official connection to CZ or Binance — it is a community meme token inspired by his public tweet 'Forgiveness is a virtue!' Whether CZ is aware of it is unknown. We do not claim any affiliation, endorsement, or partnership. The token stands entirely on its own merits: locked liquidity, 3% BNB reflections, fair launch.",
      "The Priest cannot speak for CZ. $VIRTUE is a community project inspired by a public tweet — not an official Binance or CZ initiative. No affiliation is claimed or implied. What we do claim: a verifiable contract, locked liquidity, and 3% BNB reflections from every trade."
    ]
  },

  // ── HOW MUCH BNB DO I NEED ───────────────────────────────────────────────
  {
    pattern: /\b(how much bnb.*need|how much.*need.*buy|minimum bnb|minimum.*bnb|bnb.*needed|need bnb|bnb.*required|how many bnb|start with|invest.*bnb|bnb.*invest)\b/i,
    replies: [
      "Ensure you buy at least 10,000 $VIRTUE tokens to qualify for reflections. At current prices, 10k tokens require only a small amount of BNB. Keep a tiny reserve (0.005 BNB) for gas on BSC. Auto payouts occur in WBNB ($4+ threshold), or claim manually as WBNB/BNB on Flap.",
      "You can start with any small amount, but make sure to acquire at least 10,000 $VIRTUE to enter the reflection pool. Auto payouts distribute in WBNB daily above $4, while manual claims on Flap Tax Info page let you choose WBNB or BNB."
    ]
  },

  // ── HOW DO I CHECK MY REWARDS / BALANCE ──────────────────────────────────
  {
    pattern: /\b(check.*reward|check.*dividend|check.*reflection|see.*reward|see.*dividend|see.*reflection|track.*reward|track.*dividend|track.*reflection|how.*see.*bnb|how.*check.*bnb|monitor.*reward|my.*dividend.*balance|my.*reflection.*balance|dividend.*balance|reflection.*balance|reward.*balance|how much.*earned|how much.*accumulated|how do i check|how to check|check my bnb|see my bnb|view.*reward)\b/i,
    replies: [
      `Check your accumulated BNB reflections directly on the official Flap Tax Info page: ${claimUrl}. Connect the wallet that holds $VIRTUE and you will see your pending BNB rewards. Auto-distribution fires at $4 — below that, click Claim to receive them manually.`,
      `Your reflection balance is visible at: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en. Connect your BSC wallet to see exactly how much BNB you have accumulated from the 3% tax. Claim at any time, or wait for the automatic $4 threshold to trigger.`
    ],
    penance: `Visit https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777/taxinfo?lang=en to check your accumulated BNB rewards.`
  },

  // ── INVEST X AMOUNT / HOW MANY TOKENS ────────────────────────────────────
  {
    pattern: /\b(invest \$|invest \d|i have \$|i have \d|with \$\d|with \d+ bnb|how many.*token.*\d|how many.*for \$|how many.*for \d|if i buy \d|if i put \d|\d+.*bnb.*how many|how many.*\d+ dollar|\d+.*dollar.*how many)\b/i,
    replies: [
      `For the exact number of $VIRTUE tokens you get for any BNB amount, use the live swap interface on Flap.sh: https://flap.sh/bnb/0x0dD4ea60Ca4482196CD1bdd6903f2741F2067777. The price updates in real time. Remember to set slippage to 5% before confirming — the 3% buy tax is included in that slippage tolerance.`,
      "The current token price changes with market activity. To see exactly how many $VIRTUE you receive for your BNB, open Flap.sh and enter your amount in the swap interface — it shows the output in real time. Keep in mind 3% goes to the reflection pool on every buy."
    ]
  },

  // ── CAN I USE MULTIPLE WALLETS ───────────────────────────────────────────
  {
    pattern: /\b(multiple.*wallet|two wallet|two wallets|different wallet|several wallet|can i use.*wallet|wallet.*multiple|split.*wallet|two address|multiple address)\b/i,
    replies: [
      "Yes — you can hold $VIRTUE across multiple wallets. Each wallet receives BNB reflections proportional to its own $VIRTUE balance independently. There is no restriction on the number of wallets. Some holders choose to split across wallets for portfolio management purposes.",
      "Multiple wallets work independently. Each one that holds $VIRTUE earns its own proportional share of the 3% BNB tax pool. Reflections auto-distribute to each wallet separately when the $4 threshold is reached per wallet."
    ]
  },

  // ── SPECIFIC AMOUNT / INVESTMENT ADVICE ─────────────────────────────────
  {
    pattern: /\b(should i.*dca|should i.*average|should i.*wait|should i.*hold|should i.*buy more|should i.*add more|buy the dip|buy.*more now|should i keep holding|worth holding|worth keeping)\b/i,
    replies: [
      "The Priest does not give financial advice — only confessional wisdom. What I observe: every dip generates BNB reflections for holders from those who panic-sell. The structure of $VIRTUE — locked liquidity, immutable 3% tax, fixed supply — does not change with the price. DYOR, then decide with conviction.",
      "Whether to DCA, hold, or wait is your decision — not the Priest's. What I can say: $VIRTUE's 3% BNB reflection mechanism rewards holding, and every correction is an opportunity to lower your average cost while still earning from existing volume. Make decisions with clear eyes and diamond hands."
    ],
    penance: "Research, decide with conviction, and never invest more than you can afford to lose."
  },

  // ── CZ LEXICON (BUIDL / SAFU / NFA) ───────────────────────────────────────
  {
    pattern: /\b(buidl|buidling|safu|stay safu|nfa|not financial advice|ignore noise|ignore fud|rule 4)\b/i,
    replies: [
      "Keep BUIDLing and stay SAFU. CZ's philosophy is embedded in $VIRTUE: simple code, real yield, zero hype. Hold spot, collect 3% BNB reflections, and ignore the noise. NFA, DYOR. 🙏",
      "Stay SAFU, traveler. In these blocks we BUIDL for the long term. 3% of every trade flows to holders as BNB automatically. Remember rule 4: ignore FUD and keep holding."
    ],
    penance: "Keep BUIDLing spot $VIRTUE and stay SAFU."
  },

  // ── GENERIC QUESTIONS ─────────────────────────────────────────────────────
  {
    pattern: /what\?|how\?|why\?|huh\?|what now/i,
    replies: [
      "Speak clearly, traveler. What crypto sin or question brings you to the Forgiveness Booth today? I know all things about $VIRTUE, BNB reflections, the CZ lore, and the path of the diamond hand.",
      "The Priest is listening. Ask me about $VIRTUE, the contract address, how to buy, the roadmap, the reflections, the CZ tweet — or confess your worst trade and receive absolution. 🙏"
    ]
  }
];

// Fallback generic dialogs — varied and lore-appropriate
const genericReplies = [
  "Tell me more about your journey in these blocks, traveler. If you'd like to suggest new responses or model improvements, click the '💡 Improve Model' button above! 🙏",
  "Does this weigh heavy on your wallet, or is it a question about $VIRTUE? Speak freely — or click '💡 Improve Model' to post suggestions on X anytime!",
  "A true builder does not linger in doubt. Ask me about $VIRTUE, live prices ('btc price'), contract details ('ca'), or click '💡 Improve Model' to submit feedback!",
  "To be transparent: I am a confessional oracle for $VIRTUE. Ask about reflections, contract safety, live market data, or click '💡 Improve Model' to suggest additions! 🙏",
  "The path of the diamond hand requires clarity. Ask about the contract ('ca'), 3% BNB reflections, how to buy on Flap.sh, or click '💡 Improve Model' to suggest features!",
  "Every traveler in the Forgiveness Booth carries a sin, a memory, or a question. Type /help to see all features, or use the '💡 Improve Model' button to send feedback!",
  "In the silence between blocks, truth becomes clear. I handle confessions, live link analysis, and $VIRTUE tokenomics. Feel free to click '💡 Improve Model' for suggestions!",
  "The High Priest can inspect X/Twitter links, fetch live Binance prices, explain 3% BNB reflections, and absolve trading sins. Have a suggestion? Click '💡 Improve Model'!",
  "Speak freely, traveler. I handle confessions, live crypto prices ('bnb price'), contract details, and CZ lore. Type /help or click '💡 Improve Model' to help us expand the oracle! 🙏",
  "The blocks are patient. If I didn't catch your exact meaning, try rephrasing, type /help, or click the '💡 Improve Model' button to post a template suggestion!",
  "I am always learning from the community! Click the '💡 Improve Model' button in the header to post suggestions for the Priest on X, or type /help for my full menu. 💎"
];

const genericPenances = [
  "Forgive your past mistakes and move forward with conviction.",
  "Tell another builder: 'Forgiveness is a virtue.' 🙏",
  "Hold spot $VIRTUE with diamond hands and collect your 3% BNB reflections.",
  "Share the CZ tweet lore on X: https://x.com/cz_binance/status/1970358398760952106",
  "Forgive your developer, forgive the dip, and keep building."
];


// ── LIVE WEB & SOCIAL FETCHING HELPERS ──────────────────────────────────────
async function fetchTweetDetails(tweetUrl: string): Promise<{ reply: string; penance: string } | null> {
  try {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}`;
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    const author = data.author_name || "X User";
    const cleanText = (data.html || "")
      .replace(/<blockquote[^>]*>/i, "")
      .replace(/<\/blockquote>/i, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (/forgiveness|virtue/i.test(cleanText)) {
      return {
        reply: `📜 Live X Inspection: Tweet by ${author}: "${cleanText}". This is central to the lore of $VIRTUE! 'Forgiveness is a virtue!' 🙏. In a market full of FUD, we hold spot and collect 3% BNB reflections.`,
        penance: "Share the genesis tweet lore on X."
      };
    }

    return {
      reply: `📜 Live X Inspection: Tweet by ${author}: "${cleanText}". The High Priest has reviewed this post. While the timeline discusses this news, $VIRTUE continues to distribute 3% BNB reflections on-chain. Hold spot and stay SAFU! 🛡️`,
      penance: "Stay SAFU and hold spot $VIRTUE."
    };
  } catch (err) {
    return null;
  }
}

async function fetchWebPageDetails(url: string): Promise<{ reply: string; penance: string } | null> {
  try {
    if (/flap\.sh/i.test(url)) {
      return {
        reply: `🌐 Official Flap.sh Page: ${url}. Verified $VIRTUE token page on BNB Chain. 100% fair launch, locked liquidity, 3% BNB reflections, single dev wallet ($40-$60 buy).`,
        penance: "Verify liquidity lock on Flap.sh."
      };
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) return null;
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "Web Page";

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i) ||
                      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const desc = descMatch ? descMatch[1].replace(/\s+/g, " ").trim() : "";

    const summary = desc ? `Title: "${title}". Summary: "${desc.substring(0, 180)}..."` : `Title: "${title}"`;

    return {
      reply: `🌐 Live Web Inspection (${url}): ${summary}. The High Priest has analyzed this link. Whatever market sentiment this page reports, remember that $VIRTUE's on-chain 3% BNB rewards accrue uninterrupted. Hold spot and stay SAFU! 🛡️`,
      penance: "Verify on-chain contract data on BscScan."
    };
  } catch (err) {
    return null;
  }
}

async function fetchLiveCryptoPrice(symbol: string): Promise<{ reply: string; penance: string } | null> {
  const symUpper = symbol.toUpperCase();
  
  // 1. Try Binance API
  try {
    const pair = symUpper + "USDT";
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      const rawPrice = parseFloat(data.price);
      const formattedPrice = rawPrice > 1 ? rawPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : rawPrice.toString();
      return {
        reply: `📊 Live Market Feed (Binance): ${symUpper} is currently trading at $${formattedPrice} USDT. To check live prices and charts for $VIRTUE, visit our official Flap.sh page: ${launchpadUrl}. Remember: ${symUpper} doesn't pay 3% BNB reflections to your wallet on every trade, but $VIRTUE does!`,
        penance: "Hold spot $VIRTUE and collect continuous BNB reflections."
      };
    }
  } catch (err) {
    // Fallback to CoinGecko
  }

  // 2. Try CoinGecko API Fallback
  try {
    const idMap: Record<string, string> = { btc: "bitcoin", eth: "ethereum", bnb: "binancecoin", sol: "solana", doge: "dogecoin", xrp: "ripple", ada: "cardano" };
    const geckoId = idMap[symbol.toLowerCase()] || symbol.toLowerCase();
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data[geckoId] && data[geckoId].usd) {
        const rawPrice = data[geckoId].usd;
        const formattedPrice = rawPrice > 1 ? rawPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : rawPrice.toString();
        return {
          reply: `📊 Live Market Feed (CoinGecko): ${symUpper} is currently trading at $${formattedPrice} USD. To check live prices and charts for $VIRTUE, visit our official Flap.sh page: ${launchpadUrl}. Remember: ${symUpper} doesn't pay 3% BNB reflections to your wallet on every trade, but $VIRTUE does!`,
          penance: "Hold spot $VIRTUE and collect continuous BNB reflections."
        };
      }
    }
  } catch (err) {
    // Fallback
  }

  return {
    reply: `📊 Market Feed: For live prices of ${symUpper}, check CoinMarketCap or Binance. To check live prices, charts, and trading volume for $VIRTUE, visit our official Flap.sh page: ${launchpadUrl}. Remember: holding spot $VIRTUE pays you continuous 3% BNB reflections on every trade!`,
    penance: "Hold spot $VIRTUE and collect continuous BNB reflections."
  };
}

export function runElizaPriest(userInput: string, history: Array<{role: string; content: string}> = []): { reply: string; penance: string } {
  const text = userInput.trim();
  const clean = text.toLowerCase();

  // Phase 1: Language detection FIRST (Intercept non-English inputs before rules match)
  const warning = getLanguageWarning(clean);
  if (warning) return warning;

  // Context-aware disambiguation for short/ambiguous follow-ups
  const isShortFollowUp = /^\s*(why|why\?|how|how\?|where|where\?|when|when\?|how much|how much\?|is it|is it\?|tell me more|what about it|and then|what else)\s*$/i.test(clean);
  
  if (isShortFollowUp && history.length > 1) {
    const recentHistoryText = history.slice(-4).map(m => m.content).join(" ").toLowerCase();
    
    if (/\b(buy|swap|purchase|flap|how to buy)\b/i.test(recentHistoryText)) {
      return {
        reply: `To swap $VIRTUE, go to Flap.sh (${launchpadUrl}), connect your BSC wallet (MetaMask or Trust Wallet), and swap BNB for $VIRTUE. Ensure slippage is set to 5%.`,
        penance: "Navigate to Flap.sh and complete your swap."
      };
    }
    if (/\b(dividend|reflection|reward|bnb|tax|3%|claim)\b/i.test(recentHistoryText)) {
      return {
        reply: `Every trade carries a 3% tax converted to reflections for holders with at least 10,000 $VIRTUE. Automatic payouts send WBNB at the $4 threshold. Below $4, claim manually in WBNB or BNB at ${claimUrl}.`,
        penance: "Check your projected reflections on the homepage calculator."
      };
    }
    if (/\b(contract|ca|address|bep20)\b/i.test(recentHistoryText)) {
      return {
        reply: `The official $VIRTUE contract on BSC is: ${contractAddress}. Locked liquidity on Flap.sh, 100% fair launch.`,
        penance: "Copy the CA and load it into your wallet."
      };
    }
  }

  // Phase 2: Match specific intents (ordered by priority)
  for (const rule of elizaRules) {
    const match = text.match(rule.pattern);
    if (match) {
      let replyTemplate = rule.replies[Math.floor(Math.random() * rule.replies.length)];
      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          replyTemplate = replyTemplate.replace(new RegExp("\\$" + i, "g"), () => reflect(match[i].trim()));
        }
      }
      return { reply: replyTemplate, penance: rule.penance || "" };
    }
  }

  // Phase 3: Smart Fuzzy Semantic Scorer & Entity Extraction
  const actionMatch = clean.match(/\b(lost|losed|loosed|losted|losing|lose|sold|bought|gambled|chased|sent|transferred|panic sold|got rugged|liquidated)\b/i);
  if (actionMatch) {
    let action = actionMatch[1].toLowerCase(); if (["losed","loosed","losted","losing","lose"].includes(action)) action = "lost";
    return {
      reply: `You mentioned having ${action} in your trading journey. Speak freely, traveler — what exact trade or token caused this? The High Priest is here to offer absolution and guide you back to $VIRTUE's 3% BNB reflections. 🙏`,
      penance: "Forgive your past losses and focus on spot holding."
    };
  }

  const cryptoEntityMatch = clean.match(/\b(pancake|uniswap|binance|trust wallet|metamask|phantom|solana|ethereum|cardano|avalanche|bybit|mexc|gate\.io)\b/i);
  if (cryptoEntityMatch) {
    const entity = cryptoEntityMatch[1];
    return {
      reply: `Regarding ${entity}: the Forgiveness Booth keeps its focus on $VIRTUE on BNB Chain. While ${entity} has its place in the ecosystem, $VIRTUE gives you continuous 3% BNB reflections directly on-chain on Flap.sh (${launchpadUrl}). What specifically would you like to know?`,
      penance: "Check out $VIRTUE on Flap.sh."
    };
  }

  // Domain 1: Tokenomics, Contract & Safety Fuzzy Concept Scorer
  const tokenomicsKeywords = clean.match(/\b(contract|address|ca|safe|scam|legit|audit|liquidity|dev|tax|payout|rewards|wbnb|bnb|threshold|holding|percentage|volume)\b/gi);
  if (tokenomicsKeywords && tokenomicsKeywords.length >= 2) {
    return {
      reply: `Regarding ${tokenomicsKeywords.slice(0, 2).join(" & ")}: $VIRTUE operates on a verified BSC contract (${contractAddress}) with 100% locked liquidity on Flap.sh. 100% of the 3% trading tax is distributed to holders with 10,000+ tokens as BNB reflections. Auto-payouts send WBNB at $4+, and manual claims below $4 let you choose WBNB or BNB! 🛡️`,
      penance: "Inspect the contract on Flap.sh and run reflection projections on our calculator."
    };
  }

  // Domain 2: CZ Lore & Philosophy Fuzzy Concept Scorer
  const czKeywords = clean.match(/\b(cz|tweet|binance|september|forgive|virtue|buidl|safu|rule 4|lore)\b/gi);
  if (czKeywords && czKeywords.length >= 2) {
    return {
      reply: 'The ethos of $VIRTUE stems directly from CZ\'s iconic tweet on September 23, 2025: "Forgiveness is a virtue!" 🙏. In a market full of FUD and paper hands, we forgive the dip, hold spot, and collect passive 3% BNB rewards. Stay SAFU and keep BUIDLing!',
      penance: "Share the CZ tweet lore on X."
    };
  }

  // Domain 3: Multi-Keyword Fuzzy Semantic Matcher for complex trading & emotional stories
  const tradingKeywords = clean.match(/\b(portfolio|losses|gains|savings|wallet|trade|trading|crypto|market|bear|bull|dip|candle|pump|dump|hold|holder|seller|buyer|profit|loss|liquidation|leverage|tax|dividend|reflection|yield|reward)\b/gi);
  const emotionKeywords = clean.match(/\b(regret|scared|fear|anxious|pain|sad|depressed|ruined|stupid|foolish|greedy|fomo|fud|hope|faith|belief|sorry|guilty|ashamed)\b/gi);

  if (tradingKeywords && tradingKeywords.length >= 2) {
    const topic = tradingKeywords.slice(0, 2).join(" & ");
    return {
      reply: `The High Priest hears your confession regarding ${topic}. Every trader's journey includes dips, volatility, and valuable lessons. The antidote to market stress is patience, spot holding, and passive BNB rewards. Forgive your past trades, hold spot $VIRTUE on Flap.sh (${launchpadUrl}), and let the 3% BNB tax work for you. 🙏`,
      penance: "Forgive your past trades and hold spot $VIRTUE with diamond hands."
    };
  }

  if (emotionKeywords && text.split(" ").length > 3) {
    return {
      reply: "I hear the emotion in your words, traveler. Web3 and life can weigh heavy on the spirit, but regret does not rebuild a portfolio or a life. Forgive yourself for past choices, focus on building with integrity today, and remember CZ's words: 'Forgiveness is a virtue!' 🙏",
      penance: "Forgive your past choices and take one positive step forward."
    };
  }

  const hasCryptoHint = /\b(token|coin|crypto|wallet|chain|block|hold|buy|sell|swap|price|market|invest|earn|profit|loss|trade|defi|nft|web3)\b/i.test(clean);
  let reply: string;
  if (hasCryptoHint) {
    const cryptoFallbacks = genericReplies.slice(8);
    reply = cryptoFallbacks[Math.floor(Math.random() * cryptoFallbacks.length)];
  } else {
    reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
  }
  
  const penance = text.split(" ").length > 3
    ? genericPenances[Math.floor(Math.random() * genericPenances.length)]
    : "";

  return { reply, penance };
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const history = Array.isArray(messages) ? messages : [];
    const userMessages = history.filter((m: any) => m.role === "user");
    const latestUserConfession = userMessages[userMessages.length - 1]?.content || "";
    const clean = latestUserConfession.trim().toLowerCase();

    // 1. Live X / Twitter URL Inspection
    const xUrlMatch = latestUserConfession.match(/(https?:\/\/(x|twitter)\.com\/[^\s]+)/i);
    if (xUrlMatch) {
      const liveTweetResult = await fetchTweetDetails(xUrlMatch[1]);
      if (liveTweetResult) return NextResponse.json(liveTweetResult);
    }

    // 2. Live Web URL Inspection
    const webUrlMatch = latestUserConfession.match(/(https?:\/\/[^\s]+)/i);
    if (webUrlMatch) {
      const liveWebResult = await fetchWebPageDetails(webUrlMatch[1]);
      if (liveWebResult) return NextResponse.json(liveWebResult);
    }

    // 3. Live Crypto Price Feed (Binance API + CoinGecko Fallback)
    const p1 = clean.match(/^(btc|bitcoin|eth|ethereum|bnb|binance|sol|solana|doge|dogecoin|xrp|ada)(\s+price)?$/i);
    const p2 = clean.match(/\b(btc|bitcoin|eth|ethereum|bnb|binance|sol|solana|doge|dogecoin|xrp|ada)\s+(price|chart|market|cost|quote)\b/i);
    const p3 = clean.match(/\b(price|chart|cost)\s+of\s+(btc|bitcoin|eth|ethereum|bnb|binance|sol|solana|doge|dogecoin|xrp|ada)\b/i);

    const priceMatch = p1 || p2 || p3;
    if (priceMatch) {
      const rawSym = (p1 ? p1[1] : p2 ? p2[1] : p3 ? p3[2] : "").toLowerCase();
      const sym = rawSym.replace("bitcoin", "btc").replace("ethereum", "eth").replace("binance", "bnb").replace("solana", "sol").replace("dogecoin", "doge");
      if (sym) {
        const livePriceResult = await fetchLiveCryptoPrice(sym);
        if (livePriceResult) return NextResponse.json(livePriceResult);
      }
    }

    const result = runElizaPriest(latestUserConfession, history);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in NLP route:", error);
    return NextResponse.json({
      reply: "The High Priest is currently meditating in the blocks. Speak again, my child. 🙏",
      penance: "Wait a moment and try again."
    });
  }
}
