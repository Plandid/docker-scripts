#! /usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const imageName = process.argv[2] ? process.argv[2] : packageJson.name;
const version = packageJson.version;

exec(`docker build -t ${imageName}:${version} ./`, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    if (stderr) {
        console.error(stderr);
        process.exit(1);
    }
    console.log(stdout);
});