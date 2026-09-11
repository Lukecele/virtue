import { runElizaPriest } from '../app/api/absolution/route';

const userTranscript = [
  "how are you?",
  "who",
  "who are you?",
  "who is cz?",
  "what your name?",
  "where are you from?",
  "who created you?",
  "ai",
  "wich model are you using?",
  "who are you?",
  "project",
  "bitcoin price",
  "fuck",
  "what is virtue?",
  "buy",
  "how",
  "i'm a sinner",
  "i sold",
  "virtue itself",
  "i selled virtue",
  "i sold virtue",
  "i buy virtue",
  "buy virtue",
  "i buyed virtue"
];

console.log("=== VERIFYING ALL USER TRANSCRIPT INPUTS ===\n");

userTranscript.forEach((input, index) => {
  const result = runElizaPriest(input);
  console.log(`[#${index + 1}] Input: "${input}"`);
  console.log(`     ↳ Reply: "${result.reply.substring(0, 120)}..."\n`);
});
