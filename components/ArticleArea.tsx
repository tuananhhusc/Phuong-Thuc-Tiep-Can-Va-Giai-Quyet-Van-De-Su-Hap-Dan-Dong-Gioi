import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DecorativeDivider from "./DecorativeDivider";

interface ArticleAreaProps {
  content: string;
  fontSize: number;
  theme?: "parchment" | "twilight";
}

function generateId(text: string) {
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

export default function ArticleArea({ content, fontSize, theme = "parchment" }: ArticleAreaProps) {
  const [activeTooltip, setActiveTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const handleFootnoteEnter = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const fnId = href.replace("#", "");
    const footnoteEl = document.getElementById(fnId) || document.getElementById(`user-content-${fnId}`);
    if (footnoteEl) {
      // Get the footnote text, stripping out the return link if present
      let text = footnoteEl.textContent || "";
      text = text.replace(/↩|↩\ufe0f/g, "").trim();
      
      // Clean up any leading superscript numbers or list-item indexes like "1." or "[1]"
      text = text.replace(/^\d+\.?\s*/, "").replace(/^\[\d+\]\s*/, "").trim();
      
      const rect = e.currentTarget.getBoundingClientRect();
      setActiveTooltip({
        text,
        x: rect.left,
        y: rect.top - 8,
      });
    }
  };

  const handleFootnoteLeave = () => {
    setActiveTooltip(null);
  };

  const isDark = theme === "twilight";

  return (
    <div className="relative">
      <article 
        className={`prose prose-academic w-full max-w-full p-5 sm:p-8 md:p-12 shadow-sm rounded-sm border transition-all duration-300 ${
          isDark 
            ? "bg-navy-800 border-gold-400/20 text-parchment-100" 
            : "bg-parchment-100 border-parchment-300 text-gray-800"
        }`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children, ...props }) => {
              const id = generateId(String(children));
              return <h2 id={id} {...props}>{children}</h2>;
            },
            h3: ({ children, ...props }) => {
              const id = generateId(String(children));
              return <h3 id={id} {...props}>{children}</h3>;
            },
            // Customizing table wrapper for responsiveness
            table: (props) => (
              <div className="overflow-x-auto my-8">
                <table {...props} />
              </div>
            ),
            // Replacing horizontal rule with decorative divider
            hr: () => <DecorativeDivider />,
            // Enhancing links for footnotes
            a: ({ children, href, ...props }) => {
              const customProps = props as Record<string, unknown>;
              const isFootnote = href?.startsWith("#fn-") || href?.includes("fnref") || href?.includes("fn-") || Boolean(customProps["data-footnote-ref"]);
              if (isFootnote && href) {
                return (
                  <a
                    href={href}
                    className="footnote-ref text-burgundy-600 font-bold hover:text-burgundy-800"
                    onMouseEnter={(e) => handleFootnoteEnter(e, href)}
                    onMouseLeave={handleFootnoteLeave}
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
              return (
                <a href={href} {...props}>
                  {children}
                </a>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* Floating Footnote Tooltip */}
      {activeTooltip && (
        <div
          className="fixed z-[100] max-w-xs md:max-w-md bg-navy-900 text-parchment-100 text-xs md:text-sm p-3 rounded shadow-2xl border border-gold-400/40 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-200"
          style={{
            left: `${activeTooltip.x}px`,
            top: `${activeTooltip.y}px`,
          }}
        >
          <div className="font-serif text-gold-400 font-semibold mb-1">Chú thích:</div>
          <p className="line-clamp-4 leading-relaxed font-body">{activeTooltip.text}</p>
        </div>
      )}
    </div>
  );
}

