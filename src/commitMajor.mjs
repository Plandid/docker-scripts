#! /usr/bin/env node

import process from 'process';
import shell from 'shelljs';
import fs from 'fs';
import path from 'path';

if (!process.argv[2]) {
    console.error('no commit message passed');
    shell.exit(1);
}

let package = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

if (!shell.which('git')) {
    console.error('this script requires git');
    shell.exit(1);
}

let [major, minor, patch] = package.version.split('.');
package.version = `${parseInt(major) + 1}.${0}.${0}`;
fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));

if (shell.exec('git add .').code !== 0) {
    shell.echo('error executing git add');
    package.version = `${major}.${minor}.${patch}`;
    fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
    shell.exit(1);
}

if (shell.exec(`git commit -m ${process.argv[2]}`) !== 0) {
    shell.echo('error executing git commit');
    package.version = `${major}.${minor}.${patch}`;
    fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
    shell.exit(1);
}