import fs from 'fs';
import path from 'path';

export interface Heading {
  level: number;
  text: string;
  id: string;
}

function generateId(text: string) {
  // Enhanced to handle Vietnamese characters better
  const a = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
  const b = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
  const p = new RegExp(a.split('').join('|'), 'g');
  
  return text
    .toString()
    .toLowerCase()
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getArticleContent() {
  const filePath = path.join(process.cwd(), 'data', 'report.md');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const headings: Heading[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateId(text);
      headings.push({ level, text, id });
    }
  }

  return { content, headings };
}
