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
  description: "Phân tích chuyên sâu về các mô thức tiếp cận và giải quyết vấn đề Sự hấp dẫn Đồng giới (SSA) từ hệ quy chiếu Công giáo và các quan điểm học thuật đa chiều.",
  keywords: [
    "Sự hấp dẫn đồng giới",
    "Đồng tính Công giáo",
    "Thần học luân lý Công giáo",
    "Mục vụ Công giáo đồng tính",
    "Giáo lý Hội thánh Công giáo đồng tính",
    "SSA",
    "Đồng tính luyến ái Công giáo",
    "Hỗ trợ mục vụ đồng tính"
  ],
  authors: [{ name: "Tác giả Nghiên Cứu" }],
  creator: "Cộng đồng Nghiên cứu Công giáo",
  publisher: "Cộng đồng Nghiên cứu Công giáo",
  robots: "index, follow",
  alternates: {
    canonical: "https://tuananhhusc.github.io/Phuong-Thuc-Tiep-Can-Va-Giai-Quyet-Van-De-Su-Hap-Dan-Dong-Gioi",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://tuananhhusc.github.io/Phuong-Thuc-Tiep-Can-Va-Giai-Quyet-Van-De-Su-Hap-Dan-Dong-Gioi",
    title: "Báo cáo Nghiên cứu: Tiếp cận Sự hấp dẫn Đồng giới từ Hệ quy chiếu Công giáo",
    description: "Phân tích chuyên sâu về các mô thức tiếp cận và giải quyết vấn đề Sự hấp dẫn Đồng giới (SSA) từ hệ quy chiếu Công giáo và các quan điểm học thuật đa chiều.",
    siteName: "Nghiên cứu Công giáo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548625361-ecbf1eb78ba9?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Hệ quy chiếu Công giáo và Sự hấp dẫn Đồng giới",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Báo cáo Nghiên cứu: Tiếp cận Sự hấp dẫn Đồng giới từ Hệ quy chiếu Công giáo",
    description: "Phân tích chuyên sâu về các mô thức tiếp cận và giải quyết vấn đề Sự hấp dẫn Đồng giới (SSA) từ hệ quy chiếu Công giáo và các quan điểm học thuật đa chiều.",
    images: ["https://images.unsplash.com/photo-1548625361-ecbf1eb78ba9?q=80&w=1200&auto=format&fit=crop"],
  },
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
