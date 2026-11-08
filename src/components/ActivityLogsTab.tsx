import React, { useState } from 'react';
import {
  Terminal,
  Trash2,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ActivityLog } from '../types/shopee';

interface ActivityLogsTabProps {
  logs: ActivityLog[];
  onClearLogs: () => void;
}

export const ActivityLogsTab: React.FC<ActivityLogsTabProps> = ({ logs, onClearLogs }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const filteredLogs = logs.filter((log) => {
    if (filterType === 'all') return true;
    return log.type === filterType;
  });

  const exportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shopee-boost-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: ActivityLog['status']) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> SUKSES (200 OK)
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> PERINGATAN
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
            <AlertTriangle className="w-3 h-3" /> GAGAL
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            <Info className="w-3 h-3" /> INFO
          </span>
        );
    }
  };

  const getTypeLabel = (type: ActivityLog['type']) => {
    switch (type) {
      case 'boost':
        return 'SUNDUL API';
      case 'renew':
        return 'AUTO-RENEW';
      case 'parse':
        return 'PARSER LINK';
      case 'stop':
        return 'STOP SLOT';
      case 'ai':
        return 'GEMINI AI';
      case 'connection':
        return 'HANDSHAKE';
      default:
        return String(type).toUpperCase();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Log Aktivitas Real-Time & Audit Server</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rekam jejak setiap panggilan API ke endpoint Shopee, perhitungan HMAC, dan rotasi otomatis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
          >
            <option value="all">Semua Tipe Aktivitas</option>
            <option value="boost">Sundul API (Boost)</option>
            <option value="renew">Auto-Renew 4 Jam</option>
            <option value="parse">Parser Link</option>
            <option value="ai">Gemini AI SEO</option>
            <option value="connection">Koneksi Gateway</option>
          </select>

          <button
            onClick={exportLogs}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Download JSON Log"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onClearLogs}
            className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold rounded-lg border border-red-800/60 flex items-center gap-1.5 transition-colors"
            title="Bersihkan Log"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Log Feed */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Terminal WebSocket / REST Stream Aktif</span>
          </div>
          <span>Total: {filteredLogs.length} Entri</span>
        </div>

        <div className="divide-y divide-slate-850 max-h-[550px] overflow-y-auto font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Belum ada aktivitas yang dicatat.</div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div key={log.id} className="p-3.5 hover:bg-slate-900/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-slate-500 text-[11px] shrink-0">{log.timestamp}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-orange-400 border border-slate-700 shrink-0">
                        {getTypeLabel(log.type)}
                      </span>
                      <span className="text-slate-200 text-xs font-sans font-medium">
                        {log.message}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      {getStatusBadge(log.status)}
                      {log.details && (
                        <button
                          onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                          className="text-slate-500 hover:text-white p-1"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded JSON Details */}
                  {isExpanded && log.details && (
                    <div className="mt-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 overflow-x-auto text-[11px] text-slate-300">
                      <pre>{JSON.stringify(log.details, null, 2)}</pre>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
