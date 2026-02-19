# 🏋️‍♂️ Treinaí App

Aplicativo mobile para gerenciamento de treinos de musculação. Desenvolvido com **Ionic + Angular** para criar, organizar e acompanhar seus treinos e exercícios de forma simples e eficiente.

---

## 🚀 Funcionalidades

### ✅ Implementadas
- **Autenticação JWT**: Login, registro e logout com persistência de token.
- **Gerenciamento de Treinos**: Criação, listagem e visualização de detalhes.
- **Gerenciamento de Exercícios**: Adição de múltiplos exercícios a um treino.
- **Cards Expansíveis**: Visualização detalhada de cada exercício com animação.
- **Interface Mobile-First**: Design responsivo otimizado para pequenos dispositivos.
- **Feedback Visual**: Toasts, loading spinners e micro-animações.
- **Pull-to-Refresh**: Atualização de dados intuitiva ao arrastar a tela.

### 🚧 Em Desenvolvimento
- [ ] Edição de treinos e exercícios.
- [ ] Deleção de treinos e exercícios.
- [ ] **Auth Guard** para proteção de rotas privadas.
- [ ] Gerenciamento de perfil do usuário.

---

## 🛠 Tecnologias

- **Frontend**: [Angular 20](https://angular.io/) + [Ionic 8](https://ionicframework.com/) (Standalone Components)
- **Mobile**: [Capacitor 8](https://capacitorjs.com/)
- **Linguagem**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Estilos**: SCSS + Ionic CSS Variables
- **HTTP**: Angular HttpClient
- **Storage**: `@ionic/storage-angular` (Persistência JWT)
- **Ícones**: [Ionicons 7](https://ionicons.com/)

---

## 📋 Pré-requisitos

- **Node.js**: 18.x ou superior
- **Gerenciador de pacotes**: npm ou yarn
- **Backend API**: API Laravel rodando localmente em `http://localhost:8000`

---

## 🚀 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone [seu-repositorio]
   cd workout-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   Edite o arquivo `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api/v1'
   };
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   Acesse em: `http://localhost:8100`

---

## ⚙️ Configuração da API

O aplicativo consome uma API RESTful com os seguintes endpoints:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/v1/login` | Autenticação de usuário |
| `POST` | `/api/v1/register` | Cadastro de novo usuário |
| `GET` | `/api/v1/workouts` | Listar todos os treinos |
| `POST` | `/api/v1/workouts` | Criar um novo treino |
| `GET` | `/api/v1/workouts/:id` | Detalhes de um treino específico |
| `PUT` | `/api/v1/workouts/:id` | Atualizar dados do treino |
| `DELETE` | `/api/v1/workouts/:id` | Remover um treino |
| `GET` | `/api/v1/workouts/:id/exercises` | Listar exercícios de um treino |
| `POST` | `/api/v1/workouts/:id/exercises` | Adicionar exercício ao treino |
| `PUT` | `/api/v1/exercises/:id` | Atualizar dados do exercício |
| `DELETE` | `/api/v1/exercises/:id` | Remover um exercício |

> **Nota:** Todas as requisições (exceto login/registro) exigem o header `Authorization: Bearer <token>`.

---

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── components/
│   │   └── workout-modal/          # Modal de criação de treino
│   ├── models/                     # Interfaces e Tipagens
│   ├── pages/                      # Páginas e fluxos da aplicação
│   │   ├── dashboard/              # Home/Lista de treinos
│   │   ├── exercise-form/          # Cadastro de exercício
│   │   ├── login/                  # Tela de entrada
│   │   ├── register/               # Tela de cadastro
│   │   └── workout/                # Detalhes e execução
│   ├── services/                   # Lógica de negócio e API
│   ├── app.component.ts            # Entrypoint do Angular
│   └── app.routes.ts               # Definição de rotas
├── environments/                   # Configurações de ambiente
└── theme/                          # Estilização global e variáveis
```

---

## 🛤 Rotas da Aplicação

| Rota | Página | Descrição |
| :--- | :--- | :--- |
| `/` | Login | Redirecionamento inicial |
| `/login` | Login | Tela de autenticação |
| `/register` | Register | Cadastro de usuários |
| `/dashboard` | Dashboard | Visualização geral dos treinos |
| `/workout/:id` | Workout | Detalhamento do treino selecionado |
| `/workout/:id/exercises/new` | ExerciseForm | Formulário para novo exercício |

---

## 📦 Scripts Disponíveis

- `npm start`: Atalho para `ionic serve`.
- `npm run build`: Gera o pacote de produção.
- `npm test`: Executa os testes unitários.
- `npm run lint`: Analisa o código em busca de erros de padrão.

---

## 🐛 Problemas Conhecidos & Roadmap

### Issues Atuais
1. **Configuração**: Necessário configurar `apiUrl` manualmente em `environment.prod.ts`.
2. **Linting**: Avisos sobre o uso de `constructor` vs `inject()`.
3. **Funcionalidade**: Botões de Editar/Deletar ainda são apenas placeholders (`console.log`).

### 🗺 Roadmap Curto Prazo
- [ ] Finalizar CRUD (Edit/Delete).
- [ ] Implementar **Auth Guards**.
- [ ] Adicionar Timer de descanso entre séries.

---

## 👨‍💻 Autor

**Juan Peruzzo** - *Desenvolvedor Full Stack*