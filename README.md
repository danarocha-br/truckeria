<h1>
  Truckeria
</h1>

<h4>
  A simple project to manage food trucks, representing my journey in learning Node js while implementing React Js and React Native. Still under development:
</h4>

- [ ] REST API (with Node js)
- [ ] iOS & Android Apps (based on react-native)
- [ ] Website App in any browser (based on react)

## Screenshots

<h3>
  Mobible
</h3>

<img alt="Truckeria" title="Truckeria" width="800" src="example/screenshots/mobile.jpg">

## Browser Support

| ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 39+ ✔                                                                                                         | 42+ ✔                                                                                                          | 29+ ✔                                                                                                        | 10.1+ ✔                                                                                                       | Nope ✘                                                                                                    |

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

<h3>Prerequisites</h3>

You will need:

- NodeJS
- Yarn
- Docker
- PostgreSQL

You need to install these prerequisites on your computer before you can use "**Truckeria**".

<h4>NodeJS</h4> <a href="https://nodejs.org/en/download/package-manager/" target="_blank">with these instructions</a>.

<h4>Yarn</h4> <a href="https://yarnpkg.com/en/docs/getting-started" target="_blank">with these instructions</a>.

<h4>Docker</h4> <a href="https://www.docker.com/get-started" target="_blank">with these instructions</a>.

<h4>PostgreSQL</h4> <a href="https://hub.docker.com/_/postgres" target="_blank">with these instructions</a>.

<h4>Some Params</h4>

<ul>
  <li>POSTGRES_DB=truckeria</li>
  <li>POSTGRES_USER=postgres</li>
  <li>POSTGRES_PASSWORD=docker</li>
</ul>

```
docker run --name truckeria -e POSTGRES_DB=truckeria -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```

<h4>REST API Client</h4>

Finally, you will need a rest client to test "**Truckeria**". Here are some:

<ul>
  <li><a href="https://insomnia.rest/" target="_blank">Insomnia</a></li>
  <li><a href="https://www.getpostman.com/" target="_blank">Postman</a></li>
</ul>

After repository clone:

- Run **`yarn`** to install dependencies;
- Run **`yarn sequelize db:migrate`** to create the migrations;
- Run **`yarn dev`** to start de aplication.

Now you can use your REST Client to test "**Truckeria**".

## Built With

<ul>
  <li>NodeJS</li>
  <li>Docker</li>
  <li>PostgreSQL</li>
  <li>Mongodb</li>
  <li>Redis</li>
  <li>React JS</li>
  <li>React Native</li>
</ul>

## Tools

<ul>
  <li>es6 syntax and babel</li>
  <li>Sucrase + Nodemon;</li>
  <li>ESLint + Prettier + EditorConfig;</li>
  <li>Sequelize (PostgreSQL)</li>
  <li>Flux to organize the data flow management</li>
</ul>

## What's next

- [ ] finish up rest api with tests.

## Authors

<ul>
  <li>Dana Rocha</li>
</ul>

## License

This project is licensed under the MIT License - see the <a href="" target="_blank">LICENSE.md</a> file for details.
