#! /usr/bin/env node

import shell from 'shelljs';
import fs from 'fs';
import process from 'process';
import path from 'path';

const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const imageName = process.argv[2] ? process.argv[2] : packageJson.name;
const version = packageJson.version;

if (!shell.which('docker')) {
    console.error('docker is not installed');
    shell.exit(1);
}

if (shell.exec(`docker build -t ${imageName}:${version} ./`) !== 0) {
    console.error(`couldn't run docker build`);
    shell.exit(1);
}