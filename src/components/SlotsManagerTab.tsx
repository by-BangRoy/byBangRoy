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
    if (diff <= 0) return '00:00 (Renewing...)';
    const totalSeconds = Math.floor(diff / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}s`;
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
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
      {/* Top Overview Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              5 Slot Naikkan Produk
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Siklus 60 Detik
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
            Auto-renew setiap 1 menit langsung ke server Shopee (HMAC-SHA256).
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold">
              Slot
            </span>
            <span className="text-sm sm:text-base font-bold text-orange-400">
              {activeCount} <span className="text-slate-600 text-xs">/ 5</span>
            </span>
          </div>

          <button
            onClick={onClearAll}
            className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
            title="Kosongkan semua slot"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Kosongkan</span>
          </button>

          <button
            onClick={onOpenPasteModal}
            className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* 5 Slots Grid (Responsive & Mobile-optimized) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {slotList.map((slot, index) => {
          const slotNumber = index + 1;
          const isActive = slot && slot.status === 'active' && slot.expiresAt > currentTime;

          if (isActive && slot) {
            const progress = calculateProgress(slot.boostedAt, slot.expiresAt);
            const countdownStr = formatCountdown(slot.expiresAt);

            return (
              <div
                key={slot.slotId}
                className="bg-slate-900 border border-orange-500/40 rounded-xl p-3 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-orange-500/70 transition-all"
              >
                {/* Active Indicator Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

                <div>
                  {/* Slot Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold text-[10px]">
                      SLOT #{slotNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Sundul Aktif
                    </span>
                  </div>

                  {/* Product Info (Tanpa Foto) */}
                  <div className="mt-2 flex gap-2 items-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 fill-orange-400/20" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs font-semibold text-white line-clamp-2 leading-tight"
                        title={slot.title}
                      >
                        {slot.title}
                      </h4>
                      <p className="text-[11px] font-mono text-orange-400 font-semibold mt-0.5">
                        Rp {slot.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Countdown Timer Display */}
                  <div className="mt-2.5 p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-medium">
                      Sisa Waktu (60s)
                    </span>
                    <span className="text-sm font-extrabold font-mono text-orange-400 tracking-wider block mt-0.5">
                      {countdownStr}
                    </span>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Auto Renew Setting */}
                  <div className="mt-2 flex items-center justify-between text-xs px-0.5">
                    <span className="text-slate-400 text-[10px]">Auto-Sundul 1 Menit:</span>
                    <button
                      onClick={() => onToggleAutoRenewSlot(slot.slotId)}
                      className={`relative inline-flex h-3.5 w-6 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        slot.autoRenew ? 'bg-orange-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          slot.autoRenew ? 'translate-x-2.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Top #1 ({slot.renewCount || 1}x)
                  </span>
                  <button
                    onClick={() => onStopBoost(slot.slotId)}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium flex items-center gap-0.5 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          }

          // Empty Slot (Compact on mobile)
          return (
            <div
              key={slotNumber}
              className="bg-slate-900/40 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all group min-h-[140px] sm:min-h-[180px]"
            >
              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-bold text-[10px] mb-2">
                SLOT #{slotNumber}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-800/80 group-hover:bg-orange-500/10 text-slate-500 group-hover:text-orange-400 flex items-center justify-center transition-colors mb-1.5">
                <Plus className="w-4 h-4" />
              </div>
              <h4 className="text-[11px] font-semibold text-slate-300">Slot Kosong</h4>
              <button
                onClick={onOpenPasteModal}
                className="mt-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white text-[11px] font-semibold transition-all border border-slate-700"
              >
                + Isi Slot
              </button>
            </div>
          );
        })}
      </div>

      {/* Antrean Auto-Boost (Queue Section) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white">
              Antrean Auto-Boost
            </h3>
            <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
              {queued.length} Menunggu
            </span>
          </div>

          <button
            onClick={onOpenPasteModal}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1"
          >
            <Plus className="w-3 h-3 text-orange-400" />
            <span>Tambah</span>
          </button>
        </div>

        {/* Queue Items List */}
        <div className="mt-3">
          {queued.length === 0 ? (
            <div className="p-4 sm:p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800/80">
              <RotateCw className="w-6 h-6 text-slate-600 mx-auto mb-1.5 animate-spin-slow" />
              <p className="text-xs font-semibold text-slate-300">Belum ada antrean</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Produk akan berputar otomatis jika dimasukkan antrean.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {queued.map((item, qIdx) => (
                <div
                  key={item.id}
                  className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      #{qIdx + 1}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[10px] text-orange-400 font-mono">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onBoostFromQueue(item)}
                      className="px-2 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white text-[10px] font-bold border border-orange-500/40 transition-all flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Sundul</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromQueue(item.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
