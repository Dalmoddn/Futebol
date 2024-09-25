#Futebol ⚽️

Esse é um site informativo sobre partidas e classificações de futebol! Neste projeto, o foco é no desenvolvimento de uma API e integração das aplicações utilizando Docker, consumindo um banco de dados através de uma arquitetura baseada em contêineres.

## Descrição do Projeto

Fui encarregado de desenvolver uma API utilizando a metodologia **TDD** (Test-Driven Development). A API será responsável por gerenciar as partidas de futebol e a classificação dos times, sendo integrada a um front-end já existente que exibirá as informações para os usuários. Além disso, o projeto utiliza o **Sequelize** para a modelagem e manipulação do banco de dados.

### Funcionalidades

- Cadastro e atualização de partidas de futebol.
- Cálculo de classificações com base nos resultados das partidas.
- API para servir dados para o front-end.
- Sistema dockerizado, permitindo fácil replicação e execução em ambientes de desenvolvimento e produção.

## Tecnologias Utilizadas

- **Node.js** - Plataforma utilizada para construir a API.
- **Sequelize** - ORM para modelagem e manipulação de dados no banco de dados.
- **Docker/Docker-Compose** - Para containerização e integração de serviços.
- **MySQL** - Banco de dados relacional utilizado para armazenar as informações de partidas e classificações.
- **Jest/Mocha** - Ferramentas de teste para garantir que o código segue o método TDD.
- **REST API** - Arquitetura da API que será consumida pelo front-end.
  
## Instalação e Execução

### Pré-requisitos
- **Docker** e **Docker-Compose** instalados.
- **Node.js** e **npm** (caso queira rodar o back-end localmente sem Docker).

### Passos para executar

1. Clone este repositório:
    ```bash
    git clone 
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd 
    ```

3. Suba os contêineres com Docker-Compose:
    ```bash
    docker-compose up --build
    ```

4. O projeto estará rodando nas seguintes portas:
   - **API**: http://localhost:3000
   - **Banco de Dados**: Conectado via Docker

5. (Opcional) Se preferir rodar sem Docker, instale as dependências e execute a API:
    ```bash
    npm install
    npm start
    ```

## Testes

Para rodar os testes unitários e de integração, execute o seguinte comando:

```bash
npm test
```

Os testes são desenvolvidos com base no TDD, garantindo que todas as funcionalidades sigam as regras de negócio especificadas.

## Contribuição

1. Faça o **fork** do projeto.
2. Crie uma nova **branch** com suas funcionalidades: `git checkout -b minha-nova-feature`
3. **Commit** suas alterações: `git commit -m 'feat: Minha nova feature'`
4. Faça o **push** para a branch: `git push origin minha-nova-feature`
5. Abra um **Pull Request** para revisão.
