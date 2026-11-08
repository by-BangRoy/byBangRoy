export interface BoostedSlot {
  slotId: number;
  itemId: string;
  shopId: string;
  title: string;
  imageUrl: string;
  price: number;
  boostedAt: number; // timestamp ms
  expiresAt: number; // timestamp ms
  autoRenew: boolean;
  status: 'active' | 'expired';
  renewCount?: number;
}

export interface QueuedProduct {
  id: string;
  itemId: string;
  shopId: string;
  title: string;
  imageUrl: string;
  price: number;
  priority: number;
  addedAt: number;
}

export interface ParsedProduct {
  url: string;
  shopId: string;
  itemId: string;
  region: string;
  title: string;
  imageUrl: string;
  price: number;
  stock: number;
  rating: number;
  soldCount: number;
  currentSearchStats: {
    estimatedPage: number;
    estimatedRank: number;
    keywordScore: number;
    boostStatus: string;
    viewsToday: number;
  };
}

export interface ShopeeCredentials {
  partnerId: string;
  partnerKey: string;
  shopId: string;
  accessToken: string;
  isSandbox: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'boost' | 'parse' | 'renew' | 'stop' | 'ai' | 'connection';
  message: string;
  status: 'success' | 'warning' | 'error' | 'info';
  details?: Record<string, any>;
}

export interface OptimizedTitle {
  formula: string;
  title: string;
  characterCount: number;
  whyItRanks: string;
}

export interface AiSeoResult {
  seoScore: number;
  scoreAnalysis: string;
  optimizedTitles: OptimizedTitle[];
  topKeywords: string[];
  backendSearchTags: string[];
  algorithmTips: string[];
}
