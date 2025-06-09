import { useState, useCallback } from 'react';

const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'selectedRecommendationType':
        return value ? null : 'Tipo de recomendação é obrigatório';
      default:
        return null;
    }
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    const error = validateField(field, value);
    
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }));
  }, [validateField]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setFormErrors({});
  }, [initialState]);

  const isValid = useCallback(() => {
    return Object.values(formErrors).every(error => !error);
  }, [formErrors]);

  return { 
    formData, 
    handleChange, 
    resetForm, 
    formErrors,
    isValid
  };
};

export default useForm;