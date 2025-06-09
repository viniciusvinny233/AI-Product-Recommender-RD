import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

const AppHeader = memo(({ title }) => (
  <h1 className="text-3xl font-bold my-8">{title}</h1>
));

AppHeader.propTypes = {
  title: PropTypes.string.isRequired
};

const AppDescription = memo(() => (
  <div className="col-span-2 mb-4">
    <p className="text-lg">
      Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar 
      uma variedade de produtos da RD Station, cada um projetado para atender às 
      necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a 
      Inteligência Artificial, temos uma solução para ajudar você a alcançar seus 
      objetivos. Use o formulário abaixo para selecionar suas preferências e 
      funcionalidades desejadas e receba recomendações personalizadas de produtos 
      que melhor atendam às suas necessidades.
    </p>
  </div>
));

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-4">
      <AppHeader title="Recomendador de Produtos RD Station" />
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full" style={{ maxWidth: '100rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <AppDescription />
          <div>
            <Form 
              setRecommendations={setRecommendations}
              setError={setError}
            />
          </div>
          <div>
            <RecommendationList 
              recommendations={recommendations}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;