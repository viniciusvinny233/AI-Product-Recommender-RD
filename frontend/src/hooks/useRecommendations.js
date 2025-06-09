import { useState, useCallback } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendations = useCallback((formData, productList = products) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = recommendationService.getRecommendations(formData, productList);
      setRecommendations(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Erro ao obter recomendações';
      setError(errorMessage);
      console.error('Erro na recomendação:', errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [products]);

  return { 
    recommendations, 
    getRecommendations, 
    setRecommendations,
    loading,
    error
  };
}

export default useRecommendations;