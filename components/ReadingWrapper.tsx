"use client";

import { useState, useEffect } from "react";
import { List, X } from "lucide-react";
import TableOfContents from "./TableOfContents";
import ArticleArea from "./ArticleArea";
import ReadingControls from "./ReadingControls";
import { Heading } from "@/lib/markdown";

interface ReadingWrapperProps {
  content: string;
  tocHeadings: Heading[];
}

export default function ReadingWrapper({ content, tocHeadings }: ReadingWrapperProps) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<"parchment" | "twilight">("parchment");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [resumeHeading, setResumeHeading] = useState<{ id: string; text: string } | null>(null);

  const isDark = theme === "twilight";

  // Load saved reading progress on mount
  useEffect(() => {
    const savedId = localStorage.getItem("dtl_active_heading");
    if (savedId) {
      const heading = tocHeadings.find((h) => h.id === savedId);
      if (heading) {
        // Show the toast asking if the user wants to resume
        setResumeHeading({ id: heading.id, text: heading.text });
      }
    }
  }, [tocHeadings]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        isDark
          ? "bg-navy-900 text-parchment-200"
          : "bg-parchment-200 text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 to-burgundy-900/90 z-10" />
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548625361-ecbf1eb78ba9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
            style={{ filter: "blur(2px)" }}
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-6 pt-16 md:pt-0">
          <div className="inline-block px-4 py-1 border border-gold-400/50 text-gold-400 text-sm tracking-widest uppercase mb-4 font-semibold">
            Báo Cáo Nghiên Cứu Chuyên Sâu
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-parchment-100 leading-snug drop-shadow-lg pb-2">
            Phương thức Tiếp cận và Giải quyết Vấn đề Sự hấp dẫn Đồng giới
          </h1>
          <p className="text-lg md:text-xl text-parchment-300 font-body max-w-3xl mx-auto mt-4 italic">
            Từ Hệ quy chiếu Công giáo và Đa chiều
          </p>
        </div>
        
        {/* Theme-responsive bottom fade */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t to-transparent z-20 transition-colors duration-500 ${
            isDark ? "from-navy-900" : "from-parchment-200"
          }`} 
        />
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          
          {/* Left Sidebar: Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 relative">
            <TableOfContents headings={tocHeadings} theme={theme} />
          </aside>

          {/* Right Area: Article Content */}
          <div className="lg:col-span-9">
            <div className={`${isDark ? "dark-theme" : ""}`}>
              <ArticleArea content={content} fontSize={fontSize} theme={theme} />
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 text-center border-t-4 border-gold-500 transition-colors duration-500 ${
        isDark ? "bg-navy-950 text-parchment-400" : "bg-navy-900 text-parchment-300"
      }`}>
        <p className="font-serif italic text-gold-400">Sự thật sẽ giải phóng các ngươi. (Ga 8:32)</p>
        <p className="mt-4 text-sm opacity-70">© 2026 · Báo cáo nghiên cứu Công Giáo · Mọi quyền được bảo lưu.</p>
      </footer>

      {/* Mobile Table of Contents Trigger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`lg:hidden fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full border flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 ${
          isDark 
            ? "bg-navy-900 border-gold-400/50 text-gold-400 hover:bg-burgundy-700" 
            : "bg-parchment-100 border-gold-400/50 text-burgundy-700 hover:bg-parchment-200"
        }`}
        title="Mục lục bài viết"
      >
        <List size={20} />
      </button>

      {/* Mobile TOC Drawer overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className={`relative w-80 max-w-[85vw] h-full shadow-2xl p-6 flex flex-col transition-transform duration-300 ${
            isDark 
              ? "bg-navy-900 text-parchment-100 border-r border-gold-400/20" 
              : "bg-parchment-100 text-navy-900 border-r border-gold-400/20"
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold-400/20 pb-3 mb-4">
              <span className="text-md font-bold font-serif text-gold-500 uppercase tracking-wider">
                Mục lục bài viết
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark ? "hover:bg-navy-800 text-parchment-300" : "hover:bg-parchment-200 text-navy-900"
                }`}
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Table of Contents List */}
            <div className="overflow-y-auto flex-1 custom-scrollbar pr-1">
              <TableOfContents 
                headings={tocHeadings} 
                theme={theme} 
                onItemClick={() => setIsMobileMenuOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Resume Reading Progress Toast */}
      {resumeHeading && (
        <div className={`fixed bottom-24 left-6 z-40 max-w-[calc(100vw-3rem)] md:max-w-xs rounded-lg border p-4 shadow-2xl transition-all duration-500 animate-fade-in flex flex-col gap-2.5 ${
          isDark 
            ? "bg-navy-900/95 border-gold-400/40 text-parchment-100 backdrop-blur-md" 
            : "bg-parchment-100/95 border-gold-400/40 text-navy-900 backdrop-blur-md"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
              Đọc tiếp tục
            </span>
            <button 
              onClick={() => setResumeHeading(null)}
              className="text-xs opacity-50 hover:opacity-100 p-0.5 rounded"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-xs opacity-90 leading-relaxed font-body">
            Lần trước bạn đang đọc dở ở phần: <span className="font-semibold italic text-gold-500">{resumeHeading.text}</span>
          </p>
          <button
            onClick={() => {
              const el = document.getElementById(resumeHeading.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
              setResumeHeading(null);
            }}
            className={`w-full py-1.5 px-3 rounded text-xs font-bold text-center transition-all ${
              isDark 
                ? "bg-gold-400 text-navy-900 hover:bg-gold-500" 
                : "bg-burgundy-700 text-parchment-100 hover:bg-burgundy-800"
            }`}
          >
            Cuộn đến đoạn này
          </button>
        </div>
      )}

      {/* Floating Panel for Custom Controls */}
      <ReadingControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}
