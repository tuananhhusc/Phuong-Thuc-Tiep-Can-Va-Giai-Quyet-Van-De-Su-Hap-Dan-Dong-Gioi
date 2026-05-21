"use client";

import { useState, useEffect } from "react";
import { Type, Volume2, VolumeX, Sun, Moon, Settings, X } from "lucide-react";

interface ReadingControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  theme: "parchment" | "twilight";
  setTheme: (theme: "parchment" | "twilight") => void;
}

export default function ReadingControls({
  fontSize,
  setFontSize,
  theme,
  setTheme,
}: ReadingControlsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [audioPlay, setAudioPlay] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft ambient background audio (Gregorian Chant or Library Hum)
  useEffect(() => {
    // Using a soft classical instrumental/ambient track
    const ambientAudio = new Audio(
      "https://archive.org/download/VeniCreatorSpiritus/Veni%20Creator%20Spiritus.mp3"
    );
    ambientAudio.loop = true;
    ambientAudio.volume = 0.15;
    setAudio(ambientAudio);

    return () => {
      ambientAudio.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (!audio) return;
    if (audioPlay) {
      audio.pause();
    } else {
      audio.play().catch(() => console.log("Audio play blocked by browser policy until user interaction."));
    }
    setAudioPlay(!audioPlay);
  };

  const isDark = theme === "twilight";

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gold-400/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-gold-400 via-burgundy-600 to-gold-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Control Button and Panel */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-serif">
        
        {/* Expanded Panel */}
        {isOpen && (
          <div 
            className={`flex flex-col rounded-lg border p-4 shadow-2xl space-y-4 w-72 transition-all duration-300 transform scale-100 ${
              isDark 
                ? "bg-navy-900 border-gold-400/40 text-parchment-100" 
                : "bg-parchment-100 border-gold-400/40 text-navy-900"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold-400/20 pb-2">
              <span className="text-sm font-bold text-gold-500 uppercase tracking-widest flex items-center gap-1.5">
                <Settings size={14} className="text-gold-400" /> Tùy chỉnh đọc
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-full transition-colors ${
                  isDark ? "hover:bg-navy-800 text-parchment-300" : "hover:bg-parchment-200 text-navy-800"
                }`}
                title="Đóng bản điều khiển"
              >
                <X size={16} />
              </button>
            </div>

            {/* Font Size Adjust */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium flex items-center gap-1.5 opacity-90">
                <Type size={14} className="text-gold-400" /> Cỡ chữ tài liệu
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border border-gold-400/20 text-lg transition-colors font-bold ${
                    isDark ? "bg-navy-800 hover:bg-burgundy-700" : "bg-parchment-200 hover:bg-gold-400/20"
                  }`}
                  title="Giảm cỡ chữ"
                >
                  -
                </button>
                <span className="text-xs w-8 text-center font-mono font-semibold">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border border-gold-400/20 text-lg transition-colors font-bold ${
                    isDark ? "bg-navy-800 hover:bg-burgundy-700" : "bg-parchment-200 hover:bg-gold-400/20"
                  }`}
                  title="Tăng cỡ chữ"
                >
                  +
                </button>
              </div>
            </div>

            {/* Theme Toggle (Parchment vs Twilight) */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium flex items-center gap-1.5 opacity-90">
                {isDark ? <Moon size={14} className="text-gold-400" /> : <Sun size={14} className="text-gold-400" />} Chế độ không gian
              </span>
              <div className="flex gap-1.5">
                {/* Parchment Button */}
                <button
                  onClick={() => setTheme("parchment")}
                  className={`px-3 py-1 text-xs border rounded-md font-medium transition-all ${
                    !isDark 
                      ? "bg-gold-400/20 border-gold-400 text-burgundy-700 font-bold" 
                      : "bg-navy-800 border-transparent text-parchment-300 hover:border-gold-400/30"
                  }`}
                >
                  Giấy da
                </button>
                {/* Twilight Button */}
                <button
                  onClick={() => setTheme("twilight")}
                  className={`px-3 py-1 text-xs border rounded-md font-medium transition-all ${
                    isDark 
                      ? "bg-gold-400/20 border-gold-400 text-gold-400 font-bold" 
                      : "bg-parchment-200 border-transparent text-navy-900 hover:border-gold-400/30"
                  }`}
                >
                  Hoàng hôn
                </button>
              </div>
            </div>

            {/* Ambient Music Toggler */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium flex items-center gap-1.5 opacity-90">
                {audioPlay ? <Volume2 size={14} className="text-gold-400 animate-pulse" /> : <VolumeX size={14} className="text-gold-400" />} Âm thanh tĩnh tâm
              </span>
              <button
                onClick={toggleAudio}
                className={`px-3 py-1.5 rounded-md text-xs border flex items-center gap-1.5 transition-all ${
                  audioPlay 
                    ? "bg-burgundy-700 border-gold-400 text-gold-400 font-bold" 
                    : isDark 
                      ? "bg-navy-800 border-transparent text-parchment-300 hover:border-gold-400/30" 
                      : "bg-parchment-200 border-transparent text-navy-900 hover:border-gold-400/30"
                }`}
                title={audioPlay ? "Tắt âm thanh" : "Bật âm thanh"}
              >
                {audioPlay ? "Đang bật" : "Tắt"}
              </button>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 ${
            isDark 
              ? "bg-navy-900 border-gold-400/50 text-gold-400 hover:bg-burgundy-700" 
              : "bg-parchment-100 border-gold-400/50 text-burgundy-700 hover:bg-parchment-200"
          }`}
          title="Tùy chỉnh giao diện đọc"
        >
          {isOpen ? <X size={20} /> : <Settings size={20} className={audioPlay ? "slow-spin" : ""} />}
        </button>

      </div>
    </>
  );
}
