# README

## Project Structure

FORDER:

- WebUI: <-BE-> Contain API, Client UI, Files Storage
- Portal: <-FE-> Admin Management

### Backend

- Net Core 8 (NEED INSTALL SDK)
- SQL Server
- Razor Pages
- Authentication: JWT

### Frontend

- Umijs -> https://umijs.org/
- ReactJs -> https://react.dev/
- AntDesign -> https://ant.design/

## Install

- Install NodeJs -> https://nodejs.org/
- Install pNPM -> https://pnpm.io/
- In folder [Portal] -> Open Terminal `pnpm install` to install node modules
- Add new package -> `pnpm add <-package name->`
- Run FE: `npm start` (change endpoint in file `app.tsx` IMPORTANT!)
- Run BE: Install Visual Studio -> F5 to debug, Ctr+F5 run without debuger

## Deploy

### BE

- Install .Net run time hosting bundle 8.x
- Install IIS
- Open publish -> run publish

### FE

- FE: Open terminal -> `npm run deploy`