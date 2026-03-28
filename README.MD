# Kanban Board

Aplicação funcional para gerenciamento de fluxos de trabalho desenvolvida em **React**, utilizando o Local Storage do navegador com suporte a diversas línguas e modo escuro e modo claro.
<br>
<br>

## Stack Técnica

- **Frontend:** React.js (Hooks: `useState`, `useEffect`, `useRef`)
- **Estilização:** CSS3 puro
- **Ícones:** `react-icons`
- **Deploy/CI:** Vercel
  <br>
  <br>

## Arquitetura e Componentização

O projeto utiliza uma estrutura modular para facilitar a manutenção e escalabilidade:

- **App.js**: Gerenciamento do estado global das colunas e lógica de persistência.
- **Task.jsx**: Controle do ciclo de vida da tarefa e lógica de exclusão/confirmação de exclusão
- **Column.jsx**: Renderização dinâmica e mapeamento de componentes filhos.

<br>

## Instruções de Execução

```bash
# Instalação de dependências
npm install

# Execução em ambiente de desenvolvimento
npm start

# Build para produção
npm run build
```
