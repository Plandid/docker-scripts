#! /usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

if (!process.argv[2]) {
    console.error('no commit message passed');
    process.exit(1);
}

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = `${parseInt(major) + 1}.${0}.${-1}`;
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));

exec('git add .', (error, stderr, stdout) => {
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

exec(`git commit -m "${process.argv[2]}"`, (error, stderr, stdout) => {
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