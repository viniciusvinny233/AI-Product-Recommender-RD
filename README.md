# 🎯 Recomendador de Produtos RD Station

**Solução técnica desenvolvida por Marcos Vinicius para o teste da RD Station**

[![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.3+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tests](https://img.shields.io/badge/Tests-15%20passed-28a745?style=flat-square&logo=jest)](https://jestjs.io/)

## 📋 Sobre o Projeto

Sistema inteligente de recomendação de produtos RD Station que utiliza algoritmos personalizados para sugerir as melhores soluções baseadas nas preferências do usuário.

### ✨ Funcionalidades
- 🔍 Recomendação inteligente (única ou múltipla)
- 📊 Interface com Tailwind CSS
- ⚡ Algoritmo de matching otimizado
- 🎯 Tratamento de empates e edge cases

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18.3+
- Yarn (recomendado)

### Como Executar

1. Clone o repositório: `git clone https://github.com/viniciusvinny233/AI-Product-Recommender-RD`
2. Entre no projeto com: `cd .\AI-Product-Recommender-RD\`
3. Instale as dependências: `yarn install`
4. Inicie a aplicação: `yarn start`

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | **Recomendado** - Inicia frontend e backend |
| `yarn start` | Inicia apenas o frontend |
| `yarn start:backend` | Inicia apenas o json-server |

## 🛠️ Stack Tecnológica

- **Frontend**: React.js + Tailwind CSS
- **Backend**: json-server (mock API)
- **Runtime**: Node.js 18.3+

## 🧪 Cobertura de Testes

````
✅ recommendationService - 15 testes passando

🎯 Cenários testados:
├── ✅ Recomendação SingleProduct baseada em preferências
├── ✅ Recomendação MultipleProducts com ordenação
├── ✅ Tratamento de empates (retorna último match)
├── ✅ Validação com listas vazias
├── ✅ Comportamento sem preferências selecionadas
├── ✅ Produtos sem correspondência
├── ✅ Campos undefined/null
├── ✅ Cálculo correto de pontuação
├── ✅ Preferências e features isoladas
└── ✅ Tipos de recomendação inválidos

📊 Resultado: 15/15 testes ✅ | Tempo: 0.163s
````

## ✅ Critérios Atendidos

- ✅ Formulário de preferências e funcionalidades
- ✅ Recomendação SingleProduct e MultipleProducts
- ✅ Algoritmo de matching baseado em critérios
- ✅ Tratamento de empates (retorna último produto)
- ✅ Arquitetura modular e extensível

---

<div align="center">

**Desenvolvido com ❤️ por Marcos Vinicius**

</div>
