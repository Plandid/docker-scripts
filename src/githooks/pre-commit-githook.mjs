#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = major + '.' + minor + '.' + (parseInt(patch) + 1).toString();
console.log(JSON.stringify(packageJson, null, 2))
fs.writeFileSync(path.join(process.cwd(), 'package.jsom'), JSON.stringify(packageJson, null, 2));

