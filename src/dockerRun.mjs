#! /usr/bin/env node

import shell from 'shelljs';
import fs from 'fs';
import process from 'process';
import path from 'path';

const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const imageName = process.argv[2] ? process.argv[2] : packageJson.name;
const version = process.argv[3] ? process.argv[3] : package.version;

if (!shell.which('docker')) {
    console.error('docker is not installed');
    shell.exit(1);
}

if (shell.exec(`docker run -d --rm --env-file .env -p 80:${process.env.PORT}${httpsParam} ${imageName}:${version}`) !== 0) {
    console.error(`couldn't run docker run`);
    shell.exit(1);
}