import type {
  Race,
  Driver,
  MarketingCampaign,
  AIInsight,
  GeographicData,
  EngagementFunnelData,
  RevenueBreakdown,
  ViewershipTrend,
} from './types';

// ---------------------------------------------------------------------------
// RACES — Q1 2026 NASCAR Cup Series
// ---------------------------------------------------------------------------
export const races: Race[] = [
  {
    id: 'daytona-2026',
    name: 'Daytona 500',
    date: '2026-02-16',
    venue: 'Daytona International Speedway',
    location: 'Daytona Beach, FL',
    viewers: 8.2,
    revenue: 4.6,
    tvRating: 5.1,
    status: 'completed',
    newSubscribers: 342,
    avgWatchTime: 187,
    peakConcurrent: 5.4,
  },
  {
    id: 'las-vegas-2026',
    name: 'Pennzoil 400',
    date: '2026-02-23',
    venue: 'Las Vegas Motor Speedway',
    location: 'Las Vegas, NV',
    viewers: 2.1,
    revenue: 1.2,
    tvRating: 1.4,
    status: 'upcoming',
    newSubscribers: 74,
    avgWatchTime: 142,
    peakConcurrent: 1.6,
  },
  {
    id: 'atlanta-2026',
    name: 'Ambetter Health 400',
    date: '2026-03-01',
    venue: 'Atlanta Motor Speedway',
    location: 'Hampton, GA',
    viewers: 2.4,
    revenue: 1.4,
    tvRating: 1.6,
    status: 'upcoming',
    newSubscribers: 88,
    avgWatchTime: 148,
    peakConcurrent: 1.9,
  },
  {
    id: 'phoenix-2026',
    name: 'United Rentals 500',
    date: '2026-03-08',
    venue: 'Phoenix Raceway',
    location: 'Avondale, AZ',
    viewers: 1.9,
    revenue: 1.1,
    tvRating: 1.2,
    status: 'upcoming',
    newSubscribers: 62,
    avgWatchTime: 138,
    peakConcurrent: 1.4,
  },
  {
    id: 'cota-2026',
    name: 'EchoPark Automotive Grand Prix',
    date: '2026-03-22',
    venue: 'Circuit of the Americas',
    location: 'Austin, TX',
    viewers: 2.6,
    revenue: 1.5,
    tvRating: 1.7,
    status: 'upcoming',
    newSubscribers: 96,
    avgWatchTime: 155,
    peakConcurrent: 2.0,
  },
  {
    id: 'bristol-dirt-2026',
    name: 'Food City 500',
    date: '2026-03-30',
    venue: 'Bristol Motor Speedway',
    location: 'Bristol, TN',
    viewers: 3.1,
    revenue: 1.8,
    tvRating: 2.0,
    status: 'upcoming',
    newSubscribers: 118,
    avgWatchTime: 162,
    peakConcurrent: 2.3,
  },
];

// ---------------------------------------------------------------------------
// DRIVERS — Top 10 most-viewed on Prime Video
// ---------------------------------------------------------------------------
export const drivers: Driver[] = [
  {
    rank: 1,
    name: 'Chase Elliott',
    number: '9',
    team: 'Hendrick Motorsports',
    manufacturer: 'Chevrolet',
    viewers: 2840,
    profileViews: 1260,
    socialMentions: 184200,
    favoritePercentage: 22.4,
  },
  {
    rank: 2,
    name: 'Kyle Larson',
    number: '5',
    team: 'Hendrick Motorsports',
    manufacturer: 'Chevrolet',
    viewers: 2610,
    profileViews: 1140,
    socialMentions: 163700,
    favoritePercentage: 18.9,
  },
  {
    rank: 3,
    name: 'Denny Hamlin',
    number: '11',
    team: 'Joe Gibbs Racing',
    manufacturer: 'Toyota',
    viewers: 2290,
    profileViews: 980,
    socialMentions: 141300,
    favoritePercentage: 14.6,
  },
  {
    rank: 4,
    name: 'Ross Chastain',
    number: '1',
    team: 'Trackhouse Racing',
    manufacturer: 'Chevrolet',
    viewers: 2050,
    profileViews: 870,
    socialMentions: 128500,
    favoritePercentage: 12.1,
  },
  {
    rank: 5,
    name: 'Ryan Blaney',
    number: '12',
    team: 'Team Penske',
    manufacturer: 'Ford',
    viewers: 1870,
    profileViews: 790,
    socialMentions: 112900,
    favoritePercentage: 10.8,
  },
  {
    rank: 6,
    name: 'Christopher Bell',
    number: '20',
    team: 'Joe Gibbs Racing',
    manufacturer: 'Toyota',
    viewers: 1640,
    profileViews: 690,
    socialMentions: 97400,
    favoritePercentage: 8.7,
  },
  {
    rank: 7,
    name: 'William Byron',
    number: '24',
    team: 'Hendrick Motorsports',
    manufacturer: 'Chevrolet',
    viewers: 1490,
    profileViews: 620,
    socialMentions: 88100,
    favoritePercentage: 7.5,
  },
  {
    rank: 8,
    name: 'Martin Truex Jr.',
    number: '19',
    team: 'Joe Gibbs Racing',
    manufacturer: 'Toyota',
    viewers: 1330,
    profileViews: 550,
    socialMentions: 76300,
    favoritePercentage: 6.2,
  },
  {
    rank: 9,
    name: 'Tyler Reddick',
    number: '45',
    team: '23XI Racing',
    manufacturer: 'Toyota',
    viewers: 1180,
    profileViews: 490,
    socialMentions: 68900,
    favoritePercentage: 5.4,
  },
  {
    rank: 10,
    name: 'Alex Bowman',
    number: '48',
    team: 'Hendrick Motorsports',
    manufacturer: 'Chevrolet',
    viewers: 1020,
    profileViews: 420,
    socialMentions: 59600,
    favoritePercentage: 4.3,
  },
];

// ---------------------------------------------------------------------------
// MARKETING CAMPAIGNS
// ---------------------------------------------------------------------------
export const marketingCampaigns: MarketingCampaign[] = [
  {
    id: 'camp-01',
    name: 'Daytona Takeover',
    channel: 'Social Media',
    spend: 1840,
    impressions: 142.6,
    clicks: 8730,
    conversions: 218,
    cpa: 8.44,
    roas: 5.8,
    status: 'completed',
    startDate: '2026-02-02',
    endDate: '2026-02-16',
  },
  {
    id: 'camp-02',
    name: 'NASCAR Everywhere',
    channel: 'Programmatic Display',
    spend: 2260,
    impressions: 198.4,
    clicks: 5960,
    conversions: 147,
    cpa: 15.37,
    roas: 4.2,
    status: 'active',
    startDate: '2026-02-10',
    endDate: '2026-03-30',
  },
  {
    id: 'camp-03',
    name: 'Speed & Drama',
    channel: 'TV Spots',
    spend: 3120,
    impressions: 86.2,
    clicks: 2140,
    conversions: 96,
    cpa: 32.50,
    roas: 3.1,
    status: 'completed',
    startDate: '2026-01-26',
    endDate: '2026-02-16',
  },
  {
    id: 'camp-04',
    name: 'Driver Fanbase',
    channel: 'Influencer / Creator',
    spend: 980,
    impressions: 31.7,
    clicks: 4280,
    conversions: 189,
    cpa: 5.19,
    roas: 7.4,
    status: 'active',
    startDate: '2026-02-14',
    endDate: '2026-03-30',
  },
  {
    id: 'camp-05',
    name: 'Race Day Email',
    channel: 'Email Marketing',
    spend: 310,
    impressions: 18.9,
    clicks: 6410,
    conversions: 312,
    cpa: 0.99,
    roas: 11.6,
    status: 'active',
    startDate: '2026-02-16',
    endDate: '2026-03-30',
  },
];

// ---------------------------------------------------------------------------
// AI INSIGHTS
// ---------------------------------------------------------------------------
export const aiInsights: AIInsight[] = [
  {
    id: 'ins-01',
    type: 'prediction',
    title: 'Bristol Dirt Race Viewership Surge',
    description:
      'Model predicts Bristol dirt race will outperform Atlanta by 29% based on 2024–2025 historical patterns and current social sentiment. Recommend increasing ad inventory by 15% the week prior.',
    confidence: 87,
    impact: 'high',
    metric: 'Projected Viewers',
    metricValue: '3.1M',
    trend: 'up',
  },
  {
    id: 'ins-02',
    type: 'opportunity',
    title: 'Chase Elliott Fan Conversion Gap',
    description:
      'Chase Elliott drives 22% of favoriting activity but only 14% of trial starts. Targeted Elliott-themed free-trial ads could close a ~$480K revenue gap this quarter.',
    confidence: 79,
    impact: 'high',
    metric: 'Revenue Opportunity',
    metricValue: '$480K',
    trend: 'up',
  },
  {
    id: 'ins-03',
    type: 'alert',
    title: 'Las Vegas Drop-Off Risk',
    description:
      'Post-Daytona churn signal is elevated — 18% of Daytona trial subscribers show low engagement. Recommend automated win-back sequence launching Feb 20 to retain at-risk accounts.',
    confidence: 82,
    impact: 'high',
    metric: 'At-Risk Subscribers',
    metricValue: '61.6K',
    trend: 'down',
  },
  {
    id: 'ins-04',
    type: 'recommendation',
    title: 'Double Down on Email Marketing',
    description:
      'Race Day Email campaign delivers $11.60 ROAS — 4.2x higher than the next best channel. Increasing budget by $150K through end of Q1 is projected to yield 470 additional conversions.',
    confidence: 91,
    impact: 'medium',
    metric: 'ROAS',
    metricValue: '11.6x',
    trend: 'up',
  },
  {
    id: 'ins-05',
    type: 'prediction',
    title: 'COTA International Audience Spike',
    description:
      'Road course format and Austin market correlate with 34% higher international viewership share. Prepare Spanish-language ad creatives and subtitle rollout by March 15.',
    confidence: 74,
    impact: 'medium',
    metric: 'Intl. Viewer Lift',
    metricValue: '+34%',
    trend: 'up',
  },
  {
    id: 'ins-06',
    type: 'alert',
    title: 'Programmatic CPM Inflation',
    description:
      'NASCAR Everywhere display CPMs rose 22% in the past 10 days driven by Super Bowl cookie-pool competition. Recommend shifting $400K to paid social to protect Q1 CPA targets.',
    confidence: 85,
    impact: 'medium',
    metric: 'CPM Increase',
    metricValue: '+22%',
    trend: 'down',
  },
];

// ---------------------------------------------------------------------------
// GEOGRAPHIC DATA
// ---------------------------------------------------------------------------
export const geographicData: GeographicData[] = [
  {
    region: 'Southeast',
    viewers: 3840,
    growth: 18.2,
    conversionRate: 4.8,
  },
  {
    region: 'South Central',
    viewers: 2610,
    growth: 14.7,
    conversionRate: 4.1,
  },
  {
    region: 'Midwest',
    viewers: 2240,
    growth: 11.3,
    conversionRate: 3.6,
  },
  {
    region: 'Mountain West',
    viewers: 1580,
    growth: 22.6,
    conversionRate: 3.9,
  },
  {
    region: 'Northeast',
    viewers: 1360,
    growth: 8.4,
    conversionRate: 3.1,
  },
  {
    region: 'Pacific West',
    viewers: 1190,
    growth: 16.9,
    conversionRate: 3.4,
  },
  {
    region: 'International',
    viewers: 820,
    growth: 41.3,
    conversionRate: 2.2,
  },
];

// ---------------------------------------------------------------------------
// ENGAGEMENT FUNNEL
// ---------------------------------------------------------------------------
export const engagementFunnel: EngagementFunnelData[] = [
  {
    stage: 'Ad Impressions',
    value: 450000000,
    percentage: 100,
  },
  {
    stage: 'Platform Visits',
    value: 38000000,
    percentage: 8.4,
  },
  {
    stage: 'Race Page Views',
    value: 12000000,
    percentage: 2.7,
  },
  {
    stage: 'Trial Starts',
    value: 1800000,
    percentage: 0.4,
  },
  {
    stage: 'Subscriptions',
    value: 342000,
    percentage: 0.076,
  },
];

// ---------------------------------------------------------------------------
// REVENUE BREAKDOWN
// ---------------------------------------------------------------------------
export const revenueBreakdown: RevenueBreakdown[] = [
  {
    name: 'Prime Subscriptions',
    value: 8.7,
    color: '#00A8E1',
  },
  {
    name: 'Advertising',
    value: 2.8,
    color: '#FF9900',
  },
  {
    name: 'International',
    value: 1.1,
    color: '#1DB954',
  },
  {
    name: 'Merchandise',
    value: 0.2,
    color: '#8B5CF6',
  },
];

// ---------------------------------------------------------------------------
// VIEWERSHIP TREND — week-by-week Q1 2026
// ---------------------------------------------------------------------------
export const viewershipTrend: ViewershipTrend[] = [
  {
    race: 'Daytona 500',
    shortName: 'Daytona',
    viewers2026: 8.2,
    viewers2025: 6.8,
    target: 7.5,
  },
  {
    race: 'Pennzoil 400 (Las Vegas)',
    shortName: 'Las Vegas',
    viewers2026: 2.1,
    viewers2025: 1.7,
    target: 2.0,
  },
  {
    race: 'Ambetter Health 400 (Atlanta)',
    shortName: 'Atlanta',
    viewers2026: 2.4,
    viewers2025: 1.9,
    target: 2.2,
  },
  {
    race: 'United Rentals 500 (Phoenix)',
    shortName: 'Phoenix',
    viewers2026: 1.9,
    viewers2025: 1.6,
    target: 1.8,
  },
  {
    race: 'EchoPark Grand Prix (COTA)',
    shortName: 'COTA',
    viewers2026: 2.6,
    viewers2025: 2.0,
    target: 2.3,
  },
  {
    race: 'Food City 500 (Bristol Dirt)',
    shortName: 'Bristol',
    viewers2026: 3.1,
    viewers2025: 2.4,
    target: 2.8,
  },
];

// ---------------------------------------------------------------------------
// TOP-LEVEL KPI METRICS
// ---------------------------------------------------------------------------
export const kpiMetrics = {
  totalViewers: {
    label: 'Total Q1 Viewers',
    value: '8.2M',
    subLabel: 'Daytona 500 peak',
    change: '+20.6%',
    changeDirection: 'up' as const,
    description: 'vs. 6.8M in 2025',
  },
  newSubscribers: {
    label: 'New Subscribers',
    value: '342K',
    subLabel: 'From Daytona 500',
    change: '+28.4%',
    changeDirection: 'up' as const,
    description: 'vs. 266K in 2025',
  },
  totalRevenue: {
    label: 'Q1 Revenue (to date)',
    value: '$12.8M',
    subLabel: 'All streams',
    change: '+31.2%',
    changeDirection: 'up' as const,
    description: 'vs. $9.8M in 2025',
  },
  avgWatchTime: {
    label: 'Avg. Watch Time',
    value: '187 min',
    subLabel: 'Daytona 500',
    change: '+11.3%',
    changeDirection: 'up' as const,
    description: 'vs. 168 min in 2025',
  },
};
