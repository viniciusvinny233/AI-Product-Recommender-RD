# Recomendador de Produtos RD Station

## 📋 Descrição
Este projeto é um sistema web de recomendação de produtos da RD Station, desenvolvido como parte de um desafio técnico para a posição de Desenvolvedor Front-End. A aplicação permite que os usuários selecionem suas preferências e funcionalidades desejadas para receber recomendações personalizadas de produtos da RD Station.

![Screenshot da aplicação](https://via.placeholder.com/800x400?text=Recomendador+de+Produtos+RD+Station)

## ✨ Funcionalidades

- Seleção de preferências específicas do usuário
- Seleção de funcionalidades desejadas
- Dois modos de recomendação:
  - **Produto Único:** Recomenda o melhor produto para as necessidades do usuário
  - **Múltiplos Produtos:** Recomenda vários produtos que atendem às necessidades do usuário
- Interface responsiva construída com Tailwind CSS
- Exibição detalhada das recomendações com preferências e funcionalidades de cada produto

## 🛠️ Tecnologias

- **React.js 18** - Framework front-end
- **Tailwind CSS** - Framework de estilo
- **Axios** - Cliente HTTP para consumo da API
- **json-server** - Simulação de API REST para dados de produtos

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js versão 18.3 ou superior
- Yarn (ou npm)

### Instalando com n (gerenciador de versões Node)

```bash
# Instalar n globalmente
npm install -g n

# Instalar e usar Node.js v18
n 18
```

### Instalando com nvm (Node Version Manager)

```bash
# Instalar a versão 18 do Node.js
nvm install 18

# Usar a versão 18
nvm use 18
```

### Configuração do Projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/recomendador-produtos-rd.git
cd recomendador-produtos-rd
```

2. Instale as dependências:
```bash
yarn install
```

3. Execute o script de instalação (se aplicável):
```bash
./install.sh
```

### Execução

**Iniciar aplicação completa (frontend + backend)**
```bash
yarn dev
```

**Iniciar apenas o frontend**
```bash
yarn start:frontend
```

**Iniciar apenas o backend**
```bash
yarn start:backend
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

## 📦 Estrutura do Projeto

```
src/
├── components/              # Componentes React
│   ├── Form/                # Formulário de preferências
│   ├── RecommendationList/  # Lista de produtos recomendados
│   └── shared/              # Componentes compartilhados
├── hooks/                   # Hooks personalizados
│   ├── useForm.js           # Gerenciamento do estado do formulário
│   ├── useProducts.js       # Carregamento e gerenciamento de produtos
│   └── useRecommendations.js # Lógica de recomendações
├── mocks/                   # Dados mockados para testes
├── services/                # Serviços e lógica de negócio
│   ├── product.service.js   # Serviço de API de produtos
│   └── recommendation.service.js # Lógica de recomendação de produtos
└── App.js                   # Componente principal
```

## 🧠 Algoritmo de Recomendação

O sistema de recomendação funciona através dos seguintes passos:

1. **Coleta de Preferências:** O usuário seleciona suas preferências e funcionalidades desejadas
2. **Pontuação de Produtos:** Cada produto recebe uma pontuação baseada na correspondência com as preferências do usuário
3. **Cálculo de Relevância:** A relevância é calculada como percentual de correspondência entre preferências selecionadas e características do produto
4. **Ordenação:** Os produtos são ordenados por relevância (pontuação mais alta primeiro)
5. **Filtragem:** 
   - No modo "Produto Único", apenas o produto com a maior pontuação é retornado
   - No modo "Múltiplos Produtos", todos os produtos relevantes são retornados em ordem de pontuação

Em caso de empate na pontuação, o sistema retorna o último produto que corresponde às preferências.

## ⚙️ Endpoints da API

A aplicação consome os seguintes endpoints da API:

- `GET /products`: Retorna a lista completa de produtos disponíveis

## 🧪 Testes

O projeto inclui testes unitários para os principais componentes e serviços, especialmente para o algoritmo de recomendação.

Para executar os testes:

```bash
yarn test
```

Para executar testes com cobertura:

```bash
yarn test --coverage
```

## 📝 Notas de Implementação

### Lógica de Recomendação

A lógica principal de recomendação está implementada no arquivo `recommendation.service.js`, que:

1. Calcula a pontuação de cada produto com base nas preferências do usuário
2. Filtra os produtos com pontuação maior que zero
3. Ordena os produtos por pontuação decrescente
4. Retorna um único produto para o modo "SingleProduct" ou múltiplos produtos para o modo "MultipleProducts"

### Tratamento de Erros

A aplicação trata os seguintes casos de erro:
- Falha na conexão com o servidor backend
- Ausência de produtos correspondentes às preferências
- Formulário incompleto ou inválido

### Performance

- O algoritmo de pontuação tem complexidade O(n*m), onde n é o número de produtos e m o número de preferências/funcionalidades selecionadas
- Uso de memoização e React.memo para evitar re-renderizações desnecessárias
- Lazy loading de componentes onde apropriado

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico para a posição de Desenvolvedor Front-End na RD Station.

## 📄 Licença

Este projeto está licenciado sob a MIT License.