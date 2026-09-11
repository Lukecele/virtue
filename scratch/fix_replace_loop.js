const fs = require('fs');
const ROUTE = '/home/luca/Scrivania/virtue/app/api/absolution/route.ts';
let src = fs.readFileSync(ROUTE, 'utf8');

// Replace the string replace loop with clean function-based replace to avoid JS $ replacement issues
const oldLoop = `      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          replyTemplate = replyTemplate.replace(\`$\${i}\`, reflect(match[i].trim()));
        }
      }`;

const newLoop = `      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          const replacement = reflect(match[i].trim());
          replyTemplate = replyTemplate.replace(new RegExp(\`\\\\$\${i}\`, 'g'), () => replacement);
        }
      }`;

src = src.replace(oldLoop, newLoop);
fs.writeFileSync(ROUTE, src, 'utf8');
console.log('✅ Safely updated replacement loop in route.ts!');
