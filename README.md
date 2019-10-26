<h1 align="center">
  <img alt="Truckeria" title="Truckeria" src="" width="200px" />
</h1>

<h3 align="center">
  A simple project to manage food trucks.
</h3>

## Browser Support

This Application relies on [Fetch API](https://fetch.spec.whatwg.org/). And this API is supported in the following browsers.

| ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 39+ ✔                                                                                                         | 42+ ✔                                                                                                          | 29+ ✔                                                                                                        | 10.1+ ✔                                                                                                       | Nope ✘                                                                                                    |

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

<h3>Prerequisites</h3>

<h4>NodeJS</h4>

You need to install NodeJS on your computer before you can use "**Truckeria**". You can install NodeJS by following <a href="https://nodejs.org/en/download/package-manager/" target="_blank">these instructions</a>.

Once you have completed the installation process, try typing **`npm -v`** into your command line. You should get a response with the version of NodeJS.

<h4>Yarn</h4>

Once you have NodeJs instaled, you need to install Yarn. You can install Yarn by following <a href="https://yarnpkg.com/en/docs/getting-started" target="_blank">these instructions</a>.

After instalition, try typing **`yarn -v`** into your command line. You should get a response with the version of Yarn.

<h4>Docker</h4>

You need to install Docker on your computer before you can use "**Truckeria**". You can install Docker by following <a href="https://www.docker.com/get-started" target="_blank">these instructions</a>.

Once you have completed the installation process, try typing **`docker -v`** into your command line. You should get a response with the version of Docker.

If you are using Linux distributions, is recommended following <a href="https://docs.docker.com/install/linux/linux-postinstall/" target="_blank">these instructions</a> to manage Docker as a non-root use.

<h4>PostgreSQL</h4>

You need to configure PostgreSQL on your computer before you can use "**Gympoint**". You can configure PostgreSQL by following <a href="https://hub.docker.com/_/postgres" target="_blank">these instructions</a>.

Some params:

<ul>
  <li>POSTGRES_DB=truckeria</li>
  <li>POSTGRES_USER=postgres</li>
  <li>POSTGRES_PASSWORD=fd25cec114da18f318c8988964080246</li>
</ul>

The final code:

```
docker run --name truckeria -e POSTGRES_DB=truckeria -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=fd25cec114da18f318c8988964080246 -p 5432:5432 -d postgres:11
```

<h4>REST API Client</h4>

Finally, you will need a rest api client to test "**Truckeria**". Examples:

<ul>
  <li><a href="https://insomnia.rest/" target="_blank">Insomnia</a></li>
  <li><a href="https://www.getpostman.com/" target="_blank">Postman</a></li>
</ul>

It is recommended to install the extension ESLint and edit the REST Api Client' settings:

```
  "files.eol": "\n",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
```

## Deploy

After clone repository:

- Run **`yarn`** to install dependencies;
- Run **`yarn sequelize db:migrate`** to creat the migrations;
- Run **`yarn sequelize db:seed:all`** to creat the seed;
- Run **`yarn dev`** to start de aplication.

Now you can use your REST API Client to test "**Truckeria**".

## Built With

<ul>
  <li>NodeJS</li>
  <li>Docker</li>
  <li>PostgreSQL</li>
</ul>

## Tools

<ul>
  <li>Sucrase + Nodemon;</li>
  <li>ESLint + Prettier + EditorConfig;</li>
  <li>Sequelize (PostgreSQL)</li>
</ul>

## Something in the future?

- [ ] ...

## Authors

<ul>
  <li>Dana Rocha</li>
</ul>

## License

This project is licensed under the MIT License - see the <a href="" target="_blank">LICENSE.md</a> file for details.
