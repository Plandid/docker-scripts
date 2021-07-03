#! /usr/bin/env node

import shell from 'shelljs';

if (!shell.which('docker')) {
    console.error('docker is not installed');
    shell.exit(1);
}

if (shell.exec(`docker container kill $(docker ps -q)`) !== 0) {
    console.error(`couldn't run docker build`);
    shell.exit(1);
}