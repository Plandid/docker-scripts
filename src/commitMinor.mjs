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
packageJson.version = `${major}.${parseInt(minor) + 1}.${0}`;
fs.writeFileSync(path.join(process.cwd(), 'package.jsom'), JSON.stringify(packageJson, null, 2));

if (shell.exec('git add .').code !== 0) {
    shell.echo('error executing git add');
    packageJson.version = `${major}.${minor}.${patch}`;
    fs.writeFileSync(path.join(process.cwd(), 'package.jsom'), JSON.stringify(packageJson, null, 2));
    shell.exit(1);
}

if (shell.exec(`git commit -m ${process.argv[2]}`) !== 0) {
    shell.echo('error executing git commit');
    packageJson.version = `${major}.${minor}.${patch}`;
    fs.writeFileSync(path.join(process.cwd(), 'package.jsom'), JSON.stringify(packageJson, null, 2));
    shell.exit(1);
}