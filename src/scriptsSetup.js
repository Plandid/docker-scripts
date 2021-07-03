#! /usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

const gitHooksPath = path.join(process.cwd(), 'githooks')

exec(`rm -r ${gitHooksPath}`, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
    }
    if (stderr) {
        console.error(error);
    }
    console.log(stdout);
});

exec(`mkdir ${gitHooksPath}`, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
    }
    if (stderr) {
        console.error(error);
    }
    console.log(stdout);
});

exec(`git config core.hooksPath ${gitHooksPath}`, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
    }
    if (stderr) {
        console.error(error);
    }
    console.log(stdout);
});

try {
    fs.writeFileSync(path.join(gitHooksPath, 'post-commit'), '#! /bin/sh\nnpx post-commit-githook');
    fs.writeFileSync(path.join(gitHooksPath, 'pre-commit'), '#! /bin/sh\nnpx pre-commit-githook');
} catch (error) {
    console.error(error);
    exec(`rm -r ${gitHooksPath}`, (error, stderr, stdout) => {
        if (error) {
            console.error(error);
        }
        if (stderr) {
            console.error(error);
        }
        console.log(stdout);
    });
}

exec(`chmod +x ${path.join(gitHooksPath, 'post-commit')}`, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
    }
    if (stderr) {
        console.error(error);
    }
    console.log(stdout);
});

exec(`chmod +x ${path.join(gitHooksPath, 'pre-commit')}`, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
    }
    if (stderr) {
        console.error(error);
    }
    console.log(stdout);
});

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

packageJson['scripts']['prepare'] = 'scripts-setup';

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));