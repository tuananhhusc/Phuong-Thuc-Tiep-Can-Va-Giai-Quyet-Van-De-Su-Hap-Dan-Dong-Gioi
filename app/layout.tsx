import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["vietnamese", "latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({ 
  subsets: ["vietnamese", "latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Báo cáo Nghiên cứu Toàn diện: Tiếp cận Sự hấp dẫn Đồng giới từ Hệ quy chiếu Công giáo",
  description: "Phân tích chuyên sâu về các mô thức tiếp cận và giải quyết vấn đề Sự hấp dẫn Đồng giới (SSA) từ hệ quy chiếu Công giáo và đa chiều, tập trung vào thần học luân lý và mục vụ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${lora.variable}`}>
      <body className="font-body text-gray-800 bg-parchment-200">
        {children}
      </body>
    </html>
  );
}
