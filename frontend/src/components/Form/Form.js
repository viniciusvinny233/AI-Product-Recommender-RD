import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import mockProducts from '../../mocks/mockProducts';

function Form({ setRecommendations, setError }) {
  const [formError, setFormError] = useState('');
  const { preferences, features, products, loading: productsLoading, error: productsError } = useProducts();
  
  const availableProducts = products.length >= 0 ? products : mockProducts;
  
  const { formData, handleChange, formErrors } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'SingleProduct',
  });

  const { getRecommendations, loading: recommendationsLoading, error: recommendationsError } = useRecommendations(availableProducts);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setFormError('');
    setError('');
    
    if (!availableProducts || availableProducts.length === 0) {
      const errorMsg = 'Não há produtos disponíveis para recomendação.';
      setFormError(errorMsg);
      setError(errorMsg);
      return;
    }
    
    if (!formData.selectedRecommendationType) {
      const errorMsg = 'Por favor, selecione um tipo de recomendação (Produto Único ou Múltiplos Produtos).';
      setFormError(errorMsg);
      setError(errorMsg);
      return;
    }
    
    try {
      const dataRecommendations = getRecommendations(formData, availableProducts);
      console.log('Recomendações geradas:', dataRecommendations); 
      setRecommendations(dataRecommendations);
      if (recommendationsError) {
        setError(recommendationsError);
      }
    } catch (err) {
      console.error('Erro ao gerar recomendações:', err);
      const errorMsg = err.message || 'Ocorreu um erro ao gerar recomendações.';
      setFormError(errorMsg);
      setError(errorMsg);
    }
  }, [formData, availableProducts, getRecommendations, setRecommendations, setError, recommendationsError]);

  const renderFormError = () => {
    if (!formError && !productsError) return null;
    
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-pulse">
        <strong>Erro:</strong> {formError || productsError}
      </div>
    );
  };

  const renderFormContent = () => {
    if (productsLoading) {
      return (
        <div className="text-center py-8 flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p>Carregando produtos...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <Preferences
          preferences={preferences.length > 0 ? preferences : mockProducts.flatMap(p => p.preferences)}
          onPreferenceChange={(selected) => handleChange('selectedPreferences', selected)}
        />
        <Features
          features={features.length > 0 ? features : mockProducts.flatMap(p => p.features)}
          onFeatureChange={(selected) => handleChange('selectedFeatures', selected)}
        />
        <RecommendationType
          onRecommendationTypeChange={(selected) => handleChange('selectedRecommendationType', selected)}
          error={formErrors.selectedRecommendationType}
        />
        
        <div className="pt-4">
          <SubmitButton 
            text="Obter recomendação"
            isLoading={recommendationsLoading}
            disabled={
              !formData.selectedRecommendationType || 
              (formData.selectedPreferences.length === 0 && formData.selectedFeatures.length === 0)
            }
          />
        </div>
      </div>
    );
  };

  return (
    <form
      className="p-6 bg-white rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg"
      onSubmit={handleSubmit}
    >
      {renderFormError()}
      
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800 border-b pb-2">Personalize sua Recomendação</h2>
      
      {renderFormContent()}
      
      <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-3 rounded">
        <p className="font-semibold">Dica:</p>
        <p>Selecione suas preferências e funcionalidades desejadas para obter recomendações personalizadas.</p>
      </div>
    </form>
  );
}

Form.propTypes = {
  setRecommendations: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default Form;