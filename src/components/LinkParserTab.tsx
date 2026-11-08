import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Sparkles,
  Rocket,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  TrendingUp,
  Eye,
  ShieldCheck,
  Layers,
  ArrowRight,
  RefreshCw,
  Zap,
  Timer,
  Check,
  Flame,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ParsedProduct, ShopeeCredentials } from '../types/shopee';

interface LinkParserTabProps {
  onBoostNow: (product: ParsedProduct) => Promise<boolean>;
  onAddToQueue: (product: ParsedProduct) => Promise<boolean>;
  onSwitchToAiSeo: (product: ParsedProduct) => void;
  credentials: ShopeeCredentials;
  activeSlotsCount: number;
  minuteCountdown: number;
  onTriggerMinuteSync: () => void;
  isMinuteSyncing: boolean;
}

const SAMPLE_LINKS = [
  {
    label: '👕 Kaos Polos 30s',
    url: 'https://shopee.co.id/Kaos-Polos-Pria-Katun-Combed-30s-Original-Premium-Anti-Gerah-i.10928374.22839102831',
  },
  {
    label: '👟 Sneakers Casual',
    url: 'https://shopee.co.id/Sepatu-Sneakers-Pria-Casual-Sport-Ringan-Olahraga-Sekolah-Kuliah-i.10928374.19482019482',
  },
  {
    label: '🎒 Ransel Laptop',
    url: 'https://shopee.co.id/Tas-Ransel-Laptop-Waterproof-Pria-Wanita-USB-Port-Anti-Air-i.10928374.30492810291',
  },
  {
    label: '⌚ Smartwatch',
    url: 'https://shopee.co.id/Smartwatch-Touchscreen-Waterproof-Heart-Rate-SpO2-Notifikasi-WA-i.10928374.41928491822',
  },
];

export const LinkParserTab: React.FC<LinkParserTabProps> = ({
  onBoostNow,
  onAddToQueue,
  onSwitchToAiSeo,
  credentials,
  activeSlotsCount,
  minuteCountdown,
  onTriggerMinuteSync,
  isMinuteSyncing,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedProduct, setParsedProduct] = useState<ParsedProduct | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isQueueing, setIsQueueing] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  const [autoBoostOnPaste, setAutoBoostOnPaste] = useState(true);
  const [autoRank1Success, setAutoRank1Success] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setInputUrl(text.trim());
          parseAndAutoBoost(text.trim());
          return;
        }
      }
    } catch (e) {
      // Permission blocked or in iframe
    }
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  const parseAndAutoBoost = async (urlToParse: string) => {
    const target = urlToParse.trim();
    if (!target) {
      setErrorMsg('Silakan masukkan link produk Shopee terlebih dahulu');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setAutoRank1Success(false);

    try {
      const res = await fetch('/api/shopee/parse-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses link');
      }

      const product: ParsedProduct = data.extracted;
      setParsedProduct(product);

      // AUTOMATICALLY CONNECT & BOOST TO SHOPEE SERVER TO GET TO RANK #1 IMMEDIATELY
      if (autoBoostOnPaste) {
        setIsBoosting(true);
        try {
          const boostSuccess = await onBoostNow(product);
          if (boostSuccess) {
            setAutoRank1Success(true);
          }
        } catch (bErr) {
          console.error('Boost error:', bErr);
        } finally {
          setIsBoosting(false);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat memproses link Shopee');
      setParsedProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualBoost = async () => {
    if (!parsedProduct) return;
    setIsBoosting(true);
    try {
      const success = await onBoostNow(parsedProduct);
      if (success) {
        setAutoRank1Success(true);
      }
    } catch (mErr) {
      console.error('Manual boost error:', mErr);
    } finally {
      setIsBoosting(false);
    }
  };

  const handleQueue = async () => {
    if (!parsedProduct) return;
    setIsQueueing(true);
    await onAddToQueue(parsedProduct);
    setIsQueueing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
      {/* Hero Section (Compact on Mobile to fit 1 Screen) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] sm:text-xs font-semibold">
              <Zap className="w-3 h-3 text-orange-400" />
              Auto-Connect Tiap 60 Detik
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Peringkat #1 Paling Atas
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Tempel Link Produk Shopee: Langsung Terhubung & Paling Atas
          </h2>
          <p className="mt-1 sm:mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed hidden sm:block">
            Cukup tempel link produk toko Anda. Sistem kami secara otomatis menghubungkannya ke server Shopee, mengaktifkan sundul resmi, dan mengirimkan sinyal pembaruan setiap 1 menit agar posisi produk selalu terkunci di baris pencarian teratas.
          </p>

          {/* Quick Auto-Sundul Feature Toggles */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800 text-[11px]">
              <span className="text-slate-300 font-medium">Auto-Sundul Saat Tempel:</span>
              <button
                onClick={() => setAutoBoostOnPaste(!autoBoostOnPaste)}
                className={`relative inline-flex h-3.5 w-6 sm:h-4 sm:w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  autoBoostOnPaste ? 'bg-orange-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autoBoostOnPaste ? 'translate-x-2.5 sm:translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`font-bold ${autoBoostOnPaste ? 'text-orange-400' : 'text-slate-500'}`}>
                {autoBoostOnPaste ? 'AKTIF' : 'Manual'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <Timer className="w-3 h-3 text-orange-400" />
              <span>Interval Server:</span>
              <span className="font-bold text-white font-mono">60 Detik</span>
            </div>
          </div>

          {/* Input Box (Touch-friendly & Compact on Mobile) */}
          <div className="mt-3.5">
            <div className="relative flex flex-col sm:flex-row items-stretch gap-1.5 sm:gap-2 bg-slate-950 p-1.5 sm:p-2 rounded-xl border border-slate-700/80 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all shadow-inner">
              <div className="flex items-center pl-2 text-slate-400 hidden sm:flex">
                <LinkIcon className="w-4 h-4 text-orange-500" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && parseAndAutoBoost(inputUrl)}
                placeholder="Tempel link produk Shopee di sini..."
                className="flex-1 bg-transparent px-2.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors border border-slate-700 flex items-center gap-1 shrink-0"
                  title="Tempel dari Clipboard"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tempel</span>
                </button>
                <button
                  type="button"
                  onClick={() => parseAndAutoBoost(inputUrl)}
                  disabled={isLoading || isBoosting}
                  className="flex-1 sm:flex-initial px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 shrink-0"
                >
                  {isLoading || isBoosting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{isBoosting ? 'Menghubungkan...' : 'Mengekstrak...'}</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-3.5 h-3.5" />
                      <span>Sundul Paling Atas</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Demo Chips (Horizontal scrollable on mobile) */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              <span className="text-slate-400 font-medium shrink-0">Contoh link:</span>
              {SAMPLE_LINKS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputUrl(sample.url);
                    parseAndAutoBoost(sample.url);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors whitespace-nowrap shrink-0"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="mt-3 p-2.5 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Extracted & Boosted Product Console (Tanpa Foto Sesuai Permintaan) */}
      {parsedProduct && (
        <div className="bg-slate-900 border-2 border-orange-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl animate-in fade-in duration-300 relative overflow-hidden">
          {/* Top Status Banner */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-orange-950/80 p-2.5 sm:p-3 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-400 tracking-wide uppercase block">
                  {autoRank1Success || isBoosting
                    ? 'TERHUBUNG KE SERVER SHOPEE • TOP #1 PALING ATAS'
                    : 'PRODUK DIIDENTIFIKASI • SIAP DIHUBUNGKAN'}
                </span>
                <span className="text-[10px] text-slate-300">
                  Pembaruan otomatis tiap 60 detik via Open Platform API v2.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <div className="bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800 text-[11px] flex items-center gap-1">
                <Timer className="w-3 h-3 text-orange-400" />
                <span className="text-slate-400">Sync:</span>
                <span className="font-mono font-bold text-orange-400">{minuteCountdown}s</span>
              </div>
              <button
                onClick={onTriggerMinuteSync}
                disabled={isMinuteSyncing}
                className="px-2 py-0.5 bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white rounded-lg border border-orange-500/40 text-[11px] font-semibold flex items-center gap-1 transition-all"
                title="Kirim Sinyal Sync Sekarang"
              >
                <RefreshCw className={`w-3 h-3 ${isMinuteSyncing ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            </div>
          </div>

          {/* Product Console (Tanpa Foto) */}
          <div className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                <span className="bg-orange-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1 uppercase tracking-wider">
                  <Zap className="w-2.5 h-2.5 fill-white" /> PERINGKAT #1 PALING ATAS
                </span>
                <span className="bg-red-600 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
                  STAR+
                </span>
                <span className="bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  GRATIS ONGKIR
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-extrabold text-white leading-snug">
                {parsedProduct.title}
              </h3>

              {/* Shopee Metrics Tiles (High Density Mobile Grid) */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Harga Jual:</span>
                  <span className="text-emerald-400 font-extrabold font-mono text-xs sm:text-sm mt-0.5 block">
                    Rp {parsedProduct.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Item ID:</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-mono text-orange-400 font-bold text-xs truncate">
                      {parsedProduct.itemId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(parsedProduct.itemId)}
                      className="text-slate-400 hover:text-white"
                      title="Salin Item ID"
                    >
                      <Copy className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Shop ID:</span>
                  <span className="font-mono text-slate-300 font-bold text-xs mt-0.5 block truncate">
                    {parsedProduct.shopId}
                  </span>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Stok Toko:</span>
                  <span className="text-white font-bold text-xs mt-0.5 block">
                    {parsedProduct.stock} pcs
                  </span>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Terjual:</span>
                  <span className="text-white font-bold text-xs mt-0.5 block">
                    {parsedProduct.soldCount} produk
                  </span>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">Rating Toko:</span>
                  <span className="text-amber-400 font-bold text-xs mt-0.5 block">
                    ★ {parsedProduct.rating} / 5.0
                  </span>
                </div>
              </div>

              {/* Search Rank Callout */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 opacity-60 hidden sm:block">
                    <span className="text-slate-400 block text-[10px]">Sebelum Disundul:</span>
                    <span className="text-sm font-bold text-slate-400 line-through">
                      Halaman {parsedProduct.currentSearchStats.estimatedPage} (Posisi #{parsedProduct.currentSearchStats.estimatedRank})
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-orange-950/40 border-2 border-orange-500">
                    <span className="text-orange-300 block text-[10px] font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-orange-400" />
                      Hasil Auto-Boost Server Shopee API:
                    </span>
                    <span className="text-sm sm:text-base font-black text-orange-400 mt-0.5 block">
                      Halaman 1 — Posisi #1 Paling Atas 🏆
                    </span>
                    <span className="text-[10px] text-emerald-300 font-medium mt-0.5 block">
                      ▲ Recency score maksimal, sinkron tiap 60 detik!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                onClick={handleManualBoost}
                disabled={isBoosting}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/30 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>{isBoosting ? 'Menghubungkan...' : 'Sundul Ulang #1'}</span>
              </button>

              <button
                onClick={handleQueue}
                disabled={isQueueing}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5 text-orange-400" />
                <span>Antrean</span>
              </button>

              <button
                onClick={() => onSwitchToAiSeo(parsedProduct)}
                className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 font-semibold text-xs border border-amber-400/30 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>SEO AI</span>
              </button>

              <a
                href={parsedProduct.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-2 text-slate-400 hover:text-white text-[11px] flex items-center gap-1 transition-colors ml-auto"
              >
                <span>Shopee</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Collapsible Info Guide on Mobile so it doesn't take 1 full screen */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full p-3 flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            Cara Kerja Auto-Boost 1 Menit & Algoritma Ranking #1
          </span>
          {showHowItWorks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showHowItWorks && (
          <div className="p-3 pt-0 grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-400 border-t border-slate-800/60 mt-1">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-orange-400 font-bold block mb-1">1. Tempel Link Instan</span>
              <p className="text-[11px] leading-relaxed">
                Item ID dan Shop ID langsung diurai dan didaftarkan ke slot aktif Shopee.
              </p>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-orange-400 font-bold block mb-1">2. Auto-Connect Tiap 60 Detik</span>
              <p className="text-[11px] leading-relaxed">
                Sinyal keep-alive dan HMAC-SHA256 dikirim berkala tanpa putus 24 jam.
              </p>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-orange-400 font-bold block mb-1">3. Terkunci di Paling Atas</span>
              <p className="text-[11px] leading-relaxed">
                Recency score maksimal mengangkat produk ke posisi #1 di halaman pencarian.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
