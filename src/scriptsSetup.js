#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

const gitHooksPath = path.join(process.cwd(), 'githooks')

if (!fs.existsSync(gitHooksPath)) {
    fs.mkdirSync(gitHooksPath);
}

execSync(`git config core.hooksPath ${gitHooksPath}`);

const postCommitData = `#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

execSync('git tag ' + packageJson.version);`;

const preCommitData = `#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const process = require('process');

try {
    execSync('npm run test');
} catch {
    console.log('failed tests');
    process.exit(1);
}

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

const [major, minor, patch] = packageJson.version.split('.');
packageJson.version = major + '.' + minor + '.' + (parseInt(patch) + 1).toString();
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));

`;

try {
    fs.writeFileSync(path.join(gitHooksPath, 'post-commit'), postCommitData);
    fs.writeFileSync(path.join(gitHooksPath, 'pre-commit'), preCommitData);
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