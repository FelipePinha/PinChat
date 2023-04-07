# PinChat
<br>
<div align="center">
<b>PinChat</b> é um projeto pessoal, de um chat online simples. Feito com o objetivo de estudo.
</div>
<br>

![ChatWorking](https://user-images.githubusercontent.com/50679370/230651245-44a7792c-f1e0-4bcb-af49-c8159262658b.png)

## Features

<ul>
  <li>Login de usuário.</li>
  <li>Mensagens de aviso para os usuários que já estão no chat, avisando quando uma nova pessoa se juntou.</li>
  <li>Mensagem de boas vindas para quem se juntou ao chat pela primeira vez.</li>
  <li>Envio e recebimento de mensagens em tempo real.</li>
  <li>Cores diferentes, para diferenciar sua mensagem da de outros usuários.</li>
  <li>Listagem de usuários no chat</li>
  <li>Layout responsivo</li>
</ul>

## Como usar

Para clonar e rodar este app, você precisa de <a href="https://git-scm.com/">Git</a> e <a href="https://nodejs.org/en">Node js</a> instalados na sua máquina.

```bash
  git clone https://github.com/FelipePinha/PinChat

  cd PinChat
  
  npm install
  
  npm run start
```

## Como funciona

<p>Você entra no chat após escolher um nome de usuário, que não pode ser igual a um que já exista. Cada usuário é salvo em um array, que atualiza a medida que 
as pessoas entram e saem. Os eventos são controlados pelo socket.io, que detecta quando se deve enviar as mensagens e assim elas são enviadas para todos os usuários.</p>

## Tecnologias usadas

<ul>
  <li><a href="https://nodejs.org/en">Node js</a></li>
  <li><a href="https://socket.io/">Socket.io</a></li>
  <li><a href="https://expressjs.com/pt-br/">Express</a></li>
</ul>
