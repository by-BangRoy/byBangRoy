import React, { useState, useEffect } from 'react';
import {
  Clock,
  RotateCw,
  Trash2,
  Plus,
  Play,
  Pause,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Layers,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { BoostedSlot, QueuedProduct } from '../types/shopee';

interface SlotsManagerTabProps {
  slots: BoostedSlot[];
  queued: QueuedProduct[];
  onStopBoost: (slotId: number) => Promise<void>;
  onClearAll: () => Promise<void>;
  onRemoveFromQueue: (queueId: string) => Promise<void>;
  onBoostFromQueue: (queueItem: QueuedProduct) => Promise<void>;
  onOpenPasteModal: () => void;
  autoBoostEnabled: boolean;
  onToggleAutoRenewSlot: (slotId: number) => void;
}

export const SlotsManagerTab: React.FC<SlotsManagerTabProps> = ({
  slots,
  queued,
  onStopBoost,
  onClearAll,
  onRemoveFromQueue,
  onBoostFromQueue,
  onOpenPasteModal,
  autoBoostEnabled,
  onToggleAutoRenewSlot,
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Real-time ticking every second for accurate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format milliseconds remaining into MM:SS for 1-minute cycle
  const formatCountdown = (expiresAt: number) => {
    const diff = Math.max(0, expiresAt - currentTime);
    if (diff <= 0) return '00:00 (Auto-Renew Server...)';
    const totalSeconds = Math.floor(diff / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} detik`;
  };

  // Calculate percentage of 1 minute (60,000ms) cycle
  const calculateProgress = (boostedAt: number, expiresAt: number) => {
    const total = expiresAt - boostedAt || 60000;
    const elapsed = currentTime - boostedAt;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    return pct;
  };

  // Map slots into fixed 1..5 array
  const slotList = [1, 2, 3, 4, 5].map((id) => {
    return slots.find((s) => s.slotId === id) || null;
  });

  const activeCount = slots.filter((s) => s.status === 'active' && s.expiresAt > currentTime).length;

  return (
    <div className="space-y-8">
      {/* Top Overview Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              5 Slot Naikkan Produk (Siklus 1 Menit Sekali • Auto-Connect Server Shopee)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Siklus 60 Detik Real-Time
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Slot diperbarui otomatis setiap 1 menit langsung ke server Shopee dengan pengesahan HMAC-SHA256 untuk mengunci posisi produk Anda di Peringkat #1 Paling Atas pencarian secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
              Slot Digunakan
            </span>
            <span className="text-lg font-bold text-orange-400">
              {activeCount} <span className="text-slate-600 text-sm">/ 5</span>
            </span>
          </div>

          <button
            onClick={onClearAll}
            className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Kosongkan semua slot dan antrean untuk pengisian manual"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kosongkan Semua</span>
          </button>

          <button
            onClick={onOpenPasteModal}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs md:text-sm shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* 5 Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {slotList.map((slot, index) => {
          const slotNumber = index + 1;
          const isActive = slot && slot.status === 'active' && slot.expiresAt > currentTime;

          if (isActive && slot) {
            const progress = calculateProgress(slot.boostedAt, slot.expiresAt);
            const countdownStr = formatCountdown(slot.expiresAt);

            return (
              <div
                key={slot.slotId}
                className="bg-slate-900 border border-orange-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-orange-500/60 transition-all"
              >
                {/* Active Indicator Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

                <div>
                  {/* Slot Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 font-bold text-xs">
                      SLOT #{slotNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Sedang Sundul
                    </span>
                  </div>

                  {/* Product Info (Tanpa Foto Sesuai Permintaan) */}
                  <div className="mt-3 flex gap-3 items-start">
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 fill-orange-400/20" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs font-semibold text-white line-clamp-2 leading-tight"
                        title={slot.title}
                      >
                        {slot.title}
                      </h4>
                      <p className="text-[11px] font-mono text-orange-400 font-semibold mt-1">
                        Rp {slot.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">Item ID: {slot.itemId}</p>
                    </div>
                  </div>

                  {/* Countdown Timer Display */}
                  <div className="mt-4 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                      Sisa Waktu Siklus 1 Menit
                    </span>
                    <span className="text-base font-extrabold font-mono text-orange-400 tracking-widest block mt-0.5">
                      {countdownStr}
                    </span>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Auto Renew Setting */}
                  <div className="mt-3 flex items-center justify-between text-xs px-1">
                    <span className="text-slate-400 text-[11px]">Auto-Sundul Tiap 1 Menit:</span>
                    <button
                      onClick={() => onToggleAutoRenewSlot(slot.slotId)}
                      className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        slot.autoRenew ? 'bg-orange-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          slot.autoRenew ? 'translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Top #1 ({slot.renewCount || 1}x Sundul Server)
                  </span>
                  <button
                    onClick={() => onStopBoost(slot.slotId)}
                    className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hentikan</span>
                  </button>
                </div>
              </div>
            );
          }

          // Empty Slot
          return (
            <div
              key={slotNumber}
              className="bg-slate-900/40 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[260px] text-center transition-all group"
            >
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-bold text-xs mb-3">
                SLOT #{slotNumber}
              </span>
              <div className="w-12 h-12 rounded-full bg-slate-800/80 group-hover:bg-orange-500/10 text-slate-500 group-hover:text-orange-400 flex items-center justify-center transition-colors mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-semibold text-slate-300">Slot Kosong</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[180px]">
                Siap untuk diisi produk Shopee Anda
              </p>
              <button
                onClick={onOpenPasteModal}
                className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700 hover:border-transparent"
              >
                + Isi Slot Ini
              </button>
            </div>
          );
        })}
      </div>

      {/* Antrean Auto-Boost (Queue Section) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-400" />
              <h3 className="text-base font-bold text-white">
                Antrean Auto-Boost (Rotasi Produk 24 Jam)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                {queued.length} Produk Menunggu
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Saat salah satu dari 5 slot di atas selesai, produk dari antrean ini akan otomatis dinaikkan
              ke server Shopee.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPasteModal}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-orange-400" />
              <span>Tambah Antrean</span>
            </button>
          </div>
        </div>

        {/* Queue Items List */}
        <div className="mt-4">
          {queued.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800/80">
              <RotateCw className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-spin-slow" />
              <p className="text-sm font-semibold text-slate-300">Belum ada produk di antrean</p>
              <p className="text-xs text-slate-500 mt-1">
                Tempel link produk untuk memasukkannya ke antrean rotasi otomatis.
              </p>
              <button
                onClick={onOpenPasteModal}
                className="mt-3 px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs font-bold hover:bg-orange-500 hover:text-white transition-all"
              >
                + Masukkan Link Produk Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {queued.map((item, qIdx) => (
                <div
                  key={item.id}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center shrink-0">
                      #{qIdx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-orange-400 font-mono font-medium">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                        <span>•</span>
                        <span className="font-mono">Item ID: {item.itemId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => onBoostFromQueue(item)}
                      className="px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white text-xs font-bold border border-orange-500/40 hover:border-transparent transition-all flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Sundul Sekarang</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromQueue(item.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="Hapus dari antrean"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
