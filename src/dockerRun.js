#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const imageName = process.argv[2] ? process.argv[2] : packageJson.name;
const version = process.argv[3] ? process.argv[3] : packageJson.version;

const httpPort = process.argv[4] ? process.argv[4] : '8080';
const httpsParam = process.argv[5] ? ` -p 443:${process.argv[5]}` : "";

execSync(`docker run -d --rm --env-file .env -p 80:${httpPort}${httpsParam} ${imageName}:${version}`);