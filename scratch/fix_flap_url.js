const fs = require('fs');

const filesToUpdate = [
  '/home/luca/Scrivania/virtue/app/page.tsx',
  '/home/luca/Scrivania/virtue/app/api/absolution/route.ts',
  '/home/luca/Scrivania/virtue/scratch/mega_linguistic_suite.ts'
];

filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content.length;
    content = content.replace(/https:\/\/flap\.sh\/token\//g, 'https://flap.sh/bnb/');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}: ${orig} -> ${content.length} bytes`);
  }
});
