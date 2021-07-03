#! /usr/bin/env node

const { exec } = require('child_process');

exec(`docker container kill $(docker ps -q)`);