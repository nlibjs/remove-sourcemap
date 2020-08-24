#!/usr/bin/env node
import * as path from 'path';
import * as fs from 'fs';
import {removeSourceMap} from './removeSourceMap';

const execute = async (
    input?: string,
) => {
    if (input) {
        const directory = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
        const stats = await fs.promises.stat(directory);
        if (stats.isDirectory()) {
            return await removeSourceMap(directory);
        } else {
            throw new Error(`NonDirectory:${input}`);
        }
    }
    throw new Error(`InvalidDirectory:${input}`);
};

if (!module.parent) {
    const args = process.argv.slice(2);
    if (args.includes('--help') || args.includes('-h')) {
        console.log([
            'remove-sourcemap [options] <dir>',
            '-h, --help     Show help',
            '-v, --version  Output the version number',
        ].join('\n'));
    } else if (args.includes('--version') || args.includes('-v')) {
        const jsonPath = path.join(__dirname, '../package.json');
        const {version} = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as unknown as {version: string};
        console.log(version);
    } else {
        execute(args[args.length - 1])
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    }
}
