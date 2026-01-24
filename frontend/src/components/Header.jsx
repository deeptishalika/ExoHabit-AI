import React from 'react';
import { Activity } from 'lucide-react';

const Header = ({ apiStatus }) => {
  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌍</span>
            <div>
              <h1 className="text-3xl font-bold text-white">ExoHabitAI</h1>
              <p className="text-blue-100 text-sm">
                Exoplanet Habitability Prediction
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur">
            <Activity 
              className={`w-4 h-4 ${apiStatus ? 'text-green-400' : 'text-gray-400'}`}
              strokeWidth={2.5}
            />
            <span className="text-sm text-white font-medium">
              {apiStatus ? 'API Online' : 'Checking...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;