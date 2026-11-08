import React from 'react';
import {
  Rocket,
  Clock,
  Search,
  Sparkles,
  KeyRound,
  Terminal,
  Activity,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Zap,
  Timer
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSlotsCount: number;
  totalSlots: number;
  gatewayStatus: {
    status: 'online' | 'offline' | 'checking';
    latencyMs: number;
  };
  onRefreshGateway: () => void;
  autoBoostEnabled: boolean;
  onToggleAutoBoost: () => void;
  minuteCountdown: number; // 0 to 60 seconds
  onTriggerMinuteSync: () => void;
  isMinuteSyncing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeSlotsCount,
  totalSlots,
  gatewayStatus,
  onRefreshGateway,
  autoBoostEnabled,
  onToggleAutoBoost,
  minuteCountdown,
  onTriggerMinuteSync,
  isMinuteSyncing,
}) => {
  const tabs = [
    { id: 'paste', label: 'Tempel Link & Sundul', icon: Rocket, badge: 'Auto #1' },
    {
      id: 'slots',
      label: '5 Slot Naikkan Produk',
      icon: Clock,
      badge: `${activeSlotsCount}/${totalSlots}`,
    },
    { id: 'simulator', label: 'Simulasi Pencarian #1', icon: Search, badge: 'Top 1' },
    { id: 'ai-seo', label: 'AI Judul & Keyword', icon: Sparkles, badge: 'AI' },
    { id: 'api-config', label: 'Koneksi API Shopee', icon: KeyRound, badge: null },
    { id: 'logs', label: 'Log Real-time', icon: Terminal, badge: null },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner Status Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">Server Shopee Open Platform:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                Terhubung Real-Time (HMAC-SHA256)
              </span>
            </div>

            <span className="text-slate-700 hidden sm:inline">•</span>

            {/* 1-Minute Auto-Connect Ticker */}
            <div className="flex items-center gap-1.5 bg-orange-950/40 border border-orange-500/30 px-2 py-0.5 rounded-full text-[11px]">
              <Timer className="w-3 h-3 text-orange-400 animate-spin-slow" />
              <span className="text-slate-300">Sync Server Tiap Menit:</span>
              <span className="font-mono font-bold text-orange-400">
                {String(minuteCountdown).padStart(2, '0')}s
              </span>
              <button
                onClick={onTriggerMinuteSync}
                disabled={isMinuteSyncing}
                title="Kirim Sinyal Sync Shopee Sekarang"
                className="text-orange-400 hover:text-white transition-colors ml-0.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isMinuteSyncing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <span className="text-slate-700 hidden md:inline">•</span>
            <div className="hidden md:flex items-center gap-1 text-slate-400 text-[11px]">
              <Activity className="w-3.5 h-3.5 text-orange-400" />
              <span>Ping:</span>
              <span className="text-orange-400 font-mono font-medium">
                {gatewayStatus.latencyMs}ms
              </span>
              <button
                onClick={onRefreshGateway}
                title="Cek Ulang Latensi Gateway"
                className="text-slate-400 hover:text-white transition-colors ml-1"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Auto-Boost Master Switch */}
            <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-700">
              <span className="text-slate-400 text-[11px]">Auto-Sundul Tiap Menit:</span>
              <button
                onClick={onToggleAutoBoost}
                className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autoBoostEnabled ? 'bg-orange-500' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={autoBoostEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autoBoostEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span
                className={`text-[11px] font-bold ${
                  autoBoostEnabled ? 'text-orange-400' : 'text-slate-500'
                }`}
              >
                {autoBoostEnabled ? 'AKTIF' : 'OFF'}
              </span>
            </div>

            <div className="text-slate-400 hidden lg:block text-xs">
              Slot Terisi:{' '}
              <span className="text-white font-bold">
                {activeSlotsCount}/{totalSlots}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo & Branding: BangRoy Boost Shopee */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  BangRoy <span className="text-orange-500">Boost</span> Shopee
                </h1>
                <span className="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-orange-400" />
                  TOP #1 SEARCH
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Otomatis Terhubung Server Tiap Menit • Tempel Link Langsung di Pencarian Paling Atas
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-black/25 text-white'
                          : tab.badge === 'Auto #1'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : tab.badge === 'Top 1'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : tab.badge === 'AI'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
