#! /usr/bin/env node

import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import process from 'process';

const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

if (!shell.which('git')) {
    console.error('this script requires git');
    shell.exit(1);
}

shell.exec('git tag ' + packageJson.version);