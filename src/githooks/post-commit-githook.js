#! /usr/bin/env node

const { exec } = require('child_process');
const process = require('process');

exec('git tag ' + packageJson.version, (error, stderr, stdout) => {
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