import { getArticleContent } from "@/lib/markdown";
import ReadingWrapper from "@/components/ReadingWrapper";

export default function Home() {
  const { content, headings } = getArticleContent();
  
  // Exclude the H1 title from TOC if present
  const tocHeadings = headings.filter(h => h.level > 1);

  return (
    <main className="min-h-screen">
      {/* Interactive Wrapper containing Hero, TOC, Article Area, Footer and Reading Controls */}
      <ReadingWrapper content={content} tocHeadings={tocHeadings} />
    </main>
  );
}

