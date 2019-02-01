<h1>Caixa Eletrônico (ATM)</h1>

Projeto consiste em um simulador de caixa eletrônico que permite operação de depósito e saque.<br />
O depósito é realizado definindo a quantidade de notas que se quer adicionar.<br />
Notas de 10, 20, 50 e 100 são ilimitadas e notas de 2 e 5 são disponibilizadas a medida em que se faz depósitos<br />
Tanto saques quanto depósitos são salvos no banco como um transação tendo um boolean indicando se trata de um depósito ou saque<br />

A demo está disponível no endereço: https://atm-front.firebaseapp.com<br />
A API com a doc está disponível em https://atm-server.herokuapp.com

Considerações:

O front e o server são projetos distintos apesar de ambos serem feitos em ES6.<br />
O front usa webpack e babel para ter maior compatibilidade com browsers que não suportam o ES6.
O código do server não foi transpilado em razão do node 10 suportar ES6 nativamente.
Os testes de api utilizaram mocha + chai e testaram 16 cenários de combinações importantes,<br />
Como por exemplo saque de 157 que exigia notas de 5 e 2 que não são ilimitadas. Neste caso em<br />
que era esperado um retorno de sucesso, antes foi realizado um depósito com notas de 2 e 5.
O teste realizado no front usando karma + jasmine + angular-mocks foi mais básico teve o intuito de acessar
os controllers e verificar se acessar o metodo (simulando disparo) realizava chamada das apis. 

Instruções:

Preferencialmente comece instalando o servidor. Digite "npm i" dentro da pasta "atm-server" e<br />
para iniciar o servidor em desenvolvimento com o nodemon digite "npm run dev".
Estará disponível em http://localhost:8080

Para iniciar o servidor em produção altere a variável de ambiente DB_URL com a url da<br />
base de dados que queria salvar e consultar as transações e digite "npm start".
  
Para instalar o front entre na pasta digite "npm i" em seguida para testar "npm run dev".
Para realizar os testes de api e front entre nas respectivas pasta e digite "npm test".

