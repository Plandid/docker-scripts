#! /usr/bin/env node

import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import process from 'process';

let package = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

if (!shell.which('git')) {
    console.error('this script requires git');
    shell.exit(1);
}

if (shell.exec('git tag ' + package.version).code !== 0) {
    console.error('error executing git tag');
    shell.exit(1);
}