# Image-Resizer

Project assigned by Inside Maps.

## Author
Pavle Bradic

## Requirements

1. Node >= 14
2. Npm >= 6

## Project Structure

Project is split into `/front`, `/back` and `/workers` directories. Each part keeps its specific set of dependencies and can be run as separate npm package.

Each part should have .env file with all necessary secrets and other env variables. See .env.example.

## Running the project

First, clone this repo and navigate to the root folder of the project:
```shell
git clone git@github.com:bpavle/Image-Resizer.git; cd Image-Resizer
```
And now, run all the project parts:
### Front End
This is main entry point to the app.

Navigate to the frontend part:
```shell
cd front;
```
Install all required npm packages:
```shell
npm install
```
Create static build from react app:
```shell
npm run build
```

Navigate back to the root directory:
```shell
cd ..
```
### Back End
In order to serve static SPA, we need to run the server as well:

Navigate to the frontend part:
```shell
cd back;
```
Install all required npm packages:
```shell
npm install
```
Run the server:
```shell
npm run server
```
Navigate back to the root directory:
```shell
cd ..
```
### Workers

Navigate to the workers part:
```shell
cd workers;
```
Install all required npm packages:
```shell
npm install
```
Start worker:
```shell
npm run worker
```
If you want to, you can start multiple workers just by running multiple node processes with above command