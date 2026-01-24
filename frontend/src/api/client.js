import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },

  // Single prediction
  predictSingle: async (planetData) => {
    const response = await apiClient.post('/predict', planetData);
    return response.data;
  },

  // Batch prediction
  predictBatch: async (planets) => {
    const response = await apiClient.post('/predict_batch', { planets });
    return response.data;
  },

  // Get top habitable planets
  getTopHabitable: async (limit = 10, minConfidence = 0.5) => {
    const response = await apiClient.get('/top_habitable', {
      params: { limit, min_confidence: minConfidence }
    });
    return response.data;
  },

  // Get model info
  getModelInfo: async () => {
    const response = await apiClient.get('/model_info');
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await apiClient.get('/stats');
    return response.data;
  },
};

export default api;