import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, Loader2 } from 'lucide-react';
import api from '../api/client';

const FeatureImportance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const info = await api.getModelInfo();
        if (info.feature_importance) {
          const chartData = Object.entries(info.feature_importance)
            .map(([name, value]) => ({
              name: name.replace('_scaled', '').replace(/_/g, ' '),
              value: value,
              fullName: name
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
          
          setData(chartData);
        }
      } catch (err) {
        console.error('Failed to fetch model info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModelInfo();
  }, []);

  const colors = [
    '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444',
    '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#6366f1'
  ];

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-xl shadow-xl p-6 border border-slate-800">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6" />
        Feature Importance
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke="#94a3b8" 
              style={{ fontSize: '12px' }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#f1f5f9'
              }}
              formatter={(value) => [value.toFixed(4), 'Importance']}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <p>No feature importance data available</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <p className="text-sm text-slate-300">
          Feature importance indicates which planetary and stellar characteristics have the most influence on habitability predictions.
        </p>
      </div>
    </div>
  );
};

export default FeatureImportance;