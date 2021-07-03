#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';

let package = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

let [major, minor, patch] = package.version.split('.');
package.version = major + '.' + minor + '.' + (parseInt(patch) + 1).toString();
fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));

