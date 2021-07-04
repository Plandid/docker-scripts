#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

require('dotenv').config();

const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const imageName = process.argv[2] ? process.argv[2] : packageJson.name;
const version = process.argv[3] ? process.argv[3] : packageJson.version;

const httpsParam = process.env.HTTPS_PORT ? ` -p 443:${process.env.HTTPS_PORT}` : "";

execSync(`docker run -d --rm --env-file .env -p 80:${process.env.PORT}${httpsParam} ${imageName}:${version}`);