#! /usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

exec('npm run test', (error, stderr, stdout) => {
    console.log(stdout);
    if (error | stderr) {
        process.exit(1);
    }
});

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = major + '.' + minor + '.' + (parseInt(patch) + 1).toString();
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
