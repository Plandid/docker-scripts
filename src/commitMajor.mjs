#! /usr/bin/env node

import process from 'process';
import shell from 'shelljs';
import fs from 'fs';
import path from 'path';

if (!process.argv[2]) {
    console.error('no commit message passed');
    shell.exit(1);
}

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

if (!shell.which('git')) {
    console.error('this script requires git');
    shell.exit(1);
}

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = `${parseInt(major) + 1}.${0}.${0}`;
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));

shell.exec('git add .');

shell.exec(`git commit --no-verify -m "${process.argv[2]}"`);