import React, { useState, useEffect } from 'react';
import { Star, Loader2, AlertCircle } from 'lucide-react';
import api from '../api/client';

const TopPlanets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);

  const fetchTopPlanets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTopHabitable(limit, 0.5);
      setPlanets(data.planets || []);
    } catch (err) {
      setError('Failed to load top planets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPlanets();
  }, [limit]);

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
          <Star className="w-6 h-6" />
          Top Habitable Candidates
        </h2>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-yellow-500"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={20}>Top 20</option>
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && planets.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <p>No habitable planets found</p>
        </div>
      )}

      {!loading && !error && planets.length > 0 && (
        <div className="space-y-3">
          {planets.map((planet, index) => (
            <div
              key={index}
              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-yellow-500/50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-white group-hover:text-yellow-400 transition">
                      {planet.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    Host Star: <span className="text-slate-300">{planet.host_star}</span>
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {planet.features.radius && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                        R: {planet.features.radius.toFixed(2)} R⊕
                      </span>
                    )}
                    {planet.features.mass && (
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded">
                        M: {planet.features.mass.toFixed(2)} M⊕
                      </span>
                    )}
                    {planet.features.orbital_period && (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded">
                        P: {planet.features.orbital_period.toFixed(1)} days
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Confidence Badge */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">
                    {(planet.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-slate-500">confidence</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-yellow-500 to-orange-500 transition-all"
                  style={{ width: `${planet.confidence * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPlanets;