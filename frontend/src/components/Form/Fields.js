import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../shared/Checkbox';

export function Preferences({ preferences, onPreferenceChange }) {
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    const newSelectedPreferences = isChecked
      ? [...selectedPreferences, value]
      : selectedPreferences.filter(item => item !== value);
    
    setSelectedPreferences(newSelectedPreferences);
    onPreferenceChange(newSelectedPreferences);
  };

const uniquePreferences = useMemo(() => {
  return [...new Set(preferences)]; 
}, [preferences]);

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-3 text-gray-800 border-l-4 border-blue-500 pl-3">Preferências</h3>
      <div className="bg-gray-50 p-3 rounded-lg">
        {uniquePreferences.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Carregando preferências...</p>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {uniquePreferences.map((preference, index) => (
              <Checkbox 
                key={`pref-${index}-${preference}`}
                value={preference}
                onChange={handleChange}
                checked={selectedPreferences.includes(preference)}
              >
                {preference}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
      {selectedPreferences.length > 0 && (
        <div className="mt-2 text-sm text-blue-600">
          {selectedPreferences.length} preferência(s) selecionada(s)
        </div>
      )}
    </div>
  );
}

Preferences.propTypes = {
  preferences: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPreferenceChange: PropTypes.func.isRequired,
};

export function Features({ features, onFeatureChange }) {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    const newSelectedFeatures = isChecked
      ? [...selectedFeatures, value]
      : selectedFeatures.filter(item => item !== value);
    
    setSelectedFeatures(newSelectedFeatures);
    onFeatureChange(newSelectedFeatures);
  };

const uniqueFeatures = useMemo(() => {
  return [...new Set(features)];
}, [features]);

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-3 text-gray-800 border-l-4 border-blue-500 pl-3">Funcionalidades</h3>
      <div className="bg-gray-50 p-3 rounded-lg">
        {uniqueFeatures.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Carregando funcionalidades...</p>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {uniqueFeatures.map((feature, index) => (
              <Checkbox 
                key={`feat-${index}-${feature}`}
                value={feature}
                onChange={handleChange}
                checked={selectedFeatures.includes(feature)}
              >
                {feature}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
      {selectedFeatures.length > 0 && (
        <div className="mt-2 text-sm text-blue-600">
          {selectedFeatures.length} funcionalidade(s) selecionada(s)
        </div>
      )}
    </div>
  );
}

Features.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFeatureChange: PropTypes.func.isRequired,
};

export function RecommendationType({ onRecommendationTypeChange, error }) {
  const [selectedType, setSelectedType] = useState('SingleProduct');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    onRecommendationTypeChange(value);
  };

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-3 text-gray-800 border-l-4 border-blue-500 pl-3">Tipo de Recomendação</h3>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="space-y-3">
          <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedType === 'SingleProduct' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-blue-50'
          }`}>
            <input
              type="radio"
              name="recommendationType"
              value="SingleProduct"
              onChange={handleChange}
              checked={selectedType === 'SingleProduct'}
              className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="font-medium block">Produto Único</span>
              <span className="text-sm text-gray-500">Recomenda o melhor produto para suas necessidades</span>
            </div>
          </label>
          <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedType === 'MultipleProducts' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-blue-50'
          }`}>
            <input
              type="radio"
              name="recommendationType"
              value="MultipleProducts"
              onChange={handleChange}
              checked={selectedType === 'MultipleProducts'}
              className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="font-medium block">Múltiplos Produtos</span>
              <span className="text-sm text-gray-500">Recomenda vários produtos que podem atender às suas necessidades</span>
            </div>
          </label>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

RecommendationType.propTypes = {
  onRecommendationTypeChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

RecommendationType.defaultProps = {
  error: null,
};