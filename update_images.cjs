const fs = require('fs');
const path = require('path');

const dataFile = 'components/grammarLessonsData.tsx';
let code = fs.readFileSync(dataFile, 'utf8');

const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('createLesson(')) {
    // Extract title
    const match = line.match(/createLesson\([^,]+,\s*'[^']+',\s*'([^']+)'/);
    if (match) {
      const title = match[1];
      const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const newImagePath = `/src/assets/images/${slug}.png`;
      
      const fullImagePath = path.join(__dirname, 'src/assets/images', `${slug}.png`);
      if (!fs.existsSync(fullImagePath)) {
        fs.writeFileSync(fullImagePath, '');
      }

      // Replace the ninth argument
      // We look for , '/src/assets/images/...'),
      lines[i] = line.replace(/,\s*'\/src\/assets\/images\/[^']+'\),?$/, `, '${newImagePath}'),`);
      lines[i] = lines[i].replace(/,\s*'\/src\/assets\/images\/[^']+'\)$/, `, '${newImagePath}')`);
    }
  }
}

fs.writeFileSync(dataFile, lines.join('\n'));
console.log('Done mapping and creating placeholders.');

// Also we need to modify GrammarLessons.tsx to use lesson.imageUrl
const glFile = 'pages/GrammarLessons.tsx';
let glCode = fs.readFileSync(glFile, 'utf8');
if (glCode.includes('let illustration = defaultLessonImage;')) {
  glCode = glCode.replace('let illustration = defaultLessonImage;', 'let illustration = lesson.imageUrl || defaultLessonImage;');
  fs.writeFileSync(glFile, glCode);
  console.log('GrammarLessons.tsx updated to use lesson.imageUrl.');
}
