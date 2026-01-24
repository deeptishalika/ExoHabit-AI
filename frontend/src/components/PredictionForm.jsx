import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import api from '../api/client';

const PredictionForm = ({ onPrediction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    pl_orbper_scaled: '',
    pl_orbsmax_scaled: '',
    pl_rade_scaled: '',
    pl_bmasse_scaled: '',
    pl_orbeccen_scaled: '',
    pl_insol_scaled: '',
    pl_eqt_scaled: '',
    st_teff_scaled: '',
    st_rad_scaled: '',
    st_mass_scaled: '',
    st_met_scaled: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || ''
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await api.predictSingle(formData);
      onPrediction(result);
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    setFormData({
      pl_orbper_scaled: -0.39,
      pl_orbsmax_scaled: 2.51,
      pl_rade_scaled: -0.06,
      pl_bmasse_scaled: -0.18,
      pl_orbeccen_scaled: 6.47,
      pl_insol_scaled: -0.25,
      pl_eqt_scaled: 0.15,
      st_teff_scaled: -6.98,
      st_rad_scaled: -1.33,
      st_mass_scaled: -3.18,
      st_met_scaled: 1.34,
    });
  };

  const inputFields = [
    { name: 'pl_orbper_scaled', label: 'Orbital Period', group: 'planetary' },
    { name: 'pl_orbsmax_scaled', label: 'Semi-major Axis', group: 'planetary' },
    { name: 'pl_rade_scaled', label: 'Radius', group: 'planetary' },
    { name: 'pl_bmasse_scaled', label: 'Mass', group: 'planetary' },
    { name: 'pl_orbeccen_scaled', label: 'Eccentricity', group: 'planetary' },
    { name: 'pl_insol_scaled', label: 'Insolation', group: 'planetary' },
    { name: 'pl_eqt_scaled', label: 'Equilibrium Temp', group: 'planetary' },
    { name: 'st_teff_scaled', label: 'Temperature', group: 'stellar' },
    { name: 'st_rad_scaled', label: 'Radius', group: 'stellar' },
    { name: 'st_mass_scaled', label: 'Mass', group: 'stellar' },
    { name: 'st_met_scaled', label: 'Metallicity', group: 'stellar' },
  ];

  const planetaryFields = inputFields.filter(f => f.group === 'planetary');
  const stellarFields = inputFields.filter(f => f.group === 'stellar');

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Predict Habitability
        </h2>
        <button
          type="button"
          onClick={loadSampleData}
          className="text-sm text-purple-400 hover:text-purple-300 transition"
        >
          Load Sample
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Planetary Features */}
        <div>
          <h3 className="font-semibold text-purple-400 text-sm uppercase tracking-wide mb-4">
            Planetary Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planetaryFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {field.label} (scaled)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="0.00"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stellar Features */}
        <div>
          <h3 className="font-semibold text-blue-400 text-sm uppercase tracking-wide mb-4">
            Stellar Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stellarFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {field.label} (scaled)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="0.00"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Predict Habitability
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;