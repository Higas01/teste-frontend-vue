# Projeto - Desafio Vue e Nuxt

## Tecnologias Utilizadas

### Vue.js
Framework JavaScript para desenvolvimento front-end

### Nuxt.js
Framework JavaScript para desenvolvimento front-end baseado no Vue.js

## Algumas observações
* A remoção de usuários ocorre apenas no escopo LOCAL da aplicação, por conta que a API não remove no seu próprio servidor, então, ao realizar um refresh, todas as "remoções" aparecem na tela novamente 
<br/>

* Neste projeto, realizamos apenas o LOGIN e não o CADASTRO, por isso ao se autenticar na aplicação, precisa ser com um usuário já cadastrado, na tela, eu deixo as credenciais de um usuário já cadastrado fornecida pela própria documentação da API

## Como executar o projeto

### Requisitos
* node.js
* npm
* git

Abra seu terminal e crie uma pasta:
```
mkdir vue-project
```

Entre na pasta:
```
cd vue-project
```

Clone o repositório:
```
git clone https://github.com/Higas01/teste-frontend-vue .
```

Instale as dependências:
```
npm i
```

Execute localmente:
```
npm run dev
```

A documentação da API utilizada pode ser acessada pela [URL](https://dummyjson.com/docs) 