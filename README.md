

## Rotas da aplicação


- **`POST /users`**: A rota deve receber `name`, `email` e `password` dentro do corpo da requisição, Para o cadastro de novo usuário. Caso deseje cadastrar o o usuário como admin, passe `admin: true`, não se preocupe o `admin` vem como `false` por padrão.


- **`GET /sessions`**: A rota para fazer o login, envie o `email` e `password` como basic authentication(base64);


- **`PUT /users`**: A rota  altera o `name`,`email`, `password`, `admin: true` ou `admin:false`, caso queira trocar a senha, basta enviar o `oldPassword` seguindo do `password` e `confirmPassword`.


- **`PUT /users/disable`**: A rota desabilita o usuário da aplicação, é preciso estar logado.

----

- **`POST /movies`**: A rota cadastra um novo filme recebendo `name`,`director` e ` genre`<br/> 
**OBS**: Você precisa estar logado e ser um usuário administrador.


- **`GET /movies`**: A Rota retorna todos o filmes cadastrados já com a média de notas do filme, também é possível filtrar por gênero, diretor ou nome do filme, passando a query na url `?name=exemplo&genre=drama`.<br/> 




- **`PUT /movies/vote/:movie_id`**: A rota recebe seu voto e contabiliza na média do filme, você só precisa passar `id`do filme na url e o `movie_note:` com o valor da sua nota no corpo da requisição. <br/> 


----

## Instalação

Clone o projeto com
```console
git clone git@github.com:thiagomedina/teste-back.git
``` 

Entre na pasta do projeto e instale as dependências com:

```console
yarn
```

Em seguida, você deve criar seu banco de dados do postgres  e preencher seus próprios campos no arquivo `.env.`

Agora, você precisa criar tabelas com o comando:

```console
yarn sequelize db:migrate
```
Após a configuração do banco de dados, você pode iniciar o servidor com:

```console
yarn dev
```

