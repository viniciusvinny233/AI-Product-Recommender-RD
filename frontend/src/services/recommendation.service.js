const calculateProductScore = (product, formData) => {
  const selectedPreferences = formData.selectedPreferences || [];
  const selectedFeatures = formData.selectedFeatures || [];
  
  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return 1;
  }
  
  let score = 0;
  let totalSelections = selectedPreferences.length + selectedFeatures.length;
  
  const preferenceSet = new Set(product.preferences || []);
  const featureSet = new Set(product.features || []);
  
  for (const preference of selectedPreferences) {
    if (preferenceSet.has(preference)) {
      score++;
    }
  }
  
  for (const feature of selectedFeatures) {
    if (featureSet.has(feature)) {
      score++;
    }
  }
  
  if (score === 0) {
    return 0;
  }
  
  return (score / totalSelections) * 100;
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products = []
) => {
  console.log("Produtos recebidos para recomendação:", products);
  
  const normalizedFormData = {
    selectedPreferences: formData.selectedPreferences || [],
    selectedFeatures: formData.selectedFeatures || [],
    selectedRecommendationType: formData.selectedRecommendationType || 'MultipleProducts'
  };
  
  if (!products.length) {
    return [];
  }
  
  if (normalizedFormData.selectedPreferences.length === 0 && normalizedFormData.selectedFeatures.length === 0) {
    if (normalizedFormData.selectedRecommendationType === 'MultipleProducts') {
      return [...products];
    } else {
      return [products[0]];
    }
  }
  
  const scoredProducts = products
    .map(product => {
      const score = calculateProductScore(product, normalizedFormData);
      console.log(`Produto ${product.name} (ID ${product.id}): pontuação ${score}`);
      return {
        ...product,
        score
      };
    })
    .filter(product => product.score > 0)
    .sort((a, b) => b.score - a.score);
  
  console.log("Produtos pontuados:", scoredProducts);
  
  if (scoredProducts.length === 0) {
    return [];
  }
  
  if (normalizedFormData.selectedRecommendationType === 'SingleProduct') {
    const highestScore = scoredProducts[0].score;
    const topProducts = scoredProducts.filter(p => p.score === highestScore);
    
    const result = { ...topProducts[topProducts.length - 1] };
    delete result.score;
    return [result];
  } else {
    return scoredProducts.map(p => {
      const { score, ...productWithoutScore } = p;
      return productWithoutScore;
    });
  }
};

export default { getRecommendations };