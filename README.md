<h2 align="center">
<img alt="Truckeria logo" src="https://res.cloudinary.com/danarocha/image/upload/v1600760677/github/truckeria-logo_xxafxi.png"  width="200px"/>
<br />

</h2>
<br />
<p align="center" >
   A simple project to manage food trucks, representing my journey in learning Node.js while implementing ReactJs and Swift UI.
   <br />
   <br />
   If you want to know a bit more about the App, you can take a look at <a href="http://www.danarocha.com/portfolio/truckeria">here</a>.

</p>

<br />
<h5 align="center">
  <img alt="Truckeria App" src="https://res.cloudinary.com/danarocha/image/upload/v1600760857/github/truckeria-app_pp8vne.png" width="500px" />
</h5>

---

## :green_heart: Why?

I am developing this project for my personal portfolio, so, don't hesitate in providing me any feedback you might have.

[hello@danarocha.com](mailto:hello@danarocha.com).

Connect with me at [LinkedIn](https://www.linkedin.com/in/danarocha/).

## :bookmark: About this App

Currently under development.

Still on my to-do list:

- [ ] Finish the REST API (with Node js)
- [ ] iOS App (with Swift UI)
- [ ] Connect front-end with the api

## :rocket: Built With

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](http://typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [react-router-dom](https://github.com/ReactTraining/react-router)
- [Redux](https://redux.js.org/) - React State Manager
- [Redux-Sagas](https://redux-saga.js.org/) - Side-Effect model for Redux
- [Tailwind](https://tailwindcss.com/)
- [styled-components](https://styled-components.com/)
- [framer-motion](https://www.framer.com/motion/)
- [nivo](https://nivo.rocks)
- [date-fns](https://date-fns.org/)

## :wrench: Tools

<ul>
  <li>es6 syntax and babel</li>
  <li>ESLint + Prettier + EditorConfig;</li>
  <li>TypeORM (PostgreSQL)</li>
  <li>Flux to organize the data flow management</li>
</ul>

## :tada: Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

<h3>Pre-requisites</h3>

You will need:

- NodeJS
- Yarn or Npm
- Docker
- PostgreSQL

You need to install these prerequisites on your computer before you can use "**Truckeria**".

<h4>NodeJS</h4> <a href="https://nodejs.org/en/download/package-manager/" target="_blank">with these instructions</a>.

<h4>Yarn</h4> <a href="https://yarnpkg.com/en/docs/getting-started" target="_blank">with these instructions</a>.

<h4>Docker</h4> <a href="https://www.docker.com/get-started" target="_blank">with these instructions</a>.

<h4>PostgreSQL</h4> <a href="https://hub.docker.com/_/postgres" target="_blank">with these instructions</a>.




```
docker run --name truckeria -e POSTGRES_DB=truckeria -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

```
docker run --name truckeria_redis -p 6379:6379 -d -t redis:alpine
```

```
docker run --name mongodb -p 27017:27017 -d -t mongo
```

## REST API Client

Finally, you will need a rest client to test "**Truckeria**". Here are some:

<ul>
  <li><a href="https://insomnia.rest/" target="_blank">Insomnia</a></li>
  <li><a href="https://www.getpostman.com/" target="_blank">Postman</a></li>
</ul>

After repository clone:

```
# Clone this repository
$ git clone https://github.com/danarocha-br/truckeria.git

# Go into the repository
$ cd truckeria

# Install dependencies
$ yarn install

# Create .env file
# Create ormconfig.json file

# Run migrations
$ yarn typeorm migration:run

# Run the app
$ yarn dev:server
```


Now you can use your REST Client to test **Truckeria**.

---

Made with ♥ by **Dana Rocha** :wave: [Get in touch!](https://www.linkedin.com/in/danarocha/)

---

## License

This project is licensed under the MIT License - see the <a href="" target="_blank">LICENSE.md</a> file for details.
