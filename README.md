# FormAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.
A aplicação foi desenvolvida utilizando o framework Angular e a linguagem TypeScript. O escopo do projeto envolve a criação de um formulário com funcionalidades de cadastro, listagem, edição e exclusão de registros. Neste contexto, não é feito uso de uma API para armazenar os registros, sendo todos eles salvos localmente no armazenamento do navegador (localStorage). Quando um usuário deseja remover um item, em vez de ser removido permanentemente, é atribuída uma data de deleção, resultando em um softDelete. O registro permanece no localStorage, mas não é exibido na tabela.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
