export interface Race {
  id: string;
  name: string;
  date: string;
  venue: string;
  location: string;
  viewers: number; // in millions
  revenue: number; // in millions USD
  tvRating: number;
  status: 'completed' | 'upcoming' | 'live';
  newSubscribers: number; // thousands
  avgWatchTime: number; // minutes
  peakConcurrent: number; // millions
}

export interface Driver {
  rank: number;
  name: string;
  number: string;
  team: string;
  manufacturer: string;
  viewers: number; // thousands
  profileViews: number; // thousands
  socialMentions: number;
  favoritePercentage: number;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: string;
  spend: number; // thousands USD
  impressions: number; // millions
  clicks: number; // thousands
  conversions: number; // thousands
  cpa: number; // USD
  roas: number;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'alert' | 'recommendation' | 'opportunity';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'high' | 'medium' | 'low';
  metric?: string;
  metricValue?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface GeographicData {
  region: string;
  viewers: number; // thousands
  growth: number; // percentage
  conversionRate: number; // percentage
}

export interface EngagementFunnelData {
  stage: string;
  value: number;
  percentage: number;
}

export interface RevenueBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface ViewershipTrend {
  race: string;
  shortName: string;
  viewers2026: number;
  viewers2025: number;
  target: number;
}
