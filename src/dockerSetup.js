#! usr/bin/env node

const fs = require('fs');

const dockerFileData = `FROM node@sha256:8263de4a04679fabfdbda4e3a18de44d303ec5ba4dd3dafaf5fdc69af7164fd6

USER node

WORKDIR /home/node/

COPY --chown=node:node ./ ./

RUN npm install --only=prod

CMD ["npm", "run", "start"]`;

const dockerIgnoreData = `node_modules
npm-debug.log
githooks
scripts
exampleData.js
schemas.json
Dockerfile
.dockerignore
.git
.gitignore
.env
.env.test
.env.prod
.env.sample
`;

fs.writeFileSync('Dockerfile', dockerFileData);

fs.writeFileSync('Dockerfile', dockerIgnoreData);