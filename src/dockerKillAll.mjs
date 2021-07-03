#! /usr/bin/env node

import shell from 'shelljs';

if (!shell.which('docker')) {
    console.error('docker is not installed');
    shell.exit(1);
}

shell.exec(`docker container kill $(docker ps -q)`);