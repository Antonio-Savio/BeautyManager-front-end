# **BeautyManager - Front-End**

## 💡 **Sobre**
O BeautyManager é um sistema web SaaS (Software as a Service) projetado para a gestão de salões de beleza. Essa interface oferece aos usuários uma experiência intuitiva para gerenciar clientes, agendamentos e assinaturas premium. O front-end foi desenvolvido com **Next.js** e integrações como **Chakra UI** para estilização e **axios** para chamadas à API.

---

## 🔗 Links da aplicação
- [Deploy front-end](https://beauty-manager-front-end.vercel.app/)
- [Deploy back-end](https://beauty-manager-back-end.vercel.app/)
- [Repositório do back-end](https://github.com/Antonio-Savio/BeautyManager-back-end)

---

## ✅ **Destaques**
- **Autenticação**: login seguro armazenando a sessão a partir de cookies contendo o token JWT.
- **Autorização**: validação de acesso a rotas protegidas e públicas, utilizando o arquivo de **middleware do Next.js**. 
- **Axios**: para realizar requisições HTTP e consumir a API do BeautyManager, definindo middleware de autentição, adicionando o token JWT aos headers de cada requisição, e middleware de erros. 
- **Interface Moderna**: estilizada com **Chakra UI** para melhor experiência do usuário.
- **Responsividade**: a interface foi pensada para ser acessível em diferentes dispositivos, como desktops, tablets e smartphones.
- **Plataforma de Pagamentos** integração com a **Stripe** para gestão de assinaturas.
- **Funcionalidades Premium**:
    - Visulizar tabela de clientes, com o total gasto por cada um, e ordenada de acordo com o número de agendamentos feito.
    - Editar ou excluir clientes.
    - Cadastrar serviços ilitimitados.
- **Modal de detalhes**: ao clicar em um agendamento, é possível visualizar detalhes e concluir (deletar) o agendamento.
- **Modal de confirmação**: caso o usuário tente excluir um cliente, ou serviço, que tenha agendamentos em aberto, um modal é exibido para confirmar a exclusão dos agendamentos.
- **Manipulação de datas e moeda**: funções utilitárias para salvar dados no formato *DateTime* e formatar moeda, data e hora para o padrão local.
- **Dropdown com links**: componente que facilita o cadastro de um novo agendamento/cliente/serviço.
- **Toast de notificações**: mensagens de sucesso, ou erro são exibidas conforme ações do usuário.

---

## ⚙️ **Tecnologias Utilizadas**
- **Next.js**
- **TypeScript**
- **Chakra UI**
- **Context API**
- **Axios**
- Bibliotecas:
    - **Stripe.js**
    - **React Hot Toast**
    - **js-cookie**

---

## 📁 **Estrutura do Projeto**
A estrutura do front-end está organizada conforme o padrão abaixo:

```
/public
  ├── images/           # Imagens, como a logo do projeto
/src
  ├── app/              # Estrutura de rotas do Next.js
  ├── components/       # Componentes reutilizáveis da interface
  ├── context/         # Contexto para autenticação
  ├── services/         # Configuração do axios
  │   └── api.ts        # 'setupAPI' cria configuração padrão para requisições HTTP | 'clientApi' faz requisições pelo lado do cliente
  │   └── serverApi.ts  # Requisições pelo lado do servidor
  │   └── stripe-js.ts  # Configuração da biblioteca stripe-js
  ├── theme/            # Definição de cores do sistema
  ├── utils/            # Funções utilitárias
  │   └── breakpoint    # Configuração de breakpoint para renderização condicional
  │   └── currency      # Função para formatar preço em Real
  │   └── datetime      # Funções de manipulação de data e horário
  └── middleware.ts     # Valida a autenticação de usuários, de acordo com rotas públicas e protegidas
```

---

## 🚀 **Como Executar o Projeto**

### **Requisitos para Executar o Projeto**
- Node.js
- NPM ou Yarn
- Conta na Stripe configurada

### **Instalação e Configuração**
Siga os passos abaixo para rodar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/Antonio-Savio/BeautyManager-front-end.git

# Acesse o diretório do projeto
cd BeautyManager-front-end

# Instale as dependências
npm install
```

### **Configuração do Ambiente**
Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias, como:

```
NEXT_PUBLIC_API_URL=http://localhost:{porta_do_seu_servidor_back-end}
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=sua_chave_publica_Stripe
```

### **Execute em sua máquina**

```bash
npm run dev
```
A aplicação estará disponível em **http://localhost:3000**.

---

## 🤝 **Contribuição**
Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📄 **Licença**
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 **Contato**
Se tiver dúvidas ou sugestões, entre em contato:
- **Email** - [savio.aragao@hotmail.com](mailto:savio.aragao@hotmail.com)
- **GitHub**: [Antonio-Savio](https://github.com/Antonio-Savio)
- **LinkedIn**: [antonio-savio](https://www.linkedin.com/in/antonio-savio)