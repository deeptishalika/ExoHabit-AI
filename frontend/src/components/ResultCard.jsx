import React from 'react';
import { CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-slate-900 rounded-xl shadow-xl p-8 border border-slate-800 text-center">
        <div className="text-slate-500">
          <p className="text-lg">Enter planetary data and click predict</p>
          <p className="text-sm mt-2">Results will appear here</p>
        </div>
      </div>
    );
  }

  const { prediction } = result;
  const isHabitable = prediction.habitable;
  const confidence = parseFloat(prediction.confidence) * 100;

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl p-6 border border-slate-800 animate-fade-in">
      <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6" />
        Prediction Result
      </h2>

      {/* Result Badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${
          isHabitable 
            ? 'bg-green-500/10 border-2 border-green-500' 
            : 'bg-red-500/10 border-2 border-red-500'
        }`}>
          {isHabitable ? (
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          ) : (
            <XCircle className="w-8 h-8 text-red-400" />
          )}
          <div>
            <p className="text-sm text-slate-400 font-medium">Classification</p>
            <p className={`text-2xl font-bold ${
              isHabitable ? 'text-green-400' : 'text-red-400'
            }`}>
              {prediction.label}
            </p>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300">Confidence Score</span>
            <span className="text-lg font-bold text-white">{confidence.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isHabitable 
                  ? 'bg-linear-to-r from-green-500 to-emerald-500' 
                  : 'bg-linear-to-r from-red-500 to-orange-500'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Confidence Interpretation */}
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-300">
            {confidence >= 80 && (
              <span className="text-green-400 font-semibold">High confidence:</span>
            )}
            {confidence >= 50 && confidence < 80 && (
              <span className="text-yellow-400 font-semibold">Moderate confidence:</span>
            )}
            {confidence < 50 && (
              <span className="text-orange-400 font-semibold">Low confidence:</span>
            )}
            {' '}
            {isHabitable 
              ? `This exoplanet shows strong indicators of potential habitability.`
              : `This exoplanet is unlikely to support life as we know it.`
            }
          </p>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-slate-500 text-right">
          Predicted at: {new Date(result.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;