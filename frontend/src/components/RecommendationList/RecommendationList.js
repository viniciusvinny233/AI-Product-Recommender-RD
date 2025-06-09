import React, { memo } from 'react';
import PropTypes from 'prop-types';

const RecommendationItem = memo(({ recommendation, index }) => (
  <li 
    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden"
    style={{ 
      animationDelay: `${index * 150}ms`,
      animation: 'fadeInUp 0.5s ease-out forwards'
    }}
  >
    
    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
      {recommendation.category}
    </div>
    
    <h3 className="text-lg font-bold text-blue-600 mb-2">{recommendation.name}</h3>
    
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Preferências:
        </h4>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          {recommendation.preferences && recommendation.preferences.map((pref, i) => (
            <li key={`pref-${i}`} className="line-clamp-1">{pref}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Funcionalidades:
        </h4>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          {recommendation.features && recommendation.features.map((feat, i) => (
            <li key={`feat-${i}`} className="line-clamp-1">{feat}</li>
          ))}
        </ul>
      </div>
    </div>
    
  </li>
));

RecommendationItem.propTypes = {
  recommendation: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    preferences: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired
};

const NetworkErrorMessage = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-700">
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md w-full max-w-lg">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-red-700">Erro de Conexão</h3>
      </div>
      <div className="ml-9">
        <p className="mt-2 text-sm">Não foi possível conectar ao servidor backend. Verifique se:</p>
        <ul className="mt-1 text-sm list-disc pl-5 space-y-1">
          <li>O servidor backend está rodando na porta 3001</li>
          <li>Você iniciou o backend com o comando correto (ex: <code className="bg-gray-100 px-1 rounded">npm run start:server</code>)</li>
          <li>Não há outros serviços bloqueando a porta 3001</li>
        </ul>
        <p className="mt-3 text-sm font-medium">Após iniciar o backend, atualize a página ou tente novamente.</p>
      </div>
    </div>
  </div>
);

function RecommendationList({ recommendations, error }) {
  const hasRecommendations = recommendations && recommendations.length > 0;
  const isNetworkError = error && (
    error.includes('Network Error') || 
    error.includes('Failed to fetch') || 
    error.includes('connect ECONNREFUSED')
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800 border-b pb-2">
        Recomendações para você
      </h2>

      {isNetworkError ? (
        <NetworkErrorMessage />
      ) : !hasRecommendations ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-center">Preencha o formulário e clique em "Obter recomendação" para ver produtos sugeridos para você.</p>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <RecommendationItem 
                key={`${recommendation.id || index}-${recommendation.name}`} 
                recommendation={recommendation}
                index={index}
              />
            ))}
          </ul>
          
          {recommendations.length > 1 && (
            <div className="mt-6 bg-blue-50 p-3 rounded-lg text-sm text-blue-800 border border-blue-100">
              <p className="font-medium">Encontramos {recommendations.length} produtos que correspondem às suas necessidades!</p>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      preferences: PropTypes.arrayOf(PropTypes.string),
      features: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  error: PropTypes.string
};

RecommendationList.defaultProps = {
  recommendations: [],
  error: null
};

export default RecommendationList;