import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import TopPlanets from './components/TopPlanet';
import FeatureImportance from './components/FeatureImportance';
import api from './api/client';

function App() {
  const [apiStatus, setApiStatus] = useState(false);
  const [stats, setStats] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.healthCheck();
        setApiStatus(true);
      } catch (err) {
        console.error('API health check failed:', err);
        setApiStatus(false);
      }
    };

    checkHealth();
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    if (apiStatus) {
      fetchStats();
    }
  }, [apiStatus]);

  const handlePrediction = (result) => {
    setPredictionResult(result);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header apiStatus={apiStatus} />

      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
            <StatCard
              icon="🌎"
              title="Total Planets"
              value={stats.total_planets.toLocaleString()}
              subtitle="In database"
              color="blue"
            />
            <StatCard
              icon="✅"
              title="Habitable"
              value={stats.habitable_planets.toLocaleString()}
              subtitle={stats.habitable_percentage}
              color="green"
            />
            <StatCard
              icon="❌"
              title="Non-Habitable"
              value={stats.non_habitable_planets.toLocaleString()}
              subtitle="Classified"
              color="orange"
            />
            <StatCard
              icon="📊"
              title="Avg Confidence"
              value={stats.confidence_stats.average}
              subtitle="Model confidence"
              color="purple"
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-8">
            <PredictionForm onPrediction={handlePrediction} />
            <ResultCard result={predictionResult} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <TopPlanets />
          </div>
        </div>

        {/* Feature Importance Chart */}
        <div className="animate-fade-in">
          <FeatureImportance />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-slate-400 text-sm">
            <p>ExoHabitAI - Machine Learning for Exoplanet Habitability Prediction</p>
            <p className="mt-1">Built with React, Vite, Tailwind CSS v4, and Flask</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;