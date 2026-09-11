// Quick gap analysis - test inputs that likely fall through to generic fallback
import { runElizaPriest } from '../app/api/absolution/route';

const gapTests = [
  // Missing coverage
  "what's the ticker?",
  "what is the symbol?",
  "VIRTUE",
  "when did it launch?",
  "how old is this project?",
  "how often do I get dividends?",
  "how frequently are dividends paid?",
  "do I need to do anything to get rewards?",
  "how do I add virtue to my wallet?",
  "how to import token to metamask?",
  "I bought at the top",
  "I bought the ATH",
  "I'm scared",
  "I'm worried",
  "I'm nervous about this",
  "why is the price going down?",
  "will it recover?",
  "price dumping",
  "is it pumping?",
  "transaction is pending",
  "my transaction is stuck",
  "I sent BNB to wrong address",
  "can I use multiple wallets?",
  "is 3% tax high?",
  "is the tax too much?",
  "what are the tokenomics?",
  "give me a summary",
  "tldr",
  "does CZ know about this?",
  "is CZ part of this?",
  "what is the contract?",
  "how do I check my dividends?",
  "how do I see my balance?",
  "where can I track my rewards?",
  "does it have a dapp?",
  "is there an app?",
  "how much BNB do I need?",
  "I'm from Italy",
  "sono italiano",
  "je suis français",
  "soy español",
  "ich bin deutsch",
  "I lost everything",
  "I made a mistake",
  "I regret this",
  "this is a scam",
  "100% scam",
  "never again",
  "worst investment",
  "what's the website?",
  "do you have a website?",
  "where is the website?",
  "no liquidity",
  "cant swap",
  "swap not working",
  "price impact too high",
  "what does 3% mean exactly?",
  "explain the 3%",
  "how is the 3% split?",
  "who gets the 3%?",
  "can the devs change the tax?",
  "can tax be changed?",
  "can they rug now?",
  "is it too late to buy?",
  "should I wait?",
  "should I DCA?",
  "DCA strategy",
  "dollar cost average",
  "I want to invest $100",
  "I want to invest 1 BNB",
  "how many tokens for 1 BNB?",
];

let fallthrough = 0;
let matched = 0;

for (const input of gapTests) {
  const result = runElizaPriest(input);
  const isGeneric = [
    "Tell me more",
    "Does this weigh",
    "A true builder",
    "The blocks continue",
    "Interesting. But",
    "I have heard",
    "The path of the diamond hand requires",
    "Every soul",
    "In the silence",
    "Speak your sin",
    "The High Priest knows",
    "Speak freely",
    "The blocks are patient",
    "Hmm. The Priest"
  ].some(g => result.reply.startsWith(g));
  
  if (isGeneric) {
    console.log(`❌ FALLTHROUGH: "${input}"`);
    fallthrough++;
  } else {
    matched++;
  }
}

console.log(`\n✅ Matched: ${matched} | ❌ Fallthrough: ${fallthrough} / ${gapTests.length}`);
