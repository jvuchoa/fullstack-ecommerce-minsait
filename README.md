# Ecommerce
## Descrição do Projeto
- Aplicação desenvolvida em Angular com o objetivo de gerenciar produtos e permitir que o usuário adicione itens a um carrinho de compras.
O sistema possui um módulo completo de CRUD de produtos integrado a uma API, além de um carrinho que mantém os dados armazenados no navegador através do LocalStorage.
## Stacks
- Front-End: Angular (18); TypeScript; HTML e CSS; Reactive Forms; Angular Router; LocalStorage.
- Back-End: Java (21); Spring Boot 4.0.0; Spring Data JPA; Lombok; Maven.
- Outros Recursos: Integração com API REST; Componente de tabela reutilizável; Pipe de formatação de valores

## Funcionalidades da Aplicação

### Módulo de Produtos (CRUD)

### Listagem
- Exibição dos produtos carregados pela API.
- A tabela foi criada como um componente separado, recebendo dados via `@Input()` e emitindo ações via `@Output()`.
- **Colunas exibidas:** nome, preço (formatado) e código de barras.

### Ações disponíveis em cada item:
- Editar
- Excluir
- Adicionar ao carrinho

### Cadastro e Edição
- Formulários criados com Reactive Forms.
- Validações aplicadas (campos obrigatórios, numéricos, etc.).

### Exclusão
- Produto removido através da API.
- Lista atualizada automaticamente após a exclusão.

## Módulo de Carrinho de Compras

### Lógica de Estado
- Serviço responsável por gerenciar os itens do carrinho.
- Os dados são salvos no LocalStorage para manter as informações mesmo após atualizar a página.
- Impede produtos duplicados (a quantidade é incrementada quando o item já existe).
- Previna valores inválidos, como preços negativos.

### Página do Carrinho
- Lista todos os produtos adicionados.
- Exibe o total da compra em tempo real.
- Permite remover itens, atualizando o total e o LocalStorage.

### Header
- Contador de itens atualizado automaticamente sempre que algo é adicionado ou removido.

## Instalação 
- npm install -g @angular/cli@18
## Verificar instalação
- ng version
## Clonar repositório 
- git clone https://github.com/jvuchoa/fullstack-ecommerce-minsait.git
## Instalar dependêcias 
- npm install
## Rodar o projeto
### Front-End 
- cd ecommerce-frontend
- ng serve
- Acessar no navegador : http://localhost:4200/
### Back-End
- cd ecommerce-backend
- mvn spring-boot:run ou diretamente pelo Intelij
- Acessar: http://localhost:8080/
