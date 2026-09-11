import { runElizaPriest } from '../app/api/absolution/route';

console.log("=== TESTING /HELP COMMAND HANDLER ===");

const helpInputs = ["/help", "help", "/commands", "menu", "what can you do"];

helpInputs.forEach(cmd => {
  const result = runElizaPriest(cmd);
  console.log(`\nInput: "${cmd}"`);
  console.log(`Reply:\n${result.reply}`);
});
