#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

const gitHooksPath = path.join(process.cwd(), 'githooks')

if (fs.accessSync(gitHooksPath)) {
    try {
        execSync(`rm -r ${gitHooksPath}`);
    } catch (e) {
        process.exit(1);
    }
} else {
    try {
        execSync(`mkdir ${gitHooksPath}`);
    } catch (e) {
        console.error(e);
        console.log('continuing')
    }
}

execSync(`git config core.hooksPath ${gitHooksPath}`);

try {
    fs.writeFileSync(path.join(gitHooksPath, 'post-commit'), '#! /bin/sh\nnpx post-commit-githook');
    fs.writeFileSync(path.join(gitHooksPath, 'pre-commit'), '#! /bin/sh\nnpx pre-commit-githook');
} catch (error) {
    console.error(error);
    execSync(`rm -r ${gitHooksPath}`);
}

execSync(`chmod +x ${path.join(gitHooksPath, 'post-commit')}`);

execSync(`chmod +x ${path.join(gitHooksPath, 'pre-commit')}`);

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

packageJson['scripts']['prepare'] = 'scripts-setup';

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));