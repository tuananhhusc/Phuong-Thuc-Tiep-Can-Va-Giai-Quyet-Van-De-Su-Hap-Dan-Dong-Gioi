"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/lib/markdown";

interface TOCProps {
  headings: Heading[];
  theme?: "parchment" | "twilight";
  onItemClick?: () => void;
  onActiveIdChange?: (id: string) => void;
}

export default function TableOfContents({ 
  headings, 
  theme = "parchment",
  onItemClick,
  onActiveIdChange
}: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const isDark = theme === "twilight";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    // Adding a small delay to ensure ArticleArea elements are mounted
    const timeoutId = setTimeout(() => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  // Sync active heading with parent and localStorage
  useEffect(() => {
    if (activeId) {
      localStorage.setItem("dtl_active_heading", activeId);
      if (onActiveIdChange) {
        onActiveIdChange(activeId);
      }
    }
  }, [activeId, onActiveIdChange]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-8 overflow-y-auto max-h-[calc(100vh-4rem)] custom-scrollbar pr-4 pb-8">
      <h4 className="text-xl font-serif font-bold text-inherit opacity-90 mb-6 border-b-2 border-gold-400 pb-2">
        Mục lục
      </h4>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={() => {
                if (onItemClick) onItemClick();
              }}
              className={`block text-sm transition-all duration-300 ${
                activeId === heading.id
                  ? `${isDark ? "text-gold-400 font-bold" : "text-burgundy-700 font-bold"} translate-x-1`
                  : "opacity-70 hover:opacity-100 hover:text-burgundy-600"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
