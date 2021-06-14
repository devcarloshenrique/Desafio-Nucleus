
# Desafio Nucleus

<br>

### *`Tópicos visto`*

<br>

Backend

-	Relacionamento one to many
-	Validação de campos com a biblioteca [pt-br-validator](https://github.com/LaravelLegends/pt-br-validator)
-	CRUD com tabelas relacionadas 
-	Autenticação utilizando a biblioteca [jwt-auth](https://jwt-auth.readthedocs.io/en/develop/laravel-installation/)
-	Validação de campos rotas de Login  e  Cadastro de usuário.
-	Paginação e Filtro por Data na rota consultar Lançamento. 

Front-End 

- Consumindo api  com axios.
- Sistema de Rotas com react-router-dom.
- Autenticação de login e validação do token, por meio da api.
- Login e Cadastro de usuário validado, por meio da api.
- Logout 

<br>

### *`Rotas`*

<br>

1. Necessário instalar o [postman](https://www.postman.com/downloads/)

-	**[Collection Postman com todas as Rotas](https://github.com/devcarloshenrique/Desafio_Nucleus/blob/master/banco-de-dados/routes_api)** 

2. Necessário configurar o No Enviroment de acordo com o caminho da api

![image](https://user-images.githubusercontent.com/57951744/120873353-2c9a7700-c578-11eb-977d-f5106d745858.png)


<br>

### *`Start Backend`*

<br>

0.  Crie o banco de dados mysql com o nome **nucleus**.
1.	Certificar-se de ter o [composer](https://getcomposer.org/download/) instalado.
2.	Configure o arquivo .env de acordo com o seu banco de dados mysql
3.	Rode os seguintes comandos: 
	
	Para baixar as bibliotecas via composer.
	
		composer update	
	
	Gerar a chave secreta do jwt.
	
		php artisan jwt:secret
	
4.	Na raiz da pasta backend rodar seguintes comando para criar as migrations  

		composer migrate	

5. Agora basta abrir o postman, criar um usuário, passar o retorno do token no No Enviroment e testar as rotas.

<br>

### *`Start Frontend`*

<br>

1.	Certificar-se de ter o node instalado.
2.	Configure o arquivo **src/api/api.js** de acordo com a api.
3. Para startar basta rodar os seguintes comando na **raiz** do projeto.
	
```
npm install
```
```
npm start
```
<br>


> ### Fonte 

<br>

-	**Documentação React**
-	**Documentação Laravel**
-	**[Jwt-auth](https://jwt-auth.readthedocs.io/en/develop/laravel-installation/)**
-	**[Como fazer o controle das contas a pagar e receber](https://www.totvs.com/blog/gestao-de-servicos/contas-a-pagar-e-receber/)**


<br>

## Autor

| [<img src="https://avatars2.githubusercontent.com/u/57951744?s=180&v=4"><br><sub>@devcarloshenrique</sub>](https://github.com/devcarloshenrique) |	
| :---: |

