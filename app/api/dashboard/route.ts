import { NextResponse } from "next/server";

const dashboardData = {
  meta: {
    quarter: "Q1 2026",
    asOf: "2026-02-18",
    currency: "USD",
    confidential: true,
  },
  kpis: {
    totalViewers: { value: 16400000, formatted: "16.4M", change: 0.23, label: "Total Q1 Viewers" },
    newSubscribers: { value: 342000, formatted: "342K", change: 0.31, label: "New Subscribers" },
    totalRevenue: { value: 12800000, formatted: "$12.8M", change: 0.18, label: "Q1 Revenue" },
    avgWatchTime: { value: 127, formatted: "127 min", change: 0.08, label: "Avg Watch Time" },
  },
  races: [
    { id: "daytona-500", name: "Daytona 500", date: "2026-02-16", venue: "Daytona International Speedway", viewers: 8200000, revenue: 3200000, tvRating: 4.7, status: "completed", newSubscribers: 186000 },
    { id: "pennzoil-400", name: "Pennzoil 400", date: "2026-03-01", venue: "Las Vegas Motor Speedway", viewers: 2100000, revenue: 900000, tvRating: 3.1, status: "upcoming", newSubscribers: null },
    { id: "ambetter-400", name: "Ambetter 400", date: "2026-03-08", venue: "Atlanta Motor Speedway", viewers: 1800000, revenue: 700000, tvRating: 2.9, status: "upcoming", newSubscribers: null },
    { id: "united-rentals-500", name: "United Rentals 500", date: "2026-03-15", venue: "Phoenix Raceway", viewers: 2400000, revenue: 900000, tvRating: 3.5, status: "upcoming", newSubscribers: null },
    { id: "echopark-500", name: "EchoPark 500", date: "2026-03-22", venue: "Circuit of the Americas", viewers: 1900000, revenue: 800000, tvRating: 3.2, status: "upcoming", newSubscribers: null },
    { id: "food-city-500", name: "Food City 500", date: "2026-03-29", venue: "Bristol Motor Speedway (Dirt)", viewers: 2300000, revenue: 800000, tvRating: 3.4, status: "upcoming", newSubscribers: null },
  ],
  revenue: {
    total: 12800000,
    breakdown: [
      { source: "Prime Subscriptions", amount: 8700000, share: 0.68 },
      { source: "Advertising", amount: 2800000, share: 0.22 },
      { source: "International", amount: 1100000, share: 0.09 },
      { source: "Merchandise", amount: 200000, share: 0.01 },
    ],
    monthly: [
      { month: "January", subscriptions: 2100000, advertising: 600000, international: 200000 },
      { month: "February", subscriptions: 3800000, advertising: 1200000, international: 400000 },
      { month: "March (proj)", subscriptions: 2800000, advertising: 1000000, international: 500000 },
    ],
  },
  campaigns: [
    { id: "daytona-takeover", name: "Daytona Takeover", channel: "Social Media", budgetUsd: 280000, impressions: 48000000, clicks: 890000, conversions: 62000, cpa: 4.52, roas: 8.2, status: "completed" },
    { id: "nascar-everywhere", name: "NASCAR Everywhere", channel: "Programmatic", budgetUsd: 195000, impressions: 82000000, clicks: 420000, conversions: 28000, cpa: 6.96, roas: 5.8, status: "active" },
    { id: "speed-drama", name: "Speed & Drama", channel: "TV Spots", budgetUsd: 440000, impressions: 28000000, clicks: null, conversions: 41000, cpa: 10.73, roas: 4.1, status: "completed" },
    { id: "driver-fanbase", name: "Driver Fanbase", channel: "Influencer", budgetUsd: 120000, impressions: 18000000, clicks: 1200000, conversions: 31000, cpa: 3.87, roas: 9.4, status: "active" },
    { id: "race-day-email", name: "Race Day Email", channel: "Email", budgetUsd: 18000, impressions: 8400000, clicks: 980000, conversions: 48000, cpa: 0.38, roas: 31.2, status: "active" },
  ],
  drivers: [
    { rank: 1, name: "Chase Elliott", number: "9", team: "Hendrick Motorsports", engagementIndex: 2840 },
    { rank: 2, name: "Kyle Larson", number: "5", team: "Hendrick Motorsports", engagementIndex: 2610 },
    { rank: 3, name: "Denny Hamlin", number: "11", team: "Joe Gibbs Racing", engagementIndex: 2380 },
    { rank: 4, name: "Ross Chastain", number: "1", team: "Trackhouse Racing", engagementIndex: 2150 },
    { rank: 5, name: "Ryan Blaney", number: "12", team: "Team Penske", engagementIndex: 1990 },
  ],
  competitive: {
    marketShare: [
      { platform: "Prime Video", share: 38, yoyChange: 8 },
      { platform: "Peacock", share: 28, yoyChange: -3 },
      { platform: "Fox Sports GO", share: 19, yoyChange: 1 },
      { platform: "NBC Sports", share: 9, yoyChange: -4 },
      { platform: "Tubi / Other", share: 6, yoyChange: 2 },
    ],
  },
};

export async function GET() {
  return NextResponse.json(dashboardData, {
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
