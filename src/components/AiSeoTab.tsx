import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Tag,
  Hash,
  Lightbulb,
  RefreshCw,
  Zap
} from 'lucide-react';
import { AiSeoResult } from '../types/shopee';

interface AiSeoTabProps {
  initialTitle?: string;
  initialPrice?: number;
}

export const AiSeoTab: React.FC<AiSeoTabProps> = ({
  initialTitle = 'Kaos Polos Pria Katun Combed 30s Original Premium',
  initialPrice = 49000,
}) => {
  const [productTitle, setProductTitle] = useState(initialTitle);
  const [category, setCategory] = useState('Pakaian Pria > Kaos');
  const [price, setPrice] = useState(initialPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [seoResult, setSeoResult] = useState<AiSeoResult | null>(null);
  const [copiedTitleIndex, setCopiedTitleIndex] = useState<number | null>(null);
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const categories = [
    'Pakaian Pria > Kaos & Atasan',
    'Sepatu Pria > Sneakers & Casual',
    'Tas & Dompet Pria > Ransel & Selempang',
    'Pakaian Wanita > Gamis & Dress',
    'Kecantikan & Skincare > Serum & Toner',
    'Elektronik & Gadget > Audio & Aksesoris',
    'Perlengkapan Rumah & Dapur',
  ];

  const handleOptimize = async () => {
    if (!productTitle.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/optimize-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: productTitle,
          category,
          price,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSeoResult(json.data);
      }
    } catch (err) {
      console.error('Failed to optimize title:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (text: string, type: 'title' | 'keywords' | 'tags', index?: number) => {
    navigator.clipboard.writeText(text);
    if (type === 'title' && typeof index === 'number') {
      setCopiedTitleIndex(index);
      setTimeout(() => setCopiedTitleIndex(null), 2000);
    } else if (type === 'keywords') {
      setCopiedKeywords(true);
      setTimeout(() => setCopiedKeywords(false), 2000);
    } else if (type === 'tags') {
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Shopee Search Algorithm Engine (Didukung Gemini AI)
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Optimasi Judul & Kata Kunci SEO Peringkat #1 Shopee
          </h2>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Naikkan Produk (Sundul) memberi dorongan recency, tetapi <strong>Kualitas Judul</strong>{' '}
            menentukan apakah produk Anda bertahan di baris teratas hasil pencarian organik. Formula
            kami mengikuti struktur algoritma pencarian Shopee Indonesia.
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Judul Produk Shopee Saat Ini:
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Masukkan judul produk saat ini..."
                className="w-full bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                <span>Panjang: {productTitle.length} karakter</span>
                <span>Standar Shopee: 80 - 120 karakter</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kategori Produk:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 px-3 py-2 rounded-xl border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Harga Jual (Rp):
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 px-3 py-2 rounded-xl border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              onClick={handleOptimize}
              disabled={isLoading || !productTitle.trim()}
              className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menganalisis Algoritma Shopee...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Judul Peringkat #1 Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SEO Result Display */}
      {seoResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Score Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
              <span className="text-3xl font-extrabold text-amber-400">
                {seoResult.seoScore}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                Skor SEO
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Hasil Diagnosa Algoritma Pencarian
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {seoResult.scoreAnalysis}
              </p>
            </div>
          </div>

          {/* 3 Optimized Titles */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-4 border-b border-slate-800">
              <Award className="w-5 h-5 text-orange-400" />
              3 Pilihan Judul Rekomendasi Algoritma Shopee (Tingkat Konversi Tertinggi)
            </h3>

            <div className="mt-4 space-y-4">
              {seoResult.optimizedTitles.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase">
                      Formula #{idx + 1}: {item.formula}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.characterCount} Karakter (Ideal)
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-white select-all">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1 italic">
                    💡 {item.whyItRanks}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => copyText(item.title, 'title', idx)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      {copiedTitleIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Judul Ini</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Keywords */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Kata Kunci Pencarian Teratas
                  </h4>
                </div>
                <button
                  onClick={() => copyText(seoResult.topKeywords.join(', '), 'keywords')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedKeywords ? (
                    <span className="text-emerald-400 font-bold">Tersalin!</span>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Salin Semua
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {seoResult.topKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Search Tags */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Tagar & Backend Search Tags
                  </h4>
                </div>
                <button
                  onClick={() => copyText(seoResult.backendSearchTags.join(' '), 'tags')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedTags ? (
                    <span className="text-emerald-400 font-bold">Tersalin!</span>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Salin Tagar
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {seoResult.backendSearchTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-400/20 text-xs text-amber-300 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
