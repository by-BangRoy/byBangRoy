import React, { useState } from 'react';
import { Download, Smartphone, Share2, PlusSquare, X, Check, Laptop } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already installed or running in standalone mode, hide button
  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
        <Check className="w-3 h-3 text-emerald-400" />
        <span className="hidden sm:inline">Aplikasi Terpasang</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      if (isInstallable) {
        await install();
      } else if (isIOS) {
        setShowIOSGuide(true);
      } else {
        // Fallback for browsers that don't trigger beforeinstallprompt yet or desktop Chrome/Edge
        setShowIOSGuide(true);
      }
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        title="Instal BangRoy Boost di HP atau Komputer"
        className={`inline-flex items-center gap-1.5 rounded-xl font-bold transition-all shadow-md active:scale-95 ${
          compact
            ? 'px-2.5 py-1 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] shadow-orange-500/20 hover:from-orange-500 hover:to-amber-400'
            : 'px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs shadow-orange-500/25 ring-1 ring-orange-400/30'
        }`}
      >
        <Download className="w-3.5 h-3.5 animate-bounce shrink-0" />
        <span>Instal App</span>
        <span className="px-1.5 py-0.2 rounded bg-black/30 text-[9px] font-mono hidden sm:inline">PWA</span>
      </button>

      {/* Guide Modal for iOS Safari / Manual Installation */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Instal BangRoy Boost</h3>
                <p className="text-[11px] text-slate-400">Pasang di Layar Utama HP / Laptop</p>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-slate-300">
                  {isIOS ? (
                    <>
                      Tekan tombol <strong>Bagikan (Share)</strong> <Share2 className="w-3 h-3 inline mx-0.5 text-blue-400" /> di menu browser Safari.
                    </>
                  ) : (
                    <>
                      Buka menu titik tiga <span className="font-bold">⋮</span> di pojok kanan atas browser (Chrome / Edge / Safari).
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-slate-300">
                  Pilih <strong className="text-orange-400">"Tambahkan ke Layar Utama" (Add to Home Screen)</strong> atau <strong className="text-orange-400">"Instal Aplikasi"</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-slate-300">
                  Tekan <strong>Tambah (Add)</strong>. Aplikasi siap dibuka 1 layar penuh layaknya aplikasi native tanpa browser bar!
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {isInstallable && (
                <button
                  onClick={async () => {
                    await install();
                    setShowIOSGuide(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Pasang Otomatis</span>
                </button>
              )}
              <button
                onClick={() => setShowIOSGuide(false)}
                className={`py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors ${
                  !isInstallable ? 'w-full' : ''
                }`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
