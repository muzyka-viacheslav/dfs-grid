# DFS-GRID

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Prerequisites

- Node.JS version not less than `12.x`
- NPM version not less than `6.x`
- Angular CLI latest (to install it run `npm i -g angular/cli`)
 

## Install dependencies 

Run the following commands in the root of the project.
- `npm i`

## Local Launch

In order to launch the application without actual build or serve it just host the `dist-build` folder on any port of your machine (through the IIS or npm packages like `http-server`).

P.S. Content of `dist-build` folder is just a copy of a project production build artifact.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Steps to improve

- In order to improve the solution I see rewrite the `cells.service` to make cells generating dynamic using specific algorithm of filling empty spaces and determining cross-cell dependencies.
- As well visual part could be improved to make all the transitions more smooth.
