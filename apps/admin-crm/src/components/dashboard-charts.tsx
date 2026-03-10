'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#71717a', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];

export function DashboardCharts({ 
  funnelData, 
  growthData 
}: { 
  funnelData: any[], 
  growthData: any[] 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Funnel/Pipeline Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-zinc-100 font-semibold mb-6">Pipeline Distribution</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
                itemStyle={{ color: '#3b82f6' }}
                cursor={{ fill: '#27272a', opacity: 0.4 }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-zinc-100 font-semibold mb-6">Growth Trend (YTD)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
              />
              <Line type="monotone" dataKey="artists" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }} activeDot={{ r: 6 }} name="Total Artists" />
              <Line type="monotone" dataKey="messages" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 6 }} name="Messages Sent" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}