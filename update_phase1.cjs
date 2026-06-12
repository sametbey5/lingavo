const fs = require('fs');
let content = fs.readFileSync('pages/GrammarLessons.tsx', 'utf8');

// The second occurrence needs the emoji treatment for Phase 1.
// In isStandard10ItemLesson, item.letter is the text, item.emoji is the emoji. 
// We want item.emoji to show in the big text, AND in the circle!
content = content.replace(
  '<div className="text-[80px] xs:text-[100px] sm:text-[120px] font-black leading-none text-[#5d8ef7] mb-1">{item.letter}</div>',
  '<div className="text-[80px] xs:text-[100px] sm:text-[120px] font-black leading-none text-[#5d8ef7] mb-1">{item.emoji || item.letter}</div>'
);

content = content.replace(
  '<span className="text-4xl font-bold">{item.letter}</span>',
  '<span className="text-4xl font-bold">{item.emoji || item.letter}</span>'
);

fs.writeFileSync('pages/GrammarLessons.tsx', content);
console.log("Done phase 1 update");
