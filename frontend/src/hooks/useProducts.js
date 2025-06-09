import { useEffect, useState, useCallback } from 'react';
import getProducts from '../services/product.service';

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractUniqueItems = useCallback((products, itemType) => {
    const allItems = new Set();
    
    products.forEach(product => {
      const items = product[itemType] || [];
      items.forEach(item => allItems.add(item));
    });
    
    return Array.from(allItems);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        
        const uniquePreferences = extractUniqueItems(fetchedProducts, 'preferences');
        const uniqueFeatures = extractUniqueItems(fetchedProducts, 'features');
        
        setPreferences(uniquePreferences);
        setFeatures(uniqueFeatures);
      } catch (err) {
        console.error('Erro ao obter os produtos:', err);
        
        if (err.message && (
            err.message.includes('Network Error') || 
            (err.code && err.code === 'ECONNREFUSED')
          )) {
          setError('Network Error: O servidor backend não está acessível. Verifique se o backend está rodando na porta 3001.');
        } else {
          setError(err.message || 'Erro ao carregar produtos');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [extractUniqueItems]);

  return { 
    preferences, 
    features, 
    products, 
    loading, 
    error 
  };
};

export default useProducts;