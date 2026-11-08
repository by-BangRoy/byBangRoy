import React, { useState } from 'react';
import {
  Search,
  Filter,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  ExternalLink,
  Rocket,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BoostedSlot } from '../types/shopee';

interface SearchSimulatorTabProps {
  slots: BoostedSlot[];
  onNavigateToPaste?: () => void;
}

export const SearchSimulatorTab: React.FC<SearchSimulatorTabProps> = ({ slots, onNavigateToPaste }) => {
  const [keyword, setKeyword] = useState('kaos polos pria');
  const [filterTab, setFilterTab] = useState<'terkait' | 'terbaru' | 'terlaris' | 'harga'>('terkait');
  const [isBoostActive, setIsBoostActive] = useState(true);
  const [showAlgorithmGuide, setShowAlgorithmGuide] = useState(false);

  // Pre-configured competitor products for simulation
  const competitors = [
    {
      id: 'c-1',
      title: 'Kaos Polos Cotton Combed 30s Reaktif Standar Distro Bandung',
      price: 35000,
      sold: '10RB+ Terjual',
      rating: 4.8,
      location: 'Kota Bandung',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&auto=format&fit=crop&q=60',
      badge: 'STAR+',
      ads: false,
    },
    {
      id: 'c-2',
      title: 'T-Shirt Pria Basic Polos O-Neck Katun Lembut Nyaman Adem',
      price: 42000,
      sold: '5,4RB Terjual',
      rating: 4.9,
      location: 'Jakarta Barat',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=60',
      badge: 'MALL',
      ads: true,
    },
    {
      id: 'c-3',
      title: 'Kaos Polos Pria Katun Combed Tebal Warna Hitam Putih Navy',
      price: 38000,
      sold: '2,1RB Terjual',
      rating: 4.7,
      location: 'Kota Surakarta',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&auto=format&fit=crop&q=60',
      badge: 'STAR',
      ads: false,
    },
    {
      id: 'c-4',
      title: 'Kaos Oblong Polos Cowok Santai Harian Bahan Katun Dingin',
      price: 29900,
      sold: '8,2RB Terjual',
      rating: 4.7,
      location: 'Kab. Tangerang',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&auto=format&fit=crop&q=60',
      badge: 'STAR',
      ads: false,
    },
  ];

  // User's boosted product from active slots
  const myPromoted = slots.find((s) => s.status === 'active') || (slots.length > 0 ? slots[0] : null);

  return (
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
      {/* Search Header & Simulator Controls (Compact on Mobile) */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 sm:p-5 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <Search className="w-4 h-4 text-orange-500" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Simulasi Pencarian Shopee #1
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Posisi produk Anda terkunci di baris pencarian teratas secara real-time.
            </p>
          </div>

          {/* Toggle Boost Comparison */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setIsBoostActive(false)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                !isBoostActive
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tanpa Sundul (Hal 4)
            </button>
            <button
              onClick={() => setIsBoostActive(true)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                isBoostActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Auto-Sundul (Top #1)</span>
            </button>
          </div>
        </div>

        {/* Shopee-like Search Input Bar */}
        <div className="mt-3 flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-700">
          <div className="pl-2 text-slate-500">
            <Search className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari kata kunci Shopee..."
            className="flex-1 bg-transparent px-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-[11px] font-bold transition-colors">
            Cari
          </button>
        </div>
      </div>

      {/* Mock Shopee Search Interface */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="text-[11px] text-slate-400">
            Hasil: <span className="text-orange-400 font-bold">"{keyword}"</span>
          </div>

          {/* Shopee Tab Filters */}
          <div className="flex items-center gap-1 text-[11px] font-semibold overflow-x-auto scrollbar-none">
            {(['terkait', 'terbaru', 'terlaris', 'harga'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-2.5 py-1 rounded-lg capitalize whitespace-nowrap transition-all ${
                  filterTab === tab
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'terkait' ? 'Terkait' : tab === 'terbaru' ? 'Terbaru' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Status Callout */}
        <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isBoostActive ? 'bg-emerald-400' : 'bg-red-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isBoostActive ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
            </span>
            <span className="text-slate-300">
              Posisi:{' '}
              {isBoostActive ? (
                <strong className="text-emerald-400 font-bold">
                  PERINGKAT #1 PALING ATAS (Halaman 1)
                </strong>
              ) : (
                <strong className="text-red-400 font-bold">
                  PERINGKAT #87 (Halaman 4)
                </strong>
              )}
            </span>
          </div>
          <span className="text-slate-500 text-[10px] hidden md:inline">
            Sync Tiap 60s
          </span>
        </div>

        {/* Product Grid (SERP Mock) */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {/* If Boost is ACTIVE and user has promoted product */}
          {isBoostActive && myPromoted && (
            <div className="relative bg-slate-950 border-2 border-orange-500 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-3 ring-2 ring-orange-500/20">
              <div className="flex flex-col gap-1 mb-2">
                <span className="px-1.5 py-0.5 rounded bg-orange-600 text-white font-black text-[9px] tracking-wide shadow flex items-center gap-0.5 w-fit">
                  <Zap className="w-2.5 h-2.5 fill-current" /> TOP #1 PALING ATAS
                </span>
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0.2 rounded bg-red-600 text-white font-bold text-[8px] shadow">
                    STAR+
                  </span>
                  <span className="px-1 py-0.2 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold text-[8px]">
                    GRATIS ONGKIR
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-3 leading-tight">
                    {myPromoted.title}
                  </h4>
                  <div className="mt-2 text-sm sm:text-base font-extrabold text-orange-400 font-mono">
                    Rp {myPromoted.price.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="mt-3 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span className="font-bold">4.9</span>
                  </div>
                  <span className="text-emerald-400 font-bold">▲ Sundul Aktif</span>
                </div>
              </div>
            </div>
          )}

          {/* If slots are empty, prompt user to paste link */}
          {!myPromoted && (
            <div className="col-span-2 md:col-span-4 lg:col-span-5 bg-slate-950 p-4 rounded-xl border-2 border-dashed border-slate-800 text-center mb-1">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-1.5">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Slot Masih Kosong</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-sm mx-auto">
                Tempel link produk untuk langsung menaikkannya ke posisi #1 paling atas di sini.
              </p>
              {onNavigateToPaste && (
                <button
                  onClick={onNavigateToPaste}
                  className="mt-2.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all inline-flex items-center gap-1"
                >
                  <Rocket className="w-3 h-3" />
                  <span>Tempel Link Sekarang</span>
                </button>
              )}
            </div>
          )}

          {/* Competitor items */}
          {competitors.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow flex flex-col justify-between opacity-80"
            >
              <div className="relative aspect-square bg-slate-900 overflow-hidden">
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span
                    className={`px-1 py-0.2 rounded text-white font-bold text-[8px] shadow ${
                      item.badge === 'MALL' ? 'bg-red-600' : 'bg-orange-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] font-medium text-slate-300 line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  <div className="mt-1 text-xs font-bold text-orange-400 font-mono">
                    Rp {item.price.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                  <span>{item.sold}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Educational Guide on Mobile */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAlgorithmGuide(!showAlgorithmGuide)}
          className="w-full p-3 flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            4 Faktor Algoritma Penentu Ranking #1 Shopee
          </span>
          {showAlgorithmGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAlgorithmGuide && (
          <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs border-t border-slate-800/60 mt-1">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-orange-400 font-bold text-[10px]">01. Recency & Sundul (30%)</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Alat BangRoy Boost memastikan interval 1 menit selalu diperbarui otomatis ke server Shopee tanpa henti.
              </p>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-orange-400 font-bold text-[10px]">02. Kerapatan Kata Kunci (30%)</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Struktur judul 40 karakter pertama adalah kunci utama bot pencarian Shopee.
              </p>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-orange-400 font-bold text-[10px]">03. Skor Konversi & CTR (25%)</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Badge Gratis Ongkir Xtra dan COD menyumbang skor konversi tertinggi.
              </p>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-orange-400 font-bold text-[10px]">04. Performa Toko (15%)</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Respon chat &gt;90% dan rating &ge;4.7 mendapat prioritas tampil teratas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
