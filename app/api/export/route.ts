import { NextResponse } from "next/server";

const CSV = `Amazon Prime Video — NASCAR Q1 2026 Analytics Export
Generated: ${new Date().toISOString().split('T')[0]}
CONFIDENTIAL

--- KEY PERFORMANCE INDICATORS ---
Metric,Value,YoY Change,Period
Total Viewers,16400000,+23%,Q1 2026
New Subscribers,342000,+31%,Q1 2026
Total Revenue,$12800000,+18%,Q1 2026
Avg Watch Time (min),127,+8%,Q1 2026

--- Q1 RACE SCHEDULE ---
Race,Date,Venue,Viewers,Revenue,TV Rating,Status
Daytona 500,2026-02-16,Daytona International Speedway,8200000,$3200000,4.7,Completed
Pennzoil 400,2026-03-01,Las Vegas Motor Speedway,2100000 (proj),$900000 (proj),3.1 (proj),Upcoming
Ambetter 400,2026-03-08,Atlanta Motor Speedway,1800000 (proj),$700000 (proj),2.9 (proj),Upcoming
United Rentals 500,2026-03-15,Phoenix Raceway,2400000 (proj),$900000 (proj),3.5 (proj),Upcoming
EchoPark 500,2026-03-22,Circuit of the Americas,1900000 (proj),$800000 (proj),3.2 (proj),Upcoming
Food City 500,2026-03-29,Bristol Motor Speedway (Dirt),2300000 (proj),$800000 (proj),3.4 (proj),Upcoming

--- MARKETING CAMPAIGNS ---
Campaign,Channel,Budget (USD),Impressions,Clicks,Conversions,CPA (USD),ROAS,Status
Daytona Takeover,Social Media,280000,48000000,890000,62000,4.52,8.2x,Completed
NASCAR Everywhere,Programmatic,195000,82000000,420000,28000,6.96,5.8x,Active
Speed & Drama,TV Spots,440000,28000000,N/A,41000,10.73,4.1x,Completed
Driver Fanbase,Influencer,120000,18000000,1200000,31000,3.87,9.4x,Active
Race Day Email,Email,18000,8400000,980000,48000,0.38,31.2x,Active

--- COMPETITIVE LANDSCAPE ---
Platform,Market Share (%),YoY Change (pp)
Prime Video,38,+8
Peacock,28,-3
Fox Sports GO,19,+1
NBC Sports,9,-4
Tubi / Other,6,+2

--- REVENUE BREAKDOWN ---
Source,Revenue (USD),Share (%)
Prime Subscriptions,8700000,68
Advertising,2800000,22
International,1100000,9
Merchandise,200000,1
`;

export async function GET() {
  return new NextResponse(CSV, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="prime-video-nascar-q1-2026.csv"',
    },
  });
}
