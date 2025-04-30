## Stack
react, vite, typescript (SWC), shadcn, axios, i18n

## Project structure
app - the frontend code itself

devops - devops config files

scripts - scripts to make life easier

docs - documentation

## Структура фронтенда
public/locales/ - automatically generated locales code

src/client/ - automatically generated client code

src/components/ - shadCN and other stylized components

src/contexts - contexts

src/pages/ - all page files

## Backend connection

We ended up using jsonRPC since it works on http1 and can be used normally on the web. Axios provides full support for working with jsonRPC, so no problems should arise because of this

There is a script for auto-generating a REST client based on openapi for future project updates but it is not included in the final build, so this will not affect anything

## Workflow

There is a develop and master branch. While working on the project we only committed to the dev branch, the master branch was only updated via pull requests from dev to test all features first and keep the master version stable. 

The develop version is hosted on stage.dnp-project.ru and the main version is hosted on dnp-project.ru
