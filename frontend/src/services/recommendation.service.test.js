import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna array vazio quando a lista de produtos está vazia', () => {
    const formData = {
      selectedPreferences: ['Alguma preferência'],
      selectedFeatures: ['Alguma feature'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      []
    );

    expect(recommendations).toEqual([]);
  });

  test('Retorna todos os produtos para MultipleProducts quando não há preferências ou features selecionadas', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(mockProducts.length);
    expect(recommendations).toEqual(mockProducts);
  });

  test('Retorna o primeiro produto para SingleProduct quando não há preferências ou features selecionadas', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0]).toEqual(mockProducts[0]);
  });

  test('Retorna array vazio quando nenhum produto corresponde às preferências', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Feature inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test('Lida corretamente com produtos que têm campos de preferências ou features undefined', () => {
    const productsComCamposFaltantes = [
      {
        id: 1,
        name: 'Produto Sem Preferências',
        category: 'Teste',
        features: ['Feature 1', 'Feature 2']
      },
      {
        id: 2,
        name: 'Produto Sem Features',
        category: 'Teste',
        preferences: ['Preferência 1', 'Preferência 2']
      }
    ];

    const formData = {
      selectedPreferences: ['Preferência 1'],
      selectedFeatures: ['Feature 1'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      productsComCamposFaltantes
    );

    expect(recommendations).toHaveLength(2);
  });

  test('Ordena produtos corretamente por pontuação em MultipleProducts', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Rastreamento de comportamento do usuário', 'Análise de retorno sobre investimento (ROI) de campanhas'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Funciona com apenas preferências selecionadas (sem features)', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Funciona com apenas features selecionadas (sem preferências)', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Rastreamento de interações com clientes'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station CRM');
  });

  test('Lida elegantemente com tipo de recomendação desconhecido', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Rastreamento de comportamento do usuário'],
      selectedRecommendationType: 'TipoDesconhecido',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations.length).toBeGreaterThan(0);
  });

  test('Lidando com preferências duplicadas entre produtos, verificando cálculo de score correto', () => {
    const produtosComPreferenciasComuns = [
      {
        id: 1,
        name: 'Produto A',
        category: 'Categoria A',
        preferences: ['Preferência 1', 'Preferência 2'],
        features: ['Feature 1']
      },
      {
        id: 2,
        name: 'Produto B',
        category: 'Categoria B',
        preferences: ['Preferência 1', 'Preferência 3'],
        features: ['Feature 2', 'Feature 3']
      }
    ];

    const formData = {
      selectedPreferences: ['Preferência 1', 'Preferência 2'],
      selectedFeatures: ['Feature 1'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      produtosComPreferenciasComuns
    );

    expect(recommendations[0].name).toBe('Produto A');
    expect(recommendations[1].name).toBe('Produto B');
  });

  test('Não inclui propriedade score nos produtos retornados', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations[0]).not.toHaveProperty('score');
  });
});