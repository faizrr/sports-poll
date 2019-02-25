![Screenshot](https://i.imgur.com/MBCvKLV.png)

# Sports poll

The _"Sports Poll"_ app is a dead simple poll system around some sports events

It allows users to vote on each event and then shows another random event to vote on. There should be one poll, that displays one (random) category at a time. E.g. load Football category with poll options to vote on from DB, and only display those at a time, next browser reload would maybe display Tennis.

The polling options should be what team will win or if it will be a draw, e.g.

● Home Team win (Team A)

● Draw

● Away Team win (Team B)

## Summary

This web application is built on top of **React** for frontend and **NestJS** for backend. Frontend is built using react hooks 💥

Application allows you to sign up, sign in and vote for events. User can't vote for same event multiple times. Also, in "event roulette" user see only events that is available to vote.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- PostgreSQL 9+
- NodeJS 10+
- Yarn
- Lerna
- TypeORM CLI

### Installing

1. Clone repository
2. Create psql db named `sports-poll` for user `postgres`
3. Run `lerna bootstrap` to install dependencies
4. Go to `packages/server` and run `yarn migration:run` to fill games table with examples from JSON file

### Running app for development

1. Go to `packages/server` and run `yarn start:dev`. Server will be available on `http://localhost:5000/`
2. Go to `packages/client` and run `yarn start`. Client will be available on `http://localhost:3000/`

### Running app for production

```
TODO: add docker
```
