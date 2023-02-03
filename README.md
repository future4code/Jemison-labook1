

<h1 align="center">
     Labook
</h1>

<h4 align="left">
    A rede social que dominou o mundo.
</h4>

---

##  🕵Sobre

Aplicação com o intuito de criar um backend para uma rede social baseada em usuários, posts e amizades.

---

##  👩🏾Quem Faz 

- <a href="https://github.com/sterx17">@sterx17</a>

---
##  🔠Conteúdos

<!--ts-->
   * [Sobre](#sobre)
   * [Quem Faz](#-quem-faz)
   * [Status](#status)
   * [Objetivo do Projeto](#objetivo-do-projeto)
   * [Requisitos de Funcionalidade](#requisitos-de-funcionalidade)
   * [Concepção do Projeto](#concepcao-do-projeto)
   * [Link para Acessar](#link-para-acessar)
   * [Rodando o Projeto](#rodando-o-projeto)
   * [Sobre a Licença](#sobre-a-licença)
<!--te-->


---
##  🧭Status do Projeto

 - ⌛ Feito

---

##  🎯Objetivo do Projeto

Este é um projeto de Back-end, desenvolvido no bootcamp da Labenu, cujo o principal objetivo é estudar e compreender: Arquitetura baseada em camadas e o paradigma de Orientação à Objetos


## ☑️Requisitos de Funcionalidade

**Endpoints a se organizar:**

- [x] Cadastrar novos usuários
- [x] Criar novos posts
- [x] Buscar post por ID

**Endpoints a se criar:**

- [x] Linkar dois usuários por uma amizade
- [x] Desfazer uma amizade
- [x] Ver o feed de amigos em ordem do mais recente

**Desafios:**

- [ ] Ver apenas um tipo de post (normal ou evento)
- [ ] Curtir Post
- [ ] Descurtir Post
- [ ] Comentar Post
- [ ] Paginar o Feed

---

## 💡Concepção do Projeto

Esse projeto já possua duas tabelas criadas, por isso só foi necessário acrescentar mais uma: `labook_friendships`. Abaixo, suas características:

→ id: VARCHAR(255) PK
→ fk_friendship_requester: VARCHAR(255) FK de Users
→ fk_friendship_receiver: VARCHAR(255) FK de Users
→ created_at: DATE (timestamp)


---

## 🔗Link para Acessar a API

- **Link do Render:** <a href="https://labook.onrender.com/">https://labook.onrender.com/</a>
- **Link da Documentação:** <a href="https://documenter.getpostman.com/view/22437697/2s935mrPy6">https://documenter.getpostman.com/view/22437697/2s935mrPy6/</a>


---


## 🛰Rodando o Projeto

Para Rodar o projeto, siga as seguintes etapas:

- Rode `npm i` para instalar as dependências
- Adicione seu arquivo .env e seus dados de conexão com o banco
- Rode `npm run migrations` para criar as tabelas em seu banco
- Use `npm start` para rodar o servidor.


---

## 📝Sobre a Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
