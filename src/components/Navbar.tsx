import React from 'react';
import {
  Rocket,
  Clock,
  Search,
  Sparkles,
  KeyRound,
  Terminal,
  Activity,
  RefreshCw,
  ShoppingBag,
  Zap,
  Timer,
  CheckCircle2
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

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
    { id: 'paste', label: 'Tempel Link & Sundul', shortLabel: 'Tempel', icon: Rocket, badge: 'Auto #1' },
    {
      id: 'slots',
      label: '5 Slot Naikkan Produk',
      shortLabel: '5 Slot',
      icon: Clock,
      badge: `${activeSlotsCount}/${totalSlots}`,
    },
    { id: 'simulator', label: 'Simulasi Pencarian #1', shortLabel: 'Top #1', icon: Search, badge: 'Top 1' },
    { id: 'ai-seo', label: 'AI Judul & Keyword', shortLabel: 'AI SEO', icon: Sparkles, badge: 'AI' },
    { id: 'api-config', label: 'Koneksi API Shopee', shortLabel: 'API', icon: KeyRound, badge: null },
    { id: 'logs', label: 'Log Real-time', shortLabel: 'Log', icon: Terminal, badge: null },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        {/* Top Status Bar (Responsive for Desktop & Mobile) */}
        <div className="bg-slate-950/90 border-b border-slate-800/80 px-3 md:px-4 py-1 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Server Status & 60s Ticker */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 font-medium shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-semibold text-[11px] sm:text-xs">
                  Shopee Server Live
                </span>
              </div>

              {/* 1-Minute Auto-Connect Ticker */}
              <div className="flex items-center gap-1 bg-orange-950/50 border border-orange-500/40 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shrink-0">
                <Timer className="w-3 h-3 text-orange-400" />
                <span className="text-slate-300 hidden sm:inline">Sync Tiap Menit:</span>
                <span className="font-mono font-bold text-orange-400">
                  {String(minuteCountdown).padStart(2, '0')}s
                </span>
                <button
                  onClick={onTriggerMinuteSync}
                  disabled={isMinuteSyncing}
                  title="Kirim Sinyal Sync Sekarang"
                  className="text-orange-400 hover:text-white transition-colors ml-0.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isMinuteSyncing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-1 text-slate-400 text-[11px]">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                <span>Ping:</span>
                <span className="text-orange-400 font-mono font-medium">
                  {gatewayStatus.latencyMs}ms
                </span>
              </div>
            </div>

            {/* Right side controls: PWA Install & Auto Switch */}
            <div className="flex items-center gap-2 shrink-0">
              {/* PWA Install Button Header */}
              <PWAInstallButton compact={true} />

              {/* Auto-Boost Switch */}
              <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-[10px] sm:text-[11px]">
                <span className="text-slate-400 hidden sm:inline">Auto:</span>
                <button
                  onClick={onToggleAutoBoost}
                  className={`relative inline-flex h-3.5 w-6 sm:h-4 sm:w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    autoBoostEnabled ? 'bg-orange-500' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={autoBoostEnabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      autoBoostEnabled ? 'translate-x-2.5 sm:translate-x-3' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`font-bold ${autoBoostEnabled ? 'text-orange-400' : 'text-slate-500'}`}>
                  {autoBoostEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Desktop Header */}
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Branding */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/25 text-white shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                    BangRoy <span className="text-orange-500">Boost</span> Shopee
                  </h1>
                  <span className="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5 fill-orange-400" />
                    TOP #1
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                  Auto-Connect Tiap Menit • Langsung di Pencarian Paling Atas
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs (Hidden on mobile, mobile uses bottom tab bar) */}
            <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
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

      {/* Fixed Bottom App Navigation Bar for Mobile (HP Pas 1 Layar Native Feel) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-1 py-1 shadow-2xl">
        <div className="grid grid-cols-6 items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-orange-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active Indicator Top Glow Pill */}
                {isActive && (
                  <span className="absolute -top-1 w-6 h-1 rounded-full bg-orange-500 shadow-sm shadow-orange-500/80 animate-in fade-in duration-200" />
                )}
                <div
                  className={`p-1 rounded-lg ${
                    isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-transparent text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] tracking-tight leading-none mt-0.5 truncate max-w-full">
                  {tab.shortLabel}
                </span>
                {tab.badge && (
                  <span
                    className={`absolute top-0 right-1 text-[8px] px-1 rounded-full font-bold ${
                      isActive ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.badge === 'Auto #1' ? '★' : tab.badge.split('/')[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
