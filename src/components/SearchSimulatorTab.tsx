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
  Rocket
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
      badge: 'SHOPEE MALL',
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
    <div className="space-y-8">
      {/* Search Header & Simulator Controls */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-white">
                Simulasi Halaman Pencarian Shopee (BangRoy Boost Engine)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Lihat bagaimana koneksi server otomatis setiap menit mengunci produk Anda langsung di baris
              pencarian paling atas (Peringkat #1 Teratas).
            </p>
          </div>

          {/* Toggle Boost Comparison */}
          <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Status Sundul:</span>
            <button
              onClick={() => setIsBoostActive(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isBoostActive
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tanpa Sundul (Halaman 4)
            </button>
            <button
              onClick={() => setIsBoostActive(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isBoostActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Dengan Auto-Sundul (Halaman 1)</span>
            </button>
          </div>
        </div>

        {/* Shopee-like Search Input Bar */}
        <div className="mt-5 max-w-2xl flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-700">
          <div className="pl-3 text-slate-500">
            <Search className="w-4 h-4 text-orange-400" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari kata kunci pencarian Shopee (misal: kaos polos pria, sneakers, gamis)..."
            className="flex-1 bg-transparent px-2 py-1.5 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold transition-colors">
            Cari di Shopee
          </button>
        </div>
      </div>

      {/* Mock Shopee Search Interface */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="text-xs text-slate-400">
            Hasil pencarian untuk <span className="text-orange-400 font-bold">"{keyword}"</span>
          </div>

          {/* Shopee Tab Filters */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 text-[11px] hidden sm:inline">Urutkan:</span>
            {(['terkait', 'terbaru', 'terlaris', 'harga'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  filterTab === tab
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'terkait' ? 'Terkait' : tab === 'terbaru' ? 'Terbaru (Sundul)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Status Callout */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isBoostActive ? 'bg-emerald-400' : 'bg-red-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isBoostActive ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
            </span>
            <span className="text-slate-300">
              Posisi Produk Anda:{' '}
              {isBoostActive ? (
                <strong className="text-emerald-400 font-bold">
                  PERINGKAT #1 PALING ATAS (Halaman 1) — Terkunci Otomatis Tiap Menit
                </strong>
              ) : (
                <strong className="text-red-400 font-bold">
                  PERINGKAT #87 (Halaman 4) — Tidak Terlihat Pembeli
                </strong>
              )}
            </span>
          </div>
          <span className="text-slate-500 text-[11px] hidden md:inline">
            Algoritma: Recency + BM25 Match + Auto-Sync Tiap Menit
          </span>
        </div>

        {/* Product Grid (SERP Mock) */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* If Boost is ACTIVE and user has promoted product */}
          {isBoostActive && myPromoted && (
            <div className="relative bg-slate-950 border-2 border-orange-500 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 ring-2 ring-orange-500/20 p-4">
              <div className="flex flex-col gap-1.5 mb-3">
                <span className="px-2 py-0.5 rounded bg-orange-600 text-white font-black text-[10px] tracking-wide shadow flex items-center gap-1 w-fit">
                  <Zap className="w-3 h-3 fill-current" /> TOP #1 PALING ATAS
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-bold text-[9px] shadow">
                    STAR+ SELLER
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold text-[9px]">
                    GRATIS ONGKIR XTRA
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-3 leading-tight">
                    {myPromoted.title}
                  </h4>
                  <div className="mt-3 text-base font-extrabold text-orange-400 font-mono">
                    Rp {myPromoted.price.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-bold">4.9</span>
                  </div>
                  <span className="text-emerald-400 font-bold">▲ Sundul Server Shopee Aktif</span>
                </div>
              </div>
            </div>
          )}

          {/* If slots are empty, prompt user to paste link */}
          {!myPromoted && (
            <div className="col-span-2 md:col-span-4 lg:col-span-5 bg-slate-950 p-6 rounded-2xl border-2 border-dashed border-slate-800 text-center mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Slot Naikkan Produk Masih Kosong</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Tempelkan link produk Shopee Anda di menu &quot;Tempel Link &amp; Sundul&quot;. Produk akan otomatis terhubung ke server Shopee dan langsung muncul di sini pada Peringkat #1 Paling Atas!
              </p>
              {onNavigateToPaste && (
                <button
                  onClick={onNavigateToPaste}
                  className="mt-3 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all inline-flex items-center gap-1.5"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Tempel Link Produk Sekarang</span>
                </button>
              )}
            </div>
          )}

          {/* Competitor items */}
          {competitors.map((item, idx) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow flex flex-col justify-between group hover:border-slate-700 transition-all opacity-90"
            >
              <div className="relative aspect-square bg-slate-900 overflow-hidden">
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className={`px-1.5 py-0.2 rounded text-white font-bold text-[9px] shadow ${
                      item.badge === 'SHOPEE MALL' ? 'bg-red-600' : 'bg-orange-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                {item.ads && (
                  <div className="absolute top-2 right-2 bg-slate-900/80 text-slate-400 text-[9px] px-1 rounded">
                    Iklan
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-medium text-slate-200 line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  <div className="mt-2 text-sm font-bold text-orange-400 font-mono">
                    Rp {item.price.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                  <span>{item.sold}</span>
                </div>
              </div>
            </div>
          ))}

          {/* If Boost is INACTIVE: Your product appears here at the very end or blurred */}
          {!isBoostActive && (
            <div className="bg-slate-950 border border-red-900/50 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-60">
              <span className="text-xs font-bold text-red-400">Posisi Produk Anda:</span>
              <span className="text-2xl font-black text-slate-600 mt-1">#87</span>
              <p className="text-[11px] text-slate-500 mt-2">
                Halaman 4 — Peluang dilihat pembeli &lt; 2%.
              </p>
              <button
                onClick={() => setIsBoostActive(true)}
                className="mt-3 px-3 py-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs"
              >
                Aktifkan Auto-Sundul
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Educational Guide: Shopee's 4 Core Ranking Algorithms */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-orange-400" />
          4 Faktor Utama Algoritma Pencarian Shopee Menentukan Ranking #1
        </h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-orange-400 font-bold text-xs">01. Recency & Sundul (30%)</span>
            <h4 className="text-sm font-semibold text-white mt-1">Fitur Naikkan Produk Berkala</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Algoritma Shopee mendahulukan produk yang baru saja dinaikkan statusnya. Alat BangRoy Boost
              memastikan interval 1 menit selalu diperbarui otomatis ke server Shopee tanpa henti.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-orange-400 font-bold text-xs">02. Kerapatan Kata Kunci (30%)</span>
            <h4 className="text-sm font-semibold text-white mt-1">Struktur Judul 40 Karakter</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              40 karakter pertama adalah yang paling berat dibaca robot mesin pencari Shopee. Letakkan
              [Kata Kunci Utama] persis setelah nama brand tanpa kata berulang.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-orange-400 font-bold text-xs">03. Skor Konversi & CTR (25%)</span>
            <h4 className="text-sm font-semibold text-white mt-1">Frame Foto & Gratis Ongkir</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Shopee menaikkan produk yang banyak diklik. Badge Gratis Ongkir Xtra, COD, dan voucher
              toko menyumbang skor konversi tertinggi.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-orange-400 font-bold text-xs">04. Performa Toko (15%)</span>
            <h4 className="text-sm font-semibold text-white mt-1">Respon Chat & Star Seller</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Toko dengan respon chat di atas 90% dan rating bintang minimal 4.7 mendapatkan prioritas
              tampil lebih tinggi dibanding toko biasa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
