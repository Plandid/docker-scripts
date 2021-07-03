#! /usr/bin/env node

import shell from 'shelljs';
import path from 'path';
import fs from 'fs';
import process from 'process';

const gitHooksPath = path.join(process.cwd(), 'githooks')

if (!shell.which('git')) {
    console.error('this script requires git');
    shell.exit(1);
}

shell.mkdir(gitHooksPath);

if (shell.exec(`git config core.hooksPath ${gitHooksPath}`).code !== 0) {
    console.log('could not configure core.hooksPath');
    shell.rm('-r', gitHooksPath);
    shell.exit(1);
}

try {
    fs.writeFileSync(path.join(gitHooksPath, 'post-commit'), '#! /bin/sh\nnpm run post-commit-githook.mjs');
    fs.writeFileSync(path.join(gitHooksPath, 'pre-commit'), '#! /bin/sh\nnpm run pre-commit-githook.mjs');
    fs.writeFileSync(path.join(gitHooksPath, 'post-merge'), '#! /bin/sh\nnpm run post-merge-githook.mjs');
} catch (error) {
    console.error(error);
    shell.rm('-r', gitHooksPath);
    shell.exit(1);
}

var packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'))
);

packageJson['scripts']['prepare'] = 'scripts-setup';

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));