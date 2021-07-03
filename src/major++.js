#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const process = require('process');

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = `${parseInt(major) + 1}.${0}.${-1}`;
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));