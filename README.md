

## Rotas da aplicação


- **`POST /users`**: A rota deve receber `name`, `email` e `password` dentro do corpo da requisição, Para o cadastro de novo usuário. Caso deseje cadastrar o o usuário como admin, passe `admin: true`, não se preocupe o `admin` vem como `false` por padrão.


- **`GET /sessions`**: A rota para fazer o login, envie o `email` e `password` como basic authentication(base64);


- **`PUT /users`**: A rota  altera o `name`,`email`, `password`, `admin: true` ou `admin:false`, caso deseje trocar a senha, basta enviar o `oldPassword` seguindo do `password` e `confirmPassword`.

----

- **`POST /movies`**: A rota cadastra um novo filme recebendo `name` e `description` 
**OBS**: Você precisa estar logado e ser um usuário administrador.


- **`GET /movies`**: A Rota retorna todos o filmes cadastrados já com a média de notas do filme.
**OBS**: Você precisa estar logado.


- **`PUT /movies/vote/:movie_id`**: A rota recebe seu voto e contabiliza na média do filme, você só precisa passar `movie_note:` com o valor da sua nota.
**OBS**: Você precisa estar logado.


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
```
yarn dev
```


