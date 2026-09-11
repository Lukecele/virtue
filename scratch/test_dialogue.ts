import { runElizaPriest } from "../app/api/absolution/route";

const testInputs = [
  // 1. Greetings
  "hello",
  "hey priest",
  
  // 2. Identity / Advice / Language Info
  "who are you?",
  "what is your name?",
  "what language do you speak?",
  "what are your suggestions?",
  
  // 3. Specific Project / Token Questions
  "what is your project?",
  "where is the contract?",
  "what is the total supply?",
  "is it safe?",
  
  // 4. Purchase Typos & Fuzzy Matches
  "how to buy",
  "ho tu buy",
  
  // 5. Foreign Languages (Bilingual Interception)
  "come comprare", // Italian
  "como comprar",   // Spanish
  "comment acheter", // French
  "怎么买",         // Chinese
  "как купить",     // Russian / Cyrillic
  "nasil satin alirim", // Turkish
  "wie kaufen",     // German
  "como comprar",   // Portuguese
  
  // 6. Gibberish & Spam
  "ooo",
  "asdf",
  
  // 7. HODL / Hold
  "hold",
  "holding",
  
  // 8. Crypto Sins (Eliza Grammar Decompositions)
  "i panic sold my BNB because I was afraid",
  "i lost all my savings because my developer rugged me",
  "i got liquidated on a 100x long position",
  
  // 9. New Visitor Queries (Dev, Roadmap, Socials, Scam, Dividends, Utility, Price)
  "who is the dev?",
  "show me the roadmap",
  "what are the socials?",
  "is this a scam?",
  "how do I get dividends?",
  "what is the utility of $VIRTUE?",
  "what is the current price and market cap?",

  // 10. Previously broken: CA, project shorthand, hello
  "ca",
  "contract",
  "project",
  "this project",
  "hello",
  "hi",
  "gm"
];

console.log("=== STARTING CHATBOT NLP DIALOGUE TESTS ===\n");

testInputs.forEach((input, index) => {
  console.log(`[TEST #${index + 1}] Input: "${input}"`);
  const result = runElizaPriest(input);
  console.log(`Reply:   "${result.reply}"`);
  if (result.penance) {
    console.log(`Penance: "${result.penance}"`);
  } else {
    console.log("Penance: [NONE]");
  }
  console.log("-".repeat(60) + "\n");
});

console.log("=== TESTS COMPLETED ===");
