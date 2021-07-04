#! /usr/bin/env node

const { execSync } = require('child_process');

execSync(`docker container kill $(docker ps -q)`);