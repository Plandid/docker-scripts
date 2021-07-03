#! /usr/bin/env node

import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import process from 'process';

if (shell.exec('npm run test').code !== 0) {
    console.error("didn't pass testing");
    shell.exit(1);
}

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = major + '.' + minor + '.' + (parseInt(patch) + 1).toString();
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));

