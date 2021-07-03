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

const postCommitData = `#! /usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

exec('git tag ' + packageJson.version, (error, stderr, stdout) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    if (stderr) {
        console.error(stderr);
        process.exit(1);
    }
    console.log(stdout);
});`;

const preCommitData = `#! /usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

exec('npm run test', (error, stderr, stdout) => {
    console.log(stdout);
    if (error | stderr) {
        process.exit(1);
    }
});

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = major + '.' + minor + '.' + (parseInt(patch) + 1).toString();
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));`;

try {
    fs.writeFileSync(path.join(gitHooksPath, 'post-commit'), postCommitData);
    fs.writeFileSync(path.join(gitHooksPath, 'pre-commit'), preCommitData);
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