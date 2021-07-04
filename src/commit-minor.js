#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

if (!process.argv[2]) {
    console.error('no commit message passed');
    process.exit(1);
}

try {
    execSync('npm run test');
} catch (e) {
    process.exit(1);
}

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = `${major}.${parseInt(minor) + 1}.${-1}`;
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));